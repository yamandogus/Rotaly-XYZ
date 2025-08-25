/* eslint-disable @typescript-eslint/no-explicit-any */
// Socket service for real-time communication

export interface SocketMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId?: string;
  createdAt: Date;
  timestamp?: Date;
  isFromAI?: boolean;
  ticketCreated?: boolean;
  supportId?: string;
}

export interface AIResponse {
  content: string;
  isFromAI: boolean;
  timestamp: Date;
  ticketCreated?: boolean;
  supportId?: string;
}

export interface TypingEvent {
  isTyping: boolean;
  userId: string;
}

class SocketService {
  private socket: any = null;
  private isConnected = false;
  private connectionPromise: Promise<void> | null = null;
  private keepaliveInterval: NodeJS.Timeout | null = null;

  async connect(token?: string): Promise<void> {
    // If already connecting, return the existing promise
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // If already connected, return immediately
    if (this.isConnected && this.socket) {
      return Promise.resolve();
    }

    // Dynamic import for socket.io-client to handle SSR
    try {
      const { io } = await import("socket.io-client");

      this.connectionPromise = new Promise((resolve, reject) => {
        const socketUrl =
          process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
        const authToken =
          token ||
          (typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null);

        console.log("Attempting socket connection to:", socketUrl);
        console.log(
          "Using auth token:",
          authToken ? "Token present" : "No token"
        );

        // Disconnect existing socket if any
        if (this.socket) {
          this.socket.disconnect();
        }

        this.socket = io(socketUrl, {
          auth: {
            token: authToken,
          },
          transports: ["websocket", "polling"],
          timeout: 30000, // Increased timeout
          reconnection: true,
          reconnectionDelay: 2000,
          reconnectionDelayMax: 10000,
          reconnectionAttempts: 10, // More attempts
          forceNew: false,
          autoConnect: true,
          upgrade: true,
        });

        this.socket.on("connect", () => {
          console.log("Socket connected successfully");
          this.isConnected = true;
          this.connectionPromise = null;

          // Start keepalive ping
          this.startKeepalive();

          resolve();
        });

        this.socket.on("connect_error", (error: any) => {
          console.error("Socket connection error:", error);
          this.isConnected = false;
          this.connectionPromise = null;
          reject(new Error(`Connection failed: ${error.message || error}`));
        });

        this.socket.on("disconnect", (reason: any) => {
          console.log("Socket disconnected:", reason);
          this.isConnected = false;
          this.connectionPromise = null;
          this.stopKeepalive();
        });

        this.socket.on("reconnect", (attemptNumber: number) => {
          console.log("Socket reconnected after", attemptNumber, "attempts");
          this.isConnected = true;
          this.startKeepalive();
        });

        this.socket.on("reconnect_attempt", (attemptNumber: number) => {
          console.log("Socket reconnection attempt:", attemptNumber);
        });

        this.socket.on("reconnect_error", (error: any) => {
          console.error("Socket reconnection error:", error);
        });

        this.socket.on("reconnect_failed", () => {
          console.error("Socket reconnection failed after all attempts");
          this.isConnected = false;
        });

        this.socket.on("auth_success", (data: any) => {
          console.log("Socket authentication successful:", data);
        });

        this.socket.on("auth_required", (data: any) => {
          console.warn("Socket authentication required:", data);
        });

        this.socket.on("auth_failed", (data: any) => {
          console.error("Socket authentication failed:", data);
          this.isConnected = false;
          this.connectionPromise = null;
          reject(
            new Error(
              `Authentication failed: ${data.message || "Unknown auth error"}`
            )
          );
        });
      });

      return this.connectionPromise;
    } catch (error) {
      console.error("Failed to load socket.io-client:", error);
      this.connectionPromise = null;
      throw new Error(`Failed to initialize socket: ${error}`);
    }
  }
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionPromise = null;
    }
  }

  // Enhanced room management with confirmation
  joinRoom(roomId: string): void {
    if (this.socket && this.isConnected) {
      console.log(`🏠 Joining room: ${roomId}`);
      this.socket.emit("joinRoom", { roomId });

      // Listen for join confirmation
      this.socket.once(`roomJoined:${roomId}`, () => {
        console.log(`✅ Successfully joined room: ${roomId}`);
      });
    } else {
      console.warn(`🏠 Cannot join room ${roomId} - socket not connected`);
    }
  }

  leaveRoom(roomId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("leaveRoom", { roomId });
    }
  }

  // AI Chat methods
  joinAIChatRoom(): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("joinAIChatRoom");
    }
  }

  leaveAIChatRoom(): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("leaveAIChatRoom");
    }
  }

  sendAIMessage(message: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("aiChatMessage", {
        message,
        receiverId: "ai-assistant",
      });
    }
  }

  onAIResponse(callback: (response: AIResponse) => void): void {
    if (this.socket) {
      this.socket.on("aiResponse", callback);
    }
  }

  onNewMessage(callback: (message: SocketMessage) => void): void {
    if (this.socket) {
      this.socket.on("newMessage", callback);
    }
  }

  // Typing indicator methods
  onTyping(callback: (event: TypingEvent) => void): void {
    if (this.socket) {
      this.socket.on("typing", callback);
    }
  }

  startTyping(roomId: string, userId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("startTyping", { roomId, userId });
    }
  }

  stopTyping(roomId: string, userId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("stopTyping", { roomId, userId });
    }
  }

  // Room management methods
  joinRoom(roomId: string, userId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("joinRoom", { roomId, userId });
    }
  }

  leaveRoom(roomId: string, userId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("leaveRoom", { roomId, userId });
    }
  }

  // General message methods
  sendMessage(data: {
    message?: string;
    content?: string;
    receiverId?: string;
    roomId?: string;
    supportId?: string;
  }): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("newMessage", data);
    }
  }

  // Typing indicators
  startTyping(roomId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("startTyping", { roomId });
    }
  }

  stopTyping(roomId: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit("stopTyping", { roomId });
    }
  }

  onTypingStart(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("userStartTyping", callback);
    }
  }

  onTypingStop(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("userStopTyping", callback);
    }
  }

  // Support events
  onSupportRequestCreated(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("supportRequestCreated", callback);
    }
  }

  onSupportAssigned(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("supportRepAssigned", callback);
    }
  }

  onSupportResolved(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("supportResolved", callback);
    }
  }

  // Message events
  onMessageRead(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("messagesRead", callback);
    }
  }

  onMessageDeleted(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on("messageDeleted", callback);
    }
  }

  // General event listener
  on(event: string, callback: any): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: any): void {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }

  isSocketConnected(): boolean {
    return this.isConnected && this.socket !== null;
  }

  // Debug method to get socket status
  getSocketStatus(): {
    isConnected: boolean;
    socketExists: boolean;
    rooms: string[];
  } {
    return {
      isConnected: this.isConnected,
      socketExists: this.socket !== null,
      rooms: this.socket?.rooms ? Array.from(this.socket.rooms) : [],
    };
  }

  // Debug method to enable comprehensive logging
  enableDebugMode(): void {
    if (this.socket) {
      console.log("🐛 Enabling socket debug mode");

      // Log all events
      const originalEmit = this.socket.emit;
      this.socket.emit = function (...args: any[]) {
        console.log("📤 Socket emit:", args[0], args.slice(1));
        return originalEmit.apply(this, args);
      };

      // Log all incoming events
      const originalOn = this.socket.on;
      this.socket.on = function (event: string, listener: any) {
        const wrappedListener = (...args: any[]) => {
          console.log(`📥 Socket event '${event}':`, args);
          return listener(...args);
        };
        return originalOn.call(this, event, wrappedListener);
      };
    }
  }

  // Keepalive methods
  private startKeepalive(): void {
    this.stopKeepalive(); // Clear any existing interval

    this.keepaliveInterval = setInterval(() => {
      if (this.socket && this.isConnected) {
        console.log("💗 Sending keepalive ping");
        this.socket.emit("ping", { timestamp: Date.now() });
      }
    }, 30000); // Ping every 30 seconds
  }

  private stopKeepalive(): void {
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
      this.keepaliveInterval = null;
    }
  }
}

export const socketService = new SocketService();
