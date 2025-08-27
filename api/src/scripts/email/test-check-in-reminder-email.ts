import { emailService } from "../../modules/email/service";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function testCheckInReminderEmailEnglish() {
  console.log("Testing check-in reminder email (English)...");

  try {
    const result = await emailService.sendCheckInReminderEmail(
      "test@example.com",
      {
        name: "John Doe",
        hotelName: "Grand Plaza Hotel Istanbul",
        hotelAddress: "Sultanahmet Square, Fatih, Istanbul, Turkey",
        hotelPhone: "+90 212 123 4567",
        checkInDate: "Tomorrow, March 15, 2025",
        checkInTime: "3:00 PM",
        roomType: "Deluxe Suite with Sea View",
        confirmationNumber: "RPX-2025-031584",
        additionalGuests: true,
        parkingInfo: "Complimentary valet parking available",
        transportationInfo: "15 minutes from Istanbul Airport",
        mapsLink: "https://maps.google.com/example",
        specialRequest: "Late check-in, please prepare room with extra pillows",
      },
      "en"
    );

    console.log("English check-in reminder email test result:", result);

    if (result) {
      console.log("✅ English check-in reminder email sent successfully!");
    } else {
      console.log("❌ Failed to send English check-in reminder email");
    }

    return result;
  } catch (error) {
    console.error("Error testing English check-in reminder email:", error);
    return false;
  }
}

async function testCheckInReminderEmailTurkish() {
  console.log("Testing check-in reminder email (Turkish)...");

  try {
    const result = await emailService.sendCheckInReminderEmail(
      "test@example.com",
      {
        name: "Ahmet Yılmaz",
        hotelName: "Cappadocia Cave Resort",
        hotelAddress: "Göreme, Nevşehir, Kapadokya, Türkiye",
        hotelPhone: "+90 384 271 2525",
        checkInDate: "Yarın, 15 Mart 2025",
        checkInTime: "15:00",
        roomType: "Mağara Süit Premium",
        confirmationNumber: "RPX-2025-031584",
        additionalGuests: false,
        parkingInfo: "Ücretsiz vale park hizmeti mevcuttur",
        transportationInfo: "Nevşehir Havalimanı'ndan 45 dakika",
        mapsLink: "https://maps.google.com/example",
        specialRequest:
          "Geç check-in, lütfen odayı ekstra yastıklarla hazırlayın",
      },
      "tr"
    );

    console.log("Turkish check-in reminder email test result:", result);

    if (result) {
      console.log("✅ Turkish check-in reminder email sent successfully!");
    } else {
      console.log("❌ Failed to send Turkish check-in reminder email");
    }

    return result;
  } catch (error) {
    console.error("Error testing Turkish check-in reminder email:", error);
    return false;
  }
}

async function runTests() {
  console.log("🧪 Starting Check-in Reminder Email Tests...\n");

  const englishResult = await testCheckInReminderEmailEnglish();
  console.log("");

  const turkishResult = await testCheckInReminderEmailTurkish();
  console.log("");

  console.log("📊 Test Summary:");
  console.log(
    `English Check-in Reminder: ${englishResult ? "✅ PASS" : "❌ FAIL"}`
  );
  console.log(
    `Turkish Check-in Reminder: ${turkishResult ? "✅ PASS" : "❌ FAIL"}`
  );

  if (englishResult && turkishResult) {
    console.log("\n🎉 All check-in reminder email tests passed!");
  } else {
    console.log("\n⚠️ Some check-in reminder email tests failed.");
  }

  process.exit(0);
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch((error) => {
    console.error("Error running check-in reminder email tests:", error);
    process.exit(1);
  });
}

export { testCheckInReminderEmailEnglish, testCheckInReminderEmailTurkish };
