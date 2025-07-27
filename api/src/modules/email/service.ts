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
          address: String(process.env.SMTP_USER),
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

      const result = await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully:", result.messageId);
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
          address: String(process.env.SMTP_USER),
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

      const result = await transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully:", result.messageId);
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
  /* TODO: CREATE WELCOME EMAIL TEMPLATE */
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: String(process.env.SMTP_USER),
        },
        to: email,
        subject: "Welcome to Rotaly XYZ!",
        html: `
          <h2>Welcome to Rotaly XYZ, ${name}!</h2>
          <p>Thank you for joining our platform. We're excited to have you on board!</p>
          <p>You can now start exploring our hotel booking services.</p>
          <p>Best regards,<br>The Rotaly XYZ Team</p>
        `,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully:", result.messageId);
      return true;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return false;
    }
  }

  /**
   * TODO: CREATE SEND BOOKING CONFIRMATION EMAIL METHOD
   */
}

export const emailService = new EmailService();
