import { z } from "zod";

// seperated enums for reusability
export const SupportStatusEnum = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
]);
export const SupportPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const SupportCategoryEnum = z.enum([
  "TECHNICAL",
  "BILLING",
  "RESERVATION",
  "GENERAL",
  "COMPLAINT",
  "FEATURE_REQUEST",
]);

export type SupportStatus = z.infer<typeof SupportStatusEnum>;
export type SupportPriority = z.infer<typeof SupportPriorityEnum>;
export type SupportCategory = z.infer<typeof SupportCategoryEnum>;
