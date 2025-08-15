import { transporter } from "../../config/email";

export class EmailService {
  /**
   * Send verification email
   * @param email - receiver email address
   * @param name - receiver name
   * @param otp - one-time password for verification
   * @param locale - language locale (en, tr)
   * @returns Promise<boolean>
   */
  async sendVerificationEmail(
    email: string,
    name: string,
    otp: string,
    locale: string = "en"
  ): Promise<boolean> {
    try {
      const templateName =
        locale === "tr" ? "tr/verification" : "en/verification";
      const subject =
        locale === "tr"
          ? "E-posta Doğrulama - Rotaly XYZ"
          : "Email Verification - Rotaly XYZ";

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "verify@rotaly-xyz.com",
        },
        to: email,
        subject: subject,
        template: templateName,
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
   * @param otp - one-time password for verification
   * @param locale - language locale (en, tr)
   * @returns Promise<boolean>
   */
  async sendPasswordResetEmail(
    email: string,
    name: string,
    otp: string,
    locale: string = "en"
  ): Promise<boolean> {
    try {
      const templateName =
        locale === "tr" ? "tr/password-reset" : "en/password-reset";
      const subject =
        locale === "tr"
          ? "Şifre Sıfırlama - Rotaly XYZ"
          : "Password Reset - Rotaly XYZ";

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "reset@rotaly-xyz.com",
        },
        to: email,
        subject: subject,
        template: templateName,
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
   * @param locale - language locale (en, tr)
   * @returns Promise<boolean>
   */
  async sendWelcomeEmail(
    email: string,
    name: string,
    locale: string = "en"
  ): Promise<boolean> {
    try {
      const templateName = locale === "tr" ? "tr/welcome" : "en/welcome";
      const subject =
        locale === "tr"
          ? "Rotaly XYZ'ye Hoş Geldiniz!"
          : "Welcome to Rotaly XYZ!";

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "noreply@rotaly-xyz.com",
        },
        to: email,
        subject: subject,
        template: templateName,
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
   * @param locale - language locale (en, tr)
   * @returns Promise<boolean>
   */
  async sendContactEmail(
    fromEmail: string,
    fromName: string,
    subject: string,
    message: string,
    locale: string = "en"
  ): Promise<boolean> {
    try {
      const templateName = locale === "tr" ? "tr/contact" : "en/contact";

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "support@rotaly-xyz.com",
        },
        to: String(process.env.SUPPORT_MAIL_TO), // real email address to receive contact-us forms sent
        replyTo: fromEmail, // original sender to reply to
        subject: `[Contact Us] ${subject}`,
        template: templateName,
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
   * Send support confirmation email to the user
   * @param email - receiver email address
   * @param name - receiver name
   * @param locale - language locale (en, tr)
   * @returns Promise<boolean>
   */
  async sendSupportConfirmationEmail(
    email: string,
    name: string,
    locale: string = "en"
  ): Promise<boolean> {
    try {
      const templateName =
        locale === "tr" ? "tr/support-confirmation" : "en/support-confirmation";
      const subject =
        locale === "tr"
          ? "Mesajınız Alındı - Rotaly XYZ"
          : "Message Received - Rotaly XYZ";

      const mailOptions = {
        from: {
          name: String(process.env.EMAIL_FROM_NAME),
          address: "support@rotaly-xyz.com",
        },
        to: email,
        subject: subject,
        template: templateName,
        context: {
          name: name,
          year: new Date().getFullYear(),
          date: new Date().toLocaleString(),
        },
      };

      await transporter.sendMail(mailOptions);
      console.log("Support confirmation email sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending support confirmation email:", error);
      return false;
    }
  }

  /**
   * TODO: CREATE SEND BOOKING CONFIRMATION EMAIL METHOD
   */
}

export const emailService = new EmailService();
