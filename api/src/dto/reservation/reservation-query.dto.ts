import { z } from "zod";

export const ReservationListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  userId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),

  startDateFrom: z.string().datetime().optional(),
  startDateTo: z.string().datetime().optional(),

  sortBy: z.enum(["createdAt", "startDate", "endDate", "totalPrice"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})
.superRefine((q, ctx) => {
  if (q.startDateFrom && q.startDateTo) {
    const from = new Date(q.startDateFrom).getTime();
    const to = new Date(q.startDateTo).getTime();
    if (!isNaN(from) && !isNaN(to) && to < from) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDateTo"],
        message: "startDateTo, startDateFrom tarihinden sonra olmalı",
      });
    }
  }
});

export type ReservationListQueryDto = z.infer<typeof ReservationListQuerySchema>;
