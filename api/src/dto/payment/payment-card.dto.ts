import { z } from "zod";

const cardNumberSchema = z
  .string()
  .min(13, "Card number must be at least 13 digits")
  .max(19, "Card number must be at most 19 digits")
  .regex(/^\d+$/, "Card number must contain only digits");

const cardHolderNameSchema = z
  .string()
  .min(2, "Card holder name must be at least 2 characters")
  .max(50, "Card holder name must be at most 50 characters");

const expiryDateSchema = z
  .string()
  .length(5, "Expiry date must be exactly 5 characters (MM/YY)")
  .regex(
    /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    "Expiry date must be in MM/YY format"
  );

const cvvSchema = z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits");

// Kredi kartı oluşturma için DTO
export const createPaymentCardSchema = z.object({
  cardNumber: cardNumberSchema,
  cardHolderName: cardHolderNameSchema,
  expiryDate: expiryDateSchema,
  cvv: cvvSchema,
});

// Kredi kartı güncelleme için DTO
export const updatePaymentCardSchema = z.object({
  cardHolderName: cardHolderNameSchema.optional(),
  expiryDate: expiryDateSchema.optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

// Kredi kartı listesi sorgu parametreleri için DTO
export const getPaymentCardsQuerySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  sortBy: z.enum(["createdAt", "brand", "expiresAt"]).optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

// Kredi kartı ID parametresi için DTO
export const paymentCardIdSchema = z.object({
  id: z.string().uuid("Invalid payment card ID format"),
});

// Kredi kartı response DTO
export const paymentCardResponseSchema = z.object({
  id: z.string(),
  brand: z.string(),
  last4: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
});

// Kredi kartı listesi response DTO
export const paymentCardListResponseSchema = z.object({
  cards: z.array(paymentCardResponseSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type CreatePaymentCardDto = z.infer<typeof createPaymentCardSchema>;
export type UpdatePaymentCardDto = z.infer<typeof updatePaymentCardSchema>;
export type GetPaymentCardsQueryDto = z.infer<typeof getPaymentCardsQuerySchema>;
export type PaymentCardIdDto = z.infer<typeof paymentCardIdSchema>;
export type PaymentCardResponseDto = z.infer<typeof paymentCardResponseSchema>;
export type PaymentCardListResponseDto = z.infer<typeof paymentCardListResponseSchema>;
