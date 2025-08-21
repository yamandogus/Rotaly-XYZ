import { z } from "zod";
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
// Base schema for update without superRefine
const BaseUpdateReservationSchema = z.object({
  userId: z.string().uuid({ message: "Geçerli bir kullanıcı ID (uuid) olmalı" }).optional(),
  roomId: z.string().uuid({ message: "Geçerli bir oda ID (uuid) olmalı" }).optional(),
  paymentCardId: z.string().uuid().optional(),
  // Konaklama bilgileri
  nightCount: z.number().int().positive().optional(),
  checkIn: z.string().regex(timeRegex, "HH:mm formatında olmalı").optional(),
  checkOut: z.string().regex(timeRegex, "HH:mm formatında olmalı").optional(),
  guests: z.number().int().min(1, "En az 1 misafir olmalı").optional(),
  startDate: z.string().datetime({ message: "Geçerli bir ISO tarih olmalı" }).optional(),
  endDate: z.string().datetime({ message: "Geçerli bir ISO tarih olmalı" }).optional(),
  // Fiyat ve iletişim
  totalPrice: z.number().positive().optional(),
  hotelAddress: z.string().min(3, "Otel adresi en az 3 karakter").optional(),
  userPhone: z.string().min(5, "Telefon numarası çok kısa").optional(),
  specialRequest: z.string().max(1000).optional(),
  paymentMethod: z.string().min(2, "Ödeme yöntemi belirtilmeli").optional(),
  // Update için ID
  id: z.string().uuid().optional(),
});
export const UpdateReservationSchema = BaseUpdateReservationSchema
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