import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { AuthenticatedSocket } from "./types/socket.types";
import { ConnectionHandler } from "./handlers/connection.handler";
import { MessageHandler } from "./handlers/message.handler";
import { TypingHandler } from "./handlers/typing.handler";
import { NotificationHandler } from "./handlers/notification.handler";
import { SupportHandler } from "./handlers/support.handler";
import { SOCKET_EVENTS } from "./events/socket.events";
import { JwtService } from "../../jwt/jwt.service";

const ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

export class SocketController {
  private io: SocketServer;
  private connectionHandler: ConnectionHandler;
  private messageHandler: MessageHandler;
  private typingHandler: TypingHandler;
  private notificationHandler: NotificationHandler;
  private supportHandler: SupportHandler;
  private jwtService: JwtService;

  constructor(server: HttpServer) {
    this.io = new SocketServer(server, {
      cors: {
        origin: [ORIGIN],
        methods: ["GET", "POST"],
        credentials: true,
      },
      allowEIO3: true,
      transports: ["websocket", "polling"],
    });

    // initialize handlers
    this.connectionHandler = new ConnectionHandler();
    this.messageHandler = new MessageHandler(this.io);
    this.typingHandler = new TypingHandler(this.io);
    this.notificationHandler = new NotificationHandler(this.io);
    this.supportHandler = new SupportHandler(this.io);
    this.jwtService = new JwtService();

    this.initializeSocketEvents();
  }

  private initializeSocketEvents(): void {
    // apply authentication middleware globally
    this.io.use(this.authenticateSocket.bind(this));

    this.io.on("connection_error", (error) => {
      console.log("🚫 Connection failed:", error.message);
    });

    this.io.on(
      SOCKET_EVENTS.CONNECTION,
      async (socket: AuthenticatedSocket) => {
        // handle connection
        await this.connectionHandler.handleConnection(socket);

        // emit authentication status to client
        if (socket.userId) {
          socket.emit("auth_success", {
            userId: socket.userId,
            role: socket.role,
            message: "Successfully authenticated",
          });
        } else {
          socket.emit("auth_warning", {
            message:
              "Connected without authentication - some features may be limited",
          });
        }

        // connection events
        socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
          this.connectionHandler.handleDisconnection(socket, reason);
          this.typingHandler.handleDisconnection(socket);
        });

        socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
          this.connectionHandler.handleConnectionError(socket, error);
        });

        // room events
        socket.on(SOCKET_EVENTS.JOIN_ROOM, (data) => {
          if (!this.requireAuth(socket, "join room")) return;
          this.messageHandler.handleJoinRoom(socket, data);
        });

        socket.on(SOCKET_EVENTS.LEAVE_ROOM, (data) => {
          if (!this.requireAuth(socket, "leave room")) return;
          // handle both string roomId and object with roomId property
          const roomId = typeof data === "string" ? data : data?.roomId;
          if (roomId) {
            this.messageHandler.handleLeaveRoom(socket, roomId);
          } else {
            console.error(
              "Invalid room data received in LEAVE_ROOM event:",
              data
            );
          }
        });

        // support workflow events
        socket.on(SOCKET_EVENTS.SUPPORT_REQUEST_CREATED, (data) => {
          if (!this.requireAuth(socket, "create support request")) return;
          this.supportHandler.handleSupportRequestCreated(socket, data);
        });

        socket.on(SOCKET_EVENTS.SUPPORT_ASSIGNED, (data) => {
          if (!this.requireAuth(socket, "assign support")) return;
          this.supportHandler.handleSupportAssignment(socket, data);
        });

        socket.on(SOCKET_EVENTS.SUPPORT_RESOLVED, (data) => {
          if (!this.requireAuth(socket, "resolve support")) return;
          this.supportHandler.handleSupportResolved(socket, data);
        });

        // message events
        socket.on(SOCKET_EVENTS.NEW_MESSAGE, (data) => {
          if (!this.requireAuth(socket, "send message")) return;
          this.messageHandler.handleNewMessage(socket, data);
        });

        socket.on(SOCKET_EVENTS.MESSAGE_READ, (data) => {
          if (!this.requireAuth(socket, "mark message as read")) return;
          this.messageHandler.handleMessageRead(socket, data);
        });

        socket.on(SOCKET_EVENTS.MESSAGE_DELETE, (data) => {
          if (!this.requireAuth(socket, "delete message")) return;
          this.messageHandler.handleMessageDelete(socket, data);
        });

        // typing events
        socket.on(SOCKET_EVENTS.START_TYPING, (data) => {
          if (!this.requireAuth(socket, "start typing")) return;
          this.typingHandler.handleStartTyping(socket, data);
        });

        socket.on(SOCKET_EVENTS.STOP_TYPING, (data) => {
          if (!this.requireAuth(socket, "stop typing")) return;
          this.typingHandler.handleStopTyping(socket, data);
        });

        // notification events
        socket.on(SOCKET_EVENTS.SEND_NOTIFICATION, (data) => {
          this.notificationHandler.handleSendNotification(socket, data);
        });

        socket.on(SOCKET_EVENTS.BROADCAST_NOTIFICATION, (data) => {
          this.notificationHandler.handleBroadcastNotification(socket, data);
        });

        socket.on(SOCKET_EVENTS.HOTEL_NOTIFICATION, (data) => {
          this.notificationHandler.handleHotelNotification(socket, data);
        });

        socket.on(SOCKET_EVENTS.MARK_NOTIFICATION_READ, (data) => {
          this.notificationHandler.handleMarkNotificationRead(socket, data);
        });
      }
    );
  }

  // socket Authentication Implementation
  private authenticateSocket(
    socket: AuthenticatedSocket,
    next: (err?: Error) => void
  ): void {
    try {
      const token =
        socket.handshake.auth.token || socket.handshake.headers.authorization;

      if (!token) {
        console.log(
          "⚠️  No authentication token provided - allowing anonymous connection"
        );
        socket.userId = undefined;
        socket.role = "ANONYMOUS";
        return next();
      }

      // extract and verify JWT token
      const cleanToken =
        typeof token === "string"
          ? this.jwtService.extractTokenFromHeader(
              token.startsWith("Bearer ") ? token : `Bearer ${token}`
            )
          : token;

      const decoded = this.jwtService.verifyToken(
        cleanToken,
        process.env.JWT_ACCESS_SECRET || "secret_access_token"
      );

      // set user information on socket
      socket.userId = decoded.userId;
      socket.role = decoded.role;

      console.log(
        `✅ User authenticated successfully - ID: ${socket.userId}, Role: ${socket.role}`
      );
      next();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown authentication error";
      console.error(`❌ Authentication failed:`, errorMessage);

      if (errorMessage.includes("expired")) {
        console.log("🕐 Token has expired - rejecting connection");
        // NOTE: We can't emit to socket before connection is established
        return next(
          new Error(
            "TOKEN_EXPIRED: Your session has expired. Please login again."
          )
        );
      }

      if (
        errorMessage.includes("invalid") ||
        errorMessage.includes("malformed")
      ) {
        console.log("🚫 Invalid token format - rejecting connection");
        return next(
          new Error("INVALID_TOKEN: Invalid authentication token format.")
        );
      }

      // for other auth errors, reject the connection
      console.log("🚫 Authentication error - rejecting connection");
      return next(
        new Error(
          "AUTHENTICATION_FAILED: Authentication failed. Please try again."
        )
      );
    }
  }

  // authentication helper method
  private requireAuth(socket: AuthenticatedSocket, action: string): boolean {
    if (!socket.userId) {
      console.log(
        `🚫 Unauthorized attempt to ${action} by socket ${socket.id}`
      );
      socket.emit("auth_required", {
        action,
        message: `Authentication required to ${action}`,
        code: "AUTH_REQUIRED",
      });
      return false;
    }
    return true;
  }

  // public methods
  public getOnlineUsers(): number {
    return this.connectionHandler.getOnlineUsersCount();
  }

  public getIO(): SocketServer {
    return this.io;
  }

  public isUserOnline(userId: string): boolean {
    return this.connectionHandler.isUserOnline(userId);
  }

  public getTypingUsersInRoom(roomId: string): string[] {
    return this.typingHandler.getTypingUsersInRoom(roomId);
  }

  // support handler public methods for services
  public emitSupportRequestCreated(data: any): void {
    this.supportHandler.emitSupportRequestCreated(data);
  }

  public emitSupportAssignment(data: any): void {
    this.supportHandler.emitSupportAssignment(data);
  }

  // utility methods
  public emitToUser(userId: string, event: string, data: any): void {
    this.io.to(`user:${userId}`).emit(event, data);
  }

  public emitToRoom(roomId: string, event: string, data: any): void {
    this.io.to(roomId).emit(event, data);
  }

  public broadcastEvent(event: string, data: any): void {
    this.io.emit(event, data);
  }
}
