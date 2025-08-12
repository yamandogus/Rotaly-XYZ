import { z } from "zod";
import { RoomFeatureEnum } from "./enums";

export const UpdateRoomSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  capacity: z.number().int().positive().optional(),
  bedCount: z.number().int().min(0).optional(),
  isAvailable: z.boolean().optional(),
  featureStatus: z
    .array(
      z.object({
        feature: RoomFeatureEnum,
        isAvailable: z.boolean(),
      })
    )
    .optional(),
  imageUrls: z.array(z.string().url()).optional(),
});

export type UpdateRoomDto = z.infer<typeof UpdateRoomSchema>;
