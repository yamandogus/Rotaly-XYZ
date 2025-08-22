import { z } from "zod";

// Temel otel response şeması
export const HotelResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  location: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  rating: z.number().nullable(),
  discountRate: z.number().nullable(),
  discountPrice: z.number().nullable(), // İndirimli fiyat
  isDiscounted: z.boolean(),
  discountStartDate: z.date().nullable(),
  discountEndDate: z.date().nullable(),
  type: z.enum([
    "APARTMENT", "HOTEL", "VILLA", "BUNGALOW",
    "ROOM", "RESORT", "HOSTEL", "CAMP"
  ]),
  ownerId: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  
  // İş belgeleri
  taxId: z.string().nullable(),
  taxOffice: z.string().nullable(),
  tradeRegistryNumber: z.string().nullable(),
  businessLicense: z.string().nullable(),
  addressProof: z.string().nullable(),
  taxCertificate: z.string().nullable(),
  
  // İlişkili veriler
  features: z.array(z.enum([
    "WIFI", "POOL", "SPA", "PARKING", "GYM",
    "PET_FRIENDLY", "RESTAURANT", "BREAKFAST_INCLUDED"
  ])).optional(),
  images: z.array(z.object({
    id: z.string(),
    url: z.string(),
  })).optional(),
  roomCount: z.number().optional(), // Toplam oda sayısı
  averagePrice: z.number().optional(), // Ortalama oda fiyatı
  owner: z.object({
    id: z.string(),
    name: z.string(),
    surname: z.string(),
    email: z.string(),
  }).optional(),
});

// Liste response şeması
export const HotelListResponseSchema = z.object({
  hotels: z.array(HotelResponseSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

// Detay response şeması (odalar dahil)
export const HotelDetailResponseSchema = HotelResponseSchema.extend({
  rooms: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    capacity: z.number(),
    bedCount: z.number(),
    isAvailable: z.boolean(),
    images: z.array(z.object({
      id: z.string(),
      url: z.string(),
    })),
  })),
  comments: z.array(z.object({
    id: z.string(),
    rating: z.number(),
    text: z.string().nullable(),
    user: z.object({
      id: z.string(),
      name: z.string(),
      surname: z.string(),
    }),
    createdAt: z.date(),
  })).optional(),
});

export type HotelResponse = z.infer<typeof HotelResponseSchema>;
export type HotelListResponse = z.infer<typeof HotelListResponseSchema>;
export type HotelDetailResponse = z.infer<typeof HotelDetailResponseSchema>; 