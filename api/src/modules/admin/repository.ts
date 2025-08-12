import Prisma from "../../config/db";
import { UpdateUserSchemaType } from "../../dto/auth";

export class AdminRepository {
  // şirket bilgisi
  //   kendi profilini güncelliyo
  // TODO
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

// admin şifre değiştirmek için onay maili alsın
// total kazanç verileri gelicek
// total rezervasyon verileri gelicek
// total müşteri verileri gelicek
// total otel verileri gelicek
// kendi profilinde company bilgileri olucak

// company şeması olabilir
// paymentcard kullanıcı görmeli
// include user image
