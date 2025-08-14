import { Router } from "express";
import { UserController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { authorizeRoles, verifiedUser } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";
import {
  adminActionLimiter,
  userSearchLimiter,
} from "../../middleware/rateLimit";

const router = Router();

// POST /api/users
// Register a new user
router.post("", UserController.add);
// GET /api/users/me/profile
router.get(
  "/me/profile",
  authenticateToken,
  verifiedUser,
  UserController.getProfile
);

// GET /api/users/:id
router.get(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  adminActionLimiter,
  UserController.ById
);
// GET /api/users/:email
router.get(
  "/:email",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userSearchLimiter,
  UserController.ByEmail
);
// GET /api/users/:phone
router.get(
  "/:phone",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userSearchLimiter,
  UserController.ByPhone
);
// PUT /api/users/:id
router.put(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  adminActionLimiter,
  UserController.update
);
// DELETE /api/users/:id
router.delete(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  adminActionLimiter,
  UserController.delete
);

export default router;
