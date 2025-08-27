// Email service

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const emailService = {
  async sendContactEmail(
    emailData: {
      name: string;
      email: string;
      subject: string;
      message: string;
    },
    locale: string = "en"
  ) {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/contact-us`,
      emailData
    );
    return response.data;
  },

  async sendVerificationEmail(email: string, locale: string = "en") {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/verification`,
      {
        email,
      }
    );
    return response.data;
  },

  async sendPasswordResetEmail(email: string, locale: string = "en") {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/password-reset`,
      {
        email,
      }
    );
    return response.data;
  },

  async sendWelcomeEmail(email: string, locale: string = "en") {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/welcome`,
      { email },
      getAuthHeaders()
    );
    return response.data;
  },

  async sendSupportConfirmationEmail(
    email: string,
    ticketId: string,
    locale: string = "en"
  ) {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/support-confirmation`,
      { email, ticketId },
      getAuthHeaders()
    );
    return response.data;
  },

  async sendPaymentConfirmationEmail(
    paymentData: {
      email: string;
      name: string;
      totalAmount: string;
      cardLastFour: string;
      hotelName: string;
      checkInDate: string;
      checkInTime: string;
      checkOutDate: string;
      checkOutTime: string;
      guestCount: number;
      roomType: string;
      confirmationNumber: string;
    },
    locale: string = "en"
  ) {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/payment-confirmation`,
      paymentData,
      getAuthHeaders()
    );
    return response.data;
  },

  async sendBookingConfirmationEmail(
    bookingData: {
      email: string;
      name: string;
      hotelName: string;
      hotelAddress: string;
      hotelPhone?: string;
      checkInDate: string;
      checkInTime: string;
      checkOutDate: string;
      checkOutTime: string;
      nightCount: number;
      guestCount: number;
      roomType: string;
      totalAmount: string;
      confirmationNumber: string;
      specialRequest?: string;
    },
    locale: string = "en"
  ) {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/booking-confirmation`,
      bookingData,
      getAuthHeaders()
    );
    return response.data;
  },

  async sendBookingCancellationEmail(
    cancellationData: {
      email: string;
      name: string;
      hotelName: string;
      confirmationNumber: string;
      cancellationDate: string;
      cancelledBy: string;
      checkInDate: string;
      checkOutDate: string;
      nightCount: number;
      guestCount: number;
      roomType: string;
      originalAmount: string;
      cancellationFee: string;
      refundAmount: string;
      refundProcessingTime: string;
      cancellationReason?: string;
    },
    locale: string = "en"
  ) {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/booking-cancellation`,
      cancellationData,
      getAuthHeaders()
    );
    return response.data;
  },

  async sendCheckInReminderEmail(
    reminderData: {
      email: string;
      name: string;
      hotelName: string;
      hotelAddress: string;
      hotelPhone?: string;
      checkInDate: string;
      checkInTime: string;
      roomType: string;
      confirmationNumber: string;
      additionalGuests?: boolean;
      parkingInfo?: string;
      transportationInfo?: string;
      mapsLink?: string;
      specialRequest?: string;
    },
    locale: string = "en"
  ) {
    const response = await axios.post(
      `${API_BASE_URL}/email/${locale}/check-in-reminder`,
      reminderData,
      getAuthHeaders()
    );
    return response.data;
  },
};
