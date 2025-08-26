// Email service

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const emailService = {
  async sendContactEmail(emailData: { name: string; email: string; subject: string; message: string }) {
    const response = await axios.post(`${API_BASE_URL}/email/contact`, emailData);
    return response.data;
  },

  async sendVerificationEmail(email: string) {
    const response = await axios.post(`${API_BASE_URL}/email/verification`, { email });
    return response.data;
  },

  async sendPasswordResetEmail(email: string) {
    const response = await axios.post(`${API_BASE_URL}/email/password-reset`, { email });
    return response.data;
  },

  async sendWelcomeEmail(email: string) {
    const response = await axios.post(`${API_BASE_URL}/email/welcome`, { email }, getAuthHeaders());
    return response.data;
  },

  async sendSupportConfirmationEmail(email: string, ticketId: string) {
    const response = await axios.post(`${API_BASE_URL}/email/support-confirmation`, { email, ticketId }, getAuthHeaders());
    return response.data;
  }
};
