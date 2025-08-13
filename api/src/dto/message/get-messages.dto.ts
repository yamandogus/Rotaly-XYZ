import { z } from "zod";

export const GetMessagesSchema = z.object({
  receiverId: z
    .string()
    .uuid("Invalid receiver ID format")
    .or(z.string().regex(/^ai-bot-\d+$/, "Invalid AI bot ID format")),
  supportId: z.string().uuid("Invalid support ID format").optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type GetMessagesDto = z.infer<typeof GetMessagesSchema>;
