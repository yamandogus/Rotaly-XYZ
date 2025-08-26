import { Router } from "express";
import { OwnerController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { authorizeRoles } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";
import {
  createHotelHandler,
  getHotelsHandler,
  getHotelByIdHandler,
  updateHotelHandler,
  deleteHotelHandler,
} from "../hotel/controller";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles(Role.OWNER));

// 👤 Owner Profile Routes
router.put("/profile", OwnerController.updateProfile);
router.get("/profile", OwnerController.getProfile);
router.get("/revenue", OwnerController.getTotalRevenue);
router.get("/reservations/count", OwnerController.getReservationCount);

// 🏨 Owner Hotel Management Routes
router.post("/hotels", createHotelHandler);
router.get("/hotels", getHotelsHandler);
router.get("/hotels/:id", getHotelByIdHandler);
router.put("/hotels/:id", updateHotelHandler);
router.delete("/hotels/:id", deleteHotelHandler);

export default router;
