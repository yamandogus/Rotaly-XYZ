import { z } from "zod";
import { CreateReservationSchema } from "./create-reservation.dto";

export const UpdateReservationSchema = CreateReservationSchema
  .partial()
  .extend({
    // Güncellemede path/body'den gelebilir; path param ile alıyorsan burada gerekmez
    id: z.string().uuid().optional(),
  })
  .superRefine((data, ctx) => {
    // Sadece her iki tarih de varsa aralık doğrula
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate).getTime();
      const end = new Date(data.endDate).getTime();
      if (!isNaN(start) && !isNaN(end) && end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "endDate, startDate sonrası olmalı",
          path: ["endDate"],
        });
      }
    }
  });

export type UpdateReservationDto = z.infer<typeof UpdateReservationSchema>;
