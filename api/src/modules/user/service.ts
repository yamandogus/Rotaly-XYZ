import { UserRepository } from "./repository";
import {
  RegisterSchemaType,
  UpdateUserSchemaType,
  ChangePasswordSchemaType,
} from "src/dto/auth";
import bcrypt from "bcrypt";
import { AppError } from "src/utils/appError";

const userRepository = new UserRepository();

export class UserService {
  async getAll() {
    const users = await userRepository.findAll();
    if (!users || users.length === 0) {
      throw new AppError("Users not found", 404);
    }
    return users;
  }

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async getByPhone(phone: string) {
    const user = await userRepository.findByPhone(phone);
    if (!user || user.deletedAt) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async checkEmailUnique(email: string, excludeUserId?: string): Promise<void> {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser && (!excludeUserId || existingUser.id !== excludeUserId)) {
      throw new AppError("Email address is already in use", 409);
    }
  }
  async add(data: RegisterSchemaType) {
    await this.checkEmailUnique(data.email);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async update(id: string, data: UpdateUserSchemaType) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (data.email && data.email !== user.email) {
      await this.checkEmailUnique(data.email, id);
    }
    return userRepository.update(id, data);
  }

  async changePassword(id: string, data: ChangePasswordSchemaType) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.newPassword, saltRounds);

    await userRepository.update(id, {
      ...data,
      hashedPassword: hashedPassword,
    });
    return { message: "Password changed successfully" };
  }

  async delete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return userRepository.delete(id);
  }
}
