import { CreateHotelInput } from "../../dto/hotel/create-hotel.dto";
import Prisma from "../../config/db";

export const HotelRepository = {
  async createHotel( data: CreateHotelInput & { ownerId: string }) {
    return await Prisma.hotel.create({
      data: {
        ...data,
      },
    });
  },

  async getHotelById(hotelId: string) {
    return await Prisma.hotel.findUnique({
      where: { id: hotelId },
    });
  },

  async getHotelsByOwner(ownerId: string) {
    return await Prisma.hotel.findMany({
      where: { ownerId },
    });
  },

  async deleteHotel(hotelId: string, ownerId: string) {
    return await Prisma.hotel.deleteMany({
      where: {
        id: hotelId,
        ownerId: ownerId,
      },
    });
  },

  async updateHotel(hotelId: string, data: Partial<CreateHotelInput>) {
    return await Prisma.hotel.update({
      where: { id: hotelId },
      data,
    });
  },

  async getAllHotels() {
    return await Prisma.hotel.findMany();
  },


};
