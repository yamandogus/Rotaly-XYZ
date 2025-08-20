import { z } from "zod";
import { SupportCategory } from "@prisma/client";

export const CreateSupportSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject is too long"),
  body: z
    .string()
    .min(1, "Message body is required")
    .max(2000, "Message is too long"),
  category: z.nativeEnum(SupportCategory).default(SupportCategory.GENERAL),
});

export type CreateSupportDto = z.infer<typeof CreateSupportSchema>;
