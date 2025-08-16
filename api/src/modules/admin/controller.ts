import { Request, Response } from "express";
import { AdminService } from "./service";
import { AppError } from "../../utils/appError";
import { updateAdminProfileSchema } from "../../dto/admin/profile-dto";

export class AdminController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const adminId = req.user?.userId;

      if (!adminId) {
        res.status(401).json({
          success: false,
          message: "unauthorized",
        });
        return;
      }

      const profile = await AdminService.getProfile(adminId);

      res.status(200).json({
        success: true,
        message: "profile fetched successfully",
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
          message: "profile fetching failed",
        });
      }
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const adminId = req.user?.userId;

      if (!adminId) {
        res.status(401).json({
          success: false,
          message: "unauthorized",
        });
        return;
      }

      const validation = updateAdminProfileSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "invalid data format",
          errors: validation.error.issues,
        });
        return;
      }

      const updatedProfile = await AdminService.updateAdminProfile(
        adminId,
        validation.data
      );

      res.status(200).json({
        success: true,
        message: "profile updated successfully",
        data: updatedProfile,
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
          message: "profile update failed",
        });
      }
    }
  }

  static async getTotalEarnings(req: Request, res: Response): Promise<void> {
    try {
      const earnings = await AdminService.getTotalEarnings();

      res.status(200).json({
        success: true,
        message: "total earnings fetched successfully",
        data: { totalEarnings: earnings },
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
          message: "total earnings fetching failed",
        });
      }
    }
  }

  static async getTotalReservations(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const reservationCount = await AdminService.getTotalReservations();

      res.status(200).json({
        success: true,
        message: "total reservations fetched successfully",
        data: { totalReservations: reservationCount },
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
          message: "total reservations fetching failed",
        });
      }
    }
  }

  static async getTotalCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customerCount = await AdminService.getTotalCustomers();

      res.status(200).json({
        success: true,
        message: "total customers fetched successfully",
        data: { totalCustomers: customerCount },
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
          message: "total customers fetching failed",
        });
      }
    }
  }

  static async getTotalHotels(req: Request, res: Response): Promise<void> {
    try {
      const hotelCount = await AdminService.getTotalHotels();

      res.status(200).json({
        success: true,
        message: "total hotels fetched successfully",
        data: { totalHotels: hotelCount },
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
          message: "total hotels fetching failed",
        });
      }
    }
  }
}
