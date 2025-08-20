import { z } from "zod";

export const ReservationIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type ReservationIdParamDto = z.infer<typeof ReservationIdParamSchema>;
