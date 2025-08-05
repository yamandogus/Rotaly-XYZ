import { Request, Response } from "express";
import { emailService } from "./service";
import {
  contactUsEmailSchema,
  verificationEmailSchema,
  passwordResetEmailSchema,
  welcomeEmailSchema,
} from "../../dto/email";

import { AppError } from "../../utils/appError";

export class EmailController {
  /**
   * Send verification email
   * @param req - Express req object
   * @param res - Express res object
   */
  async sendVerificationEmail(req: Request, res: Response): Promise<void> {
    try {
      // validate request body using Zod
      const validation = verificationEmailSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.issues,
        });
        return;
      }

      const { email, name } = validation.data;

      // extracting locale from URL path param, default to 'en'
      const locale = req.params.locale || "en";

      const emailSent = await emailService.sendVerificationEmail(
        email,
        name,
        locale
      );

      if (!emailSent) {
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
  async sendPasswordResetEmail(req: Request, res: Response): Promise<void> {
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

      const { email, name } = validation.data;

      const locale = req.params.locale || "en";

      const emailSent = await emailService.sendPasswordResetEmail(
        email,
        name,
        locale
      );

      if (!emailSent) {
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
  async sendWelcomeEmail(req: Request, res: Response): Promise<void> {
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

      const locale = req.params.locale || "en";

      const emailSent = await emailService.sendWelcomeEmail(
        email,
        name,
        locale
      );

      if (!emailSent) {
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
  async forwardContactEmail(req: Request, res: Response): Promise<void> {
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

      const locale = req.params.locale || "en";

      const emailSent = await emailService.sendContactEmail(
        fromEmail,
        fromName,
        subject,
        message,
        locale
      );

      if (!emailSent) {
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
}

export const emailController = new EmailController();
