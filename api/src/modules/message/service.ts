import { PrismaClient } from "@prisma/client";
import { MessageRepository } from "./repository";
import {
  SendMessageDto,
  GetMessagesDto,
  MarkAsReadDto,
  MessageResponseDto,
  MessagesListResponseDto,
  ConversationResponseDto,
} from "../../dto/message";
import { AppError } from "../../utils/appError";

export class MessageService {
  private messageRepository: MessageRepository;

  constructor(private prisma: PrismaClient) {
    this.messageRepository = new MessageRepository(prisma);
  }

  async sendMessage(
    senderId: string,
    data: SendMessageDto
  ): Promise<MessageResponseDto> {
    const isAIReceiver = data.receiverId.startsWith("ai");

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

    // if supportId is provided, validate it exists and user has access
    if (data.supportId) {
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

    // TODO: implement AI response generation
    if (isAIReceiver) {
      // TODO: queue AI response generation
      this.generateAIResponse(
        senderId,
        data.receiverId,
        data.content,
        data.supportId
      );
    }

    return this.formatMessageResponse(message, isAIReceiver);
  }

  async getMessages(
    userId: string,
    data: GetMessagesDto
  ): Promise<MessagesListResponseDto> {
    const isAIConversation = data.receiverId.startsWith("ai");

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

  private formatMessageResponse(
    message: any,
    isAIConversation: boolean = false
  ): MessageResponseDto {
    const isFromAI = message.senderId.startsWith("ai");

    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      receiverId: message.receiverId,
      supportId: message.supportId,
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

  // TODO: implement AI Response Generation
  private async generateAIResponse(
    userId: string,
    aiId: string,
    userMessage: string,
    supportId?: string
  ): Promise<void> {
    try {
      // TODO: implement AI response generation
    } catch (error) {
      console.error("Error generating AI response:", error);
      // send err
    }
  }

  private async getAIResponse(userMessage: string): Promise<string> {
    // mock AI responses
    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting point. Here's what I think...",
      "Based on what you've told me, I'd suggest...",
      "I'm here to help! Could you provide a bit more detail?",
      "Thank you for your message. I'm processing your request...",
    ];

    if (userMessage.toLowerCase().includes("hotel")) {
      return "I can help you with hotel-related questions! What specific information do you need about hotels?";
    }

    if (userMessage.toLowerCase().includes("reservation")) {
      return "I can assist you with reservations. Are you looking to make a new reservation or modify an existing one?";
    }

    if (
      userMessage.toLowerCase().includes("support") ||
      userMessage.toLowerCase().includes("help")
    ) {
      return "I'm here to provide support! Please describe the issue you're experiencing and I'll do my best to help.";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }
}
