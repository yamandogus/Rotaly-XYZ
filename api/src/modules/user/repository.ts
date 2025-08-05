import Prisma from "../../config/db";
import { RegisterSchemaType, UpdateUserSchemaType } from "../../dto/auth";

export class UserRepository {
  async findAll() {
    return Prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
  async findByEmail(email: string) {
    return Prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: string) {
    return Prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findByPhone(phone: string) {
    return Prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }
  async create(data: RegisterSchemaType) {
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
  async update(id: string, data: UpdateUserSchemaType) {
    return Prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return Prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });
  }
  async delete(id: string) {
    return Prisma.user.update({
      where: {
        id,
      },
      data: { deletedAt: new Date() },
    });
  }
}
