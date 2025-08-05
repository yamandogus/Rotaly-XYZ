import { z } from "zod";

export const getMessagesQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
  supportId: z.string().uuid("Invalid support ID").optional(),
  conversationWith: z.string().uuid("Invalid user ID").optional(),
});

export type GetMessagesQuerySchemaType = z.infer<typeof getMessagesQuerySchema>;
