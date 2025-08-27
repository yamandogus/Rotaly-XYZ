import { z } from "zod";

export const checkInReminderEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  hotelName: z.string().min(1, "Hotel name is required"),
  hotelAddress: z.string().min(1, "Hotel address is required"),
  hotelPhone: z.string().optional(),
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkInTime: z.string().min(1, "Check-in time is required"),
  roomType: z.string().min(1, "Room type is required"),
  confirmationNumber: z.string().min(1, "Confirmation number is required"),
  additionalGuests: z.boolean().default(false),
  parkingInfo: z.string().optional(),
  transportationInfo: z.string().optional(),
  mapsLink: z.string().optional(),
  specialRequest: z.string().optional(),
});

export type CheckInReminderEmailData = z.infer<
  typeof checkInReminderEmailSchema
>;
