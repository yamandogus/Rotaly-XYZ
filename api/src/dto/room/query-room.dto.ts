import { z } from "zod";
import { RoomFeatureEnum } from "./enums";

export const QueryRoomSchema = z.object({
  hotelId: z.string().uuid().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  capacity: z.number().int().positive().optional(),
  bedCount: z.number().int().min(0).optional(),
  isAvailable: z.boolean().optional(),
  features: z.array(RoomFeatureEnum).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.enum(["price", "capacity", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type QueryRoomDto = z.infer<typeof QueryRoomSchema>;
