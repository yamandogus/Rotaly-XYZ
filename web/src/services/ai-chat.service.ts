import { messageService } from "./message.service";
import { socketService, SocketMessage } from "./socket.service";
import { ChatMessage } from "@/types/chat";

export interface AIChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  isAIAvailable: boolean;
}

class AIChatService {
  private listeners: Set<(state: AIChatState) => void> = new Set();
  private isInitialized = false;
  private state: AIChatState = {
    messages: [],
    isLoading: false,
    isConnected: false,
    isAIAvailable: false,
  };

  // Subscribe to state changes
  subscribe(callback: (state: AIChatState) => void): () => void {
    this.listeners.add(callback);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  // Notify all listeners of state changes
  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.state));
  }

  // Update state and notify listeners
  private updateState(updates: Partial<AIChatState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  // Get current state
  getState(): AIChatState {
    return { ...this.state };
  }

  // Initialize AI chat
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log("✅ AI chat already initialized, skipping...");
      return;
    }

    try {
      this.updateState({ isLoading: true });

      // Check if user is authenticated
      if (!this.isAuthenticated()) {
        console.warn("User not authenticated, cannot initialize AI chat");
        this.updateState({
          isLoading: false,
          isConnected: false,
          isAIAvailable: false,
        });
        return;
      }

      // Check AI service availability
      try {
        const aiStatus = await messageService.checkAIStatus();
        this.updateState({ isAIAvailable: aiStatus.aiServiceAvailable });
        console.log("AI service status:", aiStatus);
      } catch (error) {
        console.error("Failed to check AI status:", error);
        this.updateState({ isAIAvailable: false });
      }

      // Initialize socket connection for real-time AI responses
      await this.initializeSocket();

      // Load existing AI conversation history
      await this.loadConversationHistory();

      this.updateState({ isLoading: false });
      this.isInitialized = true;
      console.log("✅ AI chat initialization completed");
    } catch (error) {
      console.error("Failed to initialize AI chat:", error);
      this.updateState({
        isLoading: false,
        isConnected: false,
        isAIAvailable: false,
      });
      throw error;
    }
  }

  // Initialize socket connection
  private async initializeSocket(): Promise<void> {
    try {
      console.log("🚀 Initializing socket connection for AI chat...");

      const userId = this.getCurrentUserId();
      if (!userId) {
        console.warn("❌ No user ID available, cannot initialize socket");
        throw new Error("User not authenticated");
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("❌ No auth token available, cannot initialize socket");
        throw new Error("No authentication token");
      }

      console.log(`👤 Initializing for user: ${userId}`);

      // Connect with authentication
      if (!socketService.isSocketConnected()) {
        console.log("🔌 Socket not connected, establishing connection...");
        await socketService.connect(token);
        console.log("✅ Socket connection established");
      } else {
        console.log("✅ Socket already connected");
      }

      // Enable debug mode for better troubleshooting
      socketService.enableDebugMode();

      // Get socket status for debugging
      const status = socketService.getSocketStatus();
      console.log("📊 Socket status:", status);

      // Join AI chat rooms
      const aiChatRoom = `ai-chat:${userId}`;
      const userRoom = `user:${userId}`;

      console.log(`🏠 Joining rooms: ${aiChatRoom} and ${userRoom}`);

      socketService.joinRoom(aiChatRoom);
      socketService.joinRoom(userRoom);

      // Wait a moment for room joins to complete
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Set up message listeners with enhanced logging
      console.log("👂 Setting up AI message listeners...");

      socketService.onNewMessage((message) => {
        console.log("📨 Received socket message in AI chat service:", message);
        if (message.isFromAI) {
          console.log("🤖 Processing AI message:", message);
          this.handleIncomingAIMessage(message);
        } else {
          console.log("👤 Ignoring non-AI message:", message);
        }
      });

      // Additional socket event listeners for debugging
      socketService.on("connect", () => {
        console.log("🔌 Socket connected in AI chat service");
        this.updateState({ isConnected: true });
      });

      socketService.on("disconnect", () => {
        console.log("❌ Socket disconnected in AI chat service");
        this.updateState({ isConnected: false });
      });

      socketService.on("reconnect", () => {
        console.log("🔄 Socket reconnected in AI chat service");
        this.updateState({ isConnected: true });
      });

      this.updateState({ isConnected: true });
      console.log("✅ Socket initialization completed successfully");
    } catch (error) {
      console.error("❌ Failed to initialize socket for AI chat:", error);
      this.updateState({ isConnected: false });
      throw error;
    }
  }

  // Load conversation history
  private async loadConversationHistory(): Promise<void> {
    try {
      const response = await messageService.getAIMessages(1, 50);
      this.updateState({
        messages: response.messages.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
      });
    } catch (error) {
      console.error("Failed to load AI conversation history:", error);
    }
  }

  // Send message to AI
  async sendMessage(content: string): Promise<void> {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      content: content.trim(),
      senderId: this.getCurrentUserId() || "unknown",
      receiverId: "ai-assistant",
      createdAt: new Date(),
      isFromAI: false,
      senderInfo: undefined,
    };

    try {
      this.updateState({ isLoading: true });

      // Add user message to state
      this.updateState({
        messages: [...this.state.messages, userMessage],
      });

      // Send message via API
      const sentMessage = await messageService.sendAIMessage(content.trim());

      // Replace temporary message with actual message
      this.updateState({
        messages: this.state.messages.map((msg) =>
          msg.id === userMessage.id ? sentMessage : msg
        ),
        isLoading: false,
      });

      // The AI response will come via socket and be handled by handleIncomingAIMessage
    } catch (error) {
      console.error("Failed to send AI message:", error);

      // Remove the temporary message on error
      this.updateState({
        messages: this.state.messages.filter(
          (msg) => msg.id !== userMessage.id
        ),
        isLoading: false,
      });

      throw error;
    }
  }

  // Handle incoming AI messages from socket
  private handleIncomingAIMessage(message: SocketMessage | any): void {
    console.log("🤖 Processing incoming AI message:", message);

    // Handle both createdAt and timestamp fields for compatibility
    const messageDate = message.createdAt || message.timestamp || new Date();

    const aiMessage: ChatMessage = {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      receiverId: message.receiverId || "",
      createdAt: new Date(messageDate), // Ensure proper date conversion
      isFromAI: true,
      senderInfo: { name: "AI", surname: "Assistant" },
      ticketCreated: message.ticketCreated,
      supportId: message.supportId,
    };

    console.log("🤖 Converted to ChatMessage:", aiMessage);

    // Add AI message to state
    this.updateState({
      messages: [...this.state.messages, aiMessage],
    });

    console.log(
      "🤖 AI message added to state. Total messages:",
      this.state.messages.length + 1
    );
  }

  // Mark messages as read
  async markMessagesAsRead(messageIds: string[]): Promise<void> {
    try {
      await messageService.markAsRead({ messageIds });

      // Update local state to mark messages as read
      this.updateState({
        messages: this.state.messages.map((msg) =>
          messageIds.includes(msg.id) ? { ...msg, readAt: new Date() } : msg
        ),
      });
    } catch (error) {
      console.error("Failed to mark AI messages as read:", error);
    }
  }

  // Clear conversation
  clearConversation(): void {
    this.updateState({ messages: [] });
  }

  // Disconnect from AI chat
  disconnect(): void {
    const userId = this.getCurrentUserId();
    if (userId) {
      socketService.leaveRoom(`ai-chat:${userId}`);
      socketService.leaveRoom(`user:${userId}`);
    }

    this.updateState({
      isConnected: false,
      messages: [],
    });
  }

  // Helper method to get current user ID
  private getCurrentUserId(): string | null {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("No access token found in localStorage");
        return null;
      }

      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("Invalid JWT token format");
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      console.log("Decoded token payload:", {
        userId: payload.userId,
        role: payload.role,
      });

      return payload.userId || null;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  }

  // Check if user is authenticated
  private isAuthenticated(): boolean {
    return this.getCurrentUserId() !== null;
  }
}

export const aiChatService = new AIChatService();
