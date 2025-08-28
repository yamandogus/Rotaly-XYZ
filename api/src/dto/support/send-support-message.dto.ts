import { z } from "zod";

export const SendSupportMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(5000, "Message too long"),
});

export type SendSupportMessageDto = z.infer<typeof SendSupportMessageSchema>;
