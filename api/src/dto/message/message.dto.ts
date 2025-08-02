import { z } from "zod";

export const createMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(2000, "Message must be less than 2000 characters"),
  receiverId: z.string().uuid("Invalid receiver ID"),
});

export type CreateMessageSchemaType = z.infer<typeof createMessageSchema>;
