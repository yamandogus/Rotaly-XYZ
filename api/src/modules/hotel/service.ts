import { CreateHotelInput } from "../../dto/hotel/create-hotel.dto";
import { UpdateHotelInput } from "../../dto/hotel/update-hotel.dto";
import { QueryHotelInput } from "../../dto/hotel/query-hotel.dto";
import Prisma from "../../config/db";

// Service için genişletilmiş tip - ownerId ile birlikte
type CreateHotelWithOwnerInput = CreateHotelInput & { ownerId: string };

export const createHotel = async (input: CreateHotelWithOwnerInput) => {
  const hotel = await Prisma.hotel.create({
    data: {
      ...input,
    },
  });
  return hotel;
};

export const getHotels = async (query?: QueryHotelInput) => {
  const where: any = {};
  
  // Filtreleme
  if (query?.city) where.city = { contains: query.city, mode: 'insensitive' };
  if (query?.country) where.country = { contains: query.country, mode: 'insensitive' };
  if (query?.type) where.type = query.type;
  if (query?.isDiscounted !== undefined) where.isDiscounted = query.isDiscounted;
  if (query?.isActive !== undefined) where.isActive = query.isActive;
  if (query?.ownerId) where.ownerId = query.ownerId;
  if (query?.minRating) where.rating = { gte: query.minRating };
  if (query?.maxRating) where.rating = { ...where.rating, lte: query.maxRating };
  
  // Arama
  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } },
      { city: { contains: query.search, mode: 'insensitive' } },
      { country: { contains: query.search, mode: 'insensitive' } },
    ];
  }
  
  // Sayfalama
  const page = query?.page || 1;
  const limit = query?.limit || 10;
  const skip = (page - 1) * limit;
  
  // Sıralama
  const orderBy: any = {};
  if (query?.sortBy) {
    orderBy[query.sortBy] = query.sortOrder || 'asc';
  } else {
    orderBy.createdAt = 'desc';
  }

  const [hotels, total] = await Promise.all([
    Prisma.hotel.findMany({
      where,
      include: {
        rooms: true,
        images: true,
        owner: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          }
        },
        props: {
          select: {
            feature: true,
          }
        }
      },
      orderBy,
      skip,
      take: limit,
    }),
    Prisma.hotel.count({ where })
  ]);

  // Features'ları düzenle
  const hotelsWithFeatures = hotels.map(hotel => ({
    ...hotel,
    features: hotel.props.map(prop => prop.feature),
    roomCount: hotel.rooms.length,
    averagePrice: hotel.rooms.length > 0 
      ? hotel.rooms.reduce((sum, room) => sum + room.price, 0) / hotel.rooms.length 
      : 0,
  }));

  return {
    hotels: hotelsWithFeatures,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  };
};

export const getHotelById = async (id: string) => {
  return await Prisma.hotel.findUnique({
    where: { id },
    include: { 
      rooms: {
        include: {
          images: true,
        }
      },
      images: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      owner: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        }
      },
      props: {
        select: {
          feature: true,
        }
      }
    },
  });
};

export const deleteHotel = async (id: string) => {
  return await Prisma.hotel.delete({
    where: { id },
  });
};

export const updateHotel = async (id: string, data: UpdateHotelInput) => {
  return await Prisma.hotel.update({
    where: { id },
    data,
  });
};


