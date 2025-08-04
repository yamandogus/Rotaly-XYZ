import { transporter } from "../../config/email";
import { generateOTP } from "../../utils/otp";

export class EmailService {
  /**
   * Send verification email
   * @param email - receiver email address
   * @param name - receiver name
   * @returns Promise<boolean>
   */
  async sendVerificationEmail(email: string, name: string): Promise<boolean> {
    try {
      const otp = generateOTP();

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "verify@rotaly-xyz.com",
        },
        to: email,
        subject: "Email Verification - Rotaly XYZ",
        template: "verification",
        context: {
          name: name,
          otp: otp,
          year: new Date().getFullYear(),
        },
      };

      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending verification email:", error);
      return false;
    }
  }

  /**
   * Send password reset email
   * @param email - receiver email address
   * @param name - receiver name
   * @returns Promise<boolean>
   */
  async sendPasswordResetEmail(email: string, name: string): Promise<boolean> {
    try {
      const otp = generateOTP();

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "reset@rotaly-xyz.com",
        },
        to: email,
        subject: "Password Reset - Rotaly XYZ",
        template: "password-reset",
        context: {
          name: name,
          otp: otp,
          year: new Date().getFullYear(),
        },
      };

      await transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending password reset email:", error);
      return false;
    }
  }

  /**
   * Send welcome email
   * @param email - receiver email address
   * @param name - receiver name
   * @returns Promise<boolean>
   */
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "noreply@rotaly-xyz.com",
        },
        to: email,
        subject: "Welcome to Rotaly XYZ!",
        template: "welcome",
        context: {
          name: name,
          year: new Date().getFullYear(),
          platformUrl:
            process.env.FRONTEND_URL || "https://rotaly-xyz.vercel.app/",
        },
      };

      await transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return false;
    }
  }

  /**
   * Send support email forwarding
   * @param fromEmail - sender email address
   * @param fromName - sender name
   * @param subject - email subject
   * @param message - email message content
   * @returns Promise<boolean>
   */
  async sendContactEmail(
    fromEmail: string,
    fromName: string,
    subject: string,
    message: string
  ): Promise<boolean> {
    try {
      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "support@rotaly-xyz.com",
        },
        to: String(process.env.MAIL_TO), // real email address to receive contact-us forms sent
        replyTo: fromEmail, // original sender to reply to
        subject: `[Contact Us] ${subject}`,
        template: "contact",
        context: {
          fromName: fromName,
          fromEmail: fromEmail,
          subject: subject,
          message: message,
          date: new Date().toLocaleString(),
          year: new Date().getFullYear(),
        },
      };

      await transporter.sendMail(mailOptions);
      console.log("Support email forwarded successfully");
      return true;
    } catch (error) {
      console.error("Error forwarding support email:", error);
      return false;
    }
  }

  /**
   * TODO: CREATE SEND BOOKING CONFIRMATION EMAIL METHOD
   */
}

export const emailService = new EmailService();
