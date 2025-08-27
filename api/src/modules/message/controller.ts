import { Request, Response, NextFunction } from "express";
import { MessageService } from "./service";
import prisma from "../../config/db";
import {
  SendMessageSchema,
  GetMessagesSchema,
  MarkAsReadSchema,
  EditMessageSchema,
} from "../../dto/message";
import { TokenPayload, AuthenticatedRequest } from "../../types/express";
import { MessageHandler } from "../socket/handlers/message.handler";

interface SocketEmitter {
  emitAIResponse?: (userId: string, message: any) => void;
  emitNewMessage?: (data: any) => void;
}

export class MessageController {
  private messageService: MessageService;

  constructor(messageHandler?: MessageHandler) {
    console.log(
      `🔧 MessageController constructor - messageHandler provided: ${!!messageHandler}`
    );

    // creates socket emitter if messageHandler is provided
    const socketEmitter: SocketEmitter | undefined = messageHandler
      ? {
          emitAIResponse: (userId: string, message: any) => {
            console.log(
              `SocketEmitter.emitAIResponse called for user: ${userId}`
            );
            messageHandler.emitAIResponse(userId, message);
          },
          emitNewMessage: (data: any) => {
            // might need this
          },
        }
      : undefined;

    console.log(
      `MessageController constructor - socketEmitter created: ${!!socketEmitter}`
    );
    this.messageService = new MessageService(prisma, undefined, socketEmitter);
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

  checkAIStatus = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const isAvailable = await this.messageService.checkAIServiceStatus();

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
