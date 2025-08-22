import { Router } from "express";
import { UserController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import { verifiedUser } from "../../middleware/auth.middleware";

const router = Router();

// Register a new user
router.post("", UserController.add);
// GET /api/users/me/profile
router.get(
  "/me/profile",
  authenticateToken,
  UserController.getProfile
);
router.get("/", authenticateToken, verifiedUser, UserController.index);
// GET /api/users/:id
router.get("/:id", authenticateToken, verifiedUser, UserController.ById);
// GET /api/users/:email
router.get("/:email", authenticateToken, verifiedUser, UserController.ByEmail);
// GET /api/users/:phone
router.get("/:phone", authenticateToken, verifiedUser, UserController.ByPhone);
// PUT /api/users/:id
router.put("/:id", authenticateToken, verifiedUser, UserController.update);
// DELETE /api/users/:id
router.delete("/:id", authenticateToken, verifiedUser, UserController.delete);

export default router;
