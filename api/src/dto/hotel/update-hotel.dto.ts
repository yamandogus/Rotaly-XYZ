import { z } from "zod";

export const UpdateHotelSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  location: z.string().min(2).optional(),
  address: z.string().min(2).optional(),
  city: z.string().min(2).optional(),
  country: z.string().min(2).optional(),
  type: z
    .enum([
      "APARTMENT",
      "HOTEL",
      "VILLA",
      "BUNGALOW",
      "ROOM",
      "RESORT",
      "HOSTEL",
      "CAMP",
    ])
    .optional(),
  features: z
    .array(
      z.enum([
        "WIFI",
        "POOL",
        "SPA",
        "PARKING",
        "GYM",
        "PET_FRIENDLY",
        "RESTAURANT",
        "BREAKFAST_INCLUDED",
      ])
    )
    .optional(),
  discountRate: z.number().min(0).max(100).optional(),
  discountPrice: z.number().min(0).optional(), // İndirimli fiyat
  isDiscounted: z.boolean().optional(),
  discountStartDate: z.date().optional(),
  discountEndDate: z.date().optional(),
  isActive: z.boolean().optional(),
  // İş belgeleri (opsiyonel)
  taxId: z.string().optional(),
  taxOffice: z.string().optional(),
  tradeRegistryNumber: z.string().optional(),
  businessLicense: z.string().optional(),
  addressProof: z.string().optional(),
  taxCertificate: z.string().optional(),
});

export type UpdateHotelInput = z.infer<typeof UpdateHotelSchema>;
