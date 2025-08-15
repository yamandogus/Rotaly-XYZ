import { AuthenticatedSocket, OnlineUser } from "../types/socket.types";

export class ConnectionHandler {
  private onlineUsers: Map<string, OnlineUser> = new Map();

  handleConnection(socket: AuthenticatedSocket): void {
    // TODO: when a user connects join them to their hotels -> socket.join(`hotel:${hotelId}`);
    //  this way, we can easily send notifications to all users in a specific hotel

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
    console.log(`Total online users: ${this.onlineUsers.size}`);

    socket.broadcast.emit("onlineUsersCount", this.onlineUsers.size);
    socket.emit("onlineUsersCount", this.onlineUsers.size);
    console.log(`Emitted onlineUsersCount: ${this.onlineUsers.size}`);

    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
      console.log(`User ${socket.userId} joined personal room`);
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
