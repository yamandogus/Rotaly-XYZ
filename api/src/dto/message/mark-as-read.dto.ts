import { z } from "zod";

export const markAsReadSchema = z.object({
  messageIds: z.array(z.string().uuid("Invalid message ID")),
});

export type MarkAsReadSchemaType = z.infer<typeof markAsReadSchema>;
