import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  resetPasswordOTP: z
    .string()
    .min(6, "Reset password OTP must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmNewPassword: z
    .string()
    .min(6, "Confirm new password must be at least 6 characters"),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
