import { Request, Response } from "express";
import { AuthService } from "./service";
import { AppError } from "../../utils/appError";
import { User } from "@prisma/client";
import {
  RegisterSchemaType,
  LoginSchemaType,
  ChangePasswordSchemaType,
  UpdateUserSchemaType,
} from "../../dto/auth";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, email, phone, password, confirmPassword } =
        req.body;
      const userData: RegisterSchemaType = {
        name,
        surname,
        email,
        phone,
        password,
        confirmPassword,
      };
      await this.authService.register(userData);
      res.status(201).json({
        success: true,
        message: "Kullanıcı başarıyla oluşturuldu",
        data: userData,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userData: LoginSchemaType = { email, password };
      const tokens = await this.authService.login({ email, password });
      res.status(200).json({
        success: true,
        message: "Giriş başarılı",
        data: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          userData,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  async logOut(req: Request, res: Response): Promise<void> {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw new AppError("Unauthorized", 401);
      }
      await this.authService.logout(authorizationHeader);
      res.status(200).json({
        success: true,
        message: "Çıkış başarılı",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body || !req.body.verificationOTP) {
        throw new AppError("Verification OTP is required", 400);
      }
      const { verificationOTP } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        throw new AppError("User ID not found", 401);
      }

      await this.authService.verifyEmail(userId, verificationOTP);
      res.status(200).json({
        success: true,
        message: "E-posta başarıyla doğrulandı",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        console.error("Error in verifyEmail:", error);
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  async resendVerificationEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new AppError("Email is required", 400);
      }
      await this.authService.resendVerificationEmail(email);
      res.status(200).json({
        success: true,
        message: "e-posta gönderildi",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  //TODO
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const profile = await this.authService.getProfile(userId);

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Profil bilgileri getirilirken bir hata oluştu",
        });
      }
    }
  }
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const updateData: UpdateUserSchemaType = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
      };

      const result = await this.authService.updateProfile(userId, updateData);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.updatedUser,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Profil güncelleme sırasında bir hata oluştu",
        });
      }
    }
  }
  //TODO

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      res.status(200).json({
        success: true,
        message: "Şifre sıfırlama linki gönderildi",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }
      const { currentPassword, newPassword } = req.body;
      const changePasswordData: ChangePasswordSchemaType = {
        currentPassword,
        newPassword,
        confirmPassword: newPassword,
      };
      await this.authService.changePassword(userId, changePasswordData);
      res.status(200).json({
        success: true,
        message: "Şifre başarıyla değiştirildi",
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }
      await this.authService.deleteAccount(userId);
      res.status(200).json({ success: true, message: "kullanıcı silindi" });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Bir hata oluştu",
        });
      }
    }
  }

  async googleCallback(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "google auth failed",
      });
    }
    try {
      const result = await this.authService.login(req.user as User);
      res.status(200).json({
        success: true,
        message: "google auth success",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "google auth failed",
      });
    }
  }
}
