import { z } from "zod";

export const supportConfirmationEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export type SupportConfirmationEmailSchemaType = z.infer<
  typeof supportConfirmationEmailSchema
>;
