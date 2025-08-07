import { Router } from "express";
import { AuthController } from "./controller";
import { authenticateToken } from "src/middleware/jwt.middleware";

const router = Router();

/**
 * must be authenticated user to verify email
 */
router.post(
  "/verify-email",
  authenticateToken,
  AuthController.prototype.verifyEmail.bind(AuthController.prototype)
);

export default router;
