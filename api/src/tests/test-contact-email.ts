import { emailService } from "../modules/email/service";

async function testSupportEmail() {
  console.log("Testing support email forwarding...");

  try {
    const result = await emailService.sendContactEmail(
      "test@example.com",
      "Test User",
      "Test Support Request",
      "This is a test message to verify the support email forwarding functionality is working correctly."
    );

    console.log("Support email test result:", result);

    if (result) {
      console.log("✅ Support email sent successfully!");
    } else {
      console.log("❌ Failed to send support email");
    }
  } catch (error) {
    console.error("Error testing support email:", error);
  }
}

if (require.main === module) {
  testSupportEmail();
}

export { testSupportEmail };
