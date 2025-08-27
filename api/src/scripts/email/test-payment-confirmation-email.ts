import { emailService } from "../../modules/email/service";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function testPaymentConfirmationEmailEnglish() {
  console.log("Testing payment confirmation email (English)...");

  try {
    const result = await emailService.sendPaymentConfirmationEmail(
      "test@example.com",
      {
        name: "John Doe",
        totalAmount: "1,250.00",
        cardLastFour: "4567",
        hotelName: "Grand Plaza Hotel Istanbul",
        checkInDate: "March 15, 2025",
        checkInTime: "3:00 PM",
        checkOutDate: "March 18, 2025",
        checkOutTime: "11:00 AM",
        guestCount: 2,
        roomType: "Deluxe Suite with Sea View",
        confirmationNumber: "RPX-2025-031584",
      },
      "en"
    );

    console.log("English payment confirmation email test result:", result);

    if (result) {
      console.log("✅ English payment confirmation email sent successfully!");
    } else {
      console.log("❌ Failed to send English payment confirmation email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English payment confirmation email:", error);
    return false;
  }
}

async function testPaymentConfirmationEmailTurkish() {
  console.log("Testing payment confirmation email (Turkish)...");

  try {
    const result = await emailService.sendPaymentConfirmationEmail(
      "test@example.com",
      {
        name: "Ahmet Yılmaz",
        totalAmount: "4,750",
        cardLastFour: "1234",
        hotelName: "Cappadocia Cave Resort",
        checkInDate: "15 Mart 2025",
        checkInTime: "15:00",
        checkOutDate: "18 Mart 2025",
        checkOutTime: "11:00",
        guestCount: 2,
        roomType: "Mağara Süit Premium",
        confirmationNumber: "RPX-2025-031584",
      },
      "tr"
    );

    console.log("Turkish payment confirmation email test result:", result);

    if (result) {
      console.log("✅ Turkish payment confirmation email sent successfully!");
    } else {
      console.log("❌ Failed to send Turkish payment confirmation email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish payment confirmation email:", error);
    return false;
  }
}

async function runTests() {
  console.log("🧪 Starting Payment Confirmation Email Tests...\n");

  const englishResult = await testPaymentConfirmationEmailEnglish();
  console.log("");

  const turkishResult = await testPaymentConfirmationEmailTurkish();
  console.log("");

  console.log("📊 Test Summary:");
  console.log(
    `English Payment Confirmation: ${englishResult ? "✅ PASS" : "❌ FAIL"}`
  );
  console.log(
    `Turkish Payment Confirmation: ${turkishResult ? "✅ PASS" : "❌ FAIL"}`
  );

  if (englishResult && turkishResult) {
    console.log("\n🎉 All payment confirmation email tests passed!");
  } else {
    console.log("\n⚠️ Some payment confirmation email tests failed.");
  }

  process.exit(0);
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch((error) => {
    console.error("Error running payment confirmation email tests:", error);
    process.exit(1);
  });
}

export {
  testPaymentConfirmationEmailEnglish,
  testPaymentConfirmationEmailTurkish,
};
