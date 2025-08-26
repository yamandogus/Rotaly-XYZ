// Message service

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

export const messageService = {
  async sendMessage(messageData: { receiverId: string; content: string }) {
    const response = await axios.post(`${API_BASE_URL}/messages`, messageData, getAuthHeaders());
    return response.data;
  },

  async getMessages(receiverId: string, page: number = 1, limit: number = 50) {
    const response = await axios.get(`${API_BASE_URL}/messages`, {
      ...getAuthHeaders(),
      params: { receiverId, page, limit }
    });
    return response.data;
  },

  async markAsRead(messageIds: string[]) {
    const response = await axios.put(`${API_BASE_URL}/messages/read`, { messageIds }, getAuthHeaders());
    return response.data;
  },

  async editMessage(messageId: string, content: string) {
    const response = await axios.put(`${API_BASE_URL}/messages/${messageId}`, { content }, getAuthHeaders());
    return response.data;
  },

  async deleteMessage(messageId: string) {
    const response = await axios.delete(`${API_BASE_URL}/messages/${messageId}`, getAuthHeaders());
    return response.data;
  }
};
