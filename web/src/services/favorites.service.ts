import { apiClient } from "./api";

export const favoritesService = {
  getFavorites: async () => {
    const response = await apiClient.get('/favorites');
    return response.data;
  },
  
  toggleFavorite: async (hotelId: string) => {
    const response = await apiClient.post(`/favorites/${hotelId}`);
    return response.data;
  },
};
