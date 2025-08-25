import { OwnerRepository } from "./repository";
import { updateOwnerProfileDto } from "../../dto/owner/update-owner-profile.dto";
import { AppError } from "../../utils/appError";

export class OwnerService {
  /**
   * Owner profilini günceller
   * @param id - Owner ID
   * @param data - Güncellenecek profil verileri
   * @returns Güncellenmiş owner profili
   */
  static async updateOwnerProfile(id: string, data: updateOwnerProfileDto) {
    try {
      if (!id) {
        throw new AppError("Owner ID gereklidir", 400);
      }

      const updatedProfile = await OwnerRepository.updateOwnerProfile(id, data);

      if (!updatedProfile) {
        throw new AppError("Owner bulunamadı", 404);
      }

      return {
        success: true,
        message: "Profil başarıyla güncellendi",
        data: updatedProfile,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Profil güncellenirken bir hata oluştu", 500);
    }
  }

  /**
   * Owner profilini getirir
   * @param ownerId - Owner ID
   * @returns Owner profil bilgileri
   */
  static async getProfile(ownerId: string) {
    try {
      if (!ownerId) {
        throw new AppError("Owner ID gereklidir", 400);
      }

      // Repository'de getProfile methodu henüz implement edilmemiş
      // Şimdilik placeholder response döndürülüyor
      return {
        success: true,
        message: "getProfile methodu repository'de implement edilmeli",
        data: null,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Profil bilgileri alınırken bir hata oluştu", 500);
    }
  }

  /**
   * Owner'ın toplam gelirini hesaplar
   * @param ownerId - Owner ID
   * @returns Toplam gelir bilgisi
   */
  static async getTotalRevenue(ownerId: string) {
    try {
      if (!ownerId) {
        throw new AppError("Owner ID gereklidir", 400);
      }

      const revenue = await OwnerRepository.getTotalRevenue(ownerId);

      return {
        success: true,
        data: {
          totalRevenue: revenue._sum.totalPrice || 0,
          currency: "TRY",
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Gelir bilgileri alınırken bir hata oluştu", 500);
    }
  }

  /**
   * Owner'ın toplam rezervasyon sayısını getirir
   * @param ownerId - Owner ID
   * @returns Rezervasyon sayısı
   */
  static async getReservationCount(ownerId: string) {
    try {
      if (!ownerId) {
        throw new AppError("Owner ID gereklidir", 400);
      }

      const count = await OwnerRepository.getReservationCount(ownerId);

      return {
        success: true,
        data: {
          totalReservations: count,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Rezervasyon sayısı alınırken bir hata oluştu", 500);
    }
  }
}
