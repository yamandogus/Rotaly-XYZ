import Prisma from "../../config/db";
import { UpdateUserSchema, registerSchema } from "src/dto/auth";

export class UserRepository {
  async findByEmail(email: string) {
    return Prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
