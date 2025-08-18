import { z } from "zod";

export const ReservationResponseSchema = z.object({
  id: z.string().uuid(),
  nightCount: z.number().int(),
  checkIn: z.string(),     // "12:00"
  checkOut: z.string(),    // "14:00"
  guests: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  totalPrice: z.number(),
  hotelAddress: z.string(),
  userPhone: z.string(),
  specialRequest: z.string().nullable().optional(),
  paymentMethod: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable().optional(),

  userId: z.string().uuid(),
  roomId: z.string().uuid(),
  paymentCardId: z.string().uuid().nullable().optional(),
});

export type ReservationResponseDto = z.infer<typeof ReservationResponseSchema>;
