import { z } from "zod";

// Otel tipi enum'u (mevcut DTO'lardaki değerlerle uyumlu)
const HotelTypeEnum = z.enum([
  "APARTMENT",
  "HOTEL",
  "VILLA",
  "BUNGALOW",
  "ROOM",
  "RESORT",
  "HOSTEL",
  "CAMP",
]);

// Listeleme ve filtreleme için query DTO'su
export const QueryHotelSchema = z.object({
  city: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  type: HotelTypeEnum.optional(),
  isDiscounted: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
  ownerId: z.string().min(1).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxRating: z.coerce.number().min(0).max(5).optional(),
  minDiscountPrice: z.coerce.number().min(0).optional(), // Minimum indirimli fiyat
  maxDiscountPrice: z.coerce.number().min(0).optional(), // Maksimum indirimli fiyat
  search: z.string().min(1).optional(),

  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(500).default(10).optional(),

  sortBy: z
    .enum([
      "name",
      "rating",
      "createdAt",
      "updatedAt",
      "discountRate",
      "discountPrice",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type QueryHotelInput = z.infer<typeof QueryHotelSchema>;
