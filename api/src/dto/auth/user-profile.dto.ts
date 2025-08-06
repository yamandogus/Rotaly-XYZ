import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  // ... diğer profil bilgileri
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
