import { apiClient } from "./api";

export const favoritesService = {
  toggleFavorite: async (hotelId: string) => {
    const response = await apiClient.post(`/favorites/toggle/${hotelId}`);
    return response.data;
  },
};
