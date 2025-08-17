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
        role: true,
        deletedAt: true,
        isVerified: true,
        images: true,
        paymentCards: true,
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
    return Prisma.user.create({
      data,
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

  // auth işlemleri için prisma işlemleri

  // resendVerificationEmail,register ve forgotPassword için
  static async updateVerificationOTP(id: string, otp: string) {
    return Prisma.user.update({
      where: { id },
      data: {
        verificationOTP: otp,
        verificationOTPExpires: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
  }
  // email doğrulama için
  static async verifyEmail(id: string) {
    return Prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
        verificationOTP: null,
        verificationOTPExpires: null,
      },
    });
  }
  // forgotPassword ve changePassword için
  static async updatePassword(id: string, hashedPassword: string) {
    return Prisma.user.update({
      where: { id },
      data: { hashedPassword },
    });
  }
}
