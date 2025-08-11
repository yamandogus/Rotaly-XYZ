import { AccountRepository } from "./repository";
import { UserRepository } from "../user/repository";
import { Provider } from "@prisma/client";

export class AccountService {
  static async findOrCreate(
    email: string,
    provider: Provider,
    providerAccountId: string
  ) {
    const account = await AccountRepository.find(provider, providerAccountId);
    if (account) return account.User;

    const user = await UserRepository.findByEmail(email);
    let newUser;
    if (!user) {
      newUser = await UserRepository.create({
        name: "",
        surname: "",
        email,
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      return newUser;
    }

    await AccountRepository.create(newUser.id, provider, providerAccountId);
    return newUser;
  }
  static async findByUserId(userId: string) {
    return AccountRepository.findByUserAccount(userId);
  }
}
