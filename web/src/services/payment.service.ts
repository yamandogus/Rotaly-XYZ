// Payment service

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const paymentService = {
  async getUserPaymentCards() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_BASE_URL}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.paymentCards || [];
  },

  async addPaymentCard(cardData: {
    cardNumber: string;
    cardHolderName: string;
    expiryDate: string;
    cvv: string;
  }) {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(`${API_BASE_URL}/payment/cards`, cardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async updatePaymentCard(cardId: string, cardData: {
    cardNumber?: string;
    cardHolderName?: string;
    expiryDate?: string;
    cvv?: string;
  }) {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${API_BASE_URL}/payment/cards/${cardId}`, cardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async deletePaymentCard(cardId: string) {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${API_BASE_URL}/payment/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
