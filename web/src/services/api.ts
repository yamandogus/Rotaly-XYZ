
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

// KULLANIM FAYDALARI:
// 1. Merkezi Konfigürasyon: Tüm API çağrıları için tek yerden ayar
// 2. Otomatik Token Ekleme: Her istekte manuel token eklemeye gerek yok
// 3. Hata Yönetimi: 401 hatalarında otomatik logout
// 4. Kod Tekrarını Önleme: Her serviste aynı axios konfigürasyonu yazmaya gerek yok
// 5. Bakım Kolaylığı: API URL değişikliklerinde tek yerden güncelleme

