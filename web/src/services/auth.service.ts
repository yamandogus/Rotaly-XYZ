import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const authService = {
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

  async logout() {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
      },
    });
    return response.data;
  },

  async getUserProfile() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async verifyEmail(verificationOTP: string) {
    console.log("verify email request data:", verificationOTP);
    console.log("verify email request token:", localStorage.getItem("access_token"));
    const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, { verificationOTP }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  }
};

