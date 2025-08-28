import { PrismaClient, Role } from "@prisma/client";
import { SupportRepository } from "./repository";
import {
  CreateSupportDto,
  GetSupportListDto,
  CloseSupportDto,
  SupportResponseDto,
  SupportListResponseDto,
} from "../../dto/support";
import { AIService, AIResponse } from "../../services/ai";
import { AppError } from "../../utils/appError";

export class SupportService {
  private supportRepository: SupportRepository;
  private aiService: AIService;

  constructor(private prisma: PrismaClient, aiService: AIService) {
    this.supportRepository = new SupportRepository(prisma);
    this.aiService = aiService;
  }

  async createSupportRequest(
    userId: string,
    data: CreateSupportDto
  ): Promise<SupportResponseDto> {
    const support = await this.supportRepository.createSupportRequest(
      userId,
      data
    );

    return this.formatSupportResponse(support);
  }

  async getSupportById(
    supportId: string,
    userId: string
  ): Promise<SupportResponseDto> {
    const support = await this.supportRepository.getSupportById(
      supportId,
      userId
    );

    return this.formatSupportResponse(support);
  }

  async getSupportList(
    data: GetSupportListDto,
    userId: string,
    userRole: Role
  ): Promise<SupportListResponseDto> {
    const { supports, total } = await this.supportRepository.getSupportList(
      data,
      userId,
      userRole
    );

    const formattedSupports = supports.map((support) =>
      this.formatSupportResponse(support)
    );

    return {
      supports: formattedSupports,
      pagination: {
        page: data.page,
        limit: data.limit,
        total,
        totalPages: Math.ceil(total / data.limit),
      },
    };
  }

  async closeSupportRequest(
    data: CloseSupportDto,
    userId: string,
    userRole: Role
  ): Promise<SupportResponseDto> {
    const support = await this.supportRepository.closeSupportRequest(
      data.supportId,
      userId,
      userRole
    );

    return this.formatSupportResponse(support);
  }

  async getSupportRepStatistics(): Promise<
    Array<{
      id: string;
      name: string;
      surname: string;
      email: string;
      openTickets: number;
      totalTickets: number;
    }>
  > {
    return this.supportRepository.getSupportRepStatistics();
  }

  async handleAIChatWithAutoTicket(
    userId: string,
    message: string,
    conversationHistory: { role: "user" | "assistant"; content: string }[]
  ): Promise<{
    response: string;
    ticketCreated: boolean;
    supportId?: string;
  }> {
    try {
      const aiResponse = await this.aiService.generateResponse(message, {
        conversationHistory,
      });

      let supportId: string | undefined;

      if (aiResponse.shouldCreateTicket) {
        // create support ticket automatically
        const support = await this.createAutoSupportTicket(
          userId,
          message,
          aiResponse.suggestedCategory,
          aiResponse.escalationReason
        );
        supportId = support.id;
      }

      return {
        response: aiResponse.content,
        ticketCreated: aiResponse.shouldCreateTicket,
        supportId,
      };
    } catch (error) {
      console.error("Error handling AI chat with auto ticket:", error);
      throw new AppError("Failed to get AI response", 500);
    }
  }

  private async createAutoSupportTicket(
    userId: string,
    originalMessage: string,
    category?: string,
    reason?: string
  ) {
    // map category string to enum, defaulting to GENERAL
    const supportCategory = this.mapCategoryToSupportEnum(category);

    const subject = `Auto-created: ${reason || "AI escalation"}`;
    const body = `This ticket was automatically created based on your conversation with our AI assistant.

Original message: "${originalMessage}"

${reason ? `Escalation reason: ${reason}` : ""}

A support representative will assist you shortly.`;

    const supportData = {
      subject,
      body,
      category: supportCategory,
    };

    return this.supportRepository.createSupportRequest(userId, supportData);
  }

  private mapCategoryToSupportEnum(category?: string): any {
    const categoryMap: { [key: string]: string } = {
      TECHNICAL: "TECHNICAL",
      BILLING: "BILLING",
      RESERVATION: "RESERVATION",
      COMPLAINT: "COMPLAINT",
      OTHER: "OTHER",
    };

    // return the mapped category or default to GENERAL
    return categoryMap[category || ""] || "GENERAL";
  }

  // method to generate room ID for support chat
  generateSupportRoomId(supportId: string): string {
    return `support:${supportId}`;
  }

  // method to generate room ID for AI chat
  generateAIChatRoomId(userId: string): string {
    return `ai-chat:${userId}`;
  }

  // method to check if a support request is accessible by user
  async canUserAccessSupport(
    supportId: string,
    userId: string,
    userRole: Role
  ): Promise<boolean> {
    try {
      if (userRole === Role.ADMIN) {
        // admins can access all tickets
        const support = await this.prisma.support.findUnique({
          where: { id: supportId },
        });
        return !!support;
      } else {
        await this.supportRepository.getSupportById(supportId, userId);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  private formatSupportResponse(support: any): SupportResponseDto {
    return {
      id: support.id,
      subject: support.subject,
      body: support.body,
      category: support.category,
      createdAt: support.createdAt,
      updatedAt: support.updatedAt,
      closedAt: support.closedAt,
      user: support.user,
      supportRep: support.supportRep,
      messageCount: support._count?.messages || 0,
      lastMessage:
        support.messages?.length > 0
          ? {
              content: support.messages[0].content,
              createdAt: support.messages[0].createdAt,
              senderId: support.messages[0].senderId,
            }
          : null,
      messages: support.messages || undefined,
    };
  }

  async sendMessageToTicket(
    userId: string,
    supportId: string,
    content: string,
    userRole: Role
  ): Promise<any> {
    // user has access or not
    const canAccess = await this.canUserAccessSupport(
      supportId,
      userId,
      userRole
    );
    if (!canAccess) {
      throw new AppError("Support ticket not found or access denied", 404);
    }

    // get support ticket
    const support = await this.supportRepository.getSupportById(
      supportId,
      userId
    );

    // determine the receiver based on the sender's role
    let receiverId: string;

    if (userRole === Role.CUSTOMER) {
      // customer sends message to support rep
      if (!support.supportRep?.id) {
        throw new AppError(
          "No support representative assigned to this ticket",
          400
        );
      }
      receiverId = support.supportRep.id;
    } else if (userRole === Role.SUPPORT) {
      // support rep sends message to customer
      receiverId = support.user.id;
    } else {
      // admin cannot send messages, only view tickets
      throw new AppError(
        "Administrators cannot send messages to support tickets",
        403
      );
    }

    // Create the message
    const message = await this.prisma.message.create({
      data: {
        content,
        senderId: userId,
        receiverId,
        supportId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            surname: true,
            role: true,
          },
        },
      },
    });

    return message;
  }

  // utility method to check if AI service is available
  async isAIServiceAvailable(): Promise<boolean> {
    try {
      return await this.aiService.testConnection();
    } catch (error) {
      console.error("AI service availability check failed:", error);
      return false;
    }
  }
}
