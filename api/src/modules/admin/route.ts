import { Router } from "express";
import { AdminController } from "./controller";
import { isAdmin } from "../../middleware/auth.middleware";
import { authenticateToken } from "../../middleware/jwt.middleware";
import {
  createHotelHandler,
  getHotelsHandler,
  getHotelByIdHandler,
  updateHotelHandler,
  deleteHotelHandler,
} from "../hotel/controller";

const router = Router();
const adminController = new AdminController();

router.get(
  "/dashboard/earnings",
  authenticateToken,
  isAdmin,
  AdminController.getTotalEarnings
);
router.get(
  "/dashboard/reservations",
  authenticateToken,
  isAdmin,
  AdminController.getTotalReservations
);
router.get(
  "/dashboard/customers",
  authenticateToken,
  isAdmin,
  AdminController.getTotalCustomers
);
router.get(
  "/dashboard/hotels",
  authenticateToken,
  isAdmin,
  AdminController.getTotalHotels
);
router.get("/profile", authenticateToken, isAdmin, AdminController.getProfile);
router.put(
  "/profile",
  authenticateToken,
  isAdmin,
  AdminController.updateProfile
);

// 🏨 Admin Hotel Management Routes
router.post("/hotels", authenticateToken, isAdmin, createHotelHandler);
router.get("/hotels", authenticateToken, isAdmin, getHotelsHandler);
router.get("/hotels/:id", authenticateToken, isAdmin, getHotelByIdHandler);
router.put("/hotels/:id", authenticateToken, isAdmin, updateHotelHandler);
router.delete("/hotels/:id", authenticateToken, isAdmin, deleteHotelHandler);

export default router;

// idye göre örnek rezervasyon verisi oluştur
