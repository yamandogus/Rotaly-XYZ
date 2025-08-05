import { z } from "zod";

export const contactUsEmailSchema = z.object({
  fromEmail: z.string().email("Invalid email address"),
  fromName: z.string().min(1, "Name is required").max(100, "Name too long"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message too long"),
});

export type ContactUsEmailSchemaType = z.infer<typeof contactUsEmailSchema>;
