// ------------------------------------------------------------
//   npx ts-node src/scripts/email/test-verification-email.ts
// ------------------------------------------------------------

import { emailService } from "../../modules/email/service";
import { generateOTP } from "../../utils/otp";

async function testVerificationEmailEnglish() {
  console.log("Testing verification email (English)...");

  try {
    const otp = generateOTP(6);
    console.log(`Generated OTP for English test: ${otp}`);

    const result = await emailService.sendVerificationEmail(
      "test@example.com",
      "Test User",
      otp,
      "en"
    );

    console.log("English verification email test result:", result);

    if (result) {
      console.log("English verification email sent successfully!");
    } else {
      console.log("Failed to send English verification email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English verification email:", error);
    return false;
  }
}

async function testVerificationEmailTurkish() {
  console.log("Testing verification email (Turkish)...");

  try {
    const otp = generateOTP(6);
    console.log(`Generated OTP for Turkish test: ${otp}`);

    const result = await emailService.sendVerificationEmail(
      "test@example.com",
      "Test Kullanıcı",
      otp,
      "tr"
    );

    console.log("Turkish verification email test result:", result);

    if (result) {
      console.log("Turkish verification email sent successfully!");
    } else {
      console.log("Failed to send Turkish verification email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish verification email:", error);
    return false;
  }
}

async function testAllVerificationEmails() {
  console.log("🧪 Starting comprehensive verification email tests...\n");

  const englishResult = await testVerificationEmailEnglish();
  console.log("");

  const turkishResult = await testVerificationEmailTurkish();
  console.log("");

  console.log("Test Summary:");
  console.log(`English template test: ${englishResult ? "PASSED" : "FAILED"}`);
  console.log(`Turkish template test: ${turkishResult ? "PASSED" : "FAILED"}`);

  const allPassed = englishResult && turkishResult;
  console.log(
    `\n🎯 Overall result: ${
      allPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED"
    }`
  );

  return allPassed;
}

// run every test if the file is executed from cmd
// npx ts-node src/scripts/test-verification-email.ts
if (require.main === module) {
  testAllVerificationEmails();
}

export {
  testVerificationEmailEnglish,
  testVerificationEmailTurkish,
  testAllVerificationEmails,
};
