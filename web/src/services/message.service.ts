import { apiClient } from "./api";
import {
  ChatMessage,
  MessagesResponse,
  ConversationInfo,
  SendMessageData,
  MarkAsReadData,
} from "@/types/chat";

interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const messageService = {
  // Send a message (including AI messages)
  async sendMessage(messageData: SendMessageData): Promise<ChatMessage> {
    const response = await apiClient.post<APIResponse<ChatMessage>>(
      "/messages/send",
      messageData
    );
    return response.data.data;
  },

  // Get messages for a conversation
  async getMessages(params: {
    receiverId: string;
    page?: number;
    limit?: number;
    supportId?: string;
  }): Promise<MessagesResponse> {
    const { receiverId, page = 1, limit = 20, supportId } = params;
    const queryParams = new URLSearchParams({
      receiverId,
      page: page.toString(),
      limit: limit.toString(),
      ...(supportId && { supportId }),
    });

    const response = await apiClient.get<APIResponse<MessagesResponse>>(
      `/messages?${queryParams}`
    );
    return response.data.data;
  },

  // Get user conversations list
  async getConversations(): Promise<ConversationInfo[]> {
    const response = await apiClient.get<APIResponse<ConversationInfo[]>>(
      "/messages/conversations"
    );
    return response.data.data;
  },

  // Mark messages as read
  async markAsRead(data: MarkAsReadData): Promise<{ updatedCount: number }> {
    const response = await apiClient.put<APIResponse<{ updatedCount: number }>>(
      "/messages/mark-read",
      data
    );
    return response.data.data;
  },

  // Delete a message
  async deleteMessage(messageId: string): Promise<void> {
    await apiClient.delete(`/messages/${messageId}`);
  },

  // Edit a message
  async editMessage(messageId: string, content: string): Promise<ChatMessage> {
    const response = await apiClient.put<APIResponse<ChatMessage>>(
      `/messages/${messageId}`,
      { content }
    );
    return response.data.data;
  },

  // Check AI service status
  async checkAIStatus(): Promise<{
    aiServiceAvailable: boolean;
    timestamp: Date;
  }> {
    const response = await apiClient.get<
      APIResponse<{ aiServiceAvailable: boolean; timestamp: Date }>
    >("/messages/ai/status");
    return response.data.data;
  },

  // Send message to AI assistant
  async sendAIMessage(content: string): Promise<ChatMessage> {
    return this.sendMessage({
      content,
      receiverId: "ai-assistant",
    });
  },

  // Get AI conversation history
  async getAIMessages(
    page: number = 1,
    limit: number = 20
  ): Promise<MessagesResponse> {
    return this.getMessages({
      receiverId: "ai-assistant",
      page,
      limit,
    });
  },
};
