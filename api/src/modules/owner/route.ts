import { Router } from "express";
import { OwnerController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { authorizeRoles } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles(Role.OWNER));
router.put("/profile", OwnerController.updateProfile);
router.get("/profile", OwnerController.getProfile);
router.get("/revenue", OwnerController.getTotalRevenue);
router.get("/reservations/count", OwnerController.getReservationCount);
export default router;
