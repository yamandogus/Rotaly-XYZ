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
    return await Prisma.company.findUnique({
      where: {
        id: ownerId,
      },
    });
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
}
