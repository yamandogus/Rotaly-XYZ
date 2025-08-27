// Reservation service

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const reservationService = {
  async getUserReservations(userId?: string, page = 1, limit = 10) {
    const token = localStorage.getItem("access_token");
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (userId) {
      params.append("userId", userId);
    }

    const response = await axios.get(`${API_BASE_URL}/reservations?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async getReservationById(id: string) {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async createReservation(reservationData: {
    userId: string;
    roomId: string;
    startDate: string;
    endDate: string;
    guests: number;
    totalPrice: number;
    paymentMethod: string;
    hotelAddress: string;
    userPhone: string;
    specialRequest?: string;
    paymentCardId?: string;
  }) {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async updateReservation(id: string, updateData: Record<string, unknown>) {
    const token = localStorage.getItem("access_token");
    const response = await axios.patch(`${API_BASE_URL}/reservations/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async deleteReservation(id: string) {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${API_BASE_URL}/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
