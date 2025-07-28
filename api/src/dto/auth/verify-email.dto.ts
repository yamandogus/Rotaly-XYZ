import { z } from "zod";
export const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  verificationOTP: z
    .string()
    .min(6, "Verification OTP must be at least 6 characters"),
});

export type VerifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;
