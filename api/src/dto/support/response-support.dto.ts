import { SupportCategory } from "@prisma/client";

export interface SupportResponseDto {
  id: string;
  subject: string;
  body: string;
  category: SupportCategory;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date | null;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
  supportRep?: {
    id: string;
    name: string;
    surname: string;
  } | null;
  messageCount: number;
  lastMessage?: {
    content: string;
    createdAt: Date;
    senderId: string;
  } | null;
}

export interface SupportListResponseDto {
  supports: SupportResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
