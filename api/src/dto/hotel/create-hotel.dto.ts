import { z } from "zod";

export const CreateHotelSchema = z.object({
  // Zorunlu alanlar (schema'ya göre)
  name: z.string().min(2, "Otel adı en az 2 karakter olmalı"),
  location: z.string().min(2, "Konum en az 2 karakter olmalı"),
  address: z.string().min(2, "Adres en az 2 karakter olmalı"),
  city: z.string().min(2, "Şehir en az 2 karakter olmalı"),
  country: z.string().min(2, "Ülke en az 2 karakter olmalı"),
  type: z.enum([
    "APARTMENT", "HOTEL", "VILLA", "BUNGALOW",
    "ROOM", "RESORT", "HOSTEL", "CAMP"
  ]),
  
  // Opsiyonel alanlar
  description: z.string().optional(),
  checkIn: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Saat formatı HH:MM olmalı").default("12:00"),
  checkOut: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Saat formatı HH:MM olmalı").default("14:00"),
  rating: z.number().min(0).max(5).optional(),
  
  // İndirim bilgileri
  discountRate: z.number().min(0).max(100).optional(),
  isDiscounted: z.boolean().default(false),
  discountStartDate: z.coerce.date().optional(),
  discountEndDate: z.coerce.date().optional(),
  
  // Aktiflik durumu
  isActive: z.boolean().default(true),
  
  // Vergi ve iş belgeleri
  taxId: z.string().optional(),
  taxOffice: z.string().optional(),
  tradeRegistryNumber: z.string().optional(),
  businessLicense: z.string().optional(),
  addressProof: z.string().optional(),
  taxCertificate: z.string().optional(),
  
  // Hotel özellikleri
  features: z.array(
    z.enum([
      "WIFI", "POOL", "SPA", "PARKING", "GYM",
      "PET_FRIENDLY", "RESTAURANT", "BREAKFAST_INCLUDED", "CANCEL_POLICY"
    ])
  ).optional().default([])
});

export type CreateHotelInput = z.infer<typeof CreateHotelSchema>;
