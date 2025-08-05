import { z } from "zod";

export const sendMessageSchema = z.object({
  receiverId: z.string().uuid("Invalid receiver ID"),
  content: z
    .string()
    .min(1, "Message content is required")
    .max(5000, "Message content is too long"),
  supportId: z.string().uuid("Invalid support ID").optional(),
});

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>;
