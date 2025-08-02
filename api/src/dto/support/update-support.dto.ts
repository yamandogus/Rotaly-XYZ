import { z } from "zod";
import {
  SupportStatusEnum,
  SupportPriorityEnum,
  SupportCategoryEnum,
} from "./enums";

// all fields are optional for partial updates
export const updateSupportSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters")
    .optional(),
  body: z
    .string()
    .min(1, "Body is required")
    .max(5000, "Body must be less than 5000 characters")
    .optional(),
  status: SupportStatusEnum.optional(),
  priority: SupportPriorityEnum.optional(),
  category: SupportCategoryEnum.optional(),
  supportRepId: z.string().uuid("Invalid support representative ID").optional(),
});

export type UpdateSupportSchemaType = z.infer<typeof updateSupportSchema>;
