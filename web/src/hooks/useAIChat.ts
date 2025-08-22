import { useEffect, useState, useCallback } from "react";
import { aiChatService, AIChatState } from "@/services/ai-chat.service";
import { ChatMessage } from "@/types/chat";

export interface UseAIChatReturn {
  // State
  messages: ChatMessage[];
  isLoading: boolean;
  isConnected: boolean;
  isAIAvailable: boolean;

  // Actions
  sendMessage: (content: string) => Promise<void>;
  initialize: () => Promise<void>;
  disconnect: () => void;
  clearConversation: () => void;
  markMessagesAsRead: (messageIds: string[]) => Promise<void>;

  // Computed
  unreadMessages: ChatMessage[];
  hasUnreadMessages: boolean;
}

export const useAIChat = (): UseAIChatReturn => {
  const [state, setState] = useState<AIChatState>({
    messages: [],
    isLoading: false,
    isConnected: false,
    isAIAvailable: false,
  });

  // Subscribe to AI chat service updates
  useEffect(() => {
    const unsubscribe = aiChatService.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  // Actions
  const sendMessage = useCallback(async (content: string) => {
    await aiChatService.sendMessage(content);
  }, []);

  const initialize = useCallback(async () => {
    await aiChatService.initialize();
  }, []);

  const disconnect = useCallback(() => {
    aiChatService.disconnect();
  }, []);

  const clearConversation = useCallback(() => {
    aiChatService.clearConversation();
  }, []);

  const markMessagesAsRead = useCallback(async (messageIds: string[]) => {
    await aiChatService.markMessagesAsRead(messageIds);
  }, []);

  // Computed values
  const unreadMessages = state.messages.filter(
    (msg) => !msg.readAt && msg.isFromAI
  );
  const hasUnreadMessages = unreadMessages.length > 0;

  return {
    // State
    messages: state.messages,
    isLoading: state.isLoading,
    isConnected: state.isConnected,
    isAIAvailable: state.isAIAvailable,

    // Actions
    sendMessage,
    initialize,
    disconnect,
    clearConversation,
    markMessagesAsRead,

    // Computed
    unreadMessages,
    hasUnreadMessages,
  };
};
