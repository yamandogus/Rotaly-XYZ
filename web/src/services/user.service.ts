// User service

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const userService = {
  async getUserProfile() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  
  async updateProfile(userData: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  }) {
    const response = await axios.put(`${API_BASE_URL}/auth/update-profile`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  async updateProfileImage(image: string) {
    const response = await axios.put(`${API_BASE_URL}/auth/update-profile-image`, {image}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  async deleteUser(userId: string) {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  async getUserById(userId: string) {
    const response = await axios.get(`${API_BASE_URL}/users/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
};
