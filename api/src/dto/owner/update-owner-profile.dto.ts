import { z } from "zod";

export const updateOwnerProfileSchema = z.object({
  companyName: z.string().min(1).optional(),
  companyTaxId: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  postCode: z.string().min(1).optional(),
  fullAddress: z.string().min(1).optional(),
});

export type updateOwnerProfileDto = z.infer<typeof updateOwnerProfileSchema>;
