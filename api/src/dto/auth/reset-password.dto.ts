import { z } from "zod";
export interface RequestPasswordResetDTO {
  email: string;
}

export interface ResetPasswordDTO {
  email: string;
  resetPasswordOTP: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordResponseDTO {
  status: "success" | "error";
  message: string;
  data?: {
    email: string;
  };
}

export interface ResetPasswordErrorDTO {
  status: "error";
  message: string;
  errors?: Record<string, string[]>;
}
