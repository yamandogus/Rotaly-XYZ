import { Router } from "express";
import {
  createHotelHandler,
  getHotelsHandler,
  getHotelByIdHandler,
  updateHotelHandler,
  deleteHotelHandler,
} from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { authorizeRoles } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Hotel CRUD Routes
router.post(
  "/",
  authenticateToken,
  authorizeRoles(Role.ADMIN, Role.OWNER),
  createHotelHandler
);
router.get("/", getHotelsHandler); // Public route
router.get("/:id", getHotelByIdHandler); // Public route
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(Role.ADMIN, Role.OWNER),
  updateHotelHandler
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(Role.ADMIN, Role.OWNER),
  deleteHotelHandler
);


export default router;
