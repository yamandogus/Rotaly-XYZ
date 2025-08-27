import { emailService } from "../../modules/email/service";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Import existing test functions
import {
  testVerificationEmailEnglish,
  testVerificationEmailTurkish,
} from "./test-verification-email";

import {
  testPasswordResetEmailEnglish,
  testPasswordResetEmailTurkish,
} from "./test-password-reset-email";

import {
  testWelcomeEmailEnglish,
  testWelcomeEmailTurkish,
} from "./test-welcome-email";

import {
  testContactEmailEnglish,
  testContactEmailTurkish,
} from "./test-contact-email";

// Import new test functions
import {
  testPaymentConfirmationEmailEnglish,
  testPaymentConfirmationEmailTurkish,
} from "./test-payment-confirmation-email";

import {
  testBookingConfirmationEmailEnglish,
  testBookingConfirmationEmailTurkish,
} from "./test-booking-confirmation-email";

import {
  testCheckInReminderEmailEnglish,
  testCheckInReminderEmailTurkish,
} from "./test-check-in-reminder-email";

async function testBookingCancellationEmailEnglish() {
  console.log("Testing booking cancellation email (English)...");

  try {
    const result = await emailService.sendBookingCancellationEmail(
      "test@example.com",
      {
        name: "John Doe",
        hotelName: "Grand Plaza Hotel Istanbul",
        confirmationNumber: "RPX-2025-031584",
        cancellationDate: "March 10, 2025",
        cancelledBy: "Customer",
        checkInDate: "March 15, 2025",
        checkOutDate: "March 18, 2025",
        nightCount: 3,
        guestCount: 2,
        roomType: "Deluxe Suite with Sea View",
        originalAmount: "1,250.00",
        cancellationFee: "0.00",
        refundAmount: "1,250.00",
        refundProcessingTime: "3-5 business days",
        cancellationReason: "Change in travel plans due to work commitments",
      },
      "en"
    );

    console.log("English booking cancellation email test result:", result);
    return result;
  } catch (error) {
    console.error("Error testing English booking cancellation email:", error);
    return false;
  }
}

async function testBookingCancellationEmailTurkish() {
  console.log("Testing booking cancellation email (Turkish)...");

  try {
    const result = await emailService.sendBookingCancellationEmail(
      "test@example.com",
      {
        name: "Ahmet Yılmaz",
        hotelName: "Cappadocia Cave Resort",
        confirmationNumber: "RPX-2025-031584",
        cancellationDate: "10 Mart 2025",
        cancelledBy: "Müşteri",
        checkInDate: "15 Mart 2025",
        checkOutDate: "18 Mart 2025",
        nightCount: 3,
        guestCount: 2,
        roomType: "Mağara Süit Premium",
        originalAmount: "4,750",
        cancellationFee: "0",
        refundAmount: "4,750",
        refundProcessingTime: "3-5 iş günü",
        cancellationReason:
          "İş yükümlülükleri nedeniyle seyahat planlarında değişiklik",
      },
      "tr"
    );

    console.log("Turkish booking cancellation email test result:", result);
    return result;
  } catch (error) {
    console.error("Error testing Turkish booking cancellation email:", error);
    return false;
  }
}

async function runAllEmailTests() {
  console.log("🚀 Starting Comprehensive Email Template Tests...\n");
  console.log("=".repeat(60));

  const testResults: { [key: string]: boolean } = {};

  // Test existing email templates
  console.log("\n📧 Testing Existing Email Templates");
  console.log("-".repeat(40));

  testResults["verificationEnglish"] = await testVerificationEmailEnglish();
  testResults["verificationTurkish"] = await testVerificationEmailTurkish();

  testResults["passwordResetEnglish"] = await testPasswordResetEmailEnglish();
  testResults["passwordResetTurkish"] = await testPasswordResetEmailTurkish();

  testResults["welcomeEnglish"] = await testWelcomeEmailEnglish();
  testResults["welcomeTurkish"] = await testWelcomeEmailTurkish();

  testResults["contactEnglish"] = await testContactEmailEnglish();
  testResults["contactTurkish"] = await testContactEmailTurkish();

  // Test new email templates
  console.log("\n🆕 Testing New Email Templates");
  console.log("-".repeat(40));

  testResults["paymentConfirmationEnglish"] =
    await testPaymentConfirmationEmailEnglish();
  testResults["paymentConfirmationTurkish"] =
    await testPaymentConfirmationEmailTurkish();

  testResults["bookingConfirmationEnglish"] =
    await testBookingConfirmationEmailEnglish();
  testResults["bookingConfirmationTurkish"] =
    await testBookingConfirmationEmailTurkish();

  testResults["bookingCancellationEnglish"] =
    await testBookingCancellationEmailEnglish();
  testResults["bookingCancellationTurkish"] =
    await testBookingCancellationEmailTurkish();

  testResults["checkInReminderEnglish"] =
    await testCheckInReminderEmailEnglish();
  testResults["checkInReminderTurkish"] =
    await testCheckInReminderEmailTurkish();

  // Generate comprehensive test summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 COMPREHENSIVE TEST RESULTS");
  console.log("=".repeat(60));

  const testCategories = [
    {
      name: "Verification Email",
      en: "verificationEnglish",
      tr: "verificationTurkish",
    },
    {
      name: "Password Reset Email",
      en: "passwordResetEnglish",
      tr: "passwordResetTurkish",
    },
    { name: "Welcome Email", en: "welcomeEnglish", tr: "welcomeTurkish" },
    { name: "Contact Email", en: "contactEnglish", tr: "contactTurkish" },
    {
      name: "Payment Confirmation",
      en: "paymentConfirmationEnglish",
      tr: "paymentConfirmationTurkish",
    },
    {
      name: "Booking Confirmation",
      en: "bookingConfirmationEnglish",
      tr: "bookingConfirmationTurkish",
    },
    {
      name: "Booking Cancellation",
      en: "bookingCancellationEnglish",
      tr: "bookingCancellationTurkish",
    },
    {
      name: "Check-in Reminder",
      en: "checkInReminderEnglish",
      tr: "checkInReminderTurkish",
    },
  ];

  let totalTests = 0;
  let passedTests = 0;

  testCategories.forEach((category) => {
    const enResult = testResults[category.en];
    const trResult = testResults[category.tr];

    totalTests += 2;
    if (enResult) passedTests++;
    if (trResult) passedTests++;

    console.log(`${category.name}:`);
    console.log(`  English: ${enResult ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`  Turkish: ${trResult ? "✅ PASS" : "❌ FAIL"}`);
    console.log("");
  });

  console.log("=".repeat(60));
  console.log(`📈 FINAL SUMMARY: ${passedTests}/${totalTests} tests passed`);
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

  if (passedTests === totalTests) {
    console.log("\n🎉 ALL EMAIL TEMPLATE TESTS PASSED! 🎉");
    console.log("Your email system is ready for production!");
  } else {
    console.log(
      `\n⚠️  ${
        totalTests - passedTests
      } tests failed. Please check the logs above.`
    );
  }

  console.log("=".repeat(60));

  process.exit(passedTests === totalTests ? 0 : 1);
}

// Only run if this file is executed directly
if (require.main === module) {
  runAllEmailTests().catch((error) => {
    console.error("Error running comprehensive email tests:", error);
    process.exit(1);
  });
}
