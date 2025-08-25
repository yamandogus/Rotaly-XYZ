"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SendIcon, 
  UserIcon, 
  MessageCircleIcon, 
  ClockIcon, 
  CheckCircleIcon,
  AlertCircleIcon,
  PhoneIcon,
  MailIcon
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { socketService, type SocketMessage, type TypingEvent } from "@/services/socket.service";
import { supportService, type SupportRequest, type SupportMessage } from "@/services/support.service";

// Backend'den gelen support request interface'i
interface SupportUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "waiting" | "online" | "away" | "resolved";
  priority: "high" | "medium" | "low";
  lastMessage: string;
  waitTime: string;
  category: string;
  supportId: string;
  createdAt: string;
}

const LiveSupportPage = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("waiting");
  const [users, setUsers] = useState<SupportUser[]>([]);
  const [messages, setMessages] = useState<
    {
      id: number;
      message: string;
      sender: "user" | "support";
      timestamp: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');

  // Otomatik scroll fonksiyonu
  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      // Smooth scroll için
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Mesajlar değiştiğinde otomatik scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket.IO bağlantısı ve backend entegrasyonu
  useEffect(() => {
    const initializeSupport = async () => {
      try {
        setIsLoading(true);
        
        // Socket.IO bağlantısını kur
        if (!socketService.isSocketConnected()) {
          await socketService.connect();
        }
        setIsSocketConnected(true);
        
        // Support request'leri getir
        await fetchSupportRequests();
        
        // Support room'lara katıl
        socketService.joinRoom('support-agents', 'agent');
        
      } catch (error) {
        console.error('Support başlatma hatası:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSupport();

    // Socket event listeners
    const handleNewMessage = (socketMessage: SocketMessage) => {
      console.log('📨 Yeni support mesajı alındı:', socketMessage);
      
      if (socketMessage.supportId) {
        // Eğer bu mesaj şu anda seçili kullanıcıdan geliyorsa UI'a ekle
        if (selectedUser === socketMessage.supportId) {
          const newMessage = {
            id: Date.now(),
            message: socketMessage.content,
            sender: (socketMessage.senderId?.includes('agent') ? 'support' : 'user') as "user" | "support",
            timestamp: new Date().toLocaleTimeString('tr-TR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
        
        // Support request listesini güncelle (yeni mesaj için)
        fetchSupportRequests();
      }
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

    return () => {
      // Cleanup
    };
  }, [selectedUser]);

  // Support request'leri getir
  const fetchSupportRequests = async () => {
    try {
      const response = await supportService.getSupportRequests();
      console.log('📋 Support request\'leri alındı:', response);
      
      if (response.success && response.data && response.data.supports) {
        const supportUsers: SupportUser[] = response.data.supports.map((request: SupportRequest) => ({
          id: request.id,
          name: request.user?.name || 'Anonim Kullanıcı',
          email: request.user?.email || '',
          phone: request.user?.phone || '',
          avatar: (request.user?.name || 'AK').substring(0, 2).toUpperCase(),
          status: request.status === 'open' ? 'waiting' : 
                  request.status === 'assigned' ? 'online' : 
                  request.status === 'resolved' ? 'resolved' : 'away',
          priority: request.priority || 'medium',
          lastMessage: request.message || 'Mesaj yok',
          waitTime: calculateWaitTime(request.createdAt),
          category: request.category || 'general',
          supportId: request.id,
          createdAt: request.createdAt
        }));
        
        setUsers(supportUsers);
      }
    } catch (error) {
      console.error('Support request\'leri getirme hatası:', error);
      // Fallback veriler
      setUsers([]);
    }
  };

  // Bekleme süresini hesapla
  const calculateWaitTime = (createdAt: string): string => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Yeni';
    if (diffMins < 60) return `${diffMins} dk`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} sa`;
  };
   
  const handleSendMessage = async () => {
    if (message.trim() === "" || !selectedUser) return;
    
    const newMessage = {
      id: messages.length + 1,
      message: message,
      sender: "support" as const,
      timestamp: new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setMessages([...messages, newMessage]);
    const currentMessage = message;
    setMessage("");

    // Typing indicator'ı durdur
    if (isSocketConnected) {
      socketService.stopTyping(`support:${selectedUser}`, 'agent');
    }

    try {
      // Socket.IO ile mesaj gönder (backend'e de gidecek)
      if (isSocketConnected) {
        socketService.sendMessage({
          content: currentMessage,
          supportId: selectedUser
        });
        console.log('✅ Support mesajı socket ile gönderildi');
      } else {
        // Socket bağlı değilse HTTP API kullan
        await supportService.sendSupportMessage(selectedUser, currentMessage);
        console.log('✅ Support mesajı HTTP API ile gönderildi');
      }
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting":
        return <ClockIcon className="w-4 h-4 text-orange-500" />;
      case "online":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case "away":
        return <AlertCircleIcon className="w-4 h-4 text-yellow-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-orange-500";
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredUsers = users.filter(user => {
    if (activeTab === "waiting") return user.status === "waiting";
    if (activeTab === "online") return user.status === "online";
    if (activeTab === "away") return user.status === "away";
    return true;
  });

  const selectedUserData = users.find(user => user.id === selectedUser);

  // Kullanıcı seçme fonksiyonu
  const handleUserSelect = async (userId: string) => {
    setSelectedUser(userId);
    setMessages([]); // Mesajları temizle
    
    try {
      // Seçilen kullanıcının mesajlarını getir
      const response = await supportService.getSupportMessages(userId);
      if (response.success && response.data) {
        const supportMessages = response.data.map((msg: SupportMessage) => ({
          id: parseInt(msg.id),
          message: msg.content,
          sender: msg.isAgentMessage ? 'support' : 'user' as const,
          timestamp: new Date(msg.timestamp).toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        }));
        setMessages(supportMessages);
      }
      
      // Support room'a katıl
      if (isSocketConnected) {
        socketService.joinRoom(`support:${userId}`, 'agent');
      }
    } catch (error) {
      console.error('Mesajları getirme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen p-2 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-4">
        {/* Sol Panel - Kullanıcı Listesi */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleIcon className="w-5 h-5" />
                Canlı Destek Talepleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-sm text-gray-600">Destek talepleri yükleniyor...</span>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="waiting" className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    Bekleyen ({users.filter(u => u.status === "waiting").length})
                  </TabsTrigger>
                  <TabsTrigger value="online" className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3" />
                    Çevrimiçi ({users.filter(u => u.status === "online").length})
                  </TabsTrigger>
                  <TabsTrigger value="away" className="flex items-center gap-1">
                    <AlertCircleIcon className="w-3 h-3" />
                    Uzakta ({users.filter(u => u.status === "away").length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-4">
                  <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <Button
                        key={user.id}
                        variant={selectedUser === user.id ? "default" : "ghost"}
                        className={`w-full h-auto p-3 justify-start text-left hover:bg-blue-50 ${
                          selectedUser === user.id
                            ? "bg-blue-500 hover:bg-blue-600"
                            : ""
                        }`}
                        onClick={() => handleUserSelect(user.id)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="relative flex-shrink-0">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                                selectedUser === user.id
                                  ? "bg-white text-blue-500"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {user.avatar}
                            </div>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm truncate">
                                {user.name}
                              </p>
                              <Badge className={`text-xs ${getPriorityColor(user.priority)}`}>
                                {user.priority === "high" ? "Yüksek" : 
                                 user.priority === "medium" ? "Orta" : "Düşük"}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              {user.lastMessage}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              {getStatusIcon(user.status)}
                              <span>
                                {user.status === "waiting" ? `${user.waitTime} bekliyor` :
                                 user.status === "online" ? "Çevrimiçi" :
                                 user.status === "away" ? "Uzakta" : "Çevrimdışı"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sağ Panel - Chat Alanı */}
        <div className="lg:col-span-8">
          <Card className="h-[700px] flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                          {selectedUserData?.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedUserData?.status || "")}`}></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedUserData?.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MailIcon className="w-3 h-3" />
                            {selectedUserData?.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <PhoneIcon className="w-3 h-3" />
                            {selectedUserData?.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(selectedUserData?.priority || "")}>
                        {selectedUserData?.priority === "high" ? "Yüksek Öncelik" : 
                         selectedUserData?.priority === "medium" ? "Orta Öncelik" : "Düşük Öncelik"}
                      </Badge>
                      <Badge variant="outline">
                        {selectedUserData?.category === "reservation" ? "Rezervasyon" :
                         selectedUserData?.category === "payment" ? "Ödeme" :
                         selectedUserData?.category === "modification" ? "Değişiklik" :
                         selectedUserData?.category === "cancellation" ? "İptal" : "Acil"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4" id="messages-container">
                  <div className="flex flex-col gap-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${
                          msg.sender === "support"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "user" && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage
                              src="/images/logo3.png"
                              alt="User"
                            />
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <div
                            className={`max-w-[75%] p-3 rounded-lg text-sm ${
                              msg.sender === "support"
                                ? "bg-blue-500 text-white rounded-br-sm"
                                : "bg-gray-100 text-gray-800 rounded-bl-sm"
                            }`}
                          >
                            {msg.message}
                          </div>
                          <span className="text-xs text-gray-500 mt-1">
                            {msg.timestamp}
                          </span>
                        </div>
                        {msg.sender === "support" && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                              <UserIcon className="w-4 h-4 text-white" />
                            </div>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex gap-2 justify-start">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src="/images/logo3.png" alt="User" />
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="bg-gray-100 text-gray-800 rounded-bl-sm p-3">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* Message Input */}
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2 items-end">
                    <Textarea
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] max-h-[120px] resize-none"
                      placeholder="Mesajınızı yazın..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        
                        // Typing indicator gönder
                        if (e.target.value.length > 0 && selectedUser && isSocketConnected) {
                          socketService.startTyping(`support:${selectedUser}`, 'agent');
                        } else if (e.target.value.length === 0 && selectedUser && isSocketConnected) {
                          socketService.stopTyping(`support:${selectedUser}`, 'agent');
                        }
                      }}
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    />
                    <Button
                      className="h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 rounded-full flex-shrink-0"
                      variant="default"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <SendIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircleIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Destek Talebi Seçin</h3>
                  <p className="text-sm">Sol panelden bir kullanıcı seçerek destek vermeye başlayabilirsiniz.</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPage;
