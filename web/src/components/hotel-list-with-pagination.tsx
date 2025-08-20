"use client";

import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import HotelCard from "@/components/hotelCard";
import hotelsData from "@/data/hotelsData.json";
import { RootState } from "@/store/store";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { HotelNew } from "@/types/hotel";
import { Button } from "./ui/button";
import { clearSearch } from "@/store/search/search-slice";

const ITEMS_PER_PAGE = 9;

export function HotelListWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  // Store'dan search verilerini al
  const { city, guests } = useSelector((state: RootState) => state.search);

  // Filtrelenmiş oteller - search kriterlerine göre
  const filteredHotels = useMemo(() => {
    let filtered = hotelsData;

    // Şehir filtresi
    if (city.trim()) {
      filtered = filtered.filter(
        (hotel: HotelNew) =>
          hotel.location.toLowerCase().includes(city.toLowerCase()) ||
          hotel.name.toLowerCase().includes(city.toLowerCase())
      );
    }

    // Misafir sayısı filtresi (oda kapasitesi varsa)
    if (guests > 0) {
      // filtered = filtered.filter(hotel => hotel.capacity >= guests);
    }

    return filtered;
  }, [city, guests]); // checkIn ve checkOut bağımlılıkları kaldırıldı

  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredHotels.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background">
      <div className="px-6 flex flex-col gap-2 md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row gap-2 items-center">
        <h2 className="text-base md:text-xl font-bold text-foreground">
          {city && (
            <span className="text-sm md:text-base text-muted-foreground ml-2">
              &quot;{city}&quot; için {" "}
            </span>
          )}
          
        </h2>
        <span>{filteredHotels.length} sonuç bulundu</span>
        </div>
        <div>
          <Button variant="outline" onClick={() => {
            dispatch(clearSearch());
            setCurrentPage(1);
          }}>
            Tüm Otelleri Görünütüle
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Sayfa {currentPage}/{totalPages}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
          {currentItems.map((hotel: HotelNew) => {
            const cancelText = "Ücretsiz iptal";
            const breakfastText = "Kahvaltı dahil";
            const parkingText = "Otopark mevcut";

            return (
              <HotelCard
                key={hotel.id}
                item={{
                  id: hotel.id,
                  name: hotel.name,
                  location: hotel.location,
                  rating: hotel.rating,
                  price: hotel.rooms[0]?.price || 0, // Number olarak gönder
                  image: hotel.images[0]?.url || "/images/hotel-placeholder.jpg",
                  cancelText,
                  breakfastText,
                  parkingText,
                  checkIn: hotel.checkIn || "12:00",
                  checkOut: hotel.checkOut || "14:00",
                  discountRate: hotel.discountRate ?? undefined, // null olması durumunda undefined olarak ayarla
                  isDiscounted: hotel.isDiscounted || false,
                 discountStartDate: hotel.discountStartDate ?? undefined,
                 discountEndDate: hotel.discountEndDate ?? undefined,
                  type: hotel.type,
                  ownerId: hotel.ownerId,
                  isActive: hotel.isActive,
                }}
              />
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10">
            <Pagination>
              <PaginationContent>
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
