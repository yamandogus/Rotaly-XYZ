import { AuthenticatedSocket, OnlineUser } from "../types/socket.types";
import { PrismaClient } from "@prisma/client";

export class ConnectionHandler {
  private onlineUsers: Map<string, OnlineUser> = new Map();
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async handleConnection(socket: AuthenticatedSocket): Promise<void> {
    console.log(`User connected: ${socket.id}`);
    console.log(`Total connections before adding: ${this.onlineUsers.size}`);

    const onlineUser: OnlineUser = {
      socketId: socket.id,
      userId: socket.userId,
      role: socket.role,
      joinedAt: new Date(),
    };

    this.onlineUsers.set(socket.id, onlineUser);
    console.log(`User ${socket.id} added to online users`);

    socket.broadcast.emit("onlineUsersCount", this.onlineUsers.size);
    socket.emit("onlineUsersCount", this.onlineUsers.size);
    console.log(`Emitted onlineUsersCount: ${this.onlineUsers.size}`);

    if (socket.userId) {
      // join user's personal room
      socket.join(`user:${socket.userId}`);
      console.log(`User ${socket.userId} joined personal room`);

      // join user to their hotels (for hotel owners and staff)
      if (socket.role === "OWNER" || socket.role === "ADMIN") {
        try {
          const userHotels = await this.prisma.hotel.findMany({
            where: {
              ownerId: socket.userId,
              isActive: true,
            },
            select: {
              id: true,
              name: true,
            },
          });

          for (const hotel of userHotels) {
            socket.join(`hotel:${hotel.id}`);
            console.log(
              `User ${socket.userId} joined hotel room: ${hotel.id} (${hotel.name})`
            );
          }
        } catch (error) {
          console.error("Error joining user to hotel rooms:", error);
        }
      }

      // join support representatives to support rooms
      if (socket.role === "SUPPORT" || socket.role === "ADMIN") {
        socket.join("support-team");
        console.log(`Support user ${socket.userId} joined support team room`);
      }
    }
  }

  handleDisconnection(socket: AuthenticatedSocket, reason: string): void {
    console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    console.log(`Total connections before removing: ${this.onlineUsers.size}`);

    this.onlineUsers.delete(socket.id);
    console.log(`User ${socket.id} removed from online users`);
    console.log(`Total connections after removing: ${this.onlineUsers.size}`);

    socket.broadcast.emit("onlineUsersCount", this.onlineUsers.size);
    console.log(`Emitted onlineUsersCount: ${this.onlineUsers.size}`);
  }

  handleConnectionError(socket: AuthenticatedSocket, error: Error): void {
    console.log(`Connection error for ${socket.id}:`, error);
  }

  getOnlineUsersCount(): number {
    return this.onlineUsers.size;
  }

  getOnlineUsers(): OnlineUser[] {
    return Array.from(this.onlineUsers.values());
  }

  isUserOnline(userId: string): boolean {
    return Array.from(this.onlineUsers.values()).some(
      (user) => user.userId === userId
    );
  }
}
