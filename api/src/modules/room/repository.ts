
import { PrismaClient } from "@prisma/client";

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

const prisma = new PrismaClient();

export const RoomRepository = {
  async createRoom(data: {
    name: string;
    price: number;
    capacity: number;
    bedCount: number;
    hotelId: string;
    description?: string;
    isAvailable?: boolean;
    featureStatus?: Array<{ feature: string; isAvailable: boolean }>;
    imageUrls?: string[];
  }) {
    return await prisma.room.create({
      data,
    });
  },

  // 🔵 Belirli bir Room'u ID ile getirme
  async getRoomById(roomId: string) {
    return await prisma.room.findUnique({
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
    return await prisma.room.findMany({
      where: { hotelId },
      include: {
        featureStatus: true,
        images: true,
      },
    });
  },

  // 🟠 Room güncelleme
  async updateRoom(roomId: string, data: Partial<Room>) {
    return await prisma.room.update({
      where: { id: roomId },
      data,
    });
  },

  // 🔴 Room silme (soft delete yoksa direkt siler)
  async deleteRoom(roomId: string) {
    return await prisma.room.delete({
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
    return await prisma.room.findMany({
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
