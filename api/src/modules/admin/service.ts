import { AdminRepository } from "./repository";
import { updateAdminProfileDto } from "src/dto/admin/profile-dto";
import { AppError } from "src/utils/appError";

export class AdminService {
  static async updateAdminProfile(id: string, data: updateAdminProfileDto) {
    try {
      return await AdminRepository.updateAdminProfile(id, data);
    } catch (error) {
      throw new AppError("Failed to update admin profile", 500);
    }
  }

  static async getProfile(id: string) {
    try {
      const profile = await AdminRepository.getProfile(id);
      if (!profile) {
        throw new AppError("Admin profile not found", 404);
      }
      return profile;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to get admin profile", 500);
    }
  }

  static async getTotalEarnings() {
    try {
      const earnings = await AdminRepository.getTotalEarnings();
      return earnings._sum.totalPrice || 0;
    } catch (error) {
      throw new AppError("Failed to get total earnings", 500);
    }
  }

  static async getTotalReservations() {
    try {
      return await AdminRepository.getTotalReservations();
    } catch (error) {
      throw new AppError("Failed to get total reservations", 500);
    }
  }

  static async getTotalCustomers() {
    try {
      return await AdminRepository.getTotalCustomers();
    } catch (error) {
      throw new AppError("Failed to get total customers", 500);
    }
  }

  static async getTotalHotels() {
    try {
      return await AdminRepository.getTotalHotels();
    } catch (error) {
      throw new AppError("Failed to get total hotels", 500);
    }
  }
}
