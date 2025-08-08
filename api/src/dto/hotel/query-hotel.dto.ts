import { z } from "zod";

export const QueryHotelSchema = z.object({
  // Filtreleme
  city: z.string().optional(),
  country: z.string().optional(),
  type: z.enum([
    "APARTMENT", "HOTEL", "VILLA", "BUNGALOW",
    "ROOM", "RESORT", "HOSTEL", "CAMP"
  ]).optional(),
  features: z.array(
    z.enum([
      "WIFI", "POOL", "SPA", "PARKING", "GYM",
      "PET_FRIENDLY", "RESTAURANT", "BREAKFAST_INCLUDED"
    ])
  ).optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxRating: z.number().min(0).max(5).optional(),
  isDiscounted: z.boolean().optional(),
  isActive: z.boolean().optional(),
  
  // Arama
  search: z.string().optional(), // name, description, city, country içinde arama
  
  // Sıralama
  sortBy: z.enum([
    "name", "rating", "createdAt", "price", "discountRate"
  ]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  
  // Sayfalama
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  
  // Özel filtreler
  ownerId: z.string().optional(), // Belirli bir sahibin otelleri
  hasRooms: z.boolean().optional(), // Odası olan oteller
});

export type QueryHotelInput = z.infer<typeof QueryHotelSchema>; 