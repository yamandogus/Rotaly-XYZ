import { Router } from "express";
import { UserController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { authorizeRoles, verifiedUser } from "../../middleware/auth.middleware";
import { Role } from "@prisma/client";

const router = Router();
const userController = new UserController();

// POST /api/users
// Register a new user
router.post("", userController.add);

// GET /api/users/me
// Get current user's profile
router.get("/me", authenticateToken, verifiedUser, userController.profile);

// PUT /api/users/me
// Update current user's profile
router.put(
  "/me",
  authenticateToken,
  verifiedUser,
  userController.updateProfile
);

// PATCH /api/users/me/password
router.patch(
  "/me/password",
  authenticateToken,
  verifiedUser,
  userController.changePassword
);

// PATCH /api/users/:id/change-password
router.patch(
  "/:id/change-password",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.changePassword
);

// GET /api/users/:id
router.get(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.ById
);
// GET /api/users/:email
router.get(
  "/:email",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.ByEmail
);
// GET /api/users/:phone
router.get(
  "/:phone",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.ByPhone
);
// PUT /api/users/:id
router.put(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.update
);
// DELETE /api/users/:id
router.delete(
  "/:id",
  authenticateToken,
  verifiedUser,
  authorizeRoles(Role.ADMIN),
  userController.delete
);

export { router as userRoutes };
