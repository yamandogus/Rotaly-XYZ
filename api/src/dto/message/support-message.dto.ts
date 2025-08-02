import { z } from "zod";

export const createSupportMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(2000, "Message must be less than 2000 characters"),
  supportId: z.string().uuid("Invalid support ID"),
});

export type CreateSupportMessageSchemaType = z.infer<
  typeof createSupportMessageSchema
>;
