"use client";

import HotelSummary from "@/components/booking/hotel-summary";
import { HotelNew } from "@/types/hotel";
import React, { useState, useEffect, use } from "react";
import PaymentMethodSelector from "@/components/booking/payment/payment-method-selector";
import PaymentForm, {
  PaymentFormData,
} from "@/components/booking/payment/payment-form";
import PaymentProcessing from "@/components/booking/payment/payment-processing";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { nextStep } from "@/store/step/step-slice";
import { useTranslations } from "next-intl";
import { hotelService } from "@/services";

interface BookingPaymentPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default function BookingPaymentPage({ params }: BookingPaymentPageProps) {
  const { id, locale } = use(params);
  const [hotel, setHotel] = useState<HotelNew | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentControl, setIsPaymentControl] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("HotelDetail.BookingPaymentPage");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const hotelData = await hotelService.getHotelById(id);
        setHotel(hotelData);
      } catch (error) {
        console.error('Otel yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchHotel();
    }
  }, [id]);

  const handleNextStep = () => {
    dispatch(nextStep());
    router.push(`/${locale}/hotels/${id}/booking/success`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Otel yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Otel bulunamadı</h1>
          <p className="text-gray-600 dark:text-gray-400">Aradığınız otel mevcut değil.</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment form data:", data);
    setIsPaymentControl(true);
    setTimeout(() => {
      document
        .querySelector(".payment-processing")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
        handleNextStep();
      }
    }, 8000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-card payment-processing">
        <div>
          {!isPaymentControl ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">
                {t("paymentOptionsTitle")}
              </h1>
              <PaymentMethodSelector />

              <PaymentForm
                onSubmit={onSubmit}
                setCurrentStep={(s) =>
                  router.push(`?step=${s}`, { scroll: false })
                }
              />
            </div>
          ) : (
            <PaymentProcessing />
          )}
        </div>
      </div>
      <div>
        <HotelSummary
          hotel={{
            id: hotel.id,
            name: hotel.name,
            location: hotel.address || hotel.city || '',
            image: hotel.images && hotel.images.length > 0 ? hotel.images[0].url : '/images/detail1.jpg',
            rating: hotel.rating || 0,
            ratingCount: hotel.comments?.length || 120,
            features: {
              cancelFree: hotel.props?.some(p => p.feature === 'CANCEL_POLICY') || false,
              breakfast: hotel.props?.some(p => p.feature === 'BREAKFAST_INCLUDED') || false,
              parking: hotel.props?.some(p => p.feature === 'PARKING') || false,
            },
          }}
          booking={{
            checkIn: new Date().toLocaleDateString('tr-TR'),
            checkOut: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'), // 4 gün sonra
            checkInTime: hotel.checkIn || "15:00",
            checkOutTime: hotel.checkOut || "11:00", 
            roomType: hotel.rooms?.[0]?.name || "Standart Oda",
            guests: hotel.rooms?.[0]?.maxAdults || 2,
            nights: 4,
            basePrice: Number(hotel.rooms?.[0]?.price || 0) * 4,
            taxesAndFees: Math.round(Number(hotel.rooms?.[0]?.price || 0) * 4 * 0.18),
            total: Math.round(Number(hotel.rooms?.[0]?.price || 0) * 4 * 1.18)
          }}
        />
      </div>
    </div>
  );
}
