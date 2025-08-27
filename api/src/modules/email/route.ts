import { Router } from "express";
import { emailController } from "./controller";
import { validateParams } from "../../middleware/validate.middleware";
import { localeParamsSchema } from "../../dto/common";

const router = Router();

// Helper middleware to set default locale
const setDefaultLocale = (req: any, res: any, next: any) => {
  req.params.locale = "en";
  next();
};

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

/**
 * POST /api/email/:locale/support-confirmation
 * Send confirmation email to user after contact form submission
 */
router.post(
  "/:locale/support-confirmation",
  validateParams(localeParamsSchema),
  emailController.sendSupportConfirmationEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/payment-confirmation
 * Send payment confirmation email
 */
router.post(
  "/:locale/payment-confirmation",
  validateParams(localeParamsSchema),
  emailController.sendPaymentConfirmationEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/booking-confirmation
 * Send booking confirmation email
 */
router.post(
  "/:locale/booking-confirmation",
  validateParams(localeParamsSchema),
  emailController.sendBookingConfirmationEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/booking-cancellation
 * Send booking cancellation email
 */
router.post(
  "/:locale/booking-cancellation",
  validateParams(localeParamsSchema),
  emailController.sendBookingCancellationEmail.bind(emailController)
);

/**
 * POST /api/email/:locale/check-in-reminder
 * Send check-in reminder email
 */
router.post(
  "/:locale/check-in-reminder",
  validateParams(localeParamsSchema),
  emailController.sendCheckInReminderEmail.bind(emailController)
);

// Legacy routes for backward compatibility (default to English)

/**
 * POST /api/email/verification
 * Send verification email (defaults to English)
 */
router.post(
  "/verification",
  setDefaultLocale,
  emailController.sendVerificationEmail.bind(emailController)
);

/**
 * POST /api/email/password-reset
 * Send password reset email (defaults to English)
 */
router.post(
  "/password-reset",
  setDefaultLocale,
  emailController.sendPasswordResetEmail.bind(emailController)
);

/**
 * POST /api/email/welcome
 * Send welcome email (defaults to English)
 */
router.post(
  "/welcome",
  setDefaultLocale,
  emailController.sendWelcomeEmail.bind(emailController)
);

/**
 * POST /api/email/contact-us
 * Forward contact email to real email address (defaults to English)
 */
router.post(
  "/contact-us",
  setDefaultLocale,
  emailController.forwardContactEmail.bind(emailController)
);

/**
 * POST /api/email/support-confirmation
 * Send confirmation email to user after contact form submission (defaults to English)
 */
router.post(
  "/support-confirmation",
  setDefaultLocale,
  emailController.sendSupportConfirmationEmail.bind(emailController)
);

/**
 * POST /api/email/payment-confirmation
 * Send payment confirmation email (defaults to English)
 */
router.post(
  "/payment-confirmation",
  setDefaultLocale,
  emailController.sendPaymentConfirmationEmail.bind(emailController)
);

/**
 * POST /api/email/booking-confirmation
 * Send booking confirmation email (defaults to English)
 */
router.post(
  "/booking-confirmation",
  setDefaultLocale,
  emailController.sendBookingConfirmationEmail.bind(emailController)
);

/**
 * POST /api/email/booking-cancellation
 * Send booking cancellation email (defaults to English)
 */
router.post(
  "/booking-cancellation",
  setDefaultLocale,
  emailController.sendBookingCancellationEmail.bind(emailController)
);

/**
 * POST /api/email/check-in-reminder
 * Send check-in reminder email (defaults to English)
 */
router.post(
  "/check-in-reminder",
  setDefaultLocale,
  emailController.sendCheckInReminderEmail.bind(emailController)
);

export default router;
