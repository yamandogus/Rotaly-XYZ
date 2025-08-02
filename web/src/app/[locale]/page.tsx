"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SearchForm from "@/components/searchForm";
import HotelCard from "@/components/hotelCard";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const categories = [
    { name: t("categoryDaire"), label: "Daire", icon: "/icons/daire.svg" },
    { name: t("categoryHotel"), label: "Hotel", icon: "/icons/otel.svg" },
    { name: t("categoryVilla"), label: "Villa", icon: "/icons/villa.svg" },
    {
      name: t("categoryBungalow"),
      label: "Bungalov",
      icon: "/icons/bungalov.svg",
    },
    { name: t("categoryRoom"), label: "Oda", icon: "/icons/oda.svg" },
    {
      name: t("categoryCountryHouse"),
      label: "Tatil Köyü",
      icon: "/icons/tatilköyü.svg",
    },
    {
      name: t("categoryPension"),
      label: "Pansiyon",
      icon: "/icons/pansiyon.svg",
    },
    { name: t("categoryCamp"), label: "Kamp", icon: "/icons/kamp.svg" },
  ];

  const destinations = [
    { name: t("destinationParis"), image: "/images/paris.jpg" },
    { name: t("destinationMarrakech"), image: "/images/marakes.jpg" },
    { name: t("destinationRome"), image: "/images/roma.jpg" },
    { name: t("destinationIzmir"), image: "/images/izmir.jpg" },
    { name: t("destinationBarcelona"), image: "/images/barselona.jpg" },
    { name: t("destinationAntalya"), image: "/images/antalya.jpg" },
  ];

const specialOffers = [
    {
      id: 1,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity1.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 2,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.3,
      price: "39.000 TL",
      image: "/images/opportunity2jpg.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 3,
    },
    {
      id: 3,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.2,
      price: "42.500 TL",
      image: "/images/opportunity3.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 5,
    },
    {
      id: 4,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.8,
      price: "47.800 TL",
      image: "/images/opportunity4.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 6,
    },
    {
      id: 5,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity5.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 6,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity6.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 7,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity7.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 8,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity8.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative w-full flex flex-col items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[400px] flex justify-center items-start pointer-events-none z-0">
          <Image
            src="/images/MAPPA.png"
            alt="Mappa Logo"
            width={900}
            height={600}
            className="opacity-100 object-contain"
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-12 pb-12 px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            {t("heroHeading")}
          </h1>
          <p className="text-base md:text-lg max-w-2xl mb-8 text-gray-400 font-medium">
            {t("heroSubheading")}
          </p>
        </div>

        <div className="relative w-full h-[60vh] -mt-12 z-10">
          <Image
            src="/images/header.jpg"
            alt="Istanbul cityscape at sunset"
            fill
            className="object-cover rounded-[32px]"
            quality={80}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl -mt-12 px-4 mb-12">
          <SearchForm />
        </div>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center md:text-left">
            {t("popularCategoriesHeading")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="w-full max-w-[160px] flex items-center justify-center space-x-3 p-4 rounded-full bg-gray-100 shadow-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200 border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="w-10 h-8 flex items-center justify-center rounded-full">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center md:text-left">
            {t("destinationsHeading")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                className="flex flex-col items-center space-y-3 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="w-40 h-60 rounded-full overflow-hidden shadow-lg border-4 border-gray-200 dark:border-gray-700 relative">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <span className="text-lg font-semibold text-foreground text-center">
                  {destination.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="max-w-7xl mx-auto px-4 my-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">{t("specialOffers")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialOffers.map((offer) => {
              const cancelText = offer.cancel ? "Ücretsiz iptal" : "İptal edilemez";
              const breakfastText = offer.breakfast ? "Kahvaltı dahil" : "Kahvaltı dahil değil";
              const parkingText = offer.parking ? "Otopark" : "Otopark bulunmamakta";

              return (
                <HotelCard
                  key={offer.id}
                  item={{
                    ...offer,
                    cancelText,
                    breakfastText,
                    parkingText,
                  }}
                />
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}