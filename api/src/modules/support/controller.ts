import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { SupportService } from "./service";
import { AIService } from "../../services/ai";
import {
  CreateSupportSchema,
  GetSupportListSchema,
  CloseSupportSchema,
  SendSupportMessageSchema,
} from "../../dto/support";
import { AIChatSchema } from "../../dto/support/ai-chat.dto";
import { AppError } from "../../utils/appError";

export class SupportController {
  private supportService: SupportService;

  constructor(private prisma: PrismaClient) {
    console.log("🔧 SupportController initializing...");
    console.log("🔑 OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
    console.log(
      "🤖 OPENAI_MODEL:",
      process.env.OPENAI_MODEL || "gpt-3.5-turbo"
    );

    const aiService = new AIService({
      apiKey: process.env.OPENAI_API_KEY || "",
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || "1000"),
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
    });

    this.supportService = new SupportService(prisma, aiService);
  }

  // create new support request
  createSupportRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const validatedData = CreateSupportSchema.parse(req.body);
      const support = await this.supportService.createSupportRequest(
        userId,
        validatedData
      );

      res.status(201).json({
        success: true,
        message: "Support request created successfully",
        data: support,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get support request by ID
  getSupportById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const { supportId } = req.params;
      const support = await this.supportService.getSupportById(
        supportId,
        userId
      );

      res.status(200).json({
        success: true,
        data: support,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get list of support requests
  getSupportList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role as Role;

      if (!userId || !userRole) {
        throw new AppError("User not authenticated", 401);
      }

      const queryData = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        status: (req.query.status as "open" | "closed" | "all") || "all",
        category: req.query.category as string,
      };

      const validatedData = GetSupportListSchema.parse(queryData);
      const result = await this.supportService.getSupportList(
        validatedData,
        userId,
        userRole
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Close support request
  closeSupportRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role as Role;

      if (!userId || !userRole) {
        throw new AppError("User not authenticated", 401);
      }

      const { supportId } = req.params;
      const validatedData = CloseSupportSchema.parse({ supportId });

      const support = await this.supportService.closeSupportRequest(
        validatedData,
        userId,
        userRole
      );

      res.status(200).json({
        success: true,
        message: "Support request closed successfully",
        data: support,
      });
    } catch (error) {
      next(error);
    }
  };

  // get support reps statistics (admin only)
  getSupportRepStatistics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const statistics = await this.supportService.getSupportRepStatistics();

      res.status(200).json({
        success: true,
        data: {
          supportReps: statistics,
          summary: {
            totalReps: statistics.length,
            totalOpenTickets: statistics.reduce(
              (sum: number, rep: any) => sum + rep.openTickets,
              0
            ),
            averageTicketsPerRep:
              statistics.length > 0
                ? Math.round(
                    statistics.reduce(
                      (sum: number, rep: any) => sum + rep.openTickets,
                      0
                    ) / statistics.length
                  )
                : 0,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // AI Chat endpoint
  handleAIChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("🤖 AI Chat request received:", req.body);

      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const validatedData = AIChatSchema.parse(req.body);
      console.log("✅ Data validated:", validatedData);

      const result = await this.supportService.handleAIChatWithAutoTicket(
        userId,
        validatedData.message,
        validatedData.conversationHistory
      );

      console.log("🎯 AI Response:", result);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("❌ AI Chat error:", error);
      next(error);
    }
  };

  // Send message to support ticket
  sendMessageToTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role as Role;

      if (!userId || !userRole) {
        throw new AppError("User not authenticated", 401);
      }

      const { supportId } = req.params;
      const validatedData = SendSupportMessageSchema.parse(req.body);

      const message = await this.supportService.sendMessageToTicket(
        userId,
        supportId,
        validatedData.content,
        userRole
      );

      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: message,
      });
    } catch (error) {
      next(error);
    }
  };

  // utility method to check if AI service is available
  isAIServiceAvailable = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isAvailable = await this.supportService.isAIServiceAvailable();

      res.status(200).json({
        success: true,
        data: { available: isAvailable },
      });
    } catch (error) {
      next(error);
    }
  };
}
