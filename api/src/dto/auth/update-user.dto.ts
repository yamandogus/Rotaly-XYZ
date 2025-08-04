import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
