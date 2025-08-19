"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SendIcon,
  UserIcon,
  MessageCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const LiveSupportPage = () => {
  const t = useTranslations("LiveChat"); // Çeviri fonksiyonu
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("support");
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: t("systemWelcome"),
      sender: "support",
      timestamp: "14:30",
    },
    {
      id: 2,
      message: t("exampleUserMessage"),
      sender: "user",
      timestamp: "14:32",
    },
    {
      id: 3,
      message: t("supportReply"),
      sender: "support",
      timestamp: "14:33",
    },
    {
      id: 4,
      message: t("systemInfo"),
      sender: "system",
      timestamp: "14:35",
    },
  ]);

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (message.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      message: message,
      sender: "support" as const,
      timestamp: new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="min-h-screen p-2 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-4">
        {/* Sol Panel */}
        <div className="lg:col-span-4">
          <Card>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger
                    value="support"
                    className="flex items-center gap-1 w-full"
                  >
                    <MessageCircleIcon className="w-3 h-3" />
                    {t("supportUnit")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="support" className="mt-4">
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                    <Button
                      variant="default"
                      className="w-full h-auto p-3 justify-start text-left bg-blue-50 hover:bg-blue-100 border-blue-200"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-blue-500 text-white">
                            <MessageCircleIcon className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm truncate">
                              {t("supportUnit")}
                            </p>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 text-xs"
                            >
                              {t("online")}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            {t("expertTeam")}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{t("responseTime")}</span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Panel */}
        <div className="lg:col-span-8">
          <Card className="h-[600px] flex flex-col pt-0">
            {/* Header */}
            <CardHeader className="border-b bg-green-500 text-white rounded-t-lg pb-0 mb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/images/logo3.png" />
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-lg">
                      {t("supportTitle")}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <Badge
                        variant="secondary"
                        className="bg-green-300 text-green-800 text-xs"
                      >
                        {t("online")}
                      </Badge>
                      <span className="text-sm opacity-90">{t("expertTeam")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent
              className="flex-1 overflow-y-auto p-4"
              id="messages-container"
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${
                      msg.sender === "support"
                        ? "justify-end"
                        : msg.sender === "system"
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    {msg.sender === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src="/images/logo3.png" alt="User" />
                      </Avatar>
                    )}

                    <div className="flex flex-col">
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          msg.sender === "support"
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : msg.sender === "system"
                            ? "bg-yellow-50 text-gray-800 rounded-lg border border-yellow-200 text-center"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        {msg.sender === "system" && (
                          <AlertCircleIcon className="w-4 h-4 inline mr-2 text-yellow-600" />
                        )}
                        {msg.message}
                      </div>
                      <span
                        className={`text-xs text-gray-500 mt-1 ${
                          msg.sender === "system" ? "text-center" : ""
                        }`}
                      >
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

            {/* Input */}
            <CardFooter className="border-t p-4">
              <div className="relative w-full">
                <Textarea
                  className="w-full resize-none rounded-lg border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[48px] max-h-[120px]"
                  placeholder={t("typeMessage")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSendMessage()
                  }
                />
                <Button
                  className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white rounded-full"
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim()}
                >
                  <SendIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPage;
