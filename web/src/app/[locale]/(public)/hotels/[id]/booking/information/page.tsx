"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "@/components/ui/button";
import HotelSummary from "@/components/booking/hotel-summary";
import { bookingData, hotelData } from "@/data/dumy";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { nextStep } from "@/store/step/step-slice";

export default function BookingInformationPage() {
  const dispatch = useDispatch();
  const t = useTranslations("HotelDetail.BookingInformationPage");
  
  const handleNextStep = () => {
    dispatch(nextStep());
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        <div className="flex flex-col gap-6">
          <form className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name">{t("nameLabel")}</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder={t("nameLabel")}
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="surname">{t("surnameLabel")}</Label>
                <Input
                  type="text"
                  id="surname"
                  placeholder={t("surnameLabel")}
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                type="email"
                id="email"
                placeholder={t("emailLabel")}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="country">{t("countryLabel")}</Label>
              <Input
                type="text"
                id="country"
                placeholder={t("countryLabel")}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">{t("phoneLabel")}</Label>
              <Input
                type="text"
                id="phone"
                placeholder={t("phoneLabel")}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="specialRequest">{t("specialRequestLabel")}</Label>
              <Textarea
                id="specialRequest"
                placeholder={t("specialRequestPlaceholder")}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 h-24 bg-white dark:bg-gray-800"
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNextStep}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {t("proceedToPaymentButton")}
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
            },
          }}
          booking={bookingData}
        />
      </div>
    </div>
  );
}
