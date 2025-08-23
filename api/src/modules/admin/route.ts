import { Router } from "express";
import { AdminController } from "./controller";
import { isAdmin } from "../../middleware/auth.middleware";
import { authenticateToken } from "../../middleware/jwt.middleware";

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

export default router;
