"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { hotelData, bookingData } from "@/data/dumy";
import Image from "next/image";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetStep } from "@/store/step/step-slice";
import { useTranslations } from "next-intl";

export default function BookingSuccessPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("HotelDetail.BookingSuccessPage");

  const handleGoToHomepage = () => {
    router.push("/");
    setTimeout(() => {
      dispatch(resetStep());
    }, 2000);
  };

  const reservationNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başarı Mesajı */}
        <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8 mb-8 text-center">
          {/* Onay İkonu */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Rezervasyon Numarası */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t("reservationNo")} {reservationNumber}
          </h1>

          {/* Başarı Mesajı */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {t("congratulations", { hotelName: hotelData[0].name })}
          </h2>

          {/* Alt Metin */}
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t("detailsBelow")}
          </p>

          {/* Ana Sayfaya Dön Butonu */}
          <Link href="/" onClick={handleGoToHomepage}>
            <Button className="bg-[#2F6FED] hover:bg-[#2F6FED]/90 text-white px-8 py-3 rounded-lg font-medium">
              {t("goToHomepage")}
            </Button>
          </Link>
        </div>

        {/* Otel ve Rezervasyon Detayları */}
        <div className="shadow-lg overflow-hidden">
          {/* Otel Görseli */}
          <div className="flex flex-col gap-4 dark:bg-card rounded-lg mb-4 dark:shadow-lg">
            <div className="relative h-64 w-full dark:bg-card rounded-lg">
              <Image
                src={"/images/detail1.jpg"}
                alt={"hotel1"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {/* Otel Başlığı */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-2 mt-4 px-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {hotelData[0].name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {hotelData[0].rating.toFixed(1)}
                </span>
                <div className="flex items-center">
                  <Rating defaultValue={hotelData[0].rating} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton
                        key={index}
                        size={14}
                        className="text-yellow-500"
                      />
                    ))}
                  </Rating>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t("reviewsCount", { count: 120 })}
                </span>
              </div>
            </div>
          </div>

          {/* Otel Bilgileri */}
          <div className="p-6 dark:bg-card rounded-lg shadow-lg mt-4">
            {/* Rezervasyon Detayları - Figma Layout */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sol Taraf - Rezervasyon Bilgileri */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {t("reservationInfoTitle")}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("checkInLabel")}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {bookingData.checkIn}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("checkInTime", { time: bookingData.checkInTime })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("checkOutLabel")}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {bookingData.checkOut}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("checkOutTime", { time: bookingData.checkOutTime })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {t("roomTypeAndGuests", {
                        roomType: bookingData.roomType,
                        nights: bookingData.nights,
                        guests: bookingData.guests,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Ödeme Özeti */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {t("paymentSummaryTitle")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("nightsDuration", { nights: bookingData.nights })}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {bookingData.basePrice.toLocaleString("tr-TR")} TL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t("taxesAndFees")}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {bookingData.taxesAndFees.toLocaleString("tr-TR")} TL
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {t("total")}
                      </span>
                      <span className="text-lg font-bold text-[#2F6FED]">
                        {bookingData.total.toLocaleString("tr-TR")} TL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
