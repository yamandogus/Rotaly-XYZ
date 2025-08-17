import { Request, Response } from "express";
import { CommentService } from "./service";
import {
  CreateCommentSchemaType,
  UpdateCommentSchemaType,
} from "../../dto/comment";
import { AppError } from "../../utils/appError";

export class CommentController {
  static async createComment(req: Request, res: Response) {
    try {
      const user = (req as any).user?.id;
      const data = req.body as CreateCommentSchemaType;
      const comment = await CommentService.create(user, data);
      res.status(201).json({
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
        });
      }
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  static async getHotelComments(req: Request, res: Response) {
    try {
      const { hotelId } = req.params;
      const comments = await CommentService.getHotelComments(hotelId);
      res.status(200).json({
        message: "Comments fetched successfully",
        data: comments,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
        });
      }
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  static async updateComment(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const { commentId } = req.params;

      const existingComment = await CommentService.getCommentById(commentId);
      if (!existingComment) {
        throw new AppError("Comment not found", 404);
      }
      if (existingComment.userId !== userId) {
        throw new AppError("You do not have access to this comment.", 403);
      }

      const data = req.body as UpdateCommentSchemaType;
      const comment = await CommentService.update(userId, commentId, data);
      res.status(200).json({
        message: "Comment updated successfully",
        data: comment,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
        });
      }
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const { commentId } = req.params;
      const existingComment = await CommentService.getCommentById(commentId);
      if (!existingComment) {
        throw new AppError("Comment not found", 404);
      }
      if (existingComment.userId !== userId) {
        throw new AppError("You do not have access to this comment.", 403);
      }
      await CommentService.delete(commentId, userId);
      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
        });
      }
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
