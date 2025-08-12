import Prisma from "../../config/db";

export class FavoritesRepository {
  static async getFavorites(userId: string) {
    const favorites = await Prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        hotel: true,
      },
    });
    return favorites;
  }
  static async toggleFavorite(userId: string, hotelId: string) {
    const exist = await Prisma.favorite.findUnique({
      where: {
        userId_hotelId: {
          userId,
          hotelId,
        },
      },
    });
    if (exist) {
      await Prisma.favorite.delete({
        where: {
          id: exist.id,
        },
      });
    }
    return Prisma.favorite.create({
      data: {
        userId,
        hotelId,
      },
    });
  }
}
