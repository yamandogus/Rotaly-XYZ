import axios from "axios";
import { authService } from "./auth.service";
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
    // Server-side rendering sırasında localStorage kontrolü
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      // Server-side rendering sırasında localStorage kontrolü
      if (typeof window !== 'undefined') {
        localStorage.removeItem("access_token");
        // Burada login sayfasına yönlendirme yapılabilir
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export async function refreshAccessToken() {
  // Server-side rendering sırasında localStorage tanımlı değil
  if (typeof window === 'undefined') {
    return;
  }
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return;
  try {
    const payload = JSON.parse(
      atob(accessToken.split(".")[1])
    ) as { exp: number };
    const expDate = new Date(payload.exp * 1000); // token bitiş zamanı
    const now = new Date();
    const FIVE_MINUTES = 4 * 60 * 1000; // 1 dakika (ms)
    // Eğer token 4 dk içinde bitecekse yenile
    if (expDate.getTime() - now.getTime() < FIVE_MINUTES) {
      await authService.refreshToken(); // localStorage güncelleniyor
      console.log("Yeni access token alındı (auto refresh).");
    }
  } catch (err) {
    // Token bozuk/base64 decode hatası vs. olursa
    console.error("Access token decode error:", err);
  }
}
export function startTokenRefreshInterval() {
  // Server-side rendering sırasında interval başlatma
  if (typeof window === 'undefined') {
    return null;
  }
  const intervalId = setInterval(() => {
    refreshAccessToken();
    console.log("Access token süresi kontrol edildi.");
  }, 1 * 60 * 1000); // her 1 dakikada bir kontrol
  return intervalId;
}
// Sadece client-side'da çalıştır
if (typeof window !== 'undefined') {
  refreshAccessToken();
  startTokenRefreshInterval();
}
// KULLANIM FAYDALARI:
// 1. Merkezi Konfigürasyon: Tüm API çağrıları için tek yerden ayar
// 2. Otomatik Token Ekleme: Her istekte manuel token eklemeye gerek yok
// 3. Hata Yönetimi: 401 hatalarında otomatik logout
// 4. Kod Tekrarını Önleme: Her serviste aynı axios konfigürasyonu yazmaya gerek yok
// 5. Bakım Kolaylığı: API URL değişikliklerinde tek yerden güncelleme

// API health check
export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/api/health`, {
      timeout: 5000,
    });
    console.log('API Health Check:', response.data);
    return { isHealthy: true, data: response.data };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; response?: { status?: number; statusText?: string } };
    console.error('API Health Check Failed:', error);
    return { 
      isHealthy: false, 
      error: err.message || 'Unknown error',
      details: {
        code: err.code,
        status: err.response?.status,
        statusText: err.response?.statusText,
      }
    };
  }
};