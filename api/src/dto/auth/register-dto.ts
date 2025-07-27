import { z } from "zod";
export interface RegisterDTO {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponseDTO {
  status: "success" | "error";
  message?: string;
  data?: {
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
      phone: string;
      role: string;
      isVerified: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface RegisterErrorDTO {
  status: "error";
  message: string;
  errors?: Record<string, string[]>;
}
