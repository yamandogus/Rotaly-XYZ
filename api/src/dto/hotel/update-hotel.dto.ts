import { z } from "zod";

// Hotel model'deki tüm güncellenebilir alanları schema'ya göre eksiksiz tanımla
export const UpdateHotelSchema = z.object({
  // Temel bilgiler
  name: z.string().min(2, "Otel adı en az 2 karakter olmalı").optional(),
  description: z.string().optional(),
  checkIn: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Saat formatı HH:MM olmalı").optional(),
  checkOut: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Saat formatı HH:MM olmalı").optional(),
  location: z.string().min(2, "Konum en az 2 karakter olmalı").optional(),
  address: z.string().min(2, "Adres en az 2 karakter olmalı").optional(),
  city: z.string().min(2, "Şehir en az 2 karakter olmalı").optional(),
  country: z.string().min(2, "Ülke en az 2 karakter olmalı").optional(),
  
  // Derecelendirme
  rating: z.number().min(0).max(5).optional(),
  
  // İndirim bilgileri
  discountRate: z.number().min(0).max(100, "İndirim oranı 0-100 arasında olmalı").optional(),
  isDiscounted: z.boolean().optional(),
  discountStartDate: z.coerce.date().optional(),
  discountEndDate: z.coerce.date().optional(),
  
  // Hotel tipi
  type: z.enum([
    "APARTMENT",
    "HOTEL", 
    "VILLA",
    "BUNGALOW",
    "ROOM",
    "RESORT",
    "HOSTEL",
    "CAMP"
  ]).optional(),
  
  // Aktiflik durumu
  isActive: z.boolean().optional(),
  
  // Vergi ve iş belgeleri
  taxId: z.string().min(1).optional(),
  taxOffice: z.string().min(1).optional(),
  tradeRegistryNumber: z.string().min(1).optional(),
  businessLicense: z.string().min(1).optional(),
  addressProof: z.string().url("Geçerli bir URL olmalı").optional(),
  taxCertificate: z.string().url("Geçerli bir URL olmalı").optional(),
  
  // Hotel özellikleri (HotelProps tablosu için)
  features: z.array(
    z.enum([
      "WIFI",
      "POOL",
      "SPA", 
      "PARKING",
      "GYM",
      "PET_FRIENDLY",
      "RESTAURANT",
      "BREAKFAST_INCLUDED",
      "CANCEL_POLICY"
    ])
  ).optional()
})
.refine((data) => {
  // İndirim başlangıç ve bitiş tarihi kontrolü
  if (data.discountStartDate && data.discountEndDate) {
    return data.discountStartDate < data.discountEndDate;
  }
  return true;
}, {
  message: "İndirim başlangıç tarihi, bitiş tarihinden önce olmalı",
  path: ["discountEndDate"]
})
.refine((data) => {
  // İndirim aktifse indirim oranı gerekli
  if (data.isDiscounted === true && !data.discountRate) {
    return false;
  }
  return true;
}, {
  message: "İndirim aktifken indirim oranı belirtilmeli",
  path: ["discountRate"]
});

export type UpdateHotelInput = z.infer<typeof UpdateHotelSchema>;
