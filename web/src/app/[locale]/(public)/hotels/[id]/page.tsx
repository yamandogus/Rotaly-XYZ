"use client";

import React, { use, useEffect, useState } from "react";
import HotelTabs from "@/components/hotel/hotel-tabs";
import RecentlyViewedHotels from "@/components/hotel/recently-viewed-hotels";
import Breadcrumbs from "@/components/hotel/bread-crumbs";
import ImageGallery from "@/components/hotel/image-gallery";
import HotelInfo from "@/components/hotel/hotel-info";
import BookingForm from "@/components/hotel/booking-form";

import { hotelService } from "@/services";
import { HotelNew } from "@/types/hotel";

interface HotelDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

const HotelDetailPageContent = ({ params }: HotelDetailPageProps) => {
  const { id } = use(params);
  const [hotel, setHotel] = useState<HotelNew | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today;
  });
  const [adults, setAdults] = useState(1);
  
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
            price={Number(hotel.rooms?.[0]?.price) || 0}
            hotelName={hotel.name}
            hotelLocation={hotel.address || hotel.city || ''}
            hotelId={hotel.id}
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

export default function HotelDetailPage({ params }: HotelDetailPageProps) {
  return <HotelDetailPageContent params={params} />;
}
