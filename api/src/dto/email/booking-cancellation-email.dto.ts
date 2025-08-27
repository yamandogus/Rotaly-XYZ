import { z } from "zod";

export const bookingCancellationEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  hotelName: z.string().min(1, "Hotel name is required"),
  confirmationNumber: z.string().min(1, "Confirmation number is required"),
  cancellationDate: z.string().min(1, "Cancellation date is required"),
  cancelledBy: z.string().min(1, "Cancelled by is required"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
  nightCount: z.number().min(1, "Night count is required"),
  guestCount: z.number().min(1, "Guest count is required"),
  roomType: z.string().min(1, "Room type is required"),
  originalAmount: z.string().min(1, "Original amount is required"),
  cancellationFee: z.string().default("0"),
  refundAmount: z.string().min(1, "Refund amount is required"),
  refundProcessingTime: z.string().default("3-5 business days"),
  cancellationReason: z.string().optional(),
});

export type BookingCancellationEmailData = z.infer<
  typeof bookingCancellationEmailSchema
>;
