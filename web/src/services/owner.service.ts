// Owner service

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

interface UpdateOwnerProfileDto {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  address?: string;
}

export const ownerService = {
  async getOwnerProfile() {
    const response = await axios.get(`${API_BASE_URL}/owner/profile`, getAuthHeaders());
    return response.data;
  },

  async updateOwnerProfile(profileData: UpdateOwnerProfileDto) {
    const response = await axios.put(`${API_BASE_URL}/owner/profile`, profileData, getAuthHeaders());
    return response.data;
  },

  async getOwnerHotels() {
    const response = await axios.get(`${API_BASE_URL}/owner/hotels`, getAuthHeaders());
    return response.data;
  },

  async getOwnerReservations(page: number = 1, limit: number = 20) {
    const response = await axios.get(`${API_BASE_URL}/owner/reservations`, {
      ...getAuthHeaders(),
      params: { page, limit }
    });
    return response.data;
  },

  async getOwnerEarnings() {
    const response = await axios.get(`${API_BASE_URL}/owner/earnings`, getAuthHeaders());
    return response.data;
  },

  async getOwnerStatistics() {
    const response = await axios.get(`${API_BASE_URL}/owner/statistics`, getAuthHeaders());
    return response.data;
  }
};
