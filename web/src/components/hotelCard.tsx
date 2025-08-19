"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Sparkles, HeartIcon, LocateIcon, CarIcon } from "lucide-react";
import { Rating, RatingButton } from "./ui/shadcn-io/rating";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

interface HotelCardProps {
  item: {
    id: number | string;
    name: string;
    location: string;
    rating: number;
    price: string;
    image: string;
    cancelText?: string;
    breakfastText?: string;
    parkingText?: string;
    nights?: number;
  };
  onToggleFavorite?: () => void; // favoriler sayfasından kaldırınca yeniden render için
}

const HotelCard = ({ item, onToggleFavorite }: HotelCardProps) => {
  const t = useTranslations("HotelCard");
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = stored.some((fav: { id: number | string }) => fav.id === item.id);
    setIsFavorite(exists);
  }, [item.id]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (isFavorite) {
      updated = stored.filter((fav: { id: number | string }) => fav.id !== item.id);
    } else {
      updated = [...stored, item];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);

    // Favoriler sayfasındaysan kartı hemen sil
    if (isFavorite && onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <Card
      key={item.id}
      className="bg-card border border-border rounded-2xl overflow-hidden transition-shadow duration-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] dark:shadow-[0_0_5px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] gap-0 pt-1 pb-2 cursor-pointer group flex flex-col h-full"
    >
      <CardHeader className="relative p-0">
        <div className="relative h-52 w-full">
          <Image
            src={item.image || "/images/opportunity1.jpg"}
            alt={item.name}
            fill
            className="object-cover rounded-2xl p-1"
            priority
          />
          <div className="absolute top-3 left-3">
            <div className="bg-[#4E946C] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs font-semibold">{t("discountLabel")}</span>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite();
              }}
              className="bg-white p-1.5 rounded-full"
            >
              <HeartIcon
                className={`w-4 h-4 transition-all ${
                  isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pb-2 flex-grow">
        <h3 className="font-semibold text-foreground mb-2 text-lg leading-tight">
          {item.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <LocateIcon className="w-4 h-4" />
            <span className="text-sm">{item.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-foreground">
              {item.rating.toFixed(1)}
            </span>
            <Rating defaultValue={item.rating} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  key={index}
                  size={14}
                  className="text-yellow-500"
                />
              ))}
            </Rating>
            <span className="text-xs text-muted-foreground ml-1">{t("reviewsCount", { count: 120 })}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.cancelText && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2.5 py-1.5 rounded-lg border border-red-100 dark:border-red-800/30">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <span className="font-medium">{t("cancellationText")}</span>
            </div>
          )}
          {item.breakfastText && (
            <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2.5 py-1.5 rounded-lg border border-green-100 dark:border-green-800/30">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
              <span className="font-medium">{t("breakfastText")}</span>
            </div>
          )}
          {item.parkingText && (
            <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-2.5 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <CarIcon className="w-3 h-3" />
              <span className="font-medium">{t("parkingText")}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-4 flex justify-between items-center gap-2 mt-auto">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground mb-1">
            {t("nightsFor", { nights: item.nights || 1 })}
          </span>
          <span className="text-xl font-bold text-blue-600">{item.price}</span>
        </div>
        <Button 
          onClick={() => router.push(`/hotels/${item.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer max-w-[150px]"
        >
          {t("viewDetails")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;