import { z } from "zod";
import {
  VerifyEmailDTO,
  ResendVerificationEmailDTO,
} from "../../../dto/auth/verify-email.dto";

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(1, "Email adresi zorunludur"),
  verificationOTP: z
    .string()
    .min(1, "Doğrulama kodu zorunludur")
    .max(50, "Geçersiz doğrulama kodu"),
}) satisfies z.ZodType<VerifyEmailDTO>;

export const resendVerificationEmailSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(1, "Email adresi zorunludur"),
}) satisfies z.ZodType<ResendVerificationEmailDTO>;

export type VerifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationEmailSchemaType = z.infer<
  typeof resendVerificationEmailSchema
>;
