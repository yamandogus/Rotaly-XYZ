import Prisma from "../../config/db";
import {
  UpdateCommentSchemaType,
  CreateCommentSchemaType,
} from "../../dto/comment";

export class CommentRepository {
  static async create(userId: string, data: CreateCommentSchemaType) {
    return Prisma.comment.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  static async findById(id: string) {
    return Prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
        hotel: true,
      },
    });
  }

  static async findByHotelId(hotelId: string) {
    return Prisma.comment.findMany({
      where: { hotelId },
      include: {
        user: true,
      },
    });
  }

  static async update(id: string, data: UpdateCommentSchemaType) {
    return Prisma.comment.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return Prisma.comment.delete({
      where: { id },
    });
  }
}
