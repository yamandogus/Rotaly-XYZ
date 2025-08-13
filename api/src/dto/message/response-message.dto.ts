export interface MessageResponseDto {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  supportId?: string;
  createdAt: Date;
  readAt?: Date;
  isFromAI: boolean;
  senderInfo?: {
    name: string;
    surname: string;
  };
}

export interface MessagesListResponseDto {
  messages: MessageResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ConversationResponseDto {
  participantId: string; // partner
  participantName: string;
  isAI: boolean;
  lastMessage?: {
    content: string;
    createdAt: Date;
    isRead: boolean;
  };
  unreadCount: number;
}
