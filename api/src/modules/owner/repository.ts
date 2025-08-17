import Prisma from "../../config/db";
import { updateOwnerProfileDto } from "../../dto/owner/update-owner-profile.dto";

export class OwnerRepository {
  static async updateOwnerProfile(id: string, data: updateOwnerProfileDto) {
    return Prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }
  static async getProfile(ownerId: string) {
    //  companydto kullanılcak
  }
}
