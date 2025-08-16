import { verificationEmailSchema } from "src/dto/email";
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
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        phone: true,
        isVerified: true,
        deletedAt: true,
        images: true,
        role: true,
        paymentCards: true,
        hashedPassword: true,
        verificationOTP:true
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
  static async create(data: RegisterSchemaType) {
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

  static async delete(id: string) {
    return Prisma.user.update({
      where: {
        id,
      },
      data: { deletedAt: new Date() },
    });
  }
}
