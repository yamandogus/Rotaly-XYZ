import { z } from "zod";

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const CreateReservationSchema = z.object({
  userId: z.string().uuid({ message: "Geçerli bir kullanıcı ID (uuid) olmalı" }),
  roomId: z.string().uuid({ message: "Geçerli bir oda ID (uuid) olmalı" }),
  paymentCardId: z.string().uuid().optional(),

  // Konaklama bilgileri
  nightCount: z.number().int().positive().optional(), // service'te hesaplanabilir
  checkIn: z.string().regex(timeRegex, "HH:mm formatında olmalı").optional().default("12:00"),
  checkOut: z.string().regex(timeRegex, "HH:mm formatında olmalı").optional().default("14:00"),
  guests: z.number().int().min(1, "En az 1 misafir olmalı"),
  startDate: z.string().datetime({ message: "Geçerli bir ISO tarih olmalı" }),
  endDate: z.string().datetime({ message: "Geçerli bir ISO tarih olmalı" }),

  // Fiyat ve iletişim
  totalPrice: z.number().positive().optional(), // service'te hesaplanabilir
  hotelAddress: z.string().min(3, "Otel adresi en az 3 karakter"),
  userPhone: z.string().min(5, "Telefon numarası çok kısa"),
  specialRequest: z.string().max(1000).optional(),
  paymentMethod: z.string().min(2, "Ödeme yöntemi belirtilmeli"),
})
.superRefine((data, ctx) => {
  // startDate < endDate kontrolü
  const start = new Date(data.startDate).getTime();
  const end = new Date(data.endDate).getTime();
  if (!isNaN(start) && !isNaN(end) && end <= start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "endDate, startDate sonrası olmalı",
      path: ["endDate"],
    });
  }
});

export type CreateReservationDto = z.infer<typeof CreateReservationSchema>;
