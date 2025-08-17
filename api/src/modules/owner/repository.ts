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
    return Prisma.hotel.findFirst({
      where: {
        ownerId: ownerId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });
  }
}
