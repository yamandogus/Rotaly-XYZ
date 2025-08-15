import { Server as SocketServer } from "socket.io";
import {
  AuthenticatedSocket,
  MessageEventData,
  JoinRoomData,
} from "../types/socket.types";

export class MessageHandler {
  constructor(private io: SocketServer) {}

  handleJoinRoom(socket: AuthenticatedSocket, data: JoinRoomData): void {
    console.log(`User ${socket.id} joining room: ${data.roomId}`);

    socket.join(data.roomId);
    socket.to(data.roomId).emit("userJoinedRoom", {
      userId: data.userId,
      socketId: socket.id,
      timestamp: new Date(),
    });

    console.log(`User ${socket.id} joined room ${data.roomId}`);
  }

  handleLeaveRoom(socket: AuthenticatedSocket, roomId: string): void {
    console.log(`User ${socket.id} leaving room: ${roomId}`);

    socket.leave(roomId);
    socket.to(roomId).emit("userLeftRoom", {
      userId: socket.userId,
      socketId: socket.id,
      timestamp: new Date(),
    });

    console.log(`User ${socket.id} left room ${roomId}`);
  }

  handleNewMessage(socket: AuthenticatedSocket, data: MessageEventData): void {
    console.log(`New message from ${socket.id}:`, data);

    if (data.supportId) {
      const supportRoom = `support:${data.supportId}`;
      socket.to(supportRoom).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    if (data.receiverId) {
      const userRoom = `user:${data.receiverId}`;
      socket.to(userRoom).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    if (data.roomId) {
      socket.to(data.roomId).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    console.log(`Message sent from ${socket.id}`);
  }

  handleMessageRead(
    socket: AuthenticatedSocket,
    data: { messageIds: string[]; userId: string }
  ): void {
    console.log(`Messages marked as read by ${socket.id}:`, data.messageIds);

    socket.to(`user:${data.userId}`).emit("messagesRead", {
      messageIds: data.messageIds,
      readBy: socket.userId,
      timestamp: new Date(),
    });
  }

  handleMessageDelete(
    socket: AuthenticatedSocket,
    data: { messageId: string; roomId?: string }
  ): void {
    console.log(`Message deleted by ${socket.id}:`, data.messageId);

    if (data.roomId) {
      socket.to(data.roomId).emit("messageDeleted", {
        messageId: data.messageId,
        deletedBy: socket.userId,
        timestamp: new Date(),
      });
    }
  }
}
