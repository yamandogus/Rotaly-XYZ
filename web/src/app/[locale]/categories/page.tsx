
"use client";

import Image from "next/image";
import { Filters } from "@/components/filters";
import { BookingSearch } from "@/components/home/booking-search";
import { HotelListWithPagination } from "@/components/hotel-list-with-pagination";
import MobileFilter from "@/components/mobile-filter";

interface CategoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function CategoryPage({
}: CategoryPageProps) {

  const handleSearch = () => {
    const categoryPage = document.querySelector(".category-page");
    if (categoryPage) {
      categoryPage.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-1/2 md:min-h-screen bg-background">
      <div className="relative mb-16">
        {/* Hero Banner */}
        <div className="relative w-full h-[55vh] overflow-hidden">
          <Image
            src="/images/MAPPA.png"
            alt="Banner"
            fill
            className="object-cover md:object-contain"
            priority
          />
        </div>

        <div className="-mt-[400px]  md:-mt-[200px] max-w-6xl flex justify-center items-center mx-auto">
          <BookingSearch handleSearch={handleSearch} />
        </div>

        {/* Ana içerik */}
        <div className="container mx-auto px-4 pt-32 pb-8 category-page">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {/* Filtreler */}
            <Filters />
            <MobileFilter />

            {/* Otel Listesi */}
            <div className="lg:col-span-3">
              <HotelListWithPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
