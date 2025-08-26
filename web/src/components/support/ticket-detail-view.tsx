"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge, CategoryBadge } from "./common/badges";
import { SupportTicket, Message, CreateMessageRequest } from "@/types/support";
import { SupportService } from "@/services/supportService";
import { toast } from "react-hot-toast";
import { ArrowLeft, Send, MessageCircle, User, Headphones } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface TicketDetailViewProps {
  ticketId: string;
}

export const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticketId,
}) => {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("Support");

  useEffect(() => {
    loadTicketData();
  }, [ticketId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadTicketData = async () => {
    setLoading(true);
    try {
      // First get the ticket data
      const ticketData = await SupportService.getSupportTicket(ticketId);
      setTicket(ticketData);

      // Then get messages using the ticket info
      const messagesData = await SupportService.getTicketMessages(ticketData);
      console.log("Messages data:", messagesData);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error loading ticket data:", error);
      toast.error(t("ticketLoadError"));
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !ticket) return;

    setSending(true);
    try {
      const messageData: CreateMessageRequest = {
        content: newMessage,
        supportId: ticket.id,
      };

      const sentMessage = await SupportService.sendMessage({
        ...messageData,
        ticket: ticket,
      });
      console.log("Sent message:", sentMessage);
      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
      toast.success(t("messageSentSuccess"));
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("messageSendError"));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCloseTicket = async () => {
    if (!ticket) return;

    try {
      await SupportService.closeSupportTicket(ticket.id);
      toast.success(t("ticketClosedSuccess"));
      // Reload ticket data to reflect the change
      await loadTicketData();
    } catch (error) {
      console.error("Error closing ticket:", error);
      toast.error(t("ticketCloseError"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-2 text-gray-600">{t("loadingTicket")}</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t("ticketNotFound")}</p>
        <Button onClick={() => router.push("/support")} className="mt-4">
          {t("backToSupport")}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/support")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToSupport")}
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("supportTicket")} #{ticket.id.slice(-8)}
          </h1>
        </div>
        {!ticket.closedAt && (
          <Button variant="destructive" size="sm" onClick={handleCloseTicket}>
            {t("closeTicket")}
          </Button>
        )}
      </div>

      {/* Ticket Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl">{ticket.subject}</CardTitle>
              <div className="flex items-center space-x-2">
                <StatusBadge isOpen={!ticket.closedAt} />
                <CategoryBadge category={ticket.category} />
              </div>
            </div>
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              <p>
                {t("created")}:{" "}
                {format(new Date(ticket.createdAt), "dd MMM yyyy HH:mm", {
                  locale: tr,
                })}
              </p>
              {ticket.closedAt && (
                <p>
                  {t("closed")}:{" "}
                  {format(new Date(ticket.closedAt), "dd MMM yyyy HH:mm", {
                    locale: tr,
                  })}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {t("firstMessage")}:
              </h4>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {ticket.body}
              </p>
            </div>
            {ticket.supportRep && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("assignedRep")}:{" "}
                  <span className="font-medium">
                    {ticket.supportRep.name} {ticket.supportRep.surname}
                  </span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {t("messages")} ({messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                {t("noMessages")}
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender?.role === "CUSTOMER"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.sender?.role === "CUSTOMER"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.sender?.role === "CUSTOMER" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Headphones className="h-4 w-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender?.name} {message.sender?.surname}
                      </span>
                      <span className="text-xs opacity-75">
                        {format(new Date(message.createdAt), "dd MMM HH:mm", {
                          locale: tr,
                        })}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {!ticket.closedAt && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t("typeMessage")}
                  className="flex-1 min-h-[80px] resize-none"
                  disabled={sending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="flex items-center gap-2 px-6"
                >
                  <Send className="h-4 w-4" />
                  {sending ? t("sending") : t("send")}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">{t("enterToSend")}</p>
            </div>
          )}

          {ticket.closedAt && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  {t("ticketClosedMessage")}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
