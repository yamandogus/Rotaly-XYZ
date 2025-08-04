import { Router } from "express";
import { emailController } from "./controller";

const router = Router();

/**
 * POST /api/email/verification
 * Send verification email
 */
router.post(
  "/verification",
  emailController.sendVerificationEmail.bind(emailController)
);

/**
 * POST /api/email/password-reset
 * Send password reset email
 */
router.post(
  "/password-reset",
  emailController.sendPasswordResetEmail.bind(emailController)
);

/**
 * POST /api/email/welcome
 * Send welcome email
 */
router.post("/welcome", emailController.sendWelcomeEmail.bind(emailController));

/**
 * POST /api/email/contact-us
 * Forward contact email to real email address
 */
router.post(
  "/contact-us",
  emailController.forwardContactEmail.bind(emailController)
);

export default router;
