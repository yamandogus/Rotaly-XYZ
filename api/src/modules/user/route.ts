import { Router } from "express";
import { UserController } from "./controller";
import {
  authenticateToken,
  verifiedUser,
} from "../../middleware/jwt.middleware";
import { authorizeRoles } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";

const router = Router();
const userController = new UserController();

router.post("/api/users", userController.add);
router.get(
  "/api/users/me",
  authenticateToken,
  verifiedUser,
  userController.profile
);
router.put(
  "/api/users/me",
  authenticateToken,
  verifiedUser,
  userController.updateProfile
);

router.get(
  "/api/users/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.ById
);
router.get(
  "/api/users/:email",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.ByEmail
);
router.get(
  "/api/users/:phone",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.ByPhone
);
router.put(
  "/api/users/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.update
);
router.delete(
  "/api/users/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.delete
);

export default router;
