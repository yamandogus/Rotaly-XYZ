import { Server as SocketServer } from "socket.io";
import {
  AuthenticatedSocket,
  MessageEventData,
  JoinRoomData,
  TypingEventData,
} from "../types/socket.types";
import { TypingHandler } from "./typing.handler";

export class MessageHandler {
  constructor(
    private io: SocketServer,
    private typingHandler?: TypingHandler
  ) {}

  handleJoinRoom(socket: AuthenticatedSocket, data: JoinRoomData): void {
    console.log(`🏠 JOIN_ROOM Event received:`);
    console.log(`   - Socket ID: ${socket.id}`);
    console.log(`   - Socket userId: ${socket.userId}`);
    console.log(`   - Data:`, data);
    console.log(`   - Room ID: ${data.roomId}`);

    socket.join(data.roomId);

    console.log(`User ${socket.id} joined room: ${data.roomId}`);
    socket.to(data.roomId).emit("userJoinedRoom", {
      userId: data.userId,
      socketId: socket.id,
      timestamp: new Date(),
    });

    console.log(`User ${socket.id} successfully joined room ${data.roomId}`);
  }

  handleLeaveRoom(socket: AuthenticatedSocket, roomId: string): void {
    console.log(`🚪 LEAVE_ROOM Event received:`);
    console.log(`   - Socket ID: ${socket.id}`);
    console.log(`   - Socket userId: ${socket.userId}`);
    console.log(`   - Room ID: ${roomId}`);
    console.log(`   - Room ID type: ${typeof roomId}`);

    if (!roomId || typeof roomId !== "string") {
      console.error(`Invalid roomId received:`, roomId);
      return;
    }

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
    console.log(`📨 New message from ${socket.id}:`, data);

    // auto-stop typing when message is sent
    if (this.typingHandler && socket.userId) {
      // stop typing in support room if it's a support message
      if (data.supportId) {
        const supportRoom = `support:${data.supportId}`;
        this.typingHandler.handleStopTyping(socket, {
          roomId: supportRoom,
          userId: socket.userId,
          isTyping: false,
        });
      }

      // stop typing in general room if specified
      if (data.roomId) {
        this.typingHandler.handleStopTyping(socket, {
          roomId: data.roomId,
          userId: socket.userId,
          isTyping: false,
        });
      }

      // stop typing in AI chat room if it's an AI message
      if (data.receiverId && data.receiverId.startsWith("ai-assistant")) {
        const aiChatRoom = `ai-chat:${socket.userId}`;
        this.typingHandler.handleStopTyping(socket, {
          roomId: aiChatRoom,
          userId: socket.userId,
          isTyping: false,
        });
      }
    }

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

    // handle AI chat messages
    if (data.receiverId && data.receiverId.startsWith("ai-assistant")) {
      const aiChatRoom = `ai-chat:${socket.userId}`;
      socket.to(aiChatRoom).emit("newMessage", {
        ...data,
        senderId: socket.userId,
        timestamp: new Date(),
      });
    }

    // handle general room messages
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

  // method to emit AI response to user
  emitAIResponse(userId: string, message: any): void {
    const aiChatRoom = `ai-chat:${userId}`;

    // using standard NEW_MESSAGE event for AI responses
    const aiMessage = {
      ...message,
      isFromAI: true,
      timestamp: new Date(),
    };

    console.log(`Emitting AI response to room: ${aiChatRoom}`);
    console.log(`AI message content:`, {
      id: aiMessage.id,
      content: aiMessage.content?.substring(0, 50) + "...",
    });

    // emit only to AI chat room to avoid duplicates
    this.io.to(aiChatRoom).emit("newMessage", aiMessage);
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
  }
}
