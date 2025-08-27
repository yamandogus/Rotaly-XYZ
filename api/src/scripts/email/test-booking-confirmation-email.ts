import { emailService } from "../../modules/email/service";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function testBookingConfirmationEmailEnglish() {
  console.log("Testing booking confirmation email (English)...");

  try {
    const result = await emailService.sendBookingConfirmationEmail(
      "test@example.com",
      {
        name: "John Doe",
        hotelName: "Grand Plaza Hotel Istanbul",
        hotelAddress: "Sultanahmet Square, Fatih, Istanbul, Turkey",
        hotelPhone: "+90 212 123 4567",
        checkInDate: "March 15, 2025",
        checkInTime: "3:00 PM",
        checkOutDate: "March 18, 2025",
        checkOutTime: "11:00 AM",
        nightCount: 3,
        guestCount: 2,
        roomType: "Deluxe Suite with Sea View",
        totalAmount: "1,250.00",
        confirmationNumber: "RPX-2025-031584",
        specialRequest: "Late check-in, please prepare room with extra pillows",
      },
      "en"
    );

    console.log("English booking confirmation email test result:", result);

    if (result) {
      console.log("✅ English booking confirmation email sent successfully!");
    } else {
      console.log("❌ Failed to send English booking confirmation email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English booking confirmation email:", error);
    return false;
  }
}

async function testBookingConfirmationEmailTurkish() {
  console.log("Testing booking confirmation email (Turkish)...");

  try {
    const result = await emailService.sendBookingConfirmationEmail(
      "test@example.com",
      {
        name: "Ahmet Yılmaz",
        hotelName: "Cappadocia Cave Resort",
        hotelAddress: "Göreme, Nevşehir, Kapadokya, Türkiye",
        hotelPhone: "+90 384 271 2525",
        checkInDate: "15 Mart 2025",
        checkInTime: "15:00",
        checkOutDate: "18 Mart 2025",
        checkOutTime: "11:00",
        nightCount: 3,
        guestCount: 2,
        roomType: "Mağara Süit Premium",
        totalAmount: "4,750",
        confirmationNumber: "RPX-2025-031584",
        specialRequest:
          "Geç check-in, lütfen odayı ekstra yastıklarla hazırlayın",
      },
      "tr"
    );

    console.log("Turkish booking confirmation email test result:", result);

    if (result) {
      console.log("✅ Turkish booking confirmation email sent successfully!");
    } else {
      console.log("❌ Failed to send Turkish booking confirmation email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish booking confirmation email:", error);
    return false;
  }
}

async function runTests() {
  console.log("🧪 Starting Booking Confirmation Email Tests...\n");

  const englishResult = await testBookingConfirmationEmailEnglish();
  console.log("");

  const turkishResult = await testBookingConfirmationEmailTurkish();
  console.log("");

  console.log("📊 Test Summary:");
  console.log(
    `English Booking Confirmation: ${englishResult ? "✅ PASS" : "❌ FAIL"}`
  );
  console.log(
    `Turkish Booking Confirmation: ${turkishResult ? "✅ PASS" : "❌ FAIL"}`
  );

  if (englishResult && turkishResult) {
    console.log("\n🎉 All booking confirmation email tests passed!");
  } else {
    console.log("\n⚠️ Some booking confirmation email tests failed.");
  }

  process.exit(0);
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch((error) => {
    console.error("Error running booking confirmation email tests:", error);
    process.exit(1);
  });
}

export {
  testBookingConfirmationEmailEnglish,
  testBookingConfirmationEmailTurkish,
};
