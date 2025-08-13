import { z } from "zod";

export const SendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(5000, "Message too long"),
  receiverId: z
    .string()
    .uuid("Invalid receiver ID format")
    .or(z.string().regex(/^ai.*/i, "Invalid AI ID format")),
  supportId: z.string().uuid("Invalid support ID format").optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;
