"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleIcon, SendIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Avatar, AvatarImage } from "../ui/avatar";

const welcomeMessages  = () => {
  return (
  <div>
  <div className="max-w-sm w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
    <h2 className="text-lg font-semibold">🏨 Hoşgeldiniz!</h2>
    <p className="text-sm opacity-90">Rotaly Hotel Asistanınız size yardımcı olmak için burada.</p>
  </div>


  <div className="flex flex-col items-center p-6">
    <p className="text-center text-gray-700 text-sm">
      Size rezervasyon, oda bilgisi ve kampanyalar hakkında yardımcı olabilirim. Başlamak için bir seçenek seçin:
    </p>
  </div>

  <div className="grid grid-cols-1 gap-3 px-6 pb-6">
    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      🛏 Oda Rezervasyonu Yap
    </button>
    <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
      📅 Mevcut Rezervasyonumu Gör
    </button>
    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
      💬 Canlı Destek ile Konuş
    </button>
  </div>
</div>
</div>
  )
}


export default function ChatWidget() {
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
  >([{ id: 1, message: welcomeMessages(), sender: "bot" }]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Buraya ekleme yapıldı:
  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("open-chat-widget", openChat);
    return () => window.removeEventListener("open-chat-widget", openChat);
  }, []);

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

      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      // Canlı destek mesajı kontrolü
      if (message.toLowerCase().includes("canlı destek")) {
        const liveSupportMessage = {
          id: Date.now() + 1,
          message:
            "Canlı destek ile bağlanmak istiyorsunuz. Aşağıdaki butona tıklayarak canlı destek ekibimizle iletişime geçebilirsiniz.",
          sender: "system" as const,
          type: "live-support" as const,
        };
        setMessages((prev) => [...prev, liveSupportMessage]);
      } 
      else if (message.toLowerCase().includes("anamenu")) {
        const reservationMessage = {
          id: Date.now() + 1,
          message: welcomeMessages(),
          sender: "bot" as const,
        };
        setMessages((prev) => [...prev, reservationMessage]);
      }
      else {
        const botResponse = {
          id: Date.now() + 1,
          message:
            "Teşekkür ederim. Size nasıl yardımcı olabilirim? Daha detaylı bilgi için canlı destek ile iletişime geçebilirsiniz.",
          sender: "bot" as const,
        };
        setMessages((prev) => [...prev, botResponse]);
      }
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
          className="w-80 h-[550px] p-0 flex flex-col transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out"
          align="end"
        >
          {/* Header - Sabit */}
          <div className=" px-4 py-2 flex-shrink-0 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium dark:text-white">AI Asistan</h4>
              </div>
              <div className="flex items-center gap-2 ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2">
              <svg
                width="100%"
                height="8"
                viewBox="0 0 320 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,4 Q40,0 80,4 T160,4 T240,4 T320,4"
                  fill="none"
                  stroke="rgb(209 213 219)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
            <div className="flex flex-col gap-3 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" || (msg.sender === "system" && msg.type === "live-support") ? (
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src="/images/logo3.png" alt="Rotaly Logo" />
                    </Avatar>
                  ) : null}
                  <div className="flex flex-col">
                    <div
                      className={`max-w-[100%] p-2 rounded-lg text-[12px] ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-sm"
                          : msg.sender === "system"
                          ? "bg-yellow-50 text-gray-800 rounded-bl-sm border border-yellow-200"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      {msg.message}
                      {/* Canlı destek butonu */}
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
                              Canlı Destek
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
