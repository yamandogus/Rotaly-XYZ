import { Request, Response } from "express";
import { UserService } from "./service";
import { RegisterSchemaType, UpdateUserSchemaType } from "../../dto/auth";
import { AppError } from "../../utils/appError";
import { Role } from "@prisma/client";

export class UserController {
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const userRole = req.user?.role;
      if (userRole !== "ADMİN") {
        throw new AppError("You are not authorized for this transaction.", 403);
      }
      const users = await UserService.getAll();
      res.status(200).json({
        success: true,
        data: users,
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
          message: "Error occurred while fetching users",
        });
      }
    }
  }

  static async ById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role;
      const { id } = req.params;

      if (userId !== id && userRole !== "ADMİN") {
        throw new AppError(
          "You do not have access to this user's information.",
          403
        );
      }
      const user = await UserService.getById(id);
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
          message: "Error occurred while fetching user",
        });
      }
    }
  }
  static async ByEmail(req: Request, res: Response): Promise<void> {
    try {
      const userRole = req.user?.role;
      const { email } = req.params;

      if (!req.path.includes("/auth") && userRole !== "ADMİN") {
        throw new AppError(
          "You do not have access to this user's information.",
          403
        );
      }
      const user = await UserService.getByEmail(email);
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
          message: "Error occurred while fetching user",
        });
      }
    }
  }

  static async ByPhone(req: Request, res: Response): Promise<void> {
    try {
      const userRole = req.user?.role;
      if (userRole !== "ADMİN") {
        throw new AppError(
          "You do not have access to this user's information.",
          403
        );
      }
      const { phone } = req.params;
      const user = await UserService.getByPhone(phone);
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
          message: "Error occurred while fetching user",
        });
      }
    }
  }
  static async add(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body as RegisterSchemaType;
      const user = await UserService.add(userData);
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
          message: "Error occurred while fetching users",
        });
      }
    }
  }
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role;
      const { id } = req.params;

      if (userId !== id && userRole !== "ADMİN") {
        throw new AppError(
          "You do not have access to this user's information.",
          403
        );
      }
      const updateData = req.body as UpdateUserSchemaType;
      const user = await UserService.update(id, updateData);
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
          message: "Error occurred while updating the user",
        });
      }
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const userRole = req.user?.role;
      const { id } = req.params;

      if (userId !== id && userRole !== "ADMİN") {
        throw new AppError(
          "You do not have access to this user's information.",
          403
        );
      }

      await UserService.delete(id);
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
          message: "error occurred while updating the user",
        });
      }
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }
      const profile = await UserService.getProfile(userId);
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
          message: "Error occurred while fetching profile",
        });
      }
    }
  }
}
