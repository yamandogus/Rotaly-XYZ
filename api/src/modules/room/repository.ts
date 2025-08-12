import Prisma from "./../../config/db";
import { CreateRoomDto, UpdateRoomDto } from "../../dto/room";

// Define Room type based on schema
type Room = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  capacity: number;
  bedCount: number;
  isAvailable: boolean;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export const RoomRepository = {
  async createRoom(data: CreateRoomDto) {
    return await Prisma.room.create({
      data: {
        name: data.name,
        price: data.price,
        capacity: data.capacity,
        bedCount: data.bedCount,
        hotelId: data.hotelId,
        description: data.description,
      },
    });
  },

  // 🔵 Belirli bir Room'u ID ile getirme
  async getRoomById(roomId: string) {
    return await Prisma.room.findUnique({
      where: { id: roomId },
      include: {
        hotel: true,
        bookings: true,
        featureStatus: true,
        images: true,
      },
    });
  },

  // 🟡 Belirli bir otele ait tüm Room'ları listeleme
  async getRoomsByHotelId(hotelId: string) {
    return await Prisma.room.findMany({
      where: { hotelId },
      include: {
        featureStatus: true,
        images: true,
      },
    });
  },

  // 🟠 Room güncelleme
  async updateRoom(roomId: string, hotelId: string, data: UpdateRoomDto) {
    return await Prisma.room.update({
      where: { id: roomId },
      data: {
        name: data.name,
        price: data.price,
        capacity: data.capacity,
        bedCount: data.bedCount,
        description: data.description,
        hotelId: hotelId,
      },
    });
  },

  // 🔴 Room silme (soft delete yoksa direkt siler)
  async deleteRoom(roomId: string) {
    return await Prisma.room.delete({
      where: { id: roomId },
    });
  },

  // ⚪ Filtreleme, sıralama, sayfalama ile tüm Room'ları getirme
  async getAllRooms(params?: {
    skip?: number;
    take?: number;
    sortBy?: keyof Room;
    sortOrder?: "asc" | "desc";
    isAvailable?: boolean;
  }) {
    return await Prisma.room.findMany({
      skip: params?.skip,
      take: params?.take,
      where: {
        isAvailable: params?.isAvailable,
      },
      orderBy: params?.sortBy
        ? { [params.sortBy]: params.sortOrder ?? "asc" }
        : undefined,
    });
  },
};
