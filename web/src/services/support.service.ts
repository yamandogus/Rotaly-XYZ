// Support service

import axios from "axios";
import {
  CreateSupportTicketData,
  SupportListResponse,
  SupportTicketWithMessages,
} from "@/types/support";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const supportService = {
  async createSupportTicket(supportData: CreateSupportTicketData) {
    const response = await axios.post(
      `${API_BASE_URL}/support`,
      supportData,
      getAuthHeaders()
    );
    return response.data;
  },

  async getSupportTickets(
    page: number = 1,
    limit: number = 20,
    status: "open" | "closed" | "all" = "all"
  ): Promise<SupportListResponse> {
    const response = await axios.get(`${API_BASE_URL}/support`, {
      ...getAuthHeaders(),
      params: { page, limit, status },
    });
    return response.data.data;
  },

  async getSupportTicketById(
    ticketId: string
  ): Promise<SupportTicketWithMessages> {
    const response = await axios.get(
      `${API_BASE_URL}/support/${ticketId}`,
      getAuthHeaders()
    );
    return response.data.data;
  },

  async closeSupportTicket(ticketId: string) {
    const response = await axios.patch(
      `${API_BASE_URL}/support/${ticketId}/close`,
      {},
      getAuthHeaders()
    );
    return response.data;
  },

  async sendMessageToTicket(ticketId: string, content: string) {
    const response = await axios.post(
      `${API_BASE_URL}/support/${ticketId}/messages`,
      {
        content,
      },
      getAuthHeaders()
    );
    return response.data;
  },

  async sendAIMessage(message: string, conversationHistory?: unknown[]) {
    const response = await axios.post(
      `${API_BASE_URL}/support/ai-chat`,
      {
        message,
        conversationHistory,
      },
      getAuthHeaders()
    );
    return response.data;
  },

  async checkAIStatus() {
    const response = await axios.get(`${API_BASE_URL}/support/ai-status`);
    return response.data;
  },
};
