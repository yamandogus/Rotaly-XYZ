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

    // handle support room messages
    if (data.supportId) {
      const supportRoom = `support:${data.supportId}`;
      socket.to(supportRoom).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    // handle direct user messages
    if (data.receiverId) {
      const userRoom = `user:${data.receiverId}`;
      socket.to(userRoom).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    // Handle AI chat messages
    if (data.receiverId && data.receiverId.startsWith("ai-assistant")) {
      const aiChatRoom = `ai-chat:${socket.userId}`;
      socket.to(aiChatRoom).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    // Handle general room messages
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
    data: { messageId: string; roomId?: string; supportId?: string }
  ): void {
    console.log(`Message deleted by ${socket.id}:`, data.messageId);

    if (data.roomId) {
      socket.to(data.roomId).emit("messageDeleted", {
        messageId: data.messageId,
        deletedBy: socket.userId,
        timestamp: new Date(),
      });
    }

    if (data.supportId) {
      const supportRoom = `support:${data.supportId}`;
      socket.to(supportRoom).emit("messageDeleted", {
        messageId: data.messageId,
        deletedBy: socket.userId,
        timestamp: new Date(),
      });
    }
  }

  // support-specific methods
  handleJoinSupportRoom(socket: AuthenticatedSocket, supportId: string): void {
    const supportRoom = `support:${supportId}`;
    console.log(`User ${socket.id} joining support room: ${supportRoom}`);

    socket.join(supportRoom);
    socket.to(supportRoom).emit("userJoinedSupportRoom", {
      userId: socket.userId,
      supportId,
      socketId: socket.id,
      timestamp: new Date(),
    });

    console.log(`User ${socket.id} joined support room ${supportRoom}`);
  }

  handleLeaveSupportRoom(socket: AuthenticatedSocket, supportId: string): void {
    const supportRoom = `support:${supportId}`;
    console.log(`User ${socket.id} leaving support room: ${supportRoom}`);

    socket.leave(supportRoom);
    socket.to(supportRoom).emit("userLeftSupportRoom", {
      userId: socket.userId,
      supportId,
      socketId: socket.id,
      timestamp: new Date(),
    });

    console.log(`User ${socket.id} left support room ${supportRoom}`);
  }

  // AI chat specific methods
  handleJoinAIChatRoom(socket: AuthenticatedSocket): void {
    const aiChatRoom = `ai-chat:${socket.userId}`;
    console.log(`User ${socket.id} joining AI chat room: ${aiChatRoom}`);

    socket.join(aiChatRoom);

    console.log(`User ${socket.id} joined AI chat room ${aiChatRoom}`);
  }

  handleLeaveAIChatRoom(socket: AuthenticatedSocket): void {
    const aiChatRoom = `ai-chat:${socket.userId}`;
    console.log(`User ${socket.id} leaving AI chat room: ${aiChatRoom}`);

    socket.leave(aiChatRoom);

    console.log(`User ${socket.id} left AI chat room ${aiChatRoom}`);
  }

  // method to emit AI response to user
  emitAIResponse(userId: string, message: any): void {
    const aiChatRoom = `ai-chat:${userId}`;
    const userRoom = `user:${userId}`;

    // emit to both AI chat room and user's personal room
    this.io.to(aiChatRoom).emit("aiResponse", {
      ...message,
      isFromAI: true,
      timestamp: new Date(),
    });

    this.io.to(userRoom).emit("newMessage", {
      ...message,
      isFromAI: true,
      timestamp: new Date(),
    });
  }

  // method to emit support assignment notification
  emitSupportAssignment(
    supportId: string,
    supportRepId: string,
    userId: string
  ): void {
    const supportRoom = `support:${supportId}`;

    this.io.to(supportRoom).emit("supportRepAssigned", {
      supportId,
      supportRepId,
      timestamp: new Date(),
    });

    // notify both user and support rep
    this.io.to(`user:${userId}`).emit("supportRepAssigned", {
      supportId,
      supportRepId,
      timestamp: new Date(),
    });

    this.io.to(`user:${supportRepId}`).emit("newSupportAssignment", {
      supportId,
      userId,
      timestamp: new Date(),
    });
  }
}
