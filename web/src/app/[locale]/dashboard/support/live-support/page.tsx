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

// Örnek kullanıcı verileri
const users = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 555 123 4567",
    avatar: "AY",
    status: "waiting",
    priority: "high",
    lastMessage: "Rezervasyonum hakkında bilgi almak istiyorum",
    waitTime: "5 dk",
    category: "reservation"
  },
  {
    id: 2,
    name: "Elif Demir",
    email: "elif.demir@example.com",
    phone: "+90 555 234 5678",
    avatar: "ED",
    status: "online",
    priority: "medium",
    lastMessage: "Ödeme yaparken sorun yaşıyorum",
    waitTime: "2 dk",
    category: "payment"
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet.kaya@example.com",
    phone: "+90 555 345 6789",
    avatar: "MK",
    status: "online",
    priority: "low",
    lastMessage: "Otel bilgilerini değiştirmek istiyorum",
    waitTime: "1 dk",
    category: "modification"
  },
  {
    id: 4,
    name: "Zeynep Çelik",
    email: "zeynep.celik@example.com",
    phone: "+90 555 456 7890",
    avatar: "ZÇ",
    status: "away",
    priority: "medium",
    lastMessage: "İptal işlemi yapmak istiyorum",
    waitTime: "8 dk",
    category: "cancellation"
  },
  {
    id: 5,
    name: "Can Özkan",
    email: "can.ozkan@example.com",
    phone: "+90 555 567 8901",
    avatar: "CÖ",
    status: "waiting",
    priority: "high",
    lastMessage: "Acil durum, yardım gerekli!",
    waitTime: "12 dk",
    category: "emergency"
  },
];

const LiveSupportPage = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("waiting");
  const [messages, setMessages] = useState<
    {
      id: number;
      message: string;
      sender: "user" | "support";
      timestamp: string;
    }[]
  >([
    { 
      id: 1, 
      message: "Merhaba! Size nasıl yardımcı olabilirim?", 
      sender: "support",
      timestamp: "14:30"
    }
  ]);

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
   
  const handleSendMessage = () => {
    if (message.trim() === "") return;
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
    setMessage("");
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
                        onClick={() => setSelectedUser(user.id)}
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
                  </div>
                </CardContent>

                {/* Message Input */}
                <CardFooter className="border-t p-4">
                  <div className="flex w-full gap-2 items-end">
                    <Textarea
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] max-h-[120px] resize-none"
                      placeholder="Mesajınızı yazın..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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