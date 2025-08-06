import { Request, Response } from "express";
import { MessageService } from "./service";
import {
  SendMessageSchemaType,
  GetSupportMessagesQuerySchemaType,
  MarkAsReadSchemaType,
} from "../../dto/message";
import { AppError } from "../../utils/appError";

const messageService = new MessageService();

export class MessageController {
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const data: SendMessageSchemaType = req.body;
      const message = await messageService.sendMessage(data, userId);

      res.status(201).json({
        success: true,
        data: message,
        message: "Message sent successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while sending message",
        });
      }
    }
  }

  async getConversations(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const conversations = await messageService.getConversations(userId);

      res.status(200).json({
        success: true,
        data: conversations,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching conversations",
        });
      }
    }
  }

  async getMessageById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const { id } = req.params;
      const message = await messageService.getMessageById(id, userId);

      res.status(200).json({
        success: true,
        data: message,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching message",
        });
      }
    }
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const data: MarkAsReadSchemaType = req.body;
      const result = await messageService.markAsRead(data, userId);

      res.status(200).json({
        success: true,
        data: result,
        message: "Messages marked as read",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while marking messages as read",
        });
      }
    }
  }

  async getUnreadCount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const result = await messageService.getUnreadCount(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching unread count",
        });
      }
    }
  }

  async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const { id } = req.params;
      const result = await messageService.deleteMessage(id, userId);

      res.status(200).json({
        success: true,
        data: result,
        message: "Message deleted successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while deleting message",
        });
      }
    }
  }

  async getSupportMessages(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const { supportId } = req.params;
      const query: GetSupportMessagesQuerySchemaType = req.query as any;

      const result = await messageService.getSupportMessages(
        supportId,
        userId,
        query
      );

      res.status(200).json({
        success: true,
        data: result.messages,
        pagination: result.pagination,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching support messages",
        });
      }
    }
  }

  async getConversationWith(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const { partnerId } = req.params;
      const limit = parseInt(req.query.limit as string) || 20;
      const beforeMessageId = req.query.beforeMessageId as string;

      const result = await messageService.getConversationWith(
        userId,
        partnerId,
        limit,
        beforeMessageId
      );

      res.status(200).json({
        success: true,
        data: result.messages,
        hasMore: result.hasMore,
        oldestMessageId: result.oldestMessageId,
        newestMessageId: result.newestMessageId,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while fetching conversation",
        });
      }
    }
  }
}
