import { z } from "zod";
import { LoginDTO } from "../../../dto/auth/login-dto";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(1, "Email adresi zorunludur"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(100, "Şifre çok uzun"),
}) satisfies z.ZodType<LoginDTO>;

// Şema tipini export et
export type LoginSchemaType = z.infer<typeof loginSchema>;
