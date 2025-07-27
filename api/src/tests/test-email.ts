import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { emailService } from "../modules/email/service";

async function main() {
  // verification email test
  const success1 = await emailService.sendVerificationEmail(
    "caglayagmuricer@gmail.com", // receiver email
    "Çağla" // receiver name
  );

  // password reset email test
  const success2 = await emailService.sendPasswordResetEmail(
    "caglayagmuricer@gmail.com",
    "Çağla"
  );

  // welcome email test
  const success3 = await emailService.sendWelcomeEmail(
    "caglayagmuricer@gmail.com",
    "Çağla"
  );

  console.log("Verification email sent successfully:", success1);
  console.log("Password reset email sent successfully:", success2);
  console.log("Welcome email sent successfully:", success3);
}

main();
