import { Server as SocketServer } from "socket.io";
import { AuthenticatedSocket, TypingEventData } from "../types/socket.types";

interface TypingUser {
  userId: string;
  socketId: string;
  startTime: Date;
  timeoutId?: NodeJS.Timeout;
}

export class TypingHandler {
  private typingUsers: Map<string, Map<string, TypingUser>> = new Map(); // roomId -> userId -> TypingUser
  private readonly TYPING_TIMEOUT = 5000; // 5 seconds timeout

  constructor(private io: SocketServer) {}

  handleStartTyping(socket: AuthenticatedSocket, data: TypingEventData): void {
    if (!data.roomId || !socket.userId) {
      console.error("Invalid typing data: missing roomId or userId");
      return;
    }

    console.log(
      `👨‍💻 User ${socket.userId} started typing in room ${data.roomId}`
    );

    // initialize room if doesn't exist
    if (!this.typingUsers.has(data.roomId)) {
      this.typingUsers.set(data.roomId, new Map());
    }

    const roomTypingUsers = this.typingUsers.get(data.roomId)!;
    const existingTypingUser = roomTypingUsers.get(socket.userId);

    // clear existing timeout if user was already typing
    if (existingTypingUser?.timeoutId) {
      clearTimeout(existingTypingUser.timeoutId);
    }

    // set up auto-stop timeout
    const timeoutId = setTimeout(() => {
      this.handleStopTyping(socket, data);
    }, this.TYPING_TIMEOUT);

    // add/update typing user
    roomTypingUsers.set(socket.userId, {
      userId: socket.userId,
      socketId: socket.id,
      startTime: new Date(),
      timeoutId,
    });

    // emit to other users in the room (not the sender)
    socket.to(data.roomId).emit("userStartedTyping", {
      userId: socket.userId,
      roomId: data.roomId,
      timestamp: new Date(),
    });

    console.log(
      `✅ Typing started notification sent for user ${socket.userId} in room ${data.roomId}`
    );
  }

  handleStopTyping(socket: AuthenticatedSocket, data: TypingEventData): void {
    if (!data.roomId || !socket.userId) {
      console.error("Invalid typing data: missing roomId or userId");
      return;
    }

    console.log(
      `⏹️ User ${socket.userId} stopped typing in room ${data.roomId}`
    );

    const roomTypingUsers = this.typingUsers.get(data.roomId);
    if (!roomTypingUsers) {
      console.log(`No typing users found for room ${data.roomId}`);
      return;
    }

    const typingUser = roomTypingUsers.get(socket.userId);
    if (!typingUser) {
      console.log(
        `User ${socket.userId} was not typing in room ${data.roomId}`
      );
      return;
    }

    // clear timeout if exists
    if (typingUser.timeoutId) {
      clearTimeout(typingUser.timeoutId);
    }

    // remove user from typing users
    roomTypingUsers.delete(socket.userId);

    // clean up empty room
    if (roomTypingUsers.size === 0) {
      this.typingUsers.delete(data.roomId);
    }

    // emit to other users in the room (not the sender)
    socket.to(data.roomId).emit("userStoppedTyping", {
      userId: socket.userId,
      roomId: data.roomId,
      timestamp: new Date(),
    });

    console.log(
      `✅ Typing stopped notification sent for user ${socket.userId} in room ${data.roomId}`
    );
  }

  handleDisconnection(socket: AuthenticatedSocket): void {
    if (!socket.userId) {
      console.log("No userId found for disconnecting socket");
      return;
    }

    console.log(`🔌 Handling disconnection for user ${socket.userId}`);

    // check all rooms for this user and clean up typing status
    for (const [roomId, roomTypingUsers] of this.typingUsers.entries()) {
      const typingUser = roomTypingUsers.get(socket.userId);

      if (typingUser) {
        console.log(
          `Cleaning up typing status for user ${socket.userId} in room ${roomId}`
        );

        // clear timeout if exists
        if (typingUser.timeoutId) {
          clearTimeout(typingUser.timeoutId);
        }

        // remove user from typing users
        roomTypingUsers.delete(socket.userId);

        // emit stop typing event to room
        socket.to(roomId).emit("userStoppedTyping", {
          userId: socket.userId,
          roomId: roomId,
          timestamp: new Date(),
        });

        // clean up empty room
        if (roomTypingUsers.size === 0) {
          this.typingUsers.delete(roomId);
          console.log(`Cleaned up empty typing room: ${roomId}`);
        }
      }
    }

    console.log(`✅ Disconnection cleanup completed for user ${socket.userId}`);
  }

  // Get list of user IDs currently typing in a room
  getTypingUsersInRoom(roomId: string): string[] {
    const roomTypingUsers = this.typingUsers.get(roomId);
    if (!roomTypingUsers) {
      return [];
    }
    return Array.from(roomTypingUsers.keys());
  }

  // Get detailed typing information for a room
  getTypingUsersDetails(roomId: string): TypingUser[] {
    const roomTypingUsers = this.typingUsers.get(roomId);
    if (!roomTypingUsers) {
      return [];
    }
    return Array.from(roomTypingUsers.values());
  }

  // Get typing status for all rooms (useful for debugging)
  getAllTypingStatus(): Record<string, string[]> {
    const status: Record<string, string[]> = {};
    for (const [roomId, roomTypingUsers] of this.typingUsers.entries()) {
      status[roomId] = Array.from(roomTypingUsers.keys());
    }
    return status;
  }
}
