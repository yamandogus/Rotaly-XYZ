import { z } from "zod";

export const verificationEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export type VerificationEmailSchemaType = z.infer<
  typeof verificationEmailSchema
>;
