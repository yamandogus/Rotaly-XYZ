"use client";

import { useState } from "react";
import HotelCard from "@/components/hotelCard";
import { hotelData } from "@/data/dumy";
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

  const totalPages = Math.ceil(hotelData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = hotelData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Sayfanın üstüne scroll yap
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background">
      {/* Başlık */}
      <div className="px-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">
          {hotelData.length} sonuç bulundu
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}

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
