"use client";
import React from "react";
import HotelTabs from "@/components/hotel/hotel-tabs";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import RecentlyViewedHotels from "@/components/hotel/recently-viewed-hotels";
import Breadcrumbs from "@/components/hotel/bread-crumbs";
import ImageGallery from "@/components/hotel/image-gallery";
import HotelInfo from "@/components/hotel/hotel-info";
import BookingForm from "@/components/hotel/booking-form";

const HotelDetailPageContent = () => {
  // State'ler
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 4); // Görselde 4 gece seçili
    return today;
  });
  const [adults, setAdults] = React.useState(1); // Görselde başlangıç 1 kişi

  // Gece sayısı hesaplama
  const calculateNights = (checkin: Date | undefined, checkout: Date | undefined) => {
    if (!checkin || !checkout) return 0;
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const numberOfNights = calculateNights(checkInDate, checkOutDate);

  return (
    <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)]">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:flex lg:gap-6">
        {/* Sol: Galeri */}
        <ImageGallery />

       
        <div className="lg:w-1/3 mt-6 lg:mt-0 flex flex-col gap-4">
         

          <BookingForm
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            adults={adults}
            setAdults={setAdults}
            numberOfNights={numberOfNights}
            price={40500}
          />

          {/* Özellikler */}
          <HotelInfo />
        </div>
      </div>

      {/* Sekmeler */}
      <HotelTabs />

      {/* En Son Baktıklarınız */}
      <RecentlyViewedHotels />
    </main>
  );
};

export default HotelDetailPageContent;
