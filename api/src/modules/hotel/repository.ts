import { CreateHotelInput } from "../../dto/hotel/create-hotel.dto";
import Prisma from "../../config/db";

export const HotelRepository = {
  async createHotel(data: CreateHotelInput & { ownerId: string }) {
    const hotel = await Prisma.hotel.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        address: data.address,
        city: data.city,
        country: data.country,
        type: data.type,
        discountRate: data.discountRate,
        ownerId: data.ownerId,
      },
    });

    // Features'ları ayrı olarak ekle
    if (data.features && data.features.length > 0) {
      await Prisma.hotelProps.createMany({
        data: data.features.map(feature => ({
          hotelId: hotel.id,
          feature: feature,
        })),
      });
    }

    return hotel;
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
