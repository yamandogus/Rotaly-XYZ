// Chat Types
export interface ChatMessage {
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
  ticketCreated?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error?: string;
}

export interface ConversationInfo {
  participantId: string;
  participantName: string;
  isAI: boolean;
  lastMessage?: {
    content: string;
    createdAt: Date;
    isRead: boolean;
  };
  unreadCount: number;
}

export interface AIResponse {
  content: string;
  shouldCreateTicket: boolean;
  suggestedCategory?: string;
  escalationReason?: string;
}

export interface SendMessageData {
  content: string;
  receiverId: string;
  supportId?: string;
}

export interface MarkAsReadData {
  messageIds: string[];
}

export interface MessagePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MessagesResponse {
  messages: ChatMessage[];
  pagination: MessagePagination;
}
