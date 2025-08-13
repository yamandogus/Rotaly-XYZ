import { emailService } from "../modules/email/service";

async function testSupportConfirmationEmailEnglish() {
  console.log("Testing support confirmation email (English)...");

  try {
    const result = await emailService.sendSupportConfirmationEmail(
      "test@example.com",
      "Test User",
      "en"
    );

    console.log("English support confirmation email test result:", result);

    if (result) {
      console.log("✅ English support confirmation email sent successfully!");
    } else {
      console.log("❌ Failed to send English support confirmation email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English support confirmation email:", error);
    return false;
  }
}

async function testSupportConfirmationEmailTurkish() {
  console.log("Testing support confirmation email (Turkish)...");

  try {
    const result = await emailService.sendSupportConfirmationEmail(
      "test@example.com",
      "Test Kullanıcı",
      "tr"
    );

    console.log("Turkish support confirmation email test result:", result);

    if (result) {
      console.log("✅ Turkish support confirmation email sent successfully!");
    } else {
      console.log("❌ Failed to send Turkish support confirmation email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish support confirmation email:", error);
    return false;
  }
}

async function testAllSupportConfirmationEmails() {
  console.log(
    "🧪 Starting comprehensive support confirmation email tests...\n"
  );

  const englishResult = await testSupportConfirmationEmailEnglish();
  console.log("");

  const turkishResult = await testSupportConfirmationEmailTurkish();
  console.log("");

  console.log("📊 Test Summary:");
  console.log(
    `English template test: ${englishResult ? "✅ PASSED" : "❌ FAILED"}`
  );
  console.log(
    `Turkish template test: ${turkishResult ? "✅ PASSED" : "❌ FAILED"}`
  );

  const allPassed = englishResult && turkishResult;
  console.log(
    `\n🎯 Overall result: ${
      allPassed ? "✅ ALL TESTS PASSED" : "❌ SOME TESTS FAILED"
    }`
  );

  return allPassed;
}

// run every test if the file is executed from cmd
// npx ts-node src/scripts/test-support-confirmation-email.ts
if (require.main === module) {
  testAllSupportConfirmationEmails();
}

export {
  testSupportConfirmationEmailEnglish,
  testSupportConfirmationEmailTurkish,
  testAllSupportConfirmationEmails,
};
