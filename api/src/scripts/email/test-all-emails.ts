// ----------------------------------------------------
//   npx ts-node src/scripts/email/test-all-emails.ts
// ----------------------------------------------------

import { testAllContactEmails } from "./test-contact-email";
import { testAllVerificationEmails } from "./test-verification-email";
import { testAllPasswordResetEmails } from "./test-password-reset-email";
import { testAllWelcomeEmails } from "./test-welcome-email";
import { testAllSupportConfirmationEmails } from "./test-support-confirmation-email";

async function testAllEmailTemplates() {
  console.log(
    "Starting comprehensive email template tests for all email types...\n"
  );
  console.log("=".repeat(70));
  console.log("                    EMAIL TEMPLATE TEST SCRIPTS");
  console.log("=".repeat(70));
  console.log("");

  const results = {
    contact: false,
    verification: false,
    passwordReset: false,
    welcome: false,
    supportConfirmation: false,
  };

  // Test Contact Emails
  console.log("TESTING CONTACT EMAILS");
  console.log("-".repeat(50));
  results.contact = await testAllContactEmails();
  console.log("");

  // Test Verification Emails
  console.log("TESTING VERIFICATION EMAILS");
  console.log("-".repeat(50));
  results.verification = await testAllVerificationEmails();
  console.log("");

  // Test Password Reset Emails
  console.log("🔐 TESTING PASSWORD RESET EMAILS");
  console.log("-".repeat(50));
  results.passwordReset = await testAllPasswordResetEmails();
  console.log("");

  // Test Welcome Emails
  console.log("TESTING WELCOME EMAILS");
  console.log("-".repeat(50));
  results.welcome = await testAllWelcomeEmails();
  console.log("");

  // Test Support Confirmation Emails
  console.log("📞 TESTING SUPPORT CONFIRMATION EMAILS");
  console.log("-".repeat(50));
  results.supportConfirmation = await testAllSupportConfirmationEmails();
  console.log("");

  // Final Summary
  console.log("=".repeat(70));
  console.log("                    FINAL TEST RESULTS");
  console.log("=".repeat(70));
  console.log("");
  console.log("Email Template Test Summary:");
  console.log(`Contact emails:       ${results.contact ? "PASSED" : "FAILED"}`);
  console.log(
    `Verification emails:  ${results.verification ? "PASSED" : "FAILED"}`
  );
  console.log(
    `Password reset emails: ${results.passwordReset ? "PASSED" : "FAILED"}`
  );
  console.log(`Welcome emails:       ${results.welcome ? "PASSED" : "FAILED"}`);
  console.log(
    `Support confirmation:  ${
      results.supportConfirmation ? "PASSED" : "FAILED"
    }`
  );
  console.log("");

  const allPassed = Object.values(results).every(Boolean);
  const passedCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;

  console.log(
    `🎯 Overall result: ${passedCount}/${totalCount} email types passed`
  );
  console.log(
    `🏆 Final Status: ${
      allPassed
        ? "ALL EMAIL TEMPLATES WORKING!"
        : "SOME EMAIL TEMPLATES NEED ATTENTION"
    }`
  );
  console.log("");
  console.log("=".repeat(70));

  return allPassed;
}

if (require.main === module) {
  testAllEmailTemplates();
}

export { testAllEmailTemplates };
