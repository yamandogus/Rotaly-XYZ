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
