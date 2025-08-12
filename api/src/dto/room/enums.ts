import { z } from "zod";

/**
 * Room özellikleri enum'u
 * Prisma şemanda RoomFeatureStatus üzerinden gelen özellikleri temsil eder.
 * Buradaki değerleri proje gereksinimine göre güncelleyebilirsin.
 */
export const RoomFeatureEnum = z.enum([
  "Wifi",
  "TV",
  "AirConditioning",
  "MiniBar",
  "Balcony",
  "SeaView",
  "RoomService",
]);

export type RoomFeature = z.infer<typeof RoomFeatureEnum>;
