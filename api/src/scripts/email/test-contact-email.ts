// -------------------------------------------------------
//   npx ts-node src/scripts/email/test-contact-email.ts
// -------------------------------------------------------

import { emailService } from "../../modules/email/service";

async function testContactEmailEnglish() {
  console.log("Testing contact email forwarding (English)...");

  try {
    const result = await emailService.sendContactEmail(
      "test@example.com",
      "Test User",
      "Test Support Request",
      "This is a test message to verify the support email forwarding functionality is working correctly.",
      "en"
    );

    console.log("English contact email test result:", result);

    if (result) {
      console.log("English contact email sent successfully!");
    } else {
      console.log("Failed to send English contact email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English contact email:", error);
    return false;
  }
}

async function testContactEmailTurkish() {
  console.log("Testing contact email forwarding (Turkish)...");

  try {
    const result = await emailService.sendContactEmail(
      "test@example.com",
      "Test Kullanıcı",
      "Test Destek İsteği",
      "Bu, destek e-postası yönlendirme işlevinin doğru çalıştığını doğrulamak için bir test mesajıdır.",
      "tr"
    );

    console.log("Turkish contact email test result:", result);

    if (result) {
      console.log("Turkish contact email sent successfully!");
    } else {
      console.log("Failed to send Turkish contact email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish contact email:", error);
    return false;
  }
}

async function testAllContactEmails() {
  console.log("🧪 Starting comprehensive contact email tests...\n");

  const englishResult = await testContactEmailEnglish();
  console.log("");

  const turkishResult = await testContactEmailTurkish();
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

if (require.main === module) {
  testAllContactEmails();
}

export {
  testContactEmailEnglish,
  testContactEmailTurkish,
  testAllContactEmails,
};
