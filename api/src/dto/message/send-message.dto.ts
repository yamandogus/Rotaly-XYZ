import { z } from "zod";

export const SendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message content is required")
    .max(5000, "Message too long"),
  receiverId: z
    .string()
    .min(1, "Receiver ID is required")
    .refine(
      (val) => {
        return (
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            val
          ) || val.startsWith("ai")
        );
      },
      {
        message:
          "Receiver ID must be a valid UUID or AI identifier starting with 'ai'",
      }
    ),
  supportId: z.string().uuid("Invalid support ID format").optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;
