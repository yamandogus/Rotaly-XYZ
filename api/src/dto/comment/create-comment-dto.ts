import { z } from "zod";

export const createCommentSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z
    .string()
    .min(1, "Text is required")
    .max(500, "Text must be less than 500 characters")
    .optional(),
  hotelId: z.string(),
});

export type CreateCommentSchemaType = z.infer<typeof createCommentSchema>;
