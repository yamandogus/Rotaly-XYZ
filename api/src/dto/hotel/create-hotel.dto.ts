import { z } from "zod";

export const CreateHotelSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  location: z.string().min(2),
  address: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  type: z.enum([
    "APARTMENT", "HOTEL", "VILLA", "BUNGALOW",
    "ROOM", "RESORT", "HOSTEL", "CAMP"
  ]),
  features: z.array(
    z.enum([
      "WIFI", "POOL", "SPA", "PARKING", "GYM",
      "PET_FRIENDLY", "RESTAURANT", "BREAKFAST_INCLUDED"
    ])
  ).optional(),
  discountRate: z.number().min(0).max(100).optional(),
  discountPrice: z.number().min(0).optional(), // İndirimli fiyat
});

export type CreateHotelInput = z.infer<typeof CreateHotelSchema>;
