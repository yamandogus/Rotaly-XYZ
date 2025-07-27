// src/validation/schemas/auth/register.schema.ts

import { z } from "zod";
import { RegisterDTO } from "../../../dto/auth/register-dto";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "İsim en az 2 karakter olmalıdır")
      .max(50, "İsim çok uzun"),

    surname: z
      .string()
      .min(2, "Soyisim en az 2 karakter olmalıdır")
      .max(50, "Soyisim çok uzun"),

    email: z
      .string()
      .email("Geçerli bir email adresi giriniz")
      .min(1, "Email adresi zorunludur"),

    phone: z
      .string()
      .regex(
        /^(\+90|0)?[0-9]{10}$/,
        "Geçerli bir telefon numarası giriniz (Örnek: 5XX XXX XX XX)"
      ),

    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .max(100, "Şifre çok uzun")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
      ),

    confirmPassword: z.string().min(1, "Şifre tekrarı zorunludur"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"], // hata mesajını confirmPassword alanına bağla
  }) satisfies z.ZodType<RegisterDTO>;

// Şema tipini export et
export type RegisterSchemaType = z.infer<typeof registerSchema>;
