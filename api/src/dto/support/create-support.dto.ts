import { z } from "zod";
import { SupportPriorityEnum, SupportCategoryEnum } from "./enums";

export const createSupportSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .max(5000, "Body must be less than 5000 characters"),
  priority: SupportPriorityEnum.optional().default("MEDIUM"),
  category: SupportCategoryEnum.optional().default("GENERAL"),
});

export type CreateSupportSchemaType = z.infer<typeof createSupportSchema>;
