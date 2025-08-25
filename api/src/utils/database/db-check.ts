import { DatabaseUtilities } from "./database-utilities";

async function checkHotels() {
  try {
    console.log("Running database checks...\n");

    const stats = await DatabaseUtilities.getHotelStats();

    if (stats) {
      console.log(`Database Statistics:`);
      console.log(`   Total hotels: ${stats.totalHotels}`);
      console.log(`   Active hotels: ${stats.totalActiveHotels}`);
      console.log(`   Cities: ${stats.totalCities}`);
      console.log(`   Countries: ${stats.totalCountries}\n`);

      console.log(`Available cities (${stats.cities.length}):`);
      console.log(`   ${stats.cities.join(", ")}\n`);

      console.log(`Available countries (${stats.countries.length}):`);
      console.log(`   ${stats.countries.join(", ")}\n`);

      const testCities = ["istanbul", "ankara", "london", "nonexistent"];
      console.log(`Testing city existence:`);
      for (const city of testCities) {
        const exists = await DatabaseUtilities.cityExists(city);
        console.log(`   ${city}: ${exists ? "Found" : "Not found"}`);
      }
    } else {
      console.log("Failed to get database statistics");
    }
  } catch (error) {
    console.error("Error checking database:", error);
  }
}

checkHotels();
