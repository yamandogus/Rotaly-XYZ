"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "@/components/ui/button";
import HotelSummary from "@/components/booking/hotel-summary";
import { bookingData, hotelData } from "@/data/dumy";
import { useDispatch } from "react-redux";
import { setStepIncrease } from "@/store/reservation/reservation-slice";

export default function BookingInformationPage() {
  const dispatch = useDispatch();
  const handleNextStep = () => {
    dispatch(setStepIncrease(2)) // 2. adıma (payment sayfasına) geç
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        <div className="flex flex-col gap-6">
          <form action="" className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name">Adınız</Label>
                <Input
                  type="text"
                  id="name"
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="surname">Soyadınız</Label>
                <Input
                  type="text"
                  id="surname"
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="country">Ülke/Bölge</Label>
              <Input
                type="text"
                id="country"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Telefon Numarası</Label>
              <Input
                type="text"
                id="phone"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Özel İstek</Label>
              <Textarea
                id="message"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 h-24 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleNextStep}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Ödeme ile devam et
              </Button>
            </div>
          </form>
        </div>
        
        <HotelSummary 
          hotel={{
            id: hotelData[0].id.toString(),
            name: hotelData[0].name,
            location: hotelData[0].location,
            image: hotelData[0].image,
            rating: hotelData[0].rating,
            ratingCount: 120,
            features: {
              cancelFree: hotelData[0].cancel,
              breakfast: hotelData[0].breakfast,
              parking: hotelData[0].parking,
            }
          }} 
          booking={bookingData} 
        />
      </div>
    </div>
  );
}
