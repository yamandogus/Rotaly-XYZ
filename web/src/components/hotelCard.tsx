import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Sparkles, HeartIcon, LocateIcon, CarIcon } from "lucide-react";
import { Rating, RatingButton } from "./ui/shadcn-io/rating";
import { Button } from "./ui/button";

interface HotelCardProps {
  item: number;
}

const HotelCard = ({ item }: HotelCardProps) => {
  return (
    <Card
      key={item}
      className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 border-0 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] gap-0 pt-1 pb-2 cursor-pointer group"
    >
      <CardHeader className="relative p-0">
        <div className="relative h-52 w-full">
          <Image
            src="/images/opportunity1.jpg"
            alt="Riad Deluxe Hotel"
            fill
            className="object-cover rounded-2xl p-1"
            priority
          />
          {/* Sol üst - İndirim badge (yeşil, rounded köşeler) */}
          <div className="absolute top-3 left-3">
            <div className="bg-[#4E946C] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs font-semibold">%20 indirim</span>
            </div>
          </div>
          {/* Sağ üst - Kalp ikonu (beyaz yuvarlak) */}
          <div className="absolute top-3 right-3">
            <div className="bg-white p-1.5 rounded-full">
              <HeartIcon className="w-4 h-4 text-orange-500" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pb-2">
        {/* Otel Adı */}
        <h3 className="font-semibold text-gray-900 mb-2 text-lg leading-tight">
          Riad Deluxe Hotel
        </h3>

        {/* Lokasyon ve Rating - tek satırda */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-gray-500">
            <LocateIcon className="w-4 h-4" />
            <span className="text-sm">Marakeş, Fas</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-900">4.7</span>
            <Rating defaultValue={3} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} size={10} />
              ))}
            </Rating>
            <span className="text-xs text-gray-500 ml-1">(120)</span>
          </div>
        </div>

        {/* Özellikler - Figma'daki renklerle */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100">
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
            <span className="font-medium">Ücretsiz iptal</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-100">
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
            <span className="font-medium">Kahvaltı dahil</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100">
            <CarIcon className="w-3 h-3" />
            <span className="font-medium">Otopark</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-4 flex justify-between items-center gap-2 pb-0">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 mb-1">4 gece için</span>
          <span className="text-xl font-bold text-blue-600">40.000 TL</span>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer">
          Detaylı İncele
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
