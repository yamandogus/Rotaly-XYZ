import { Socket } from "socket.io";

export interface AuthenticatedSocket extends Socket {
  userId?: string;
  hotelId?: string;
  role?: string;
}

export interface OnlineUser {
  socketId: string;
  userId?: string;
  role?: string;
  joinedAt: Date;
}

export interface MessageEventData {
  content: string;
  receiverId: string;
  supportId?: string;
  roomId?: string;
  // AI messages are just regular messages with receiverId starting with "ai-assistant"
}

export interface SupportEventData {
  supportId: string;
  userId: string;
  supportRepId?: string;
  subject?: string;
  category?: string;
  status?: "open" | "closed";
  message?: string;
}

export interface SupportAssignmentData {
  supportId: string;
  supportRepId: string;
  userId: string;
}

export interface JoinRoomData {
  roomId: string;
  userId: string;
}

export interface TypingEventData {
  roomId: string;
  userId: string;
  isTyping: boolean;
}

export interface NotificationEventData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}
