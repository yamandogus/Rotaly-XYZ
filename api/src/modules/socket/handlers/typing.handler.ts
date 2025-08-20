import { Server as SocketServer } from "socket.io";
import { AuthenticatedSocket, TypingEventData } from "../types/socket.types";

export class TypingHandler {
  private typingUsers: Map<string, Set<string>> = new Map(); // roomId -> set of userIds

  constructor(private io: SocketServer) {}

  handleStartTyping(socket: AuthenticatedSocket, data: TypingEventData): void {
    if (!data.roomId || !socket.userId) return;

    console.log(`User ${socket.userId} started typing in room ${data.roomId}`);

    if (!this.typingUsers.has(data.roomId)) {
      this.typingUsers.set(data.roomId, new Set());
    }
    this.typingUsers.get(data.roomId)!.add(socket.userId);

    socket.to(data.roomId).emit("userStartedTyping", {
      userId: socket.userId,
      roomId: data.roomId,
      timestamp: new Date(),
    });
  }

  handleStopTyping(socket: AuthenticatedSocket, data: TypingEventData): void {
    if (!data.roomId || !socket.userId) return;

    console.log(`User ${socket.userId} stopped typing in room ${data.roomId}`);

    const roomTypingUsers = this.typingUsers.get(data.roomId);
    if (roomTypingUsers) {
      roomTypingUsers.delete(socket.userId);
      if (roomTypingUsers.size === 0) {
        this.typingUsers.delete(data.roomId);
      }
    }

    socket.to(data.roomId).emit("userStoppedTyping", {
      userId: socket.userId,
      roomId: data.roomId,
      timestamp: new Date(),
    });
  }

  handleDisconnection(socket: AuthenticatedSocket): void {
    if (!socket.userId) return;

    for (const [roomId, typingUsers] of this.typingUsers.entries()) {
      if (typingUsers.has(socket.userId)) {
        typingUsers.delete(socket.userId);

        socket.to(roomId).emit("userStoppedTyping", {
          userId: socket.userId,
          roomId: roomId,
          timestamp: new Date(),
        });

        if (typingUsers.size === 0) {
          this.typingUsers.delete(roomId);
        }
      }
    }
  }

  getTypingUsersInRoom(roomId: string): string[] {
    return Array.from(this.typingUsers.get(roomId) || []);
  }
}
