import axios, { AxiosResponse } from "axios";
import {
  SupportTicket,
  CreateSupportRequest,
  SupportListResponse,
  AIChat,
  AIChatResponse,
  SupportRepStatistics,
  ApiResponse,
  SupportFilters,
} from "../types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export class SupportService {
  private static readonly BASE_PATH = "/support";

  /**
   * Create a new support ticket
   */
  static async createSupportTicket(
    data: CreateSupportRequest
  ): Promise<SupportTicket> {
    const response: AxiosResponse<ApiResponse<SupportTicket>> = await api.post(
      this.BASE_PATH,
      data
    );
    return response.data.data;
  }

  /**
   * Get support ticket by ID
   */
  static async getSupportTicket(ticketId: string): Promise<SupportTicket> {
    const response: AxiosResponse<ApiResponse<SupportTicket>> = await api.get(
      `${this.BASE_PATH}/${ticketId}`
    );
    return response.data.data;
  }

  /**
   * Get list of support tickets with filters
   */
  static async getSupportTickets(
    filters: SupportFilters
  ): Promise<SupportListResponse> {
    const params = new URLSearchParams();
    params.append("page", filters.page.toString());
    params.append("limit", filters.limit.toString());
    params.append("status", filters.status);

    if (filters.category) {
      params.append("category", filters.category);
    }

    const response: AxiosResponse<ApiResponse<SupportListResponse>> =
      await api.get(`${this.BASE_PATH}?${params.toString()}`);
    return response.data.data;
  }

  /**
   * Close a support ticket
   */
  static async closeSupportTicket(ticketId: string): Promise<SupportTicket> {
    const response: AxiosResponse<ApiResponse<SupportTicket>> = await api.patch(
      `${this.BASE_PATH}/${ticketId}/close`
    );
    return response.data.data;
  }

  /**
   * Get support representative statistics (admin only)
   */
  static async getSupportRepStatistics(): Promise<{
    supportReps: SupportRepStatistics[];
    summary: {
      totalReps: number;
      totalOpenTickets: number;
      averageTicketsPerRep: number;
    };
  }> {
    const response: AxiosResponse<
      ApiResponse<{
        supportReps: SupportRepStatistics[];
        summary: {
          totalReps: number;
          totalOpenTickets: number;
          averageTicketsPerRep: number;
        };
      }>
    > = await api.get(`${this.BASE_PATH}/statistics/reps`);
    return response.data.data;
  }

  /**
   * Send message to AI chat
   */
  static async sendAIChat(data: AIChat): Promise<AIChatResponse> {
    const response: AxiosResponse<ApiResponse<AIChatResponse>> = await api.post(
      `${this.BASE_PATH}/ai-chat`,
      data
    );
    return response.data.data;
  }

  /**
   * Check if AI service is available
   */
  static async checkAIStatus(): Promise<{ available: boolean }> {
    const response: AxiosResponse<ApiResponse<{ available: boolean }>> =
      await api.get(`${this.BASE_PATH}/ai-status`);
    return response.data.data;
  }
}

export default SupportService;
