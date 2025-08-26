import axios, { AxiosResponse } from "axios";
import {
  SupportTicket,
  CreateSupportRequest,
  SupportListResponse,
  SupportRepStatistics,
  ApiResponse,
  SupportFilters,
  Message,
  CreateMessageRequest,
} from "@/types/support";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export class SupportService {
  private static readonly BASE_PATH = "/support";

  /**
   * Get current user role from localStorage
   */
  private static getCurrentUserRole(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole");
    }
    return null;
  }

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
   * Get messages for a support ticket
   */
  static async getTicketMessages(ticket: SupportTicket): Promise<Message[]> {
    // Determine receiverId based on current user role and ticket info
    const currentUserRole = this.getCurrentUserRole();
    let receiverId: string;

    if (
      currentUserRole === "CUSTOMER" ||
      currentUserRole === "HOTEL" ||
      currentUserRole === "USER"
    ) {
      // If customer is logged in, receiverId should be the support rep ID
      receiverId = ticket.supportRep?.id || ticket.user.id; // Fallback to user's own ID if no support rep
    } else if (currentUserRole === "SUPPORT" || currentUserRole === "ADMIN") {
      // If support rep is logged in, receiverId should be the customer's ID
      receiverId = ticket.user.id;
    } else {
      // Fallback to the user ID from the ticket
      receiverId = ticket.user.id;
    }

    const response: AxiosResponse<ApiResponse<{ messages: Message[] }>> =
      await api.get(
        `/messages?supportId=${ticket.id}&receiverId=${receiverId}`
      );
    return response.data.data.messages;
  }

  /**
   * Send a message to a support ticket
   */
  static async sendMessage(
    data: CreateMessageRequest & { ticket: SupportTicket }
  ): Promise<Message> {
    // Determine receiverId based on current user role and ticket info
    const currentUserRole = this.getCurrentUserRole();
    let receiverId: string;

    if (
      currentUserRole === "CUSTOMER" ||
      currentUserRole === "HOTEL" ||
      currentUserRole === "USER"
    ) {
      // If customer is logged in, receiverId should be the support rep ID
      receiverId = data.ticket.supportRep?.id || data.ticket.user.id; // Fallback to user's own ID if no support rep
    } else if (currentUserRole === "SUPPORT" || currentUserRole === "ADMIN") {
      // If support rep is logged in, receiverId should be the customer's ID
      receiverId = data.ticket.user.id;
    } else {
      // Fallback to the user ID from the ticket
      receiverId = data.ticket.user.id;
    }

    console.log("Sending message with data:", {
      content: data.content,
      receiverId: receiverId,
      supportId: data.supportId,
    });

    try {
      const response: AxiosResponse<ApiResponse<Message>> = await api.post(
        "/messages/send",
        {
          content: data.content,
          receiverId: receiverId,
          supportId: data.supportId,
        }
      );
      return response.data.data;
    } catch (error: any) {
      console.error("Send message error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        requestData: {
          content: data.content,
          receiverId: receiverId,
          supportId: data.supportId,
        },
      });
      throw error;
    }
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
