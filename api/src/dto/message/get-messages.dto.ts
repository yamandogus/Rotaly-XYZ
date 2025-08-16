import { z } from "zod";

export const GetMessagesSchema = z.object({
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
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type GetMessagesDto = z.infer<typeof GetMessagesSchema>;
