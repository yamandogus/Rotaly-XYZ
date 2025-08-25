"use client";

import type React from "react";

import { useEffect, useRef, useState, useCallback } from "react";
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
import { useTranslations } from "next-intl";
import Image from "next/image";
import { aiChatService, type AIChatMessage } from "@/services/ai-chat.service";
import { socketService, type SocketMessage, type TypingEvent } from "@/services/socket.service";

// Welcome mesajını artık t ile oluşturuyoruz
const welcomeMessages = (t: (key: string) => string, onButtonClick?: (action: string) => void) => {
  return (
    <div>
      <div className="max-w-sm w-full bg-card shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
          <h2 className="text-lg font-semibold">🏨 {t("welcome")}</h2>
          <p className="text-sm opacity-90">{t("assistantIntro")}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 px-6 pb-6 mt-4">
          <button 
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => onButtonClick?.('book-room')}
          >
            🛏 {t("bookRoom")}
          </button>
          <button 
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            onClick={() => onButtonClick?.('view-reservation')}
          >
            📅 {t("viewReservation")}
          </button>
          <button 
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={() => onButtonClick?.('live-support')}
          >
            💬 {t("liveSupport")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ChatWidget() {
  const t = useTranslations("ChatWidget");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  // State tanımlamaları
  const [isAIAvailable, setIsAIAvailable] = useState<boolean>(false);
  const [conversationHistory, setConversationHistory] = useState<AIChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [supportId, setSupportId] = useState<string>('');
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  
  const [messages, setMessages] = useState<
    {
      id: number;
      message: string | React.ReactNode;
      sender: "user" | "bot" | "system";
      type?: "live-support" | "ai-response";
      isLoading?: boolean;
    }[]
  >([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    const savedSupportId = localStorage.getItem('chat-supportId');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    }
    
    if (savedSupportId) {
      setSupportId(savedSupportId);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  // Save supportId to localStorage whenever it changes
  useEffect(() => {
    if (supportId) {
      localStorage.setItem('chat-supportId', supportId);
    } else {
      localStorage.removeItem('chat-supportId');
    }
  }, [supportId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Welcome mesaj butonları için handler
  const handleWelcomeAction = useCallback(async (action: string) => {
    switch (action) {
      case 'book-room':
        setIsOpen(false);
        router.push('/hotels');
        break;
      case 'view-reservation':
        setIsOpen(false);
        router.push('/reservations');
        break;
      case 'live-support':
        // Zaten canlı desteğe bağlıysa yeni request oluşturma
        if (supportId) {
          console.log('⚠️ Zaten canlı desteğe bağlı, yeni request oluşturulmuyor');
          return;
        }
        
        // Widget içinde canlı destek başlat
        const newSupportId = `support-${Date.now()}`;
        setSupportId(newSupportId);
        
        // Support room'a katıl
        socketService.joinRoom(newSupportId, 'user');
        
        // Support request oluştur (HTTP API çağrısı)
        try {
          const token = localStorage.getItem("access_token");
          if (token) {
            const response = await fetch('http://localhost:3001/api/support', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                subject: 'Canlı Destek Talebi',
                category: 'GENERAL',
                body: 'Kullanıcı chat widget üzerinden canlı destek talebinde bulundu.'
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log('✅ Support request oluşturuldu:', result);
              setSupportId(result.data.id);
              
              // Support room'a katıl
              socketService.joinRoom(`support:${result.data.id}`, 'user');
            } else {
              const errorText = await response.text();
              console.error('❌ Support request oluşturulamadı:', response.status, errorText);
            }
          }
        } catch (error) {
          console.error('❌ Support request oluşturma hatası:', error);
        }

        const liveSupportMessage = {
          id: Date.now() + 1,
          message: "Canlı destek bağlantısı kuruluyor. Bir temsilci size yardımcı olacak.",
          sender: "system" as const,
          type: "live-support" as const,
        };
        setMessages((prev) => [...prev, liveSupportMessage]);
        break;
      default:
        break;
    }
  }, [router, setIsOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // İlk welcome mesajını ekle
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 1, message: welcomeMessages(t, handleWelcomeAction), sender: "bot" }]);
    }
  }, [t, messages.length, handleWelcomeAction]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("open-chat-widget", openChat);
    return () => window.removeEventListener("open-chat-widget", openChat);
  }, []);

  // Socket.IO bağlantısı ve event listeners
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        // Socket bağlantısını kontrol et
        if (!socketService.isSocketConnected()) {
          await socketService.connect();
        }
        
        setIsSocketConnected(true);
        console.log('✅ Chat Widget: Socket.IO bağlandı');
        
      } catch (error) {
        console.error('❌ Chat Widget: Socket.IO bağlantı hatası:', error);
        setIsSocketConnected(false);
      }
    };

    // Chat açıldığında socket bağlantısını kur
    if (isOpen) {
      initializeSocket();
    }

    // Socket event listeners
    const handleNewMessage = (socketMessage: SocketMessage) => {
      console.log('📨 Chat Widget: Yeni socket mesajı alındı:', socketMessage);
      
      const newMessage = {
        id: Date.now(),
        message: socketMessage.content,
        sender: (socketMessage.senderId?.includes('agent') ? 'bot' : 'user') as 'user' | 'bot' | 'system',
        type: 'live-support' as const,
      };
      
      setMessages(prev => [...prev, newMessage]);
    };

    const handleTyping = (event: TypingEvent) => {
      if (event.isTyping) {
        setIsTyping(true);
        setTypingUser(event.userId);
      } else {
        setIsTyping(false);
        setTypingUser('');
      }
    };

    // Event listener'ları ekle
    socketService.onNewMessage(handleNewMessage);
    socketService.onTyping(handleTyping);

    // Cleanup
    return () => {
      // Event listener'ları temizleme işlemi socket service'de yapılacak
    };
  }, [isOpen]);

  // Clear chat function
  const clearChat = () => {
    setMessages([]);
    setSupportId('');
    setConversationHistory([]);
    localStorage.removeItem('chat-messages');
    localStorage.removeItem('chat-supportId');
  };

  // AI durumunu kontrol et
  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        console.log("🔍 Chat Widget: Checking AI status...");
        
        // AI status kontrolü için authentication gerekmiyor artık
        const status = await aiChatService.checkAIStatus();
        console.log("📊 Chat Widget: AI status received:", status);
        setIsAIAvailable(status);
      } catch (error) {
        console.error("❌ Chat Widget: AI status check failed:", error);
        setIsAIAvailable(false);
      }
    };

    // Chat açıldığında AI durumunu kontrol et
    if (isOpen) {
      checkAIStatus();
    }
  }, [isOpen]);

  const handleLiveSupport = async () => {
    // Zaten canlı desteğe bağlıysa yeni request oluşturma
    if (supportId) {
      console.log('⚠️ Zaten canlı desteğe bağlı, yeni request oluşturulmuyor');
      return;
    }
    
    // Widget içinde canlı destek başlat (aynı logic)
    const newSupportId = `support-${Date.now()}`;
    setSupportId(newSupportId);
    
    // Support room'a katıl
    socketService.joinRoom(newSupportId, 'user');
    
            // Support request oluştur (HTTP API çağrısı)
        try {
          const token = localStorage.getItem("access_token");
          if (token) {
            const response = await fetch('http://localhost:3001/api/support', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                subject: 'Canlı Destek Talebi',
                category: 'GENERAL',
                body: 'Kullanıcı chat widget üzerinden canlı destek talebinde bulundu.'
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log('✅ Support request oluşturuldu:', result);
              setSupportId(result.data.id);
              
              // Support room'a katıl
              socketService.joinRoom(`support:${result.data.id}`, 'user');
            } else {
              const errorText = await response.text();
              console.error('❌ Support request oluşturulamadı:', response.status, errorText);
            }
          }
        } catch (error) {
          console.error('❌ Support request oluşturma hatası:', error);
        }

    const liveSupportMessage = {
      id: Date.now() + 1,
      message: "Canlı destek bağlantısı kuruluyor. Bir temsilci size yardımcı olacak.",
      sender: "system" as const,
      type: "live-support" as const,
    };
    setMessages((prev) => [...prev, liveSupportMessage]);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        message: message,
        sender: "user" as const,
      };

      setMessages((prev) => [...prev, userMessage]);
      const currentMessage = message;
      setMessage("");

      // Typing indicator'ı durdur
      if (supportId && isSocketConnected) {
        socketService.stopTyping(`support:${supportId}`, 'user');
      }

      // Canlı destek modunda ise mesajları support'a gönder
      if (supportId) {
        console.log('📨 Canlı destek modunda mesaj gönderiliyor:', currentMessage);
        
        try {
          // Support mesajını socket ile gönder
          socketService.sendMessage({
            content: currentMessage,
            supportId: supportId
          });
          
          console.log('✅ Support mesajı socket ile gönderildi');
          return; // AI işlemlerine geçme
        } catch (error) {
          console.error('❌ Support mesajı gönderme hatası:', error);
        }
      }

      // Özel komutları kontrol et (sadece AI modunda)
      if (currentMessage.toLowerCase().includes("canlı destek")) {
        // Canlı destek için support room oluştur
        const newSupportId = `support-${Date.now()}`;
        setSupportId(newSupportId);
        
        // Support room'a katıl
        socketService.joinRoom(newSupportId, 'user');
        
        // Support request oluştur (HTTP API çağrısı)
        try {
          const token = localStorage.getItem("access_token");
          if (token) {
            const response = await fetch('http://localhost:3001/api/support', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                subject: 'Canlı Destek Talebi',
                category: 'GENERAL',
                body: 'Kullanıcı canlı destek talep etti. Mesaj: ' + currentMessage
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log('✅ Support request oluşturuldu:', result);
              setSupportId(result.data.id);
              
              // Support room'a katıl
              socketService.joinRoom(`support:${result.data.id}`, 'user');
            } else {
              const errorText = await response.text();
              console.error('❌ Support request oluşturulamadı:', response.status, errorText);
            }
          }
        } catch (error) {
          console.error('❌ Support request oluşturma hatası:', error);
        }

        const liveSupportMessage = {
          id: Date.now() + 1,
          message: "Canlı destek bağlantısı kuruluyor. Bir temsilci size yardımcı olacak.",
          sender: "system" as const,
          type: "live-support" as const,
        };
        setMessages((prev) => [...prev, liveSupportMessage]);
        return;
      } 
      
      if (currentMessage.toLowerCase().includes("anamenu")) {
        const reservationMessage = {
          id: Date.now() + 1,
          message: welcomeMessages(t, handleWelcomeAction),
          sender: "bot" as const,
        };
        setMessages((prev) => [...prev, reservationMessage]);
        return;
      }

      // Loading mesajı ekle (sadece AI modunda)
      const loadingMessage = {
        id: Date.now() + 1,
        message: "...",
        sender: "bot" as const,
        isLoading: true,
      };
      setMessages((prev) => [...prev, loadingMessage]);

      try {
        let botResponseText: string;
        let ticketCreated = false;
        let supportIdFromAI: string | undefined;

        // Token kontrolü
        const token = localStorage.getItem("access_token");
        
        if (isAIAvailable && token) {
          // AI ile sohbet et
          console.log("🤖 Chat Widget: Sending message to AI...");
          const aiResponse = await aiChatService.sendMessage(
            currentMessage,
            conversationHistory
          );
          
          console.log("✅ Chat Widget: AI response received:", aiResponse);
          
          botResponseText = aiResponse.response;
          ticketCreated = aiResponse.ticketCreated;
          supportIdFromAI = aiResponse.supportId;

          // Konuşma geçmişini güncelle
          setConversationHistory(prev => [
            ...prev,
            { role: "user", content: currentMessage },
            { role: "assistant", content: aiResponse.response }
          ]);

          // Eğer support room varsa, AI mesajını socket ile de gönder
          if (supportIdFromAI && isSocketConnected) {
            socketService.sendMessage({
              content: aiResponse.response,
              supportId: supportIdFromAI
            });
          }
        } else {
          // AI kullanılamıyorsa veya giriş yapılmamışsa fallback mesajı kullan
          console.log("⚠️ Chat Widget: AI not available or not authenticated, using fallback");
          if (!token) {
            botResponseText = "Merhaba! AI asistan özelliklerini kullanabilmek için lütfen giriş yapın. Genel sorularınız için size yardımcı olmaya devam edebilirim.";
          } else {
            botResponseText = aiChatService.getFallbackMessage(currentMessage);
          }
        }

        // Loading mesajını gerçek yanıtla değiştir
        setMessages((prev) => 
          prev.map((msg) => 
            msg.isLoading 
              ? { 
                  ...msg, 
                  message: botResponseText, 
                  isLoading: false,
                  type: ticketCreated ? "ai-response" as const : undefined
                }
              : msg
          )
        );

        // Eğer ticket oluşturulduysa bilgilendirme mesajı ekle
        if (ticketCreated && supportIdFromAI) {
          const ticketMessage = {
            id: Date.now() + 2,
            message: `🎫 Destek talebi oluşturuldu (ID: ${supportIdFromAI}). Bir temsilci en kısa sürede size yardımcı olacak.`,
            sender: "system" as const,
            type: "live-support" as const,
          };
          setMessages((prev) => [...prev, ticketMessage]);
        }

      } catch (error) {
        console.error("AI chat error:", error);
        
        // Hata durumunda loading mesajını hata mesajıyla değiştir
        setMessages((prev) => 
          prev.map((msg) => 
            msg.isLoading 
              ? { 
                  ...msg, 
                  message: "Üzgünüm, şu anda size yardımcı olamıyorum. Lütfen daha sonra tekrar deneyin veya canlı destek ile iletişime geçin.", 
                  isLoading: false 
                }
              : msg
          )
        );
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:block">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className={`${isOpen ? "hidden" : "block"}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full shadow-lg p-0 cursor-pointer dark:bg-gray-200 dark:hover:bg-gray-300 border-2 border-green-200 hover:border-green-300 dark:border-green-200 dark:hover:border-green-300"
            size="lg"
          >
            <Image
              src="/images/chatbot.png"
              alt="Ai Chatbot"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="md:w-80 md:h-[550px] md:p-0 flex flex-col transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out overflow-hidden"
          align="end"
        >
          {/* Header */}
          <div className="relative overflow-hidden text-gray-900 dark:text-gray-200 border-b border-b-blue-500">
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{t("assistantTitle")}</h4>
                {supportId && (
                  <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Canlı Destek</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 border-0 text-white cursor-pointer"
                  onClick={clearChat}
                  title="Sohbeti Temizle"
                >
                  🗑️
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 border-0 text-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="w-4 h-4 text-black dark:text-gray-200" />
                </Button>
              </div>
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
                      {msg.isLoading ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      ) : (
                        msg.message
                      )}
                      {msg.sender === "system" &&
                        msg.type === "live-support" && !supportId && (
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
                      {msg.sender === "system" &&
                        msg.type === "live-support" && supportId && (
                          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
                            <div className="flex items-center gap-1 text-green-700">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="font-medium">Canlı Desteğe Bağlandı</span>
                            </div>
                            <div className="text-green-600 mt-1">
                              Destek ID: {supportId}
                            </div>
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
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <Avatar className="w-6 h-6 flex-shrink-0">
                    <AvatarImage src="/images/logo3.png" alt="Rotaly Logo" />
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="bg-gray-100 text-gray-800 rounded-bl-sm p-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
            {/* Status Indicators */}
            <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
              {(() => {
                const token = localStorage.getItem("access_token");
                if (!token) {
                  return (
                    <>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Giriş Gerekli
                    </>
                  );
                }
                return (
                  <>
                    <div className={`w-2 h-2 rounded-full ${isAIAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    {isAIAvailable ? 'AI Asistan Aktif' : 'AI Asistan Çevrimdışı'}
                  </>
                );
              })()}
              
              {/* Socket.IO Status */}
              <span className="mx-2">•</span>
              <div className={`w-2 h-2 rounded-full ${isSocketConnected ? 'bg-green-500' : 'bg-red-400'}`}></div>
              {isSocketConnected ? 'Socket Bağlı' : 'Socket Bağlantısı Yok'}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                placeholder={t("inputPlaceholder")}
                className="flex-1 h-8 text-sm"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  
                          // Typing indicator gönder
        if (e.target.value.length > 0 && supportId && isSocketConnected) {
          socketService.startTyping(`support:${supportId}`, 'user');
        } else if (e.target.value.length === 0 && supportId && isSocketConnected) {
          socketService.stopTyping(`support:${supportId}`, 'user');
        }
                }}
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
