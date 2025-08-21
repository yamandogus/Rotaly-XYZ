import { z } from "zod";

export const AIChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z
    .string()
    .min(1, "Message content is required")
    .max(1000, "Message content is too long"),
});

export const AIChatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(
      500,
      "Message is too long. Please keep your message under 500 characters."
    ),
  conversationHistory: z
    .array(AIChatMessageSchema)
    .max(20, "Conversation history is too long")
    .default([]),
});

export type AIChatDto = z.infer<typeof AIChatSchema>;
export type AIChatMessageDto = z.infer<typeof AIChatMessageSchema>;
