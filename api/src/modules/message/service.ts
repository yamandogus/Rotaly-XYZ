import { PrismaClient } from "@prisma/client";
import { MessageRepository } from "./repository";
import {
  SendMessageDto,
  GetMessagesDto,
  MarkAsReadDto,
  EditMessageDto,
  MessageResponseDto,
  MessagesListResponseDto,
  ConversationResponseDto,
} from "../../dto/message";
import { AIService } from "../../services/ai";
import { SupportService } from "../support/service";
import { AppError } from "../../utils/appError";

interface SocketEmitter {
  emitAIResponse?: (userId: string, message: any) => void;
  emitNewMessage?: (data: any) => void;
}

export class MessageService {
  private messageRepository: MessageRepository;
  private aiService: AIService;
  private supportService: SupportService;
  private socketEmitter?: SocketEmitter;

  constructor(
    private prisma: PrismaClient,
    aiService?: AIService,
    socketEmitter?: SocketEmitter
  ) {
    this.messageRepository = new MessageRepository(prisma);
    this.socketEmitter = socketEmitter;

    if (aiService) {
      this.aiService = aiService;
    } else {
      // create AI service
      this.aiService = new AIService({
        apiKey: process.env.OPENAI_API_KEY || "",
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || "1000"),
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
      });
    }

    // Initialize support service for auto-ticket creation
    this.supportService = new SupportService(prisma, this.aiService);
  }

  async sendMessage(
    senderId: string,
    data: SendMessageDto
  ): Promise<MessageResponseDto> {
    const isAIReceiver = data.receiverId.startsWith("ai-assistant");

    // validating receiver exists (only for humans)
    if (!isAIReceiver) {
      const receiverExists = await this.prisma.user.findUnique({
        where: { id: data.receiverId },
        select: { id: true },
      });

      if (!receiverExists) {
        throw new AppError("Receiver not found", 404);
      }
    }

    // if supportId is provided, validate it exists and user has access (only for human messages)
    if (data.supportId && !isAIReceiver) {
      const support = await this.prisma.support.findFirst({
        where: {
          id: data.supportId,
          OR: [{ userId: senderId }, { supportRepId: senderId }], // user or support rep
        },
      });

      if (!support) {
        throw new AppError("Support ticket not found or access denied", 404);
      }
    }

    const message = await this.messageRepository.sendMessage(senderId, data);

    // AI response generation for AI receivers
    if (isAIReceiver) {
      this.generateAIResponse(senderId, data.receiverId, data.content).catch(
        (error) => {
          console.error("Error generating AI response:", error);
        }
      );
    }

    return this.formatMessageResponse(message, isAIReceiver);
  }

  async getMessages(
    userId: string,
    data: GetMessagesDto
  ): Promise<MessagesListResponseDto> {
    const isAIConversation = data.receiverId.startsWith("ai-assistant");

    // validating receiver exists (only for humans)
    if (!isAIConversation) {
      const receiverExists = await this.prisma.user.findUnique({
        where: { id: data.receiverId },
        select: { id: true },
      });

      if (!receiverExists) {
        throw new AppError("Conversation partner not found", 404);
      }
    }

    const { messages, total } = await this.messageRepository.getMessages(
      userId,
      data
    );

    const formattedMessages = messages.map((message) =>
      this.formatMessageResponse(message, isAIConversation)
    );

    return {
      messages: formattedMessages,
      pagination: {
        page: data.page,
        limit: data.limit,
        total,
        totalPages: Math.ceil(total / data.limit),
      },
    };
  }

  async getUserConversations(
    userId: string
  ): Promise<ConversationResponseDto[]> {
    return this.messageRepository.getUserConversations(userId);
  }

  async markMessagesAsRead(
    userId: string,
    data: MarkAsReadDto
  ): Promise<{ updatedCount: number }> {
    const result = await this.messageRepository.markMessagesAsRead(
      userId,
      data.messageIds
    );
    return { updatedCount: result.count };
  }

  async deleteMessage(messageId: string, userId: string): Promise<void> {
    const result = await this.messageRepository.deleteMessage(
      messageId,
      userId
    );

    if (!result) {
      throw new AppError(
        "Message not found or you don't have permission to delete it",
        404
      );
    }
  }

  async editMessage(
    messageId: string,
    userId: string,
    data: EditMessageDto
  ): Promise<MessageResponseDto> {
    try {
      const editedMessage = await this.messageRepository.editMessage(
        messageId,
        userId,
        data
      );

      const isAIReceiver =
        editedMessage.receiverId?.startsWith("ai-assistant") || false;
      return this.formatMessageResponse(editedMessage, isAIReceiver);
    } catch (error: any) {
      if (error.code === "P2025") {
        // prisma error code for record not found
        throw new AppError(
          "Message not found or you don't have permission to edit it",
          404
        );
      }
      throw error;
    }
  }

  private formatMessageResponse(
    message: any,
    isAIConversation: boolean = false
  ): MessageResponseDto {
    const isFromAI = message.senderId.startsWith("ai-assistant");

    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      receiverId: message.receiverId,
      supportId: isFromAI ? undefined : message.supportId, // AI messages don't have supportId
      createdAt: message.createdAt,
      readAt: message.readAt,
      isFromAI,
      senderInfo: isFromAI
        ? { name: "AI", surname: "Assistant" }
        : message.sender
        ? {
            name: message.sender.name,
            surname: message.sender.surname,
          }
        : undefined,
    };
  }

  // AI Response Generation Implementation
  private async generateAIResponse(
    userId: string,
    aiId: string,
    userMessage: string
  ): Promise<void> {
    try {
      // get recent conversation history for AI context
      let conversationHistory: {
        role: "user" | "assistant";
        content: string;
      }[] = [];

      // get or create AI user to get its actual UUID
      const aiUser = await this.messageRepository.ensureAIUserExists(aiId);

      const recentMessages = await this.prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: aiUser.id },
            { senderId: aiUser.id, receiverId: userId },
          ],
          supportId: null, // only get AI conversation messages (not support messages)
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      });

      conversationHistory = recentMessages
        .reverse() // reversing to get chronologically
        .map((msg) => ({
          role: msg.senderId.startsWith("ai-assistant")
            ? "assistant"
            : ("user" as "user" | "assistant"),
          content: msg.content,
        }));

      // generate AI response with auto-ticket creation capability
      const result = await this.supportService.handleAIChatWithAutoTicket(
        userId,
        userMessage,
        conversationHistory
      );

      let responseContent = result.response;

      // If a ticket was created, append notification to the response
      if (result.ticketCreated && result.supportId) {
        responseContent += `\n\nI've created a support ticket (#${result.supportId.slice(
          -8
        )}) for you. A human support representative will assist you soon.`;
      }

      // send AI response back to user
      const aiMessage = await this.prisma.message.create({
        data: {
          content: responseContent,
          senderId: aiUser.id,
          receiverId: userId,
          // AI messages don't have supportId, even when they create tickets
        },
      });

      // emit socket event for real-time delivery (if socket service is available)
      console.log(`Socket emitter available: ${!!this.socketEmitter}`);
      console.log(
        `Socket emitter has emitAIResponse: ${!!this.socketEmitter
          ?.emitAIResponse}`
      );

      if (this.socketEmitter?.emitAIResponse) {
        console.log(`Emitting AI response via socket for user: ${userId}`);
        this.socketEmitter.emitAIResponse(userId, {
          id: aiMessage.id,
          content: responseContent,
          senderId: aiUser.id,
          receiverId: userId,
          createdAt: aiMessage.createdAt,
          isFromAI: true,
          ticketCreated: result.ticketCreated,
          supportId: result.supportId,
        });
      } else {
        console.log(
          `Socket emitter not available - AI response will not be emitted in real-time`
        );
      }

      console.log(
        `AI response sent: ${aiMessage.id}${
          result.ticketCreated ? " (ticket created)" : ""
        }`
      );
    } catch (error) {
      console.error("Error generating AI response:", error);

      // send fallback message
      try {
        const aiUser = await this.messageRepository.ensureAIUserExists(aiId);
        await this.prisma.message.create({
          data: {
            content:
              "I apologize, but I'm having trouble responding right now. Please try again or contact our human support team for assistance.",
            senderId: aiUser.id,
            receiverId: userId,
            // AI messages don't have supportId
          },
        });
      } catch (fallbackError) {
        console.error("Error sending fallback AI message:", fallbackError);
      }
    }
  }

  // Check AI service status
  async checkAIServiceStatus(): Promise<boolean> {
    try {
      return await this.supportService.isAIServiceAvailable();
    } catch (error) {
      console.error("AI service availability check failed:", error);
      return false;
    }
  }
}
