import { z } from "zod";

export const assignSupportSchema = z.object({
  supportRepId: z.string().uuid("Invalid support representative ID"),
});

export type AssignSupportSchemaType = z.infer<typeof assignSupportSchema>;
