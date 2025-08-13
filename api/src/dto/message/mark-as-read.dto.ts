import { z } from "zod";

export const MarkAsReadSchema = z.object({
  messageIds: z.array(z.string().uuid("Invalid message ID format")),
});

export type MarkAsReadDto = z.infer<typeof MarkAsReadSchema>;
