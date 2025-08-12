import { z } from "zod";
import { RoomFeatureEnum } from "./enums";

export const RoomFeatureStatusSchema = z.object({
  feature: RoomFeatureEnum,
  isAvailable: z.boolean(),
});

export const RoomResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  capacity: z.number(),
  bedCount: z.number(),
  isAvailable: z.boolean(),
  hotelId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  featureStatus: z.array(RoomFeatureStatusSchema).optional(),
  images: z.array(z.string().url()).optional(),
});

export type RoomResponseDto = z.infer<typeof RoomResponseSchema>;
