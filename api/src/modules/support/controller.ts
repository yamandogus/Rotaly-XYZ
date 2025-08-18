import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { SupportService } from "./service";
import { AIService } from "../../services/ai.service";
import {
  CreateSupportSchema,
  GetSupportListSchema,
  CloseSupportSchema,
} from "../../dto/support";
import { AppError } from "../../utils/appError";

export class SupportController {
  private supportService: SupportService;

  constructor(private prisma: PrismaClient) {
    const aiService = new AIService({
      apiKey: process.env.OPENAI_API_KEY || "",
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || "1000"),
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
    });

    this.supportService = new SupportService(prisma, aiService);
  }

  // Create new support request
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

      const validatedData = req.body;
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

  // Assign support representative (admin only)
  assignSupportRep = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userRole = req.user?.role;
      if (userRole !== "ADMIN") {
        throw new AppError("Access denied. Admin rights required.", 403);
      }

      const { supportId } = req.params;
      const { supportRepId } = req.body;

      if (!supportRepId) {
        throw new AppError("Support representative ID is required", 400);
      }

      const support = await this.supportService.assignSupportRep(
        supportId,
        supportRepId
      );

      res.status(200).json({
        success: true,
        message: "Support representative assigned successfully",
        data: support,
      });
    } catch (error) {
      next(error);
    }
  };

  // Handle AI chat (with automatic ticket creation when needed)
  handleAIChat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("User not authenticated", 401);
      }

      const { message, conversationHistory } = req.body;

      if (!message) {
        throw new AppError("Message is required", 400);
      }

      const result = await this.supportService.handleAIChatWithAutoTicket(
        userId,
        message,
        conversationHistory || []
      );

      res.status(200).json({
        success: true,
        data: {
          message: result.response,
          timestamp: new Date(),
          isFromAI: true,
          ticketCreated: result.ticketCreated,
          supportId: result.supportId,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // Get support representative workload (admin/support only)
  getSupportRepWorkload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userRole = req.user?.role;
      if (!userRole || !["ADMIN", "SUPPORT"].includes(userRole)) {
        throw new AppError("Access denied", 403);
      }

      const { supportRepId } = req.params;
      const workload = await this.supportService.getSupportRepWorkload(
        supportRepId
      );

      res.status(200).json({
        success: true,
        data: { supportRepId, openTickets: workload },
      });
    } catch (error) {
      next(error);
    }
  };

  // Reassign orphaned support requests (admin only)
  reassignOrphanedSupports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userRole = req.user?.role;
      if (userRole !== "ADMIN") {
        throw new AppError("Access denied. Admin rights required.", 403);
      }

      const reassignedCount =
        await this.supportService.reassignOrphanedSupports();

      res.status(200).json({
        success: true,
        message: `${reassignedCount} orphaned support requests reassigned`,
        data: { reassignedCount },
      });
    } catch (error) {
      next(error);
    }
  };

  // Check AI service status
  checkAIServiceStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isAvailable = await this.supportService.isAIServiceAvailable();

      res.status(200).json({
        success: true,
        data: {
          aiServiceAvailable: isAvailable,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
