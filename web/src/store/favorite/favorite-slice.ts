import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/services/api";

interface Hotel {
  id: string;
  name: string;
  description?: string;
  location: string;
  address: string;
  city: string;
  country: string;
  rating?: number;
  type: string;
  images?: Array<{ id: string; url: string }>;
}

interface Favorite {
  id: string;
  userId: string;
  hotelId: string;
  hotel: Hotel;
  createdAt: string;
}

interface FavoriteState {
  items: Favorite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk
export const toggleFavoriteAsync = createAsyncThunk<
  Favorite | string, // Fulfilled payload tipi
  { hotelId: string; hotel: Hotel; userId: string }, // Arg tipi
  { rejectValue: string }
>(
  "favorite/toggleFavorite",
  async ({ hotelId, hotel, userId }, { dispatch, rejectWithValue }) => {
    dispatch(favoriteSlice.actions.toggleFavorite({ hotelId, hotel, userId })); // İyimser güncelleme

    try {
      const response = await api.toggleFavorite(hotelId);
      if (response.data.action === "added") {
        return response.data.favorite; // Sunucudan gelen gerçek favori nesnesi
      } else {
        return hotelId; // Favoriden kaldırıldığını belirtmek için hotelId
      }
    } catch (error: unknown) {
      // Tip güvenli hata işleme
      let message = "Bilinmeyen bir hata oluştu";

      if (error instanceof Error) {
        message = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
      ) {
        message = (error as { response: { data: { message: string } } }).response.data.message;
      }

      dispatch(favoriteSlice.actions.setError(message));
      dispatch(favoriteSlice.actions.removeFavorite(hotelId));
      return rejectWithValue(message);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<{ hotelId: string; hotel: Hotel; userId: string }>) => {
      const { hotelId, hotel, userId } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.hotelId === hotelId);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        const newFavorite: Favorite = {
          id: `temp-${Date.now()}`,
          userId,
          hotelId,
          hotel,
          createdAt: new Date().toISOString(),
        };
        state.items.push(newFavorite);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;

        if (typeof action.payload === "string") {
          // payload string ise favoriden kaldır
          state.items = state.items.filter((item) => item.hotelId !== action.payload);
        } else {
          // payload Favorite ise favori ekle/güncelle
          const favorite = action.payload;
          const existingIndex = state.items.findIndex((item) => item.hotelId === favorite.hotelId);
          if (existingIndex !== -1) {
            state.items[existingIndex] = favorite;
          } else {
            state.items.push(favorite);
          }
        }
      })
      .addCase(toggleFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Favori toggling başarısız oldu";
      });
  },
});

export const { setLoading, setError, setFavorites, addFavorite, removeFavorite, toggleFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;

// Selector’lar
export const selectFavorites = (state: { favorites: FavoriteState }) => state.favorites.items;
export const selectFavoritesLoading = (state: { favorites: FavoriteState }) => state.favorites.loading;
export const selectFavoritesError = (state: { favorites: FavoriteState }) => state.favorites.error;
export const selectIsFavorite = (hotelId: string) => (state: { favorites: FavoriteState }) =>
  state.favorites.items.some((item) => item.hotelId === hotelId);
