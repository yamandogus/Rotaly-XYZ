// src/validation/schemas/auth/reset-password.schema.ts

import { z } from "zod";
import {
  RequestPasswordResetDTO,
  ResetPasswordDTO,
} from "../../../dto/auth/reset-password.dto";

// Şifre kuralları için ayrı bir şema (yeniden kullanılabilir)
const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalıdır")
  .max(100, "Şifre çok uzun")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
  );

// Şifre sıfırlama isteği için şema
export const requestPasswordResetSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(1, "Email adresi zorunludur"),
}) satisfies z.ZodType<RequestPasswordResetDTO>;

// Şifre sıfırlama işlemi için şema
export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Geçerli bir email adresi giriniz")
      .min(1, "Email adresi zorunludur"),

    resetPasswordOTP: z
      .string()
      .min(1, "Doğrulama kodu zorunludur")
      .max(50, "Geçersiz doğrulama kodu"),

    newPassword: passwordSchema,

    confirmNewPassword: z.string().min(1, "Şifre tekrarı zorunludur"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmNewPassword"],
  }) satisfies z.ZodType<ResetPasswordDTO>;

export type RequestPasswordResetSchemaType = z.infer<
  typeof requestPasswordResetSchema
>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
