import { z } from "zod";
export interface VerifyEmailDTO {
  email: string;
  verificationOTP: string;
}

export interface ResendVerificationEmailDTO {
  email: string;
}

export interface VerifyEmailResponseDTO {
  status: "success" | "error";
  message: string;
  data?: {
    isVerified: boolean;
  };
}

export interface VerifyEmailErrorDTO {
  status: "error";
  message: string;
  errors?: Record<string, string[]>;
}
