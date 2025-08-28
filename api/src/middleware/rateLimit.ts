import rateLimit from "express-rate-limit";

// Global rate limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına maksimum istek sayısı
  message: {
    status: "error",
    message: "Too many requests, please try again later..",
  },
  standardHeaders: true, // RateLimit-* header'larını döndür
  legacyHeaders: false, // X-RateLimit-* header'larını döndürme
});

// Auth rate limiter (login/register için)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına maksimum istek sayısı
  message: {
    status: "error",
    message:
      "Too many login requests, please try again in 15 minutes or contact the admin.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Şifre sıfırlama için limit
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 saat
  max: 3, // Saatte maksimum 3 şifre sıfırlama isteği
  message: {
    status: "error",
    message: "Too many password reset attempts. Please try again later.",
  },
});

// OTP istekleri için limit ekleyin
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 15 dakikada maksimum 5 OTP isteği
  message: {
    status: "error",
    message: "Too many OTP requests. Please wait before requesting a new code.",
  },
});

// Admin işlemleri için limit
export const adminActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 50, // 15 dakikada maksimum 50 istek
  message: {
    status: "error",
    message: "Too many admin requests. Please try again later.",
  },
});

// Kullanıcı arama işlemleri için limit
export const userSearchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 dakika
  max: 30, // 5 dakikada maksimum 30 arama
  message: {
    status: "error",
    message: "Too many search requests. Please try again later.",
  },
});
