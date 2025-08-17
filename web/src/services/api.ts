// web/src/lib/api.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const token = "fasfas";
export const api = {
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
      localStorage.setItem("access_token", response.data?.accessToken);
      console.log("if içi");
    }

    return response.data;
  },

  async Logout() {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  },

  async getUserProfile() {
    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
