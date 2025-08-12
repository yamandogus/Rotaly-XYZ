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

  static async getHotComments(req: Request, res: Response) {
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
      const user = (req as any).user?.id;
      const { id } = req.params;
      const data = req.body as UpdateCommentSchemaType;
      const comment = await CommentService.update(user, id, data);
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
      const user = (req as any).user?.id;
      const { id } = req.params;
      await CommentService.delete(user, id);
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
