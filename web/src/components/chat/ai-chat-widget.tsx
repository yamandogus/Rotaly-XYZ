"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircleIcon,
  SendIcon,
  UserIcon,
  XIcon,
  RefreshCcwIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { aiChatService, AIChatState } from "@/services/ai-chat.service";
import { ChatMessage } from "@/types/chat";
import { useRouter } from "next/navigation";

interface AIStatusIndicatorProps {
  isAvailable: boolean;
  isConnected: boolean;
}

const AIStatusIndicator: React.FC<AIStatusIndicatorProps> = ({
  isAvailable,
  isConnected,
}) => {
  if (!isConnected) {
    return (
      <Badge variant="destructive" className="text-xs">
        <AlertCircleIcon className="w-3 h-3 mr-1" />
        Disconnected
      </Badge>
    );
  }

  if (!isAvailable) {
    return (
      <Badge variant="secondary" className="text-xs">
        <AlertCircleIcon className="w-3 h-3 mr-1" />
        AI Unavailable
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="text-xs bg-green-500">
      <CheckCircleIcon className="w-3 h-3 mr-1" />
      AI Online
    </Badge>
  );
};

interface MessageBubbleProps {
  message: ChatMessage;
  onSupportRedirect?: (supportId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSupportRedirect,
}) => {
  const t = useTranslations("ChatWidget");

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(date));
  };

  return (
    <div
      className={`flex gap-2 ${
        message.isFromAI ? "justify-start" : "justify-end"
      }`}
    >
      {message.isFromAI && (
        <Avatar className="w-6 h-6 flex-shrink-0">
          <AvatarImage src="/images/logo3.png" alt="AI Assistant" />
        </Avatar>
      )}

      <div className="flex flex-col max-w-[80%]">
        <div
          className={`p-3 rounded-lg text-sm ${
            message.isFromAI
              ? "bg-gray-100 text-gray-800 rounded-bl-sm"
              : "bg-blue-500 text-white rounded-br-sm"
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* Support ticket notification */}
          {message.ticketCreated && message.supportId && onSupportRedirect && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <div className="text-yellow-800 mb-2">
                🎫 Support ticket created (#{message.supportId.slice(-8)})
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-6 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                onClick={() => onSupportRedirect(message.supportId!)}
              >
                View Ticket
              </Button>
            </div>
          )}
        </div>

        <div
          className={`text-xs text-gray-500 mt-1 ${
            message.isFromAI ? "text-left" : "text-right"
          }`}
        >
          {formatTime(message.createdAt)}
          {!message.isFromAI && message.readAt && (
            <span className="ml-1">✓</span>
          )}
        </div>
      </div>

      {!message.isFromAI && (
        <Avatar className="w-6 h-6 flex-shrink-0">
          <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
            <UserIcon className="w-3 h-3 text-white" />
          </div>
        </Avatar>
      )}
    </div>
  );
};

const WelcomeMessage: React.FC<{ t: (key: string) => string }> = ({ t }) => (
  <div className="flex justify-start mb-4">
    <Avatar className="w-6 h-6 flex-shrink-0 mr-2">
      <AvatarImage src="/images/logo3.png" alt="AI Assistant" />
    </Avatar>

    <div className="max-w-sm w-full bg-card shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
        <h2 className="text-lg font-semibold">🏨 {t("welcome")}</h2>
        <p className="text-sm opacity-90">{t("assistantIntro")}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 px-6 pb-6 mt-4">
        <div className="text-sm text-gray-600 mb-2">You can ask me about:</div>
        <div className="space-y-2 text-xs text-gray-500">
          <div>• Hotel bookings and reservations</div>
          <div>• Room availability and amenities</div>
          <div>• Pricing and policies</div>
          <div>• Account management</div>
          <div>• Technical support</div>
        </div>
      </div>
    </div>
  </div>
);

export default function AIChatWidget() {
  const t = useTranslations("ChatWidget");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatState, setChatState] = useState<AIChatState>({
    messages: [],
    isLoading: false,
    isConnected: false,
    isAIAvailable: false,
  });
  const [showWelcome, setShowWelcome] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  // Initialize AI chat service
  useEffect(() => {
    const unsubscribe = aiChatService.subscribe((state) => {
      setChatState(state);
      if (state.messages.length > 0) {
        setShowWelcome(false);
      }
    });

    return unsubscribe;
  }, []);

  // Initialize when opened
  useEffect(() => {
    if (isOpen && !chatState.isConnected) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    try {
      await aiChatService.initialize();
    } catch (error) {
      console.error("Failed to initialize AI chat:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || chatState.isLoading) return;

    const messageToSend = message.trim();
    setMessage("");
    setShowWelcome(false);

    try {
      await aiChatService.sendMessage(messageToSend);
    } catch (error) {
      console.error("Failed to send message:", error);
      // You might want to show an error toast here
    }
  };

  const handleSupportRedirect = (supportId: string) => {
    setIsOpen(false);
    router.push(`/support?ticket=${supportId}`);
  };

  const handleRetryConnection = () => {
    initializeChat();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className={`${isOpen ? "hidden" : "block"}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg p-2 cursor-pointer relative"
            size="lg"
          >
            <MessageCircleIcon className="w-10 h-10 text-white" />
            {/* AI status indicator on the chat button */}
            <div className="absolute -top-1 -right-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  chatState.isAIAvailable && chatState.isConnected
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="md:w-80 md:h-[550px] md:p-0 flex flex-col transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out overflow-hidden"
          align="end"
        >
          {/* Header */}
          <div className="relative overflow-hidden text-gray-900 dark:text-gray-200 border-b border-gray-200">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{t("assistantTitle")}</h4>
                <AIStatusIndicator
                  isAvailable={chatState.isAIAvailable}
                  isConnected={chatState.isConnected}
                />
              </div>

              <div className="flex items-center gap-2">
                {!chatState.isConnected && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={handleRetryConnection}
                    disabled={chatState.isLoading}
                  >
                    <RefreshCcwIcon className="w-3 h-3 mr-1" />
                    Retry
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 border-0 text-gray-600 cursor-pointer h-6 px-2"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
            <div className="flex flex-col gap-4 scrollbar-hide">
              {/* Welcome message */}
              {showWelcome && chatState.messages.length === 0 && (
                <WelcomeMessage t={t} />
              )}

              {/* Chat messages */}
              {chatState.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onSupportRedirect={handleSupportRedirect}
                />
              ))}

              {/* Loading indicator */}
              {chatState.isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src="/images/logo3.png" alt="AI Assistant" />
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex-shrink-0">
            {!chatState.isConnected && (
              <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                ⚠️ Connection lost. Click Retry to reconnect.
              </div>
            )}

            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder={
                  chatState.isConnected
                    ? t("inputPlaceholder")
                    : "Connecting..."
                }
                className="flex-1 h-8 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!chatState.isConnected || chatState.isLoading}
              />
              <Button
                size="sm"
                className="h-8 px-3 bg-blue-500 hover:bg-blue-600"
                onClick={handleSendMessage}
                disabled={
                  !message.trim() ||
                  !chatState.isConnected ||
                  chatState.isLoading
                }
              >
                <SendIcon className="w-3 h-3" />
              </Button>
            </div>

            <div className="text-xs text-gray-500 mt-2 text-center">
              {chatState.isAIAvailable
                ? "Powered by AI • Real-time responses"
                : "AI temporarily unavailable"}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
