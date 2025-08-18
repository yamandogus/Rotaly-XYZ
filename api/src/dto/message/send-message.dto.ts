import { z } from "zod";
import { createFlexibleIdSchema } from "../../middleware/validate.middleware";

export const SendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(5000, "Message too long"),
  receiverId: createFlexibleIdSchema("receiverId"),
  supportId: z.string().uuid("Invalid support ID format").optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;
