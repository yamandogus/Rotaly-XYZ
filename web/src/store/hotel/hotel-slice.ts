import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { hotelService } from "../../services/hotel.service";
import { CreateHotelInput, QueryHotelInput } from "@api/dto/hotel";

// Tip tanımlamaları
export interface Hotel {
  id: string;
  name: string;
  description?: string;
  checkIn: string;
  checkOut: string;
  location: string;
  address: string;
  city: string;
  country: string;
  rating?: number;
  discountRate?: number;
  isDiscounted: boolean;
  discountStartDate?: string;
  discountEndDate?: string;
  type: string; // HotelType enum'ı yerine şimdilik string
  ownerId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface HotelState {
  hotels: Hotel[];
  isLoading: boolean;
  error: string | null;
  selectedHotel: Hotel | null;
}

const initialState: HotelState = {
  hotels: [],
  isLoading: false,
  error: null,
  selectedHotel: null,
};

// Asenkron thunk'lar
export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async (queryParams: QueryHotelInput, { rejectWithValue }) => {
    try {
      const response = await hotelService.getHotels(queryParams);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createHotel = createAsyncThunk(
  "hotel/createHotel",
  async (hotelData: CreateHotelInput, { rejectWithValue }) => {
    try {
      const response = await hotelService.createHotel(hotelData);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      return rejectWithValue(errorMessage);
    }
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setSelectedHotel: (state, action: PayloadAction<Hotel | null>) => {
      state.selectedHotel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<Hotel[]>) => {
        state.isLoading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createHotel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state, action: PayloadAction<Hotel>) => {
        state.isLoading = false;
        state.hotels.push(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
