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

export const createPaymentCardSchema = z.object({
  cardNumber: cardNumberSchema,
  cardHolderName: cardHolderNameSchema,
  expiryDate: expiryDateSchema,
  cvv: cvvSchema,
});

export type CreatePaymentCardDto = z.infer<typeof createPaymentCardSchema>;
