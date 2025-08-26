// Support service

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

export const supportService = {
  async createSupportTicket(supportData: { subject: string; message: string; priority?: 'LOW' | 'MEDIUM' | 'HIGH' }) {
    const response = await axios.post(`${API_BASE_URL}/support`, supportData, getAuthHeaders());
    return response.data;
  },

  async getSupportTickets(page: number = 1, limit: number = 20) {
    const response = await axios.get(`${API_BASE_URL}/support`, {
      ...getAuthHeaders(),
      params: { page, limit }
    });
    return response.data;
  },

  async getSupportTicketById(ticketId: string) {
    const response = await axios.get(`${API_BASE_URL}/support/${ticketId}`, getAuthHeaders());
    return response.data;
  },

  async closeSupportTicket(ticketId: string) {
    const response = await axios.put(`${API_BASE_URL}/support/${ticketId}/close`, {}, getAuthHeaders());
    return response.data;
  },

  async sendAIMessage(message: string) {
    const response = await axios.post(`${API_BASE_URL}/support/ai-chat`, { message }, getAuthHeaders());
    return response.data;
  }
};
