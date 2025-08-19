"use client";

import { bookingData, hotelData } from "@/data/dumy";
import HotelSummary from "@/components/booking/hotel-summary";
import React, { useState } from "react";
import PaymentMethodSelector from "@/components/booking/payment/payment-method-selector";
import PaymentForm, { PaymentFormData } from "@/components/booking/payment/payment-form";
import PaymentProcessing from "@/components/booking/payment/payment-processing";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setStepIncrease } from "@/store/reservation/reservation-slice";
import { useTranslations } from 'next-intl';

export default function BookingPaymentPage() {
  const [isPaymentControl, setIsPaymentControl] = useState(true);
  const dispatch = useDispatch()
  const router = useRouter();
  const t = useTranslations("HotelDetail.BookingPaymentPage");
  const handleNextStep = () => {
      dispatch(setStepIncrease(3)) // 3. adıma (success sayfasına) geç
    };

  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment form data:", data);
    setIsPaymentControl(false);
    setTimeout(() => {
      if (
        data.cardNumber &&
        data.cvv &&
        data.expiryDate &&
        data.address &&
        data.country &&
        data.phoneNumber &&
        data.specialRequest
      ) {
        handleNextStep()
      }
    }, 6000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card">
        <h1 className="text-2xl font-semibold">{t("paymentOptionsTitle")}</h1>
        
        <PaymentMethodSelector />

        <div>
          {isPaymentControl ? (
            <PaymentForm
              onSubmit={onSubmit}
              setCurrentStep={(s) => router.push(`?step=${s}`, { scroll: false })}
            />
          ) : (
            <PaymentProcessing />
          )}
        </div>
      </div>
      <div>
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
