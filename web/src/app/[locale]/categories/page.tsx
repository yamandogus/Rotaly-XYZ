
import Image from "next/image";
import { Filters } from "@/components/filters";
import { BookingSearch } from "@/components/home/booking-search";
import { HotelListWithPagination } from "@/components/hotel-list-with-pagination";

interface CategoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({
}: CategoryPageProps) {

  return (
    <div className="min-h-screen bg-background">
      <div className="relative mb-16">
        {/* Hero Banner */}
        <div className="relative w-full h-[55vh] overflow-hidden">
          <Image
            src="/images/MAPPA.png"
            alt="Banner"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="-mt-[200px]">
          <BookingSearch />
        </div>

        {/* Ana içerik */}
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {/* Filtreler */}
            <Filters />

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
