import { z } from "zod";

export const closeSupportSchema = z.object({
  closureMessage: z
    .string()
    .max(1000, "Closure message must be less than 1000 characters")
    .optional(), // this will be added as a message, not stored in Support table
});

export type CloseSupportSchemaType = z.infer<typeof closeSupportSchema>;
