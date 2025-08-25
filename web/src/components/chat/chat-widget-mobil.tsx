"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { MessageCircleIcon, SendIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Welcome mesajını artık t ile oluşturuyoruz
const welcomeMessages = (t: (key: string) => string) => {
  return (
    <div>
      <div className="max-w-sm w-full bg-card shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
          <h2 className="text-lg font-semibold"> {t("welcome")}</h2>
          <p className="text-sm opacity-90">{t("assistantIntro")}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 px-6 pb-6 mt-4">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            🛏 {t("bookRoom")}
          </button>
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
            📅 {t("viewReservation")}
          </button>
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            💬 {t("liveSupport")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ChatWidgetMobile() {
  const t = useTranslations("ChatWidget");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      id: number;
      message: string | React.ReactNode;
      sender: "user" | "bot" | "system";
      type?: "live-support";
    }[]
  >([{ id: 1, message: welcomeMessages(t), sender: "bot" }]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("open-chat-widget", openChat);
    return () => window.removeEventListener("open-chat-widget", openChat);
  }, []);

  const handleLiveSupport = () => {
    setIsOpen(false);
    router.push("/support");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        message: message,
        sender: "user" as const,
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      if (message.toLowerCase().includes("canlı destek")) {
        const liveSupportMessage = {
          id: Date.now() + 1,
          message: t("liveSupportMessage"),
          sender: "system" as const,
          type: "live-support" as const,
        };
        setMessages((prev) => [...prev, liveSupportMessage]);
      } else if (message.toLowerCase().includes("anamenu")) {
        const reservationMessage = {
          id: Date.now() + 1,
          message: welcomeMessages(t),
          sender: "bot" as const,
        };
        setMessages((prev) => [...prev, reservationMessage]);
      } else {
        const botResponse = {
          id: Date.now() + 1,
          message: t("botDefaultMessage"),
          sender: "bot" as const,
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
        <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full shadow-lg p-0 cursor-pointer dark:bg-gray-200 dark:hover:bg-gray-300"
            size="lg"
          >
            <Image src="/images/chatbot.png" alt="Ai Chatbot" width={50} height={50} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[calc(100vh-72px)] w-full p-0 flex flex-col data-[state=open]:animate-slideInUp 
  data-[state=closed]:animate-slideOutDown
  duration-500 top-[72px]"
        >
          {/* Header */}
          <div className="relative overflow-hidden text-gray-900 dark:text-gray-200 border-b border-b-blue-500 flex-shrink-0">
            <div className="px-4 py-2 flex items-center justify-between">
              <SheetTitle className="font-medium">
                {t("assistantTitle")}
              </SheetTitle>
              <SheetClose asChild></SheetClose>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
            <div className="flex flex-col gap-3 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {(msg.sender === "bot" ||
                    (msg.sender === "system" &&
                      msg.type === "live-support")) && (
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src="/images/logo3.png" alt="Rotaly Logo" />
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <div
                      className={`max-w-[100%] p-2 rounded-lg text-[12px] ${
                        msg.sender === "user"
                          ? "bg-blue-500 dark:bg-blue-500 text-white rounded-br-sm"
                          : msg.sender === "system"
                          ? "bg-yellow-50 text-gray-800 rounded-bl-sm border border-yellow-200"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      {msg.message}
                      {msg.sender === "system" &&
                        msg.type === "live-support" && (
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full h-8 text-xs bg-blue-50 hover:bg-blue-800 text-black hover:text-black border-blue-200 transition-all duration-300 cursor-pointer"
                              onClick={handleLiveSupport}
                            >
                              <MessageCircleIcon className="w-3 h-3 mr-1" />
                              {t("liveSupport")}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-3 h-3 text-white" />
                      </div>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                placeholder={t("inputPlaceholder")}
                className="flex-1 h-8 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="sm"
                className="h-8 px-3 bg-blue-500 hover:bg-blue-600"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <SendIcon className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
