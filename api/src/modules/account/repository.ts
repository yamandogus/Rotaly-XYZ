import Prisma from "../../config/db";
import { Provider, Account } from "@prisma/client";

export class AccountRepository {
  static async create(
    userId: string,
    provider: Provider,
    providerAccountId: string
  ) {
    return Prisma.account.create({
      data: {
        userId,
        provider,
        providerAccountId,
      },
      include: {
        User: true,
      },
    });
  }
  static async find(provider: Provider, providerAccountId: string) {
    return Prisma.account.findUnique({
      where: {
        provider,
        providerAccountId,
      },
      include: {
        User: true,
      },
    });
  }
  static async findByUserAccount(userId: string) {
    return Prisma.account.findMany({
      where: {
        userId,
      },
    });
  }
  static async delete(providerAccountId: string) {
    return Prisma.account.delete({
      where: {
        providerAccountId,
      },
    });
  }
}
