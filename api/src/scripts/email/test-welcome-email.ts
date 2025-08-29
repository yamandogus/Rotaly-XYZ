import { emailService } from "../../modules/email/service";

async function testWelcomeEmailEnglish() {
  console.log("Testing welcome email (English)...");

  try {
    const result = await emailService.sendWelcomeEmail(
      "test@example.com",
      "Test User",
      "en"
    );

    console.log("English welcome email test result:", result);

    if (result) {
      console.log("English welcome email sent successfully!");
    } else {
      console.log("Failed to send English welcome email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English welcome email:", error);
    return false;
  }
}

async function testWelcomeEmailTurkish() {
  console.log("Testing welcome email (Turkish)...");

  try {
    const result = await emailService.sendWelcomeEmail(
      "test@example.com",
      "Test Kullanıcı",
      "tr"
    );

    console.log("Turkish welcome email test result:", result);

    if (result) {
      console.log("Turkish welcome email sent successfully!");
    } else {
      console.log("Failed to send Turkish welcome email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish welcome email:", error);
    return false;
  }
}

async function testAllWelcomeEmails() {
  console.log("🧪 Starting comprehensive welcome email tests...\n");

  const englishResult = await testWelcomeEmailEnglish();
  console.log("");

  const turkishResult = await testWelcomeEmailTurkish();
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
// npx ts-node src/scripts/test-welcome-email.ts
if (require.main === module) {
  testAllWelcomeEmails();
}

export {
  testWelcomeEmailEnglish,
  testWelcomeEmailTurkish,
  testAllWelcomeEmails,
};
