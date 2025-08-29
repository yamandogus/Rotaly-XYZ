/**
 * Email Template Testing Script
 *
 * Use this script to test your email templates locally
 * Run with: npx ts-node src/modules/email/test-templates.ts
 */

import { emailService } from "./service";

async function testEmailTemplates() {
  console.log("🧪 Testing Email Templates...\n");

  const testEmail = process.env.TEST_EMAIL || "test@example.com";
  const testName = "John Doe";

  try {
    console.log("Testing Verification Email...");
    await emailService.sendVerificationEmail(
      testEmail,
      testName,
      "123456",
      "en"
    );
    console.log("Verification email sent successfully\n");

    console.log("Testing Welcome Email...");
    await emailService.sendWelcomeEmail(testEmail, testName, "en");
    console.log("Welcome email sent successfully\n");

    console.log("All tests completed successfully!");
    console.log("\nNotes:");
    console.log("- Check your email client to see the rendered templates");
    console.log("- Verify that the logo appears correctly");
    console.log("- Test on different email clients (Gmail, Outlook, etc.)");
    console.log("- Check both desktop and mobile views");
  } catch (error) {
    console.error("Error testing email templates:", error);
  }
}

// Environment check
if (!process.env.EMAIL_HOST) {
  console.error(
    "Email configuration missing. Please set up your email environment variables."
  );
  console.log("\nRequired environment variables:");
  console.log("- EMAIL_HOST");
  console.log("- EMAIL_PORT");
  console.log("- EMAIL_USER");
  console.log("- EMAIL_PASS");
  console.log("- EMAIL_FROM_NAME");
  console.log("\nOptional:");
  console.log("- TEST_EMAIL (defaults to test@example.com)");
  console.log("- LOGO_URL (fallback logo URL)");
  console.log("- ASSETS_BASE_URL (production assets base URL)");
  process.exit(1);
}

// Run tests
testEmailTemplates();
