import { z } from "zod";
export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  status: "success" | "error";
  message?: string;
  data?: {
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
      role: string;
      isVerified: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface LoginErrorDTO {
  status: "error";
  message: string;
  errors?: Record<string, string[]>;
}
