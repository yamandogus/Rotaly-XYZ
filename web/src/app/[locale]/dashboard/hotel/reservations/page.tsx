"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


import RoomFilters from "@/components/dashboard/hotel/rooms/room-filter";
import RoomTable from "@/components/dashboard/hotel/rooms/room-table";
import RoomMobileCard from "@/components/dashboard/hotel/rooms/room-mobile";
import DeleteRoomDialog from "@/components/dashboard/hotel/rooms/delete-rooms";
import AddRoomDialog from "@/components/dashboard/hotel/rooms/add-room";
import RoomCards from "@/components/dashboard/hotel/rooms/room-cards";
import EditRoomDialog from "@/components/dashboard/hotel/rooms/edit-rooms";
import { Room } from "@/types/room";
import { rooms } from "@/data/dumy";

export default function RoomsPage() {
  const t = useTranslations("Rooms");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(value.toLowerCase()) ||
        room.id.toLowerCase().includes(value.toLowerCase()) ||
        room.hotelId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const handleViewDetails = (room: Room) => {
    router.push(`/dashboard/hotel/reservations/${room.id}`);
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (room: Room) => {
    setSelectedRoom(room);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(t("deletingRoom"), selectedRoom?.id);
    setIsDeleteDialogOpen(false);
    setSelectedRoom(null);
  };

  const getRoomStatus = (status: string) => {
    if (status === "Available") {
      setFilteredRooms(rooms.filter((r) => r.isAvailable));
    } else if (status === "Unavailable") {
      setFilteredRooms(rooms.filter((r) => !r.isAvailable));
    } else {
      setFilteredRooms(rooms);
    }
  };

  const getSortBy = (sortBy: string) => {
    const sortedRooms = [...rooms].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "capacity") return a.capacity - b.capacity;
      if (sortBy === "capacity-desc") return b.capacity - a.capacity;
      if (sortBy === "createdAt")
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "createdAt-desc")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
    setFilteredRooms(sortedRooms);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Stats Cards */}
      <RoomCards />

      {/* Room List Section */}
      <Card className="bg-background border border-border rounded-xl shadow-sm">
        <CardHeader className="pb-4">
          <RoomFilters
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            getRoomStatus={getRoomStatus}
            getSortBy={getSortBy}
            setIsAddRoomDialogOpen={setIsAddRoomDialogOpen}
          />
        </CardHeader>

        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <RoomTable
              filteredRooms={filteredRooms}
              handleViewDetails={handleViewDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>

          {/* Mobile Cards */}
          <div className="block lg:hidden space-y-4">
          <RoomMobileCard
              filteredRooms={filteredRooms}
              handleViewDetails={handleViewDetails}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditRoomDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        selectedRoom={selectedRoom || ({} as Room)}
      />

      <DeleteRoomDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedRoom={selectedRoom || ({} as Room)}
        confirmDelete={confirmDelete}
      />

      <AddRoomDialog
        isAddRoomDialogOpen={isAddRoomDialogOpen}
        setIsAddRoomDialogOpen={setIsAddRoomDialogOpen}
      />
    </div>
  );
}
