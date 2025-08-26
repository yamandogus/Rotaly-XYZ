import { z } from "zod";
import { RoomFeatureEnum } from "./enums";

export const CreateRoomSchema = z.object({
  name: z.string().min(1, "Oda adı gerekli"),
  description: z.string().optional(),
  price: z.number().finite().positive("Fiyat pozitif olmalı"),
  capacity: z
    .number()
    .min(1, "Kapasite en az 1 olmalı")
    .int()
    .positive("Kapasite pozitif tam sayı olmalı"),
  bedCount: z.number().int().min(0, "Yatak sayısı negatif olamaz"),
  maxAdults: z.number().int().min(1, "Maksimum yetişkin sayısı en az 1 olmalı").optional(),
  maxChildren: z.number().int().min(0, "Maksimum çocuk sayısı negatif olamaz").optional(),
  floor: z.number().int().min(0, "Kat numarası negatif olamaz").optional(),
  roomNumber: z.number().int().min(1, "Oda numarası en az 1 olmalı").optional(),
  type: z.enum(["STANDARD", "DELUXE", "SUITE", "PRESIDENTIAL", "EXECUTIVE"]).optional(),
  isAvailable: z.boolean().optional(), // backend default true atayabilir
  // Eğer DB tarafında hotel id'ler UUID ise .uuid() kullan; değilse plain string yap
  hotelId: z.string().uuid("hotelId UUID formatında olmalı"),
  // featureStatus bir dizi: [{ feature: RoomFeature, isAvailable: boolean }]
  featureStatus: z
    .array(
      z.object({
        feature: RoomFeatureEnum,
        isAvailable: z.boolean().default(false),
      })
    )
    .optional(),
  // Oluşma sırasında URL ile resim eklenmesi istenirse
  imageUrls: z.array(z.string().url()).optional(),
});

export type CreateRoomDto = z.infer<typeof CreateRoomSchema>;
