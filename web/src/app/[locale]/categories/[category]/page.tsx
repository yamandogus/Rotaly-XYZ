import Image from "next/image";
import SearchForm from "@/components/searchForm";
import HotelCard from "@/components/hotelCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Filters } from "@/components/filters";

// Otel verisi
const hotelData = {
  id: 1,
  name: "Riad Deluxe Hotel",
  location: "Marakeş, Fas",
  rating: 4.5,
  price: "40.290 TL",
  image: "/images/opportunity1.jpg",
  cancel: true,
  breakfast: true,
  parking: true,
  nights: 4, 
};


const mockHotels = Array.from({ length: 45 }, (_, i) => ({
  ...hotelData,
  id: i + 1,
  nights: 4
}));

const ITEMS_PER_PAGE = 9;

interface CategoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Pagination hesaplama
function getPaginationData(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockHotels.slice(startIndex, startIndex + itemsPerPage);

  return { totalPages, currentItems };
}

// Sayfa URL'si oluşturma
function createPageUrl(
  page: number,
  searchParams: { [key: string]: string | string[] | undefined }
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams || {})) {
    if (typeof value === "string" && key !== "page") {
      params.set(key, value);
    }
  }

  params.set("page", page.toString());
  return `?${params.toString()}`;
}

// Pagination butonları render
function renderPaginationItems(
  currentPage: number,
  totalPages: number,
  searchParams: { [key: string]: string | string[] | undefined }
) {
  const items = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i <= 2 || i >= totalPages - 1 || Math.abs(i - currentPage) <= 1) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageUrl(i, searchParams)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    } else if (
      (i === 3 && currentPage > 4) ||
      (i === totalPages - 2 && currentPage < totalPages - 3)
    ) {
      items.push(
        <PaginationItem key={`ellipsis-${i}`}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }

  return items;
}

export default async function CategoryPage({
  searchParams,
}: CategoryPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const { totalPages, currentItems } = getPaginationData(
    mockHotels.length,
    currentPage,
    ITEMS_PER_PAGE
  );

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

        <SearchForm />

        {/* Ana içerik */}
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {/* Filtreler */}
            <Filters />

            {/* Otel Listesi */}
            <div className="lg:col-span-3">
              <div className="bg-background">
                {/* Başlık */}
                <div className="px-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-foreground">
                    Marakeş için {mockHotels.length} sonuç bulundu
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {mockHotels.length} sonuç (Sayfa {currentPage}/{totalPages})
                  </div>
                </div>

                {/* Oteller grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
                    {currentItems.map((hotel, index) => {
                      // Boolean özellikler için açıklamalar
                      const cancelText = hotel.cancel
                        ? "Ücretsiz iptal"
                        : "İptal edilemez";
                      const breakfastText = hotel.breakfast
                        ? "Kahvaltı dahil"
                        : "Kahvaltı dahil değil";
                      const parkingText = hotel.parking
                        ? "Otopark mevcut"
                        : "Otopark yok";

                      return (
                        <HotelCard
                          key={hotel.id}
                          item={{
                            ...hotel,
                            cancelText,
                            breakfastText,
                            parkingText,
                            // nights zaten hotel nesnesinde var, geçiyoruz
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Sayfalama */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-10">
                      <Pagination className="flex justify-end items-center">
                        <PaginationContent>
                          {/* Önceki */}
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious
                                href={createPageUrl(
                                  currentPage - 1,
                                  resolvedSearchParams
                                )}
                              />
                            </PaginationItem>
                          )}

                          {/* Sayfa numaraları */}
                          {renderPaginationItems(
                            currentPage,
                            totalPages,
                            resolvedSearchParams
                          )}

                          {/* Sonraki */}
                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext
                                href={createPageUrl(
                                  currentPage + 1,
                                  resolvedSearchParams
                                )}
                              />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
