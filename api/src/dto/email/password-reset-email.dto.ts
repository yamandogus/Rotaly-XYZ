import { z } from "zod";

export const passwordResetEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  otp: z.string(),
});

export type PasswordResetEmailSchemaType = z.infer<
  typeof passwordResetEmailSchema
>;
