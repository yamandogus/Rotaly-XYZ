import { Request, Response } from "express";
import { OwnerService } from "./service";
import { updateOwnerProfileSchema } from "../../dto/owner/update-owner-profile.dto";
import { AppError } from "../../utils/appError";

export class OwnerController {
  /**
   * Owner profilini günceller
   */
  static async updateProfile(req: Request, res: Response) {
    try {
      // Validation
      const validatedData = updateOwnerProfileSchema.parse(req.body);
      const ownerId = req.user?.userId;

      if (!ownerId) {
        return res.status(401).json({
          status: "error",
          message: "Kullanıcı kimlik doğrulaması gereklidir",
        });
      }

      const result = await OwnerService.updateOwnerProfile(
        ownerId,
        validatedData
      );

      return res.status(200).json({
        status: "success",
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Profil güncellenirken bir hata oluştu",
      });
    }
  }

  /**
   * Owner profilini getirir
   */
  static async getProfile(req: Request, res: Response) {
    try {
      const ownerId = req.user?.userId;

      if (!ownerId) {
        return res.status(401).json({
          status: "error",
          message: "Kullanıcı kimlik doğrulaması gereklidir",
        });
      }

      const result = await OwnerService.getProfile(ownerId);

      return res.status(200).json({
        status: "success",
        data: result.data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Profil bilgileri alınırken bir hata oluştu",
      });
    }
  }

  /**
   * Owner'ın toplam gelirini getirir
   */
  static async getTotalRevenue(req: Request, res: Response) {
    try {
      const ownerId = req.user?.userId;

      if (!ownerId) {
        return res.status(401).json({
          status: "error",
          message: "Kullanıcı kimlik doğrulaması gereklidir",
        });
      }

      const result = await OwnerService.getTotalRevenue(ownerId);

      return res.status(200).json({
        status: "success",
        data: result.data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Gelir bilgileri alınırken bir hata oluştu",
      });
    }
  }

  /**
   * Owner'ın toplam rezervasyon sayısını getirir
   */
  static async getReservationCount(req: Request, res: Response) {
    try {
      const ownerId = req.user?.userId;

      if (!ownerId) {
        return res.status(401).json({
          status: "error",
          message: "Kullanıcı kimlik doğrulaması gereklidir",
        });
      }

      const result = await OwnerService.getReservationCount(ownerId);

      return res.status(200).json({
        status: "success",
        data: result.data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Rezervasyon sayısı alınırken bir hata oluştu",
      });
    }
  }
}
