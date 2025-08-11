import { FavoritesRepository } from "./repository";

export class FavoritesService {
  static async getFavorites(userId: string) {
    const favorites = await FavoritesRepository.getFavorites(userId);
    return favorites;
  }
  static async toggleFavorite(userId: string, hotelId: string) {
    const favorite = await FavoritesRepository.toggleFavorite(userId, hotelId);
    return favorite;
  }
}
