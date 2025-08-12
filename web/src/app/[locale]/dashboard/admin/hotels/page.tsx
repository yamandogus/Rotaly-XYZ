"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { hotelsData } from "@/data/dumy";
import { Hotel } from "@/types/hotel";
import {
  HotelCards,
  HotelFilters,
  HotelTable,
  EditHotelDialog,
  AddHotelDialog,
  DeleteHotelDialog,
  HotelMobilCard,
} from "@/components/dashboard/admin/hotels";

export default function HotelsPage() {
  const t = useTranslations("Hotels");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotelsData);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddHotelDialogOpen, setIsAddHotelDialogOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = hotelsData.filter(
      (hotel: Hotel) =>
        hotel.name.toLowerCase().includes(value.toLowerCase()) ||
        hotel.location.toLowerCase().includes(value.toLowerCase()) ||
        hotel.id.toLowerCase().includes(value.toLowerCase()) ||
        hotel.owner.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const handleViewDetails = (hotel: Hotel) => {
    // SEO için ayrı sayfaya yönlendirme yapıyoruz
    router.push(`/dashboard/admin/hotels/${hotel.id}`);
  };

  const handleEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Silme işlemi burada yapılacak
    console.log("Deleting hotel:", selectedHotel?.id);
    setIsDeleteDialogOpen(false);
    setSelectedHotel(null);
  };

  // otel şehirini belirle
  const getCityFromLocation = (location: string) => {
    return location.split(",")[0].trim();
  };

  const getHotelStatus = (status: string) => {
    const filteredHotelsActive = hotelsData.filter(
      (hotel: Hotel) => hotel.status === "Active"
    );
    const filteredHotelsInactive = hotelsData.filter(
      (hotel: Hotel) => hotel.status === "Inactive"
    );
    const filteredHotelsAll = hotelsData;
    if (status === "Active") {
      setFilteredHotels(filteredHotelsActive);
    } else if (status === "Inactive") {
      setFilteredHotels(filteredHotelsInactive);
    } else {
      setFilteredHotels(filteredHotelsAll);
    }
  };

  const getSortBy = (sortBy: string) => {
    const sortedHotels = [...hotelsData].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "rating-desc") {
        return a.rating - b.rating;
      }
      if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      }
      if (sortBy === "type-desc") {
        return b.type.localeCompare(a.type);
      }
      if (sortBy === "createdAt") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "createdAt-desc") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });
    setFilteredHotels(sortedHotels);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <HotelCards />

        {/* Hotel List Section */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <HotelFilters
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              getHotelStatus={getHotelStatus}
              getSortBy={getSortBy}
              setIsAddHotelDialogOpen={setIsAddHotelDialogOpen}
            />
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table */}
            <HotelTable
              filteredHotels={filteredHotels}
              getCityFromLocation={getCityFromLocation}
              getHotelStatus={getHotelStatus}
              getSortBy={getSortBy}
              handleViewDetails={handleViewDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {/* Mobile Cards */}
            <HotelMobilCard
              filteredHotels={filteredHotels}
              getCityFromLocation={getCityFromLocation}
              handleViewDetails={handleViewDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>

      {/* Edit Hotel Dialog */}
      <EditHotelDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        t={t}
        selectedHotel={selectedHotel || ({} as Hotel)}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteHotelDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        t={t}
        selectedHotel={selectedHotel || ({} as Hotel)}
        confirmDelete={confirmDelete}
      />

      {/* Add Hotel Dialog */}
      <AddHotelDialog
        isAddHotelDialogOpen={isAddHotelDialogOpen}
        setIsAddHotelDialogOpen={setIsAddHotelDialogOpen}
        t={t}
      />
    </div>
  );
}
