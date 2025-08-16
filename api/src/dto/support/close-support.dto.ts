import { z } from "zod";

export const CloseSupportSchema = z.object({
  supportId: z.string().uuid("Invalid support ID"),
});

export type CloseSupportDto = z.infer<typeof CloseSupportSchema>;
