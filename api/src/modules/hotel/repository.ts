import { PrismaClient } from "@prisma/client";
import { CreateHotelInput } from "../../dto/hotel/create-hotel.dto";
import Prisma from "../../config/db";

const prisma = new PrismaClient();

export const HotelRepository = {
  async createHotel( data: CreateHotelInput & { ownerId: string }) {
    return await prisma.hotel.create({
      data: {
        ...data,
      },
    });
  },

  async getHotelById(hotelId: string) {
    return await prisma.hotel.findUnique({
      where: { id: hotelId },
    });
  },

  async getHotelsByOwner(ownerId: string) {
    return await prisma.hotel.findMany({
      where: { ownerId },
    });
  },

  async deleteHotel(hotelId: string, ownerId: string) {
    return await prisma.hotel.deleteMany({
      where: {
        id: hotelId,
        ownerId: ownerId,
      },
    });
  },

  async updateHotel(hotelId: string, data: Partial<CreateHotelInput>) {
    return await prisma.hotel.update({
      where: { id: hotelId },
      data,
    });
  },

  async getAllHotels() {
    return await prisma.hotel.findMany();
  },

  // 🟢 Yorum ekleme
  async createComment(data: {
    rating: number;
    text?: string;
    hotelId: string;
    userId: string;
  }) {
    return await Prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
          }
        }
      }
    });
  },

  // 🔵 Belirli bir otelin yorumlarını getirme
  async getCommentsByHotelId(hotelId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [comments, total] = await Promise.all([
      Prisma.comment.findMany({
        where: { hotelId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      Prisma.comment.count({ where: { hotelId } })
    ]);

    return {
      comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    };
  },

  // 🟡 Yorum güncelleme
  async updateComment(commentId: string, userId: string, data: {
    rating?: number;
    text?: string;
  }) {
    return await Prisma.comment.update({
      where: { 
        id: commentId,
        userId // Sadece yorumu yapan kullanıcı güncelleyebilir
      },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
          }
        }
      }
    });
  },

  // 🔴 Yorum silme
  async deleteComment(commentId: string, userId: string) {
    return await Prisma.comment.deleteMany({
      where: { 
        id: commentId,
        userId // Sadece yorumu yapan kullanıcı silebilir
      }
    });
  },

  // ⚪ Belirli bir yorumu getirme
  async getCommentById(commentId: string) {
    return await Prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
          }
        }
      }
    });
  },
};
