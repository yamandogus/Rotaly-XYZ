import { AdminRepository } from "./repository";
import { UpdateUserSchemaType } from "../../dto/auth";
import { UserService } from "../user/service";

export class AdminService {
  static async getAllUsers() {
    const users = await UserService.getAll();
    return users;
  }
}
