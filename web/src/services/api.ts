// web/src/services/api.ts
import axios from "axios";

// API temel URL'i - environment variable'dan alır, yoksa localhost kullanır
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Axios instance oluşturma - tüm API çağrıları için merkezi konfigürasyon
// Bu sayede her serviste ayrı ayrı axios import etmeye gerek kalmaz
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her API isteğinde otomatik olarak auth token ekler
// Bu sayede her serviste manuel olarak token eklemeye gerek kalmaz
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

// Response interceptor - API yanıtlarında hata yönetimi yapar
// 401 hatası durumunda otomatik olarak token'ı siler ve kullanıcıyı logout yapar
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      // Burada login sayfasına yönlendirme yapılabilir
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API servisleri
export const api = {
  async register(userData: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) {
    const response = await apiClient.post(
      `/auth/register`,
      userData
    );
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await apiClient.post(`/auth/login`, data);
    console.log("giriş isteği verisi:", data);
    console.log("giriş yanıtı verisi:", response.data);
    const accessToken = response.data?.data?.accessToken;
    console.log(accessToken);
    if (response.data?.data?.accessToken) {
      localStorage.setItem("access_token", response.data?.accessToken);
      console.log("if içi");
    }
    return response.data;
  },

  async Logout() {
    const response = await apiClient.post(`/auth/logout`);
    return response.data;
  },

  async getUserProfile() {
    const response = await apiClient.get(`/auth/profile`);
    return response.data;
  },

  async toggleFavorite(hotelId: string) {
    const response = await apiClient.post(
      `/favorite/toggle`,
      { hotelId }
    );
    return response.data;
  },
};
