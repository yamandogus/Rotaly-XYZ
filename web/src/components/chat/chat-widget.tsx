"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleIcon, SendIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: number; message: string; sender: "user" | "bot" }[]
  >([{ id: 1, message: "Merhaba, nasıl yardımcı olabilirim?", sender: "bot" }]);
 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>{
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLiveSupport = () => {
    setIsOpen(false);
    router.push("/support/live-chat");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        message: message,
        sender: "user" as const,
      };
      const botResponse = {
        id: Date.now() + 1,
        message:
          "Teşekkür ederim. Size nasıl yardımcı olabilirim? Daha detaylı bilgi için canlı destek ile iletişime geçebilirsiniz.",
        sender: "bot" as const,
      };

      setMessages((prev) => [...prev, userMessage, botResponse]);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg p-2 cursor-pointer"
            size="lg"
          >
            <MessageCircleIcon className="w-10 h-10 text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 h-[500px] p-0 flex flex-col "
          align="end"
        >
          {/* Header - Sabit */}
          <div className="border-b px-4 py-2 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/images/logo3.png"
                alt="Rotaly Logo"
                width={20}
                height={20}
              />
              <h4 className="font-medium">Rotaly AI Asistan</h4>
            </div>
          </div>
          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src="/images/logo3.png" alt="Rotaly Logo" />
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] p-2 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.message}
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
          {/* Footer - Sabit */}
          <div className="border-t p-3 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                placeholder="Mesajınızı giriniz..."
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
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs bg-gray-50 hover:bg-gray-100 text-gray-700"
              onClick={handleLiveSupport}
            >
              <MessageCircleIcon className="w-3 h-3 mr-1" />
              Canlı Destek
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
