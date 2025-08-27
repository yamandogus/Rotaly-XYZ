// Payment service

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const paymentService = {
  async getUserPaymentCards() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/payments/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // API response yapısı: { success: true, data: { cards: [], pagination: {} } }
    return response.data.data?.cards || [];
  },

  async addPaymentCard(cardData: {
    cardNumber: string;
    cardHolderName: string;
    expiryDate: string;
    cvv: string;
  }) {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${API_BASE_URL}/payments/cards`, cardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // API response yapısı: { success: true, data: {...} }
    return response.data.data;
  },

  async updatePaymentCard(cardId: string, cardData: {
    cardHolderName?: string;
    expiryDate?: string;
  }) {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${API_BASE_URL}/payments/cards/${cardId}`, cardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // API response yapısı: { success: true, data: {...} }
    return response.data.data;
  },

  async deletePaymentCard(cardId: string) {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${API_BASE_URL}/payments/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async getDefaultPaymentCard() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/payments/cards/default`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },

  async getPaymentCardStats() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/payments/cards/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },
};
