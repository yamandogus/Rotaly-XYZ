import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./auth-types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // User bilgisini set et
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },

    // User'ı temizle (logout için)
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },

    // Loading durumu
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error set et
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Error temizle
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;