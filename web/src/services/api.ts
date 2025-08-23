

import axios from "axios";

// API temel URL'i - environment variable'dan alır, yoksa localhost kullanır
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Token refresh için global değişkenler
let refreshTimeout: NodeJS.Timeout | null = null;
let isRefreshing = false;

// JWT token'dan expiry time çıkarma fonksiyonu
const getTokenExpiryTime = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Unix timestamp'i milisaniyeye çevir
  } catch (error: unknown) {
    console.log("error", error);
    return 0;
  }
};

// Token refresh fonksiyonu
const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // Yeni tokenları localStorage'a kaydet
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", newRefreshToken);

    return accessToken;
  } catch (error) {
    // Refresh token da geçersizse logout yap
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("hotelName");
    
    // Login sayfasına yönlendir
    window.location.href = "/login";
    throw error;
  }
};

// Otomatik token refresh zamanlayıcısı
const scheduleTokenRefresh = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return;

  const expiryTime = getTokenExpiryTime(accessToken);
  const now = Date.now();
  const timeUntilExpiry = expiryTime - now;

  // Token'ın 2 dakika öncesinde refresh et (13. dakikada)
  const refreshTime = Math.max(timeUntilExpiry - (2 * 60 * 1000), 1000);

  // Önceki timeout'u temizle
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  refreshTimeout = setTimeout(async () => {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshToken();
        console.log("Token otomatik olarak yenilendi");
        // Yeni token için tekrar zamanla
        scheduleTokenRefresh();
      } catch (error) {
        console.error("Token refresh hatası:", error);
      } finally {
        isRefreshing = false;
      }
    }
  }, refreshTime);
};

// Axios instance oluşturma
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Fallback olarak 401 durumunda da refresh yap
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 hatası ve henüz retry yapılmamışsa (fallback)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("hotelName");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Login sonrası token refresh zamanlamasını başlat
export const startTokenRefresh = () => {
  scheduleTokenRefresh();
};


// Logout sonrası token refresh zamanlamasını durdur
export const stopTokenRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
  isRefreshing = false;
};

export default apiClient;


