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
const userController = new UserController();

// POST /api/users
// Register a new user
router.post("", userController.add);

// GET /api/users/:id
router.get(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  adminActionLimiter,
  userController.ById
);
// GET /api/users/:email
router.get(
  "/:email",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userSearchLimiter,
  userController.ByEmail
);
// GET /api/users/:phone
router.get(
  "/:phone",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userSearchLimiter,
  userController.ByPhone
);
// PUT /api/users/:id
router.put(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  adminActionLimiter,
  userController.update
);
// DELETE /api/users/:id
router.delete(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  adminActionLimiter,
  userController.delete
);

export default router;
