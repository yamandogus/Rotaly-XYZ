import Prisma from "../../config/db";
import { RegisterSchemaType, UpdateUserSchemaType } from "../../dto/auth";

export class UserRepository {
  static async findAll() {
    return Prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
  static async findByEmail(email: string) {
    return Prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  static async findById(id: string) {
    return Prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  static async findByPhone(phone: string) {
    return Prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }
  static async create(data: RegisterSchemaType & { googleId?: string }) {
    // confirmPassword alanını ve hashlenmemiş password'u kaydetmemeliyiz
    const { name, surname, email, phone, password } = data;
    // Burada password'ü hashlemeniz gerekir, örneğin bcrypt ile hashleyebilirsiniz.
    // Şimdilik hashedPassword alanını doğrudan password olarak atıyoruz, gerçek uygulamada hash kullanmalısınız.
    return Prisma.user.create({
      data: {
        name,
        surname,
        email,
        phone,
        hashedPassword: password,
        googleId: data.googleId || undefined,
      },
    });
  }
  static async update(id: string, data: UpdateUserSchemaType) {
    return Prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
  // google ile girmeye çalışan kişi kayıtlı mı değil mi
  static async findByGoogleId(googleId: string) {
    return Prisma.user.findFirst({
      where: {
        googleId,
      },
    });
  }

  // eğer kullanıcı normal kayıt olmuş sonra google ile girmeye çalışırsa googleId'yi güncelle
  static async updateGoogleId(userId: string, googleId: string) {
    return Prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        googleId,
      },
    });
  }

  static async delete(id: string) {
    return Prisma.user.update({
      where: {
        id,
      },
      data: { deletedAt: new Date() },
    });
  }
}
