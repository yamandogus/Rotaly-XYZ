import { Router } from "express";
import { emailController } from "./controller";
import { validateParams } from "../../middleware/validate.middleware";
import { localeParamsSchema } from "../../dto/common";

const router = Router();

/**
 * POST /api/email/:locale/verification
 * Send verification email
 */
router.post(
  "/:locale/verification",
  validateParams(localeParamsSchema),
  emailController.sendVerificationEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/password-reset
 * Send password reset email
 */
router.post(
  "/:locale/password-reset",
  validateParams(localeParamsSchema),
  emailController.sendPasswordResetEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/welcome
 * Send welcome email
 */
router.post(
  "/:locale/welcome",
  validateParams(localeParamsSchema),
  emailController.sendWelcomeEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/contact-us
 * Forward contact email to real email address
 */
router.post(
  "/:locale/contact-us",
  validateParams(localeParamsSchema),
  emailController.forwardContactEmail.bind(emailController)
);

export default router;
