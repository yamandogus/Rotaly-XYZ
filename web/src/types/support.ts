export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: "CUSTOMER" | "SUPPORT" | "ADMIN";
}

export interface SupportTicket {
  id: string;
  subject: string;
  body: string;
  category: SupportCategory;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  user: User;
  supportRep?: User;
  messageCount: number;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  createdAt: string;
  supportId?: string;
}

export enum SupportCategory {
  TECHNICAL = "TECHNICAL",
  BILLING = "BILLING",
  RESERVATION = "RESERVATION",
  GENERAL = "GENERAL",
  COMPLAINT = "COMPLAINT",
  FEATURE_REQUEST = "FEATURE_REQUEST",
  SECURITY = "SECURITY",
  OTHER = "OTHER",
}

export interface CreateSupportRequest {
  subject: string;
  body: string;
  category: SupportCategory;
}

export interface SupportListResponse {
  supports: SupportTicket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SupportRepStatistics {
  id: string;
  name: string;
  surname: string;
  email: string;
  openTickets: number;
  totalTickets: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type SupportStatus = "open" | "closed" | "all";

export interface SupportFilters {
  page: number;
  limit: number;
  status: SupportStatus;
  category?: SupportCategory;
}

export interface CreateMessageRequest {
  content: string;
  supportId: string;
}
