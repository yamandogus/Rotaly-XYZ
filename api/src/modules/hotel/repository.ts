import { PrismaClient } from "@prisma/client";
import { CreateHotelInput } from "../../dto/hotel/create-hotel.dto";
import Prisma from "../../config/db";

const prisma = new PrismaClient();


export const HotelRepository = {
  async createHotel( data: CreateHotelInput & { ownerId: string }) {
    return await prisma.hotel.create({
      data: {
        ...data,
      },
    });
  },

  async getHotelById(hotelId: string) {
    return await prisma.hotel.findUnique({
      where: { id: hotelId },
    });
  },

  async getHotelsByOwner(ownerId: string) {
    return await prisma.hotel.findMany({
      where: { ownerId },
    });
  },

  async deleteHotel(hotelId: string, ownerId: string) {
    return await prisma.hotel.deleteMany({
      where: {
        id: hotelId,
        ownerId: ownerId,
      },
    });
  },

  async updateHotel(hotelId: string, data: Partial<CreateHotelInput>) {
    return await prisma.hotel.update({
      where: { id: hotelId },
      data,
    });
  },

  async getAllHotels() {
    return await prisma.hotel.findMany();
  },
};
