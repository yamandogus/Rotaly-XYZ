import { UserRepository } from "./repository";
import { RegisterSchemaType, UpdateUserSchemaType } from "src/dto/auth";
import bcrypt from "bcrypt";

const userRepository = new UserRepository();

export class UserService {
  async getAll() {
    const users = await userRepository.findAll();
    if (!users || users.length === 0) {
      throw new Error("Users not found");
    }
    return users;
  }

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new Error("User not found");
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || user.deletedAt) {
      throw new Error("User not found");
    }
    return user;
  }

  async getByPhone(phone: string) {
    const user = await userRepository.findByPhone(phone);
    if (!user || user.deletedAt) {
      throw new Error("User not found");
    }
    return user;
  }

  async add(data: RegisterSchemaType) {
    const user = await this.getByEmail(data.email);
    if (user) {
      throw new Error("User already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return userRepository.create({ ...data, password: hashedPassword });
  }

  async update(id: string, data: UpdateUserSchemaType) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (data.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      return userRepository.update(id, { ...data, password: hashedPassword });
    }

    return userRepository.update(id, data);
  }

  async delete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.delete(id);
  }
}
