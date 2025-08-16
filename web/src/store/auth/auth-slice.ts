import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth-types";

// Basit User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  tokens: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // User bilgisini set et
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    // User'ı temizle (logout için)
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokens = [];
      state.error = null;
    },

    // Token'ları set et
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    // Token'ları temizle
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
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
  setTokens,
  clearTokens,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;