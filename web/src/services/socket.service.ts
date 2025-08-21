import { io, Socket } from 'socket.io-client';

export interface SocketMessage {
  id: string;
  message: string;
  senderId: string;
  receiverId?: string;
  timestamp: Date;
  isAIMessage?: boolean;
}

export interface AIResponse {
  content: string;
  isFromAI: boolean;
  timestamp: Date;
  ticketCreated?: boolean;
  supportId?: string;
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
      
      this.socket = io(socketUrl, {
        auth: {
          token: token || localStorage.getItem('access_token')
        },
        transports: ['websocket', 'polling']
      });

      this.socket.on('connect', () => {
        console.log('Socket connected');
        this.isConnected = true;
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.isConnected = false;
        reject(error);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
        this.isConnected = false;
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // AI Chat methods
  joinAIChatRoom(): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinAIChatRoom');
    }
  }

  leaveAIChatRoom(): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveAIChatRoom');
    }
  }

  sendAIMessage(message: string): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('aiChatMessage', {
        message,
        receiverId: 'ai-assistant'
      });
    }
  }

  onAIResponse(callback: (response: AIResponse) => void): void {
    if (this.socket) {
      this.socket.on('aiResponse', callback);
    }
  }

  onNewMessage(callback: (message: SocketMessage) => void): void {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  // General message methods
  sendMessage(data: {
    message: string;
    receiverId?: string;
    roomId?: string;
    supportId?: string;
  }): void {
    if (this.socket && this.isConnected) {
      this.socket.emit('newMessage', data);
    }
  }

  isSocketConnected(): boolean {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
