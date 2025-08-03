import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
