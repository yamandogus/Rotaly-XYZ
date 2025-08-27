import { z } from "zod";

export const paymentConfirmationEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  totalAmount: z.string().min(1, "Total amount is required"),
  cardLastFour: z.string().min(4, "Card last four digits required"),
  hotelName: z.string().min(1, "Hotel name is required"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkInTime: z.string().min(1, "Check-in time is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
  checkOutTime: z.string().min(1, "Check-out time is required"),
  guestCount: z.number().min(1, "Guest count is required"),
  roomType: z.string().min(1, "Room type is required"),
  confirmationNumber: z.string().min(1, "Confirmation number is required"),
});

export type PaymentConfirmationEmailData = z.infer<
  typeof paymentConfirmationEmailSchema
>;
