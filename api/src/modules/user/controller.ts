import { Request, Response } from "express";
import { UserService } from "./service";
import {
  ChangePasswordSchemaType,
  RegisterSchemaType,
  UpdateUserSchemaType,
} from "../../dto/auth";
import { AppError } from "../../utils/appError";

const userService = new UserService();

export class UserController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAll();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      if (error instanceof AppError) {
        // Eğer hata bizim bilinçli olarak fırlattığımız özel bir hataysa (AppError) ona göre
        // kullanıcıya özel mesaj ve durum kodu veririz. (Örneğin: 404 Not Found)
        // Ama hata JavaScript'in içinden gelen genel bir hata ise
        // (örneğin TypeError, null is not a function vs), o zaman 500 - sunucu hatası döneriz.

        // Yani sistem şöyle düşünüyor:

        // “Bu hata benim bildiğim türden mi (AppError)? O zaman mesajı ve kodu kullanıcıya düzgün
        // şekilde vereyim. Yoksa genel bir hata mesajı gösteririm.”

        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Kullanıcılar getirilirken bir hata oluştu",
        });
      }
    }
  }

  async ById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      res.status(200).json({
        success: true,
        data: user,
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
          message: "Kullanıcı getirilirken bir hata oluştu",
        });
      }
    }
  }
  async ByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await userService.getByEmail(email);
      res.status(200).json({
        success: true,
        data: user,
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
          message: "Kullanıcı getirilirken bir hata oluştu",
        });
      }
    }
  }

  async ByPhone(req: Request, res: Response): Promise<void> {
    try {
      const { phone } = req.params;
      const user = await userService.getByPhone(phone);
      res.status(200).json({
        success: true,
        data: user,
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
          message: "Kullanıcı getirilirken bir hata oluştu",
        });
      }
    }
  }
  async add(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body as RegisterSchemaType;
      const user = await userService.add(userData);
      res.status(201).json({
        success: true,
        data: user,
        message: "User created successfully",
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
          message: "Kullanıcı oluşturulurken bir hata oluştu",
        });
      }
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body as UpdateUserSchemaType;
      const user = await userService.update(id, updateData);
      res.status(200).json({
        success: true,
        data: user,
        message: "User updated successfully",
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
          message: "Kullanıcı güncellenirken bir hata oluştu",
        });
      }
    }
  }
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const passwordData = req.body as ChangePasswordSchemaType;

      await userService.changePassword(id, passwordData);

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
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
          message: "Şifre değiştirme işlemi sırasında bir hata oluştu",
        });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
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
          message: "Kullanıcı silinirken bir hata oluştu",
        });
      }
    }
  }

  async profile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("User not found", 404);
      }
      const user = await userService.getById(userId);
      res.status(200).json({
        success: true,
        data: user,
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
          message: "Kullanıcı profili getirilirken bir hata oluştu",
        });
      }
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("User not found", 404);
      }
      const updateData = req.body as UpdateUserSchemaType;
      const user = await userService.update(userId, updateData);
      res.status(200).json({
        success: true,
        data: user,
        message: "Profile updated successfully",
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
          message: "Kullanıcı güncellenirken bir hata oluştu",
        });
      }
    }
  }
}
