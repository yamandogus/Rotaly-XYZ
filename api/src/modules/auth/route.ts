import { Router } from "express";
import { AuthController } from "./controller";
import { authenticateToken } from "../../middleware/jwt.middleware";
import {
  authLimiter,
  passwordResetLimiter,
  otpLimiter,
} from "../../middleware/rateLimit";

const router = Router();
const authController = new AuthController();

// public routerlar
router.post("/register", authLimiter, AuthController.prototype.register);
router.post("/login", authLimiter, AuthController.prototype.login);
router.post(
  "/resend-verification-email",
  otpLimiter,
  AuthController.prototype.resendVerificationEmail
);
router.post(
  "/forgot-password",
  passwordResetLimiter,
  AuthController.prototype.forgotPassword
);

// private routerlar
router.post("/logout", authenticateToken, AuthController.prototype.logOut);

router.get(
  "/get-profile",
  authenticateToken,
  AuthController.prototype.getProfile
);
router.put(
  "/update-profile",
  authenticateToken,
  AuthController.prototype.updateProfile
);
router.put(
  "/change-password",
  authenticateToken,
  AuthController.prototype.changePassword
);
router.delete(
  "/delete-account",
  authenticateToken,
  AuthController.prototype.deleteAccount
);

router.post(
  "/verify-email",
  authenticateToken,
  AuthController.prototype.verifyEmail.bind(AuthController.prototype)
);

export default router;
