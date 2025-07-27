import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { emailService } from "../modules/email/service";

async function main() {
  // verification email test
  const success1 = await emailService.sendVerificationEmail(
    "user@example.com",
    "Jane Doe"
  );

  // password reset email test
  const success2 = await emailService.sendPasswordResetEmail(
    "user@example.com",
    "Jane Doe"
  );

  // welcome email test
  const success3 = await emailService.sendWelcomeEmail(
    "user@example.com",
    "Jane Doe"
  );

  console.log("Verification email sent successfully:", success1);
  console.log("Password reset email sent successfully:", success2);
  console.log("Welcome email sent successfully:", success3);
}

main();
