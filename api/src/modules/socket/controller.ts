import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { AuthenticatedSocket } from "./types/socket.types";
import { ConnectionHandler } from "./handlers/connection.handler";
import { MessageHandler } from "./handlers/message.handler";
import { TypingHandler } from "./handlers/typing.handler";
import { NotificationHandler } from "./handlers/notification.handler";
import { SOCKET_EVENTS } from "./events/socket.events";

const ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";

export class SocketController {
  private io: SocketServer;
  private connectionHandler: ConnectionHandler;
  private messageHandler: MessageHandler;
  private typingHandler: TypingHandler;
  private notificationHandler: NotificationHandler;

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

    this.initializeSocketEvents();
  }

  private initializeSocketEvents(): void {
    this.io.on(SOCKET_EVENTS.CONNECTION, (socket: AuthenticatedSocket) => {
      // handle connection
      this.connectionHandler.handleConnection(socket);

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
        this.messageHandler.handleJoinRoom(socket, data);
      });

      socket.on(SOCKET_EVENTS.LEAVE_ROOM, (roomId) => {
        this.messageHandler.handleLeaveRoom(socket, roomId);
      });

      // message events
      socket.on(SOCKET_EVENTS.NEW_MESSAGE, (data) => {
        this.messageHandler.handleNewMessage(socket, data);
      });

      socket.on(SOCKET_EVENTS.MESSAGE_READ, (data) => {
        this.messageHandler.handleMessageRead(socket, data);
      });

      socket.on(SOCKET_EVENTS.MESSAGE_DELETE, (data) => {
        this.messageHandler.handleMessageDelete(socket, data);
      });

      // typing events
      socket.on(SOCKET_EVENTS.START_TYPING, (data) => {
        this.typingHandler.handleStartTyping(socket, data);
      });

      socket.on(SOCKET_EVENTS.STOP_TYPING, (data) => {
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

      // TODO: AUTH
      //  socket.use(this.authenticateSocket.bind(this));
    });
  }

  // TODO: AUTH
  private authenticateSocket(
    socket: AuthenticatedSocket,
    next: (err?: Error) => void
  ): void {
    // TODO:Authentication
    // verify JWT token and set socket.userId
    next();
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
