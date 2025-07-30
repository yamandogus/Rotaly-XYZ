"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPinIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import SearchForm from "@/components/searchForm";

export default function HomePage() {
  const t = useTranslations("HomePage"); // 'HomePage' namespace for translations

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

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
    },
    {
      id: 2,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity2jpg.jpg",
    },
    {
      id: 3,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity3.jpg",
    },
    {
      id: 4,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity4.jpg",
    },
    {
      id: 5,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity5.jpg",
    },
    {
      id: 6,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity6.jpg",
    },
    {
      id: 7,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity7.jpg",
    },
    {
      id: 8,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity8.jpg",
    },
  ];

  return (
    <main className="flex-1">
      <section className="relative w-full flex flex-col items-center  overflow-hidden">
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
      </section>

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
              <div className="w-10 h-8 flex items-center justify-center bg-white rounded-full">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center md:text-left">
          {t("destinationsHeading")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="flex flex-col items-center space-y-3 cursor-pointer hover:scale-105 transition-transform duration-200"
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

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t("specialOffersHeading")}
          </h2>
          <Button
            variant="link"
            className="text-[#2F6FED] hover:underline p-0 h-auto"
          >
            {t("viewAllOffers")} &rarr;
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialOffers.map((offer) => (
            <Card
              key={offer.id}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={offer.image}
                  alt={offer.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2 text-foreground">
                  {offer.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-2">
                  <MapPinIcon className="inline-block h-4 w-4 mr-1 text-gray-500" />
                  {offer.location}
                </CardDescription>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{offer.rating}</span>
                  <span className="ml-2">
                    ({t("reviewsCount", { count: 120 })})
                  </span>{" "}
                  {/* Örnek yorum sayısı */}
                </div>
                <div className="text-xl font-bold text-[#2F6FED] mb-4">
                  {offer.price}
                </div>
                <Button className="w-full bg-[#2F6FED] hover:bg-[#255fd7] text-white rounded-md">
                  {t("viewDetailsButton")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
