import React, { useState, useEffect, useRef } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { AIChat, AIChatResponse } from "../../types";
import SupportService from "../../services/supportService";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onTicketCreated?: (supportId: string) => void;
}

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({
  onTicketCreated,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAIAvailable, setIsAIAvailable] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAIAvailability();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkAIAvailability = async () => {
    try {
      const status = await SupportService.checkAIStatus();
      setIsAIAvailable(status.available);

      if (status.available) {
        // Add welcome message
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I'm here to help you with your questions. If I can't resolve your issue, I'll create a support ticket for you automatically.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error checking AI availability:", error);
      setIsAIAvailable(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentMessage.trim() || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const chatData: AIChat = {
        message: currentMessage,
        conversationHistory,
      };

      const response: AIChatResponse = await SupportService.sendAIChat(
        chatData
      );

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (response.ticketCreated && response.supportId) {
        const ticketMessage: ChatMessage = {
          role: "assistant",
          content: `I've created a support ticket for you (ID: ${response.supportId}). A support representative will contact you soon.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, ticketMessage]);
        onTicketCreated?.(response.supportId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again or contact support directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isAIAvailable) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            AI Chat Unavailable
          </h3>
          <p className="text-gray-600">
            Our AI assistant is currently unavailable. Please create a support
            ticket directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-96">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-900">
            AI Support Assistant
          </h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!currentMessage.trim() || isLoading}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
