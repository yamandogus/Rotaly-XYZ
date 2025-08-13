import Prisma from "../../config/db";
import { updateAdminProfileDto } from "../../dto/admin/profile-dto";

export class AdminRepository {
  static async updateAdminProfile(id: string, data: updateAdminProfileDto) {
    return Prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }
  static async getProfile(id: string) {
    return Prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        companyName: true,
        companyTaxId: true,
        country: true,
        city: true,
        state: true,
        postCode: true,
        fullAddress: true,
        logo: true,
      },
    });
  }
  static async getTotalEarnings() {
    return Prisma.reservation.aggregate({
      where: {
        deletedAt: null,
      },
      _sum: {
        totalPrice: true,
      },
    });
  }
  static async getTotalReservations() {
    return Prisma.reservation.count({
      where: {
        deletedAt: null,
      },
    });
  }
  static async getTotalCustomers() {
    return Prisma.user.count({
      where: { role: "CUSTOMER" },
    });
  }
  static async getTotalHotels() {
    return Prisma.hotel.count({
      where: {
        deletedAt: null,
        isActive: true,
      },
    });
  }
}
