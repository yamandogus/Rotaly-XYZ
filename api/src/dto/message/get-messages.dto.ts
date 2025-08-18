import { z } from "zod";
import { createFlexibleIdSchema } from "../../middleware/validate.middleware";

export const GetMessagesSchema = z
  .object({
    receiverId: createFlexibleIdSchema("receiverId"),
    supportId: z.string().uuid("Invalid support ID format").optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
  })
  .refine(
    (data) => {
      // AI conversations should not have supportId
      if (data.receiverId.startsWith("ai-assistant") && data.supportId) {
        return false;
      }
      return true;
    },
    {
      message: "AI conversations cannot be filtered by support ticket",
      path: ["supportId"],
    }
  );

export type GetMessagesDto = z.infer<typeof GetMessagesSchema>;
