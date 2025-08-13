import { Request, Response, NextFunction } from "express";
import { MessageService } from "./service";
import prisma from "../../config/db";
import {
  SendMessageSchema,
  GetMessagesSchema,
  MarkAsReadSchema,
  EditMessageSchema,
} from "../../dto/message";
import { TokenPayload } from "../../types/express";

interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService(prisma);
  }

  sendMessage = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const validatedData = SendMessageSchema.parse(req.body);
      const message = await this.messageService.sendMessage(
        userId,
        validatedData
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

  getMessages = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const validatedData = GetMessagesSchema.parse(req.query);
      const result = await this.messageService.getMessages(
        userId,
        validatedData
      );

      res.status(200).json({
        success: true,
        message: "Messages retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getConversations = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const conversations = await this.messageService.getUserConversations(
        userId
      );

      res.status(200).json({
        success: true,
        message: "Conversations retrieved successfully",
        data: conversations,
      });
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const validatedData = MarkAsReadSchema.parse(req.body);
      const result = await this.messageService.markMessagesAsRead(
        userId,
        validatedData
      );

      res.status(200).json({
        success: true,
        message: "Messages marked as read",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMessage = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const { messageId } = req.params;
      await this.messageService.deleteMessage(messageId, userId);

      res.status(200).json({
        success: true,
        message: "Message deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  editMessage = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const { messageId } = req.params;
      const validatedData = EditMessageSchema.parse(req.body);
      const editedMessage = await this.messageService.editMessage(
        messageId,
        userId,
        validatedData
      );

      res.status(200).json({
        success: true,
        message: "Message updated successfully",
        data: editedMessage,
      });
    } catch (error) {
      next(error);
    }
  };
}
