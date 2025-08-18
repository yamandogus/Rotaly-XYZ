"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import HotelCard from "@/components/hotelCard";
import { hotelData } from "@/data/dumy";
import { RootState } from "@/store/store";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 9;

export function HotelListWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  // Store'dan search verilerini al
  const { city, checkIn, checkOut, guests } = useSelector(
    (state: RootState) => state.search
  );

  // Filtrelenmiş oteller - search kriterlerine göre
  const filteredHotels = useMemo(() => {
    let filtered = hotelData;

    // Şehir filtresi
    if (city.trim()) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.location.toLowerCase().includes(city.toLowerCase()) ||
          hotel.location.toLowerCase().includes(city.toLowerCase()) ||
          hotel.name.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Misafir sayısı filtresi (oda kapasitesi varsa)
    if (guests > 0) {
      // Bu kısım hotel datasında capacity field'i varsa kullanılabilir
      // filtered = filtered.filter(hotel => hotel.capacity >= guests);
    }

    return filtered;
  }, [city, checkIn, checkOut, guests]);

  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredHotels.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Sayfanın üstüne scroll yap
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background">
      {/* Başlık */}
      <div className="px-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">
          {filteredHotels.length} sonuç bulundu
          {city && (
            <span className="text-sm text-muted-foreground ml-2">
              &quot;{city}&quot; için
            </span>
          )}
        </h2>
        <div className="text-sm text-muted-foreground">
          Sayfa {currentPage}/{totalPages}
        </div>
      </div>

      {/* Oteller grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
          {currentItems.map((hotel) => {
            // Boolean özellikler için açıklamalar
            const cancelText = hotel.cancel
              ? "Ücretsiz iptal"
              : "Ücretsiz iptal edilemez";
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
                }}
              />
            );
          })}
        </div>

        {/* Sayfalama */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10">
            <Pagination>
              <PaginationContent>
                {/* Önceki */}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                )}

                {/* Sayfa numaraları */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* Sonraki */}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
