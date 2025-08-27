import { CreateHotelInput } from "../../dto/hotel/create-hotel.dto";
import { UpdateHotelInput } from "../../dto/hotel/update-hotel.dto";
import Prisma from "../../config/db";
import { QueryHotelInput } from "../../dto/hotel/query-hotel.dto";
import { HotelRepository } from "./repository";

// Service için genişletilmiş tip - ownerId ile birlikte
type CreateHotelWithOwnerInput = CreateHotelInput & { ownerId: string };



export const createHotel = async (input: CreateHotelWithOwnerInput) => {
  // Features'ları ayrı tut
  const { features, ...hotelData } = input;
  
  // Hotel'i oluştur
  const hotel = await Prisma.hotel.create({
    data: hotelData,
  });
  
  // Features varsa HotelProps tablosuna ekle
  if (features && features.length > 0) {
    await Prisma.hotelProps.createMany({
      data: features.map(feature => ({
        hotelId: hotel.id,
        feature: feature
      }))
    });
  }
  
  // Hotel'i features ile birlikte döndür
  return await Prisma.hotel.findUnique({
    where: { id: hotel.id },
    include: {
      props: {
        select: {
          feature: true,
        }
      },
      owner: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        }
      }
    }
  });
};

export const getHotels = async (query?: QueryHotelInput) => {
  const where: any = {
    deletedAt: null // Silinmemiş otelleri getir
  };
  
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
  const hotelsWithFeatures = hotels.map((hotel: any) => ({
    ...hotel,
    features: hotel.props.map((prop: any) => prop.feature),
    roomCount: hotel.rooms.length,
    averagePrice: hotel.rooms.length > 0 
      ? hotel.rooms.reduce((sum: number, room: any) => sum + room.price, 0) / hotel.rooms.length 
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
  // Schema'ya göre soft delete kullan (deletedAt alanı var)
  // Hard delete foreign key constraint hatası verir çünkü:
  // - rooms[], images[], comments[], favorites[], props[] ilişkileri var
  
  // Önce hotel'in var olduğunu kontrol et
  const existingHotel = await Prisma.hotel.findUnique({
    where: { id, deletedAt: null },
    select: { id: true, name: true }
  });
  
  if (!existingHotel) {
    throw new Error("Otel bulunamadı veya zaten silinmiş");
  }
  
  // Soft delete - deletedAt alanını set et
  const deletedHotel = await Prisma.hotel.update({
    where: { id },
    data: { 
      deletedAt: new Date(),
      isActive: false // Aynı zamanda pasif yap
    },
    select: {
      id: true,
      name: true,
      deletedAt: true,
      isActive: true
    }
  });
  
  // İsteğe bağlı: İlgili rooms'ları da soft delete yap
  await Prisma.room.updateMany({
    where: { 
      hotelId: id,
      deletedAt: null 
    },
    data: { 
      deletedAt: new Date(),
      isAvailable: false
    }
  });
  
  return {
    message: "Otel başarıyla silindi",
    hotel: deletedHotel
  };
};

export const updateHotel = async (id: string, data: UpdateHotelInput) => {
  // Features'ları ayrı tut
  const { features, ...hotelData } = data;
  
  // Hotel'i güncelle
  const updatedHotel = await Prisma.hotel.update({
    where: { id },
    data: hotelData,
  });
  
  // Features güncellemesi varsa
  if (features !== undefined) {
    // Önce mevcut features'ları sil
    await Prisma.hotelProps.deleteMany({
      where: { hotelId: id }
    });
    
    // Yeni features'ları ekle
    if (features.length > 0) {
      await Prisma.hotelProps.createMany({
        data: features.map(feature => ({
          hotelId: id,
          feature: feature
        }))
      });
    }
  }
  
  // Güncellenmiş hotel'i features ile birlikte döndür
  return await Prisma.hotel.findUnique({
    where: { id },
    include: {
      props: {
        select: {
          feature: true,
        }
      },
      owner: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        }
      }
    }
  });
};

