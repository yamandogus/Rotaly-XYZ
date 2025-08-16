import { Router } from "express";
import { AdminController } from "./controller";
import { isAdmin } from "../../middleware/auth.middleware";

const router = Router();
const adminController = new AdminController();

router.get("/dashboard/earnings", isAdmin, AdminController.getTotalEarnings);
router.get(
  "/dashboard/reservations",
  isAdmin,
  AdminController.getTotalReservations
);
router.get("/dashboard/customers", isAdmin, AdminController.getTotalCustomers);
router.get("/dashboard/hotels", isAdmin, AdminController.getTotalHotels);

export default router;
