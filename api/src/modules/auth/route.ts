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
router.post(
  "/register",
  authLimiter,
  authController.register.bind(authController)
);
router.post("/login", authLimiter, authController.login.bind(authController));
router.post(
  "/resend-verification-email",
  otpLimiter,
  authController.resendVerificationEmail.bind(authController)
);
router.post(
  "/forgot-password",
  passwordResetLimiter,
  authController.forgotPassword.bind(authController)
);

// private routerlar
<<<<<<< HEAD
router.post(
  "/logout",
  authenticateToken,
  authController.logOut.bind(authController)
);
router.post(
  "/verify-email",
  authenticateToken,
  authController.verifyEmail.bind(authController)
);
=======
router.post("/logout", authenticateToken, AuthController.prototype.logOut);

>>>>>>> 7c484b21d7b1ef8f204aa8ba110ecd14efc34134
router.get(
  "/get-profile",
  authenticateToken,
  authController.getProfile.bind(authController)
);
router.put(
  "/update-profile",
  authenticateToken,
  authController.updateProfile.bind(authController)
);
router.put(
  "/change-password",
  authenticateToken,
  authController.changePassword.bind(authController)
);
router.delete(
  "/delete-account",
  authenticateToken,
  authController.deleteAccount.bind(authController)
);

router.post(
  "/verify-email",
  authenticateToken,
  authController.verifyEmail.bind(authController)
);

export default router;
