"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquareIcon, XIcon } from "lucide-react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const initialReservationsData = [
  {
    id: 1,
    hotelName: "Kiad Deluxe Hotel",
    location: "Marmaris",
    image: "/images/opportunity8.jpg",
    rating: 4.5,
    price: "40.290 TL",
    nights: 4,
    roomNumber: 302,
    guests: 2,
    checkIn: "12 Ağustos 2025",
    checkOut: "16 Ağustos 2025",
    breakfast: true,
    parking: true,
    cancel: true,
  },
  {
    id: 2,
    hotelName: "Riad Resort",
    location: "Antalya",
    image: "/images/opportunity6.jpg",
    rating: 4.8,
    price: "35.000 TL",
    nights: 3,
    roomNumber: 215,
    guests: 3,
    checkIn: "20 Ağustos 2025",
    checkOut: "23 Ağustos 2025",
    breakfast: true,
    parking: true,
    cancel: false,
  },
  {
    id: 3,
    hotelName: "Sunset Deluxe Otel",
    location: "Antalya",
    image: "/images/opportunity5.jpg",
    rating: 4.8,
    price: "35.000 TL",
    nights: 3,
    roomNumber: 215,
    guests: 3,
    checkIn: "20 Ağustos 2025",
    checkOut: "23 Ağustos 2025",
    breakfast: false,
    parking: true,
    cancel: true,
  },
];

export default function ReservationsContent() {
  const t = useTranslations("UserProfile.reservationss");
  const [reservations, setReservations] = useState(initialReservationsData);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState({
    name: "",
    location: "",
    image: "",
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  const defaultMessage = useCallback((hotelName: string) => [
    { id: 1, message: `Welcome to ${hotelName}! How can I assist you with your reservation?`, sender: "bot" },
  ], []);

  const [messages, setMessages] = useState(defaultMessage(currentHotel.name));
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      setMessages(defaultMessage(currentHotel.name || t("chat.ourHotel")));
    }
  }, [isChatOpen, currentHotel.name, defaultMessage, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      message,
      sender: "user",
    };
    const botResponse = {
      id: Date.now() + 1,
      message: t("chat.botResponse"),
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setMessage("");
  };

  const openCancelModal = (id: number) => {
    setSelectedReservationId(id);
    setIsCancelModalOpen(true);
  };

  const confirmCancelReservation = () => {
    if (selectedReservationId !== null) {
      setReservations((prev) => prev.filter((res) => res.id !== selectedReservationId));
      setSelectedReservationId(null);
      setIsCancelModalOpen(false);

      // Toast bildirimi
      toast.success("Rezervasyonunuz iptal edildi.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg relative">
      

      <h2 className="text-3xl font-semibold mb-6 -mt-6 text-gray-900 dark:text-white">
        {t("title")}
      </h2>

      <div className="space-y-6">
        {reservations.map((res) => (
          <div
            key={res.id}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.1)] flex flex-col md:flex-row cursor-pointer group hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            style={{ minHeight: "200px" }}
          >
            <div className="relative h-52 md:h-auto md:w-64 w-full">
              <Image
                src={res.image || "/images/opportunity1.jpg"}
                alt={res.hotelName}
                fill
                className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-1"
                priority
              />
            </div>

            <div className="flex flex-col justify-between p-5 flex-1">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{res.hotelName}</h3>
                <p className="text-muted-foreground text-sm mb-3 ml-1">{res.location}</p>
                <p className="text-muted-foreground text-sm mb-1">
                  {t("roomNumber", { roomNumber: res.roomNumber })} • {t("guests", { guests: res.guests })} • {t("nights", { nights: res.nights })}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {t("checkIn", { date: res.checkIn })} • {t("checkOut", { date: res.checkOut })}
                </p>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded-lg ${
                      res.breakfast
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {t("breakfast")}: {res.breakfast ? t("breakfastIncluded") : t("breakfastNotIncluded")}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-lg ${
                      res.parking
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {t("parking")}: {res.parking ? t("parkingAvailable") : t("parkingNotAvailable")}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-lg ${
                      res.cancel
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {t("freeCancellation")}: {res.cancel ? t("freeCancellationAvailable") : t("freeCancellationNotAvailable")}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-blue-600 dark:text-blue-400 text-l font-bold">{res.price}</div>

                <div className="flex items-center gap-1 mr-4">
                  <Rating defaultValue={res.rating} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} size={16} className="text-yellow-500" />
                    ))}
                  </Rating>
                  <span className="text-sm text-muted-foreground ml-1">({res.rating.toFixed(1)})</span>
                </div>

                <div className="flex gap-3">
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-3 py-2 rounded-xl font-semibold text-xs shadow-sm hover:shadow-md transition flex items-center justify-center gap-2"
                    onClick={() => openCancelModal(res.id)}
                  >
                    <XIcon className="w-5 h-5" />
                    {t("cancelReservation")}
                  </button>

                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-xs shadow-sm hover:shadow-md transition flex items-center justify-center gap-2"
                    onClick={() => {
                      setCurrentHotel({
                        name: res.hotelName,
                        location: res.location,
                        image: res.image || "/images/opportunity1.jpg",
                      });
                      setIsChatOpen(true);
                      setMessages([{ id: 1, message: t("chat.welcomeMessage"), sender: "bot" }]);
                      setMessage("");
                    }}
                  >
                    <MessageSquareIcon className="w-5 h-5" />
                    {t("askHotel")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[450px] h-[500px] flex flex-col p-0 ">
          <DialogHeader className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <Image src={currentHotel.image} alt={currentHotel.name} fill className="object-cover" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">{currentHotel.name}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">{currentHotel.location}</DialogDescription>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-muted-foreground hover:text-foreground transition"
            />
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 mr-2">
                    <Image
                      src={currentHotel.image}
                      alt="Rotaly Logo"
                      width={35}
                      height={35}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t flex gap-2 items-center bg-white dark:bg-gray-900">
            <Input
              placeholder={t("chat.placeholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {t("chat.send")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Modal */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <DialogTitle>{t("cancelModal.title")}</DialogTitle>
            <DialogDescription>{t("cancelModal.description")}</DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsCancelModalOpen(false)}>
              {t("cancelModal.cancel")}
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmCancelReservation}>
              {t("cancelModal.confirm")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
