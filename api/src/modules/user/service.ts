import { UserRepository } from "./repository";
import { RegisterSchemaType, UpdateUserSchemaType } from "../../dto/auth";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError";

export class UserService {
  static async getAll() {
    const users = await UserRepository.findAll();
    if (!users || users.length === 0) {
      throw new AppError("Users not found", 404);
    }
    return users;
  }

  static async getById(id: string) {
    const user = await UserRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async getByEmail(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async getByPhone(phone: string) {
    const user = await UserRepository.findByPhone(phone);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async checkEmailUnique(
    email: string,
    excludeUserId?: string
  ): Promise<void> {
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser && (!excludeUserId || existingUser.id !== excludeUserId)) {
      throw new AppError("Email address is already in use", 409);
    }
  }
  static async add(data: RegisterSchemaType) {
    await this.checkEmailUnique(data.email);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return UserRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  static async update(id: string, data: UpdateUserSchemaType) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (data.email && data.email !== user.email) {
      await this.checkEmailUnique(data.email, id);
    }
    return UserRepository.update(id, data);
  }

  static async delete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return UserRepository.delete(id);
  }

  static async getProfile(userId: string) {
    const user = await this.getById(userId);
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
      images: user.images,
      paymentCards: user.paymentCards,
    };
  }
}
