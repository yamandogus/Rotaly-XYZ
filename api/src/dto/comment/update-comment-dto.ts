import { z } from "zod";

export const updateCommentSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().optional(),
});

export type UpdateCommentSchemaType = z.infer<typeof updateCommentSchema>;
