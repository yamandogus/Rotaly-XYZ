import { CommentRepository } from "./repository";
import {
  CreateCommentSchemaType,
  UpdateCommentSchemaType,
} from "../../dto/comment";
import { AppError } from "../../utils/appError";

export class CommentService {
  static async create(userId: string, data: CreateCommentSchemaType) {
    const comment = await CommentRepository.create(userId, data);
    return comment;
  }
  static async getCommentById(id: string) {
    const comment = await CommentRepository.findById(id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    return comment;
  }
  static async getHotelComments(hotelId: string) {
    const comments = await CommentRepository.findByHotelId(hotelId);
    if (!comments || comments.length === 0) {
      throw new AppError("Comments not found", 404);
    }
    return comments;
  }
  static async update(
    id: string,
    userId: string,
    data: UpdateCommentSchemaType
  ) {
    const comment = await CommentRepository.update(id, data);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    if (comment.userId !== userId) {
      throw new AppError("You are not authorized to update this comment", 403);
    }
    return comment;
  }
  static async delete(id: string, userId: string) {
    const comment = await CommentRepository.delete(id);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    if (comment.userId !== userId) {
      throw new AppError("You are not authorized to delete this comment", 403);
    }
    return comment;
  }
}
