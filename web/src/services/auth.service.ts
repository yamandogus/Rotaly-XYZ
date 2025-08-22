import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const authService = {
  // kayıt işlemleri
  async register(userData: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );

    return response.data;
  },
  // giriş işlemleri
  async login(data: { email: string; password: string }) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);

    console.log("login request data:", data);
    console.log("login response data:", response.data);

    const accessToken = response.data?.data?.accessToken;
    console.log(accessToken);
    

    if (response.data?.data?.accessToken) {
      localStorage.setItem("access_token", response.data?.data?.accessToken);
      console.log("if içi");
    }

    if(response.data.data?.refreshToken){
      localStorage.setItem("refresh_token", response.data?.data?.refreshToken);
    }

    return response.data;
  },
  // çıkış işlemleri
  async logout() {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      // LocalStorage'ı temizle
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("hotelName");
      
      return response.data;
    } catch (error) {
      // Hata olsa bile localStorage'ı temizle
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("hotelName");
      throw error;
    }
  },
  // profile işlemleri

  // email doğrulama işlemleri
  async verifyEmail(verificationOTP: string) {
    console.log("verify email request data:", verificationOTP);
    console.log("verify email request token:", localStorage.getItem("access_token"));
    const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, { verificationOTP }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
  // email doğrulama işlemleri
  async resendVerificationEmail(email: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/resend-verification-email`, { email });
    return response.data;
  },
  // profil resmi güncelleme işlemleri
 
  // profil güncelleme işlemleri

  // hesap silme işlemleri
  async deleteAccount() {
    const response = await axios.delete(`${API_BASE_URL}/auth/delete-account`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
  // şifremi unuttum işlemleri
  async forgotPassword(email: string) {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return response.data;
  },
  // şifre değiştirme işlemleri
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }) {
    const response = await axios.post(`${API_BASE_URL}/auth/change-password`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
};

