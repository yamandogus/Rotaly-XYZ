"use client";

import React from "react";
import HotelTabs from "@/components/hotel/hotel-tabs";
import RecentlyViewedHotels from "@/components/hotel/recently-viewed-hotels";
import Breadcrumbs from "@/components/hotel/bread-crumbs";
import ImageGallery from "@/components/hotel/image-gallery";
import HotelInfo from "@/components/hotel/hotel-info";
import BookingForm from "@/components/hotel/booking-form";
import { singleHotelData } from "@/data/dumy";


const HotelDetailPageContent = () => {
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today;
  });
  const [adults, setAdults] = React.useState(1);

  const calculateNights = (checkin: Date | undefined, checkout: Date | undefined) => {
    if (!checkin || !checkout) return 0;
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const numberOfNights = calculateNights(checkInDate, checkOutDate);

  return (
    <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-160px)] text-gray-900 dark:text-gray-100">
      {/* Breadcrumbs */}
      <Breadcrumbs />


      <div className="bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-lg p-6 lg:flex lg:gap-6 transition-colors duration-300">

        {/* Sol: Galeri */}
        <ImageGallery />

        {/* Sağ: Rezervasyon ve Bilgi */}
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
            hotelName={singleHotelData.name}
            hotelLocation={singleHotelData.location}
          />

          <HotelInfo />
        </div>
      </div>

      {/* Sekmeler */}
      <HotelTabs />

      {/* Son görüntülenen oteller */}
      <RecentlyViewedHotels />
    </main>
  );
};

export default HotelDetailPageContent;
