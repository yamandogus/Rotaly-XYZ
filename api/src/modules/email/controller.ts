import { Request, Response } from "express";
import { emailService } from "./service";
import {
  contactUsEmailSchema,
  verificationEmailSchema,
  passwordResetEmailSchema,
  welcomeEmailSchema,
  supportConfirmationEmailSchema,
  paymentConfirmationEmailSchema,
  bookingConfirmationEmailSchema,
  bookingCancellationEmailSchema,
  checkInReminderEmailSchema,
} from "../../dto/email";
import { LocaleParams } from "../../dto/common";

import { AppError } from "../../utils/appError";

export class EmailController {
  /**
   * Send verification email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendVerificationEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = verificationEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const { email, name, otp } = validation.data;

      // locale is now validated by middleware and guaranteed to be valid
      const locale = req.params.locale;

      const isEmailSent = await emailService.sendVerificationEmail(
        email,
        name,
        otp,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send verification email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendVerificationEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send password reset email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendPasswordResetEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = passwordResetEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const { email, name, otp } = validation.data;

      const locale = req.params.locale;

      const isEmailSent = await emailService.sendPasswordResetEmail(
        email,
        name,
        otp,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send password reset email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendPasswordResetEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send welcome email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendWelcomeEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = welcomeEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const { email, name } = validation.data;

      const locale = req.params.locale;

      const isEmailSent = await emailService.sendWelcomeEmail(
        email,
        name,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send welcome email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Welcome email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendWelcomeEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Forward contact us email to real email address
   * @param req - Express req object
   * @param res - Express res object
   */
  async forwardContactEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = contactUsEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const { fromEmail, fromName, subject, message } = validation.data;

      const locale = req.params.locale;

      const isEmailSent = await emailService.sendContactEmail(
        fromEmail,
        fromName,
        subject,
        message,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send contact us email", 500);
      }

      res.status(200).json({
        success: true,
        message: "contact us email sent successfully",
      });
    } catch (error) {
      console.error("Error in forwardContactEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send confirmation email to user after contact form submission
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendSupportConfirmationEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = supportConfirmationEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const { email, name } = validation.data;

      const locale = req.params.locale;

      const isEmailSent = await emailService.sendSupportConfirmationEmail(
        email,
        name,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send support confirmation email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Support confirmation email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendSupportConfirmationEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send payment confirmation email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendPaymentConfirmationEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = paymentConfirmationEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const data = validation.data;
      const locale = req.params.locale;

      const isEmailSent = await emailService.sendPaymentConfirmationEmail(
        data.email,
        data,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send payment confirmation email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Payment confirmation email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendPaymentConfirmationEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send booking confirmation email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendBookingConfirmationEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = bookingConfirmationEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const data = validation.data;
      const locale = req.params.locale;

      const isEmailSent = await emailService.sendBookingConfirmationEmail(
        data.email,
        data,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send booking confirmation email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Booking confirmation email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendBookingConfirmationEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send booking cancellation email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendBookingCancellationEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = bookingCancellationEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const data = validation.data;
      const locale = req.params.locale;

      const isEmailSent = await emailService.sendBookingCancellationEmail(
        data.email,
        data,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send booking cancellation email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Booking cancellation email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendBookingCancellationEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  /**
   * Send check-in reminder email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendCheckInReminderEmail(
    req: Request<LocaleParams>,
    res: Response
  ): Promise<void> {
    try {
      const validation = checkInReminderEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const data = validation.data;
      const locale = req.params.locale;

      const isEmailSent = await emailService.sendCheckInReminderEmail(
        data.email,
        data,
        locale
      );

      if (!isEmailSent) {
        throw new AppError("Failed to send check-in reminder email", 500);
      }

      res.status(200).json({
        success: true,
        message: "Check-in reminder email sent successfully",
      });
    } catch (error) {
      console.error("Error in sendCheckInReminderEmail:", error);

      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }
}

export const emailController = new EmailController();
