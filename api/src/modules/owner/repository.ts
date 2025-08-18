import Prisma from "../../config/db";
import { updateOwnerProfileDto } from "../../dto/owner/update-owner-profile.dto";

export class OwnerRepository {
  static async updateOwnerProfile(id: string, data: updateOwnerProfileDto) {
    return Prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }
  static async getProfile(ownerId: string) {
    //  companydto kullanılcak
  }
  static async getTotalRevenue(ownerId: string) {
    return await Prisma.reservation.aggregate({
      where: {
        room: {
          hotel: {
            ownerId: ownerId,
          },
        },
      },
      _sum: {
        totalPrice: true,
      },
    });
  }
  static async getReservationCount(ownerId: string) {
    return await Prisma.reservation.count({
      where: {
        room: {
          hotel: {
            ownerId: ownerId,
          },
        },
      },
    });
  }
  static async getOccupancyRate(ownerId: string) {
    const rooms = await Prisma.room.findMany({
      where: {
        hotel: {
          ownerId: ownerId,
        },
      },
      include: {
        bookings: true,
      },
    });
  }
  static async getAverageRating(ownerId: string) {
    return await Prisma.comment.aggregate({
      where: {
        hotel: {
          ownerId: ownerId,
        },
      },
      _avg: {
        rating: true,
      },
    });
  }
  static async getRoomTypeStats(ownerId: string) {
    return await Prisma.room.groupBy({
      by: ["type"],
      where: {
        hotel: {
          ownerId: ownerId,
        },
      },
      _count: true,
    });
  }
  static async getPopularRooms(ownerId: string) {
    return await Prisma.room.findMany({
      where: {
        hotel: {
          ownerId: ownerId,
        },
      },
      include: {
        bookings: true,
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: {
        bookings: {
          _count: "desc",
        },
      },
      take: 5,
    });
  }
}
