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
import { AIService } from "../../services/ai.service";
import { AppError } from "../../utils/appError";

interface SocketEmitter {
  emitAIResponse?: (userId: string, message: any) => void;
  emitNewMessage?: (data: any) => void;
}

export class MessageService {
  private messageRepository: MessageRepository;
  private aiService: AIService;
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

      // generate AI response
      const aiResponse = await this.aiService.generateResponseWithHistory(
        userMessage,
        conversationHistory
      );

      // send AI response back to user
      const aiMessage = await this.prisma.message.create({
        data: {
          content: aiResponse,
          senderId: aiUser.id,
          receiverId: userId,
          // AI messages don't have supportId
        },
      });

      // emit socket event for real-time delivery (if socket service is available)
      if (this.socketEmitter?.emitAIResponse) {
        this.socketEmitter.emitAIResponse(userId, {
          id: aiMessage.id,
          content: aiResponse,
          senderId: aiUser.id,
          receiverId: userId,
          createdAt: aiMessage.createdAt,
          isFromAI: true,
        });
      }

      console.log(`AI response sent: ${aiMessage.id}`);
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
}
