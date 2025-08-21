import { z } from "zod";
import { createFlexibleIdSchema } from "../../middleware/validate.middleware";

export const SendMessageSchema = z
  .object({
    content: z
      .string()
      .min(1, "Message content is required")
      .max(5000, "Message too long"),
    receiverId: createFlexibleIdSchema("receiverId"),
    supportId: z.string().uuid("Invalid support ID format").optional(),
  })
  .refine(
    (data) => {
      // AI receivers should not have supportId
      if (data.receiverId.startsWith("ai-assistant") && data.supportId) {
        return false;
      }
      return true;
    },
    {
      message: "AI conversations cannot be associated with support tickets",
      path: ["supportId"],
    }
  );

export type SendMessageDto = z.infer<typeof SendMessageSchema>;
