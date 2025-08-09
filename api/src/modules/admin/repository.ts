import Prisma from "../../config/db";
import { UpdateUserSchemaType } from "../../dto/auth";

export class AdminRepository {
  //   kendi profilini güncelliyo
  static async updateAdminProfile(id: string, data: UpdateUserSchemaType) {
    return Prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  //   dashboard kısmında görebildikleri
  static async getDashboardStatus() {
    const [totalReservation, totalCustomers, totalHotels] = await Promise.all([
      Prisma.reservation.count({ where: { deletedAt: null } }),
      Prisma.user.count({ where: { deletedAt: null } }),
      Prisma.hotel.count({ where: { deletedAt: null } }),
    ]);

    return {
      totalReservation,
      totalCustomers,
      totalHotels,
    };
  }
}
