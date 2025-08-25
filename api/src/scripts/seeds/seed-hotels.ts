import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SeedHotel {
  name: string;
  description: string;
  city: string;
  country: string;
  address: string;
  location: string;
  rating: number;
  type:
    | "HOTEL"
    | "VILLA"
    | "APARTMENT"
    | "BUNGALOW"
    | "HOSTEL"
    | "RESORT"
    | "ROOM"
    | "CAMP";
}

const seedHotels: SeedHotel[] = [
  // Turkish Cities
  {
    name: "Grand Istanbul Palace",
    description: "Luxury hotel in the heart of Istanbul with Bosphorus views",
    city: "Istanbul",
    country: "Turkey",
    address: "Sultanahmet Square, Istanbul",
    location: "Istanbul, Turkey",
    rating: 4.8,
    type: "HOTEL",
  },
  {
    name: "Antalya Beach Resort",
    description: "Beautiful beachfront resort in Antalya",
    city: "Antalya",
    country: "Turkey",
    address: "Lara Beach, Antalya",
    location: "Antalya, Turkey",
    rating: 4.6,
    type: "RESORT",
  },
  {
    name: "Cappadocia Cave Hotel",
    description: "Unique cave hotel experience in Cappadocia",
    city: "Nevşehir",
    country: "Turkey",
    address: "Göreme, Nevşehir",
    location: "Nevşehir, Turkey",
    rating: 4.9,
    type: "HOTEL",
  },
  {
    name: "İzmir Coastal Villa",
    description: "Modern villa with sea views in İzmir",
    city: "İzmir",
    country: "Turkey",
    address: "Alsancak, İzmir",
    location: "İzmir, Turkey",
    rating: 4.7,
    type: "VILLA",
  },
  {
    name: "Ankara Business Hotel",
    description: "Modern business hotel in Ankara city center",
    city: "Ankara",
    country: "Turkey",
    address: "Kızılay, Ankara",
    location: "Ankara, Turkey",
    rating: 4.3,
    type: "HOTEL",
  },
  {
    name: "Bursa Thermal Hotel",
    description: "Thermal spa hotel in historic Bursa",
    city: "Bursa",
    country: "Turkey",
    address: "Osmangazi, Bursa",
    location: "Bursa, Turkey",
    rating: 4.4,
    type: "HOTEL",
  },

  // European Cities
  {
    name: "London Royal Suite",
    description: "Elegant hotel near Big Ben and Thames",
    city: "London",
    country: "United Kingdom",
    address: "Westminster, London",
    location: "London, United Kingdom",
    rating: 4.8,
    type: "HOTEL",
  },
  {
    name: "Paris Boutique Hotel",
    description: "Charming boutique hotel in the heart of Paris",
    city: "Paris",
    country: "France",
    address: "Champs-Élysées, Paris",
    location: "Paris, France",
    rating: 4.7,
    type: "HOTEL",
  },
  {
    name: "Barcelona Beach Apartment",
    description: "Modern apartment near Barcelona beach",
    city: "Barcelona",
    country: "Spain",
    address: "Barceloneta, Barcelona",
    location: "Barcelona, Spain",
    rating: 4.5,
    type: "APARTMENT",
  },
  {
    name: "Rome Historic Hotel",
    description: "Historic hotel near the Colosseum",
    city: "Rome",
    country: "Italy",
    address: "Colosseo, Rome",
    location: "Rome, Italy",
    rating: 4.6,
    type: "HOTEL",
  },
  {
    name: "Amsterdam Canal House",
    description: "Traditional canal house converted to boutique hotel",
    city: "Amsterdam",
    country: "Netherlands",
    address: "Jordaan, Amsterdam",
    location: "Amsterdam, Netherlands",
    rating: 4.8,
    type: "HOTEL",
  },
  {
    name: "Berlin Modern Hostel",
    description: "Contemporary hostel in Berlin city center",
    city: "Berlin",
    country: "Germany",
    address: "Mitte, Berlin",
    location: "Berlin, Germany",
    rating: 4.2,
    type: "HOSTEL",
  },

  // Asian Cities
  {
    name: "Tokyo Sky Hotel",
    description: "Modern hotel with Tokyo skyline views",
    city: "Tokyo",
    country: "Japan",
    address: "Shibuya, Tokyo",
    location: "Tokyo, Japan",
    rating: 4.7,
    type: "HOTEL",
  },
  {
    name: "Bangkok Luxury Resort",
    description: "Luxury resort in the heart of Bangkok",
    city: "Bangkok",
    country: "Thailand",
    address: "Sukhumvit, Bangkok",
    location: "Bangkok, Thailand",
    rating: 4.6,
    type: "RESORT",
  },
  {
    name: "Singapore Marina Hotel",
    description: "Waterfront hotel with marina views",
    city: "Singapore",
    country: "Singapore",
    address: "Marina Bay, Singapore",
    location: "Singapore",
    rating: 4.8,
    type: "HOTEL",
  },
  {
    name: "Seoul Business Hotel",
    description: "Modern business hotel in Seoul",
    city: "Seoul",
    country: "South Korea",
    address: "Gangnam, Seoul",
    location: "Seoul, South Korea",
    rating: 4.5,
    type: "HOTEL",
  },

  // American Cities
  {
    name: "New York Central Hotel",
    description: "Iconic hotel in Manhattan",
    city: "New York",
    country: "United States",
    address: "Times Square, New York",
    location: "New York, United States",
    rating: 4.5,
    type: "HOTEL",
  },
  {
    name: "Miami Beach Resort",
    description: "Beachfront resort in Miami",
    city: "Miami",
    country: "United States",
    address: "South Beach, Miami",
    location: "Miami, United States",
    rating: 4.7,
    type: "RESORT",
  },
  {
    name: "Los Angeles Villa",
    description: "Luxury villa in Los Angeles",
    city: "Los Angeles",
    country: "United States",
    address: "Beverly Hills, Los Angeles",
    location: "Los Angeles, United States",
    rating: 4.8,
    type: "VILLA",
  },

  // Middle Eastern Cities
  {
    name: "Dubai Luxury Hotel",
    description: "Ultra-luxury hotel in Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Downtown Dubai",
    location: "Dubai, United Arab Emirates",
    rating: 4.9,
    type: "HOTEL",
  },
  {
    name: "Cairo Historic Hotel",
    description: "Historic hotel near the pyramids",
    city: "Cairo",
    country: "Egypt",
    address: "Giza, Cairo",
    location: "Cairo, Egypt",
    rating: 4.3,
    type: "HOTEL",
  },

  // African Cities
  {
    name: "Marrakech Riad",
    description: "Traditional Moroccan riad in Marrakech",
    city: "Marrakech",
    country: "Morocco",
    address: "Medina, Marrakech",
    location: "Marrakech, Morocco",
    rating: 4.6,
    type: "HOTEL",
  },

  // Australian Cities
  {
    name: "Sydney Harbor Hotel",
    description: "Hotel with Sydney Harbor views",
    city: "Sydney",
    country: "Australia",
    address: "Circular Quay, Sydney",
    location: "Sydney, Australia",
    rating: 4.7,
    type: "HOTEL",
  },
  {
    name: "Melbourne City Apartment",
    description: "Modern apartment in Melbourne CBD",
    city: "Melbourne",
    country: "Australia",
    address: "Collins Street, Melbourne",
    location: "Melbourne, Australia",
    rating: 4.4,
    type: "APARTMENT",
  },
];

async function createDefaultOwner() {
  // Check if there's already a user to use as owner
  const existingUser = await prisma.user.findFirst({
    where: {
      role: "OWNER",
    },
  });

  if (existingUser) {
    console.log(`📋 Using existing owner: ${existingUser.email}`);
    return existingUser.id;
  }

  // Create a default owner for the hotels
  const defaultOwner = await prisma.user.create({
    data: {
      name: "Hotel",
      surname: "Owner",
      email: "owner@rotaly.com",
      phone: "+901234567890",
      hashedPassword: "hashedPassword123", // In real scenario, this should be properly hashed
      role: "OWNER",
      isVerified: true,
    },
  });

  console.log(`👤 Created default owner: ${defaultOwner.email}`);
  return defaultOwner.id;
}

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Create or get default owner
    const ownerId = await createDefaultOwner();

    // Optional: Clear existing hotels (comment out if you want to keep existing data)
    console.log("🧹 Clearing existing hotels...");
    await prisma.hotel.deleteMany({});

    console.log("🏨 Creating seed hotels...");

    let successCount = 0;
    let errorCount = 0;

    // Create hotels one by one to handle potential errors
    for (const hotelData of seedHotels) {
      try {
        const hotel = await prisma.hotel.create({
          data: {
            name: hotelData.name,
            description: hotelData.description,
            city: hotelData.city,
            country: hotelData.country,
            address: hotelData.address,
            location: hotelData.location,
            rating: hotelData.rating,
            type: hotelData.type,
            ownerId: ownerId,
            isActive: true,
          },
        });

        console.log(`✅ Created hotel: ${hotel.name} in ${hotel.city}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error creating hotel ${hotelData.name}:`, error);
        errorCount++;
      }
    }

    // Get statistics
    const totalHotels = await prisma.hotel.count();
    const uniqueCities = await prisma.hotel.groupBy({
      by: ["city"],
      _count: {
        city: true,
      },
    });

    const uniqueCountries = await prisma.hotel.groupBy({
      by: ["country"],
      _count: {
        country: true,
      },
    });

    console.log("\n📊 Seeding Statistics:");
    console.log(`✅ Successfully created: ${successCount} hotels`);
    console.log(`❌ Errors: ${errorCount} hotels`);
    console.log(`📈 Total hotels in database: ${totalHotels}`);
    console.log(`🏙️ Cities with hotels: ${uniqueCities.length}`);
    console.log(`🌍 Countries with hotels: ${uniqueCountries.length}`);

    console.log("\n🏙️ Cities:");
    uniqueCities.forEach((city) => {
      console.log(`  - ${city.city}: ${city._count.city} hotels`);
    });

    console.log("\n🌍 Countries:");
    uniqueCountries.forEach((country) => {
      console.log(`  - ${country.country}: ${country._count.country} hotels`);
    });

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n💡 You can now test the AI chat with queries like:");
    console.log('  - "İstanbul\'da otel arıyorum" (Turkish)');
    console.log('  - "Looking for hotels in Paris" (English)');
    console.log('  - "Show me hotels in Dubai"');
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  });
}

export { seedDatabase, seedHotels };
