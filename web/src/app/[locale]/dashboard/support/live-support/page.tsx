"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SendIcon, UserIcon } from "lucide-react";
import React, { useState } from "react";

const users = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    avatar: "AY",
    status: "online",
  },
  {
    id: 2,
    name: "Elif Demir",
    email: "elif.demir@example.com",
    avatar: "ED",
    status: "away",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet.kaya@example.com",
    avatar: "MK",
    status: "online",
  },
  {
    id: 4,
    name: "Zeynep Çelik",
    email: "zeynep.celik@example.com",
    avatar: "ZÇ",
    status: "offline",
  },
  {
    id: 5,
    name: "Can Özkan",
    email: "can.ozkan@example.com",
    avatar: "CÖ",
    status: "online",
  },
];
const LiveSupportPage = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      id: number;
      message: string;
      sender: "user" | "bot";
    }[]
  >([{ id: 1, message: "Merhaba, nasıl yardımcı olabilirim?", sender: "bot" }]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, message: message, sender: "user" },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen p-2 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-4">
        <div className="lg:col-span-3">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="account">Bekleyenler</TabsTrigger>
              <TabsTrigger value="online">Çevrimiçi</TabsTrigger>
              <TabsTrigger value="offline">Çevrimdışı</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="flex flex-col gap-2 bg-card rounded-lg p-2">
                {users.map((user) => (
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
                    <div className="flex items-center gap-3 w-full">
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            selectedUser === user.id
                              ? "bg-white text-blue-500"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {user.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                            user.status === "online"
                              ? "bg-green-500"
                              : user.status === "away"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-medium text-sm truncate">
                          {user.name}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            selectedUser === user.id
                              ? "text-blue-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          {user.status === "online"
                            ? "Çevrimiçi"
                            : user.status === "away"
                            ? "Uzakta"
                            : "Çevrimdışı"}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-9">
          <Card className="h-auto w-[90%] min-h-[550px] flex flex-col">
            <CardContent className="flex-1 min-h-[350px] max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <div className="flex flex-col gap-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "bot" && (
                          <Avatar className="w-6 h-6 flex-shrink-0">
                            <AvatarImage
                              src="/images/logo3.png"
                              alt="Rotaly Logo"
                            />
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
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex flex-col gap-3">
              {/* Mesaj Yazma Alanı */}
              <div className="flex w-full gap-2 items-end">
                <Textarea
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] max-h-[120px] resize-none"
                  placeholder="Bir şeyler yazın... örneğin: 'Rezervasyonum hakkında bilgi verir misin?'"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  className="h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 rounded-full flex-shrink-0"
                  variant="default"
                  onClick={handleSendMessage}
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
