import { PrismaClient } from "@prisma/client";
import * as readline from "readline";
import { checkOwners } from "./check-owners";

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

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askForHotelDistribution(owners: any[]) {
  const rl = createReadlineInterface();
  const distribution: { ownerId: string; hotelCount: number }[] = [];

  console.log(
    `\n!!! Tüm otelleri eklemek için verdiğiniz sayıların toplamı ${seedHotels.length} olmalı.`
  );

  for (const owner of owners) {
    const question = `${owner.name} ${owner.surname} için kaç otel oluşturulsun? `;

    const answer = await new Promise<string>((resolve) => {
      rl.question(question, resolve);
    });

    const hotelCount = parseInt(answer.trim());

    if (isNaN(hotelCount) || hotelCount < 0) {
      console.log("Geçersiz sayı girdiniz. Bu owner için 0 otel atanacak.");
      distribution.push({ ownerId: owner.id, hotelCount: 0 });
    } else {
      distribution.push({ ownerId: owner.id, hotelCount });
    }
  }

  rl.close();

  // toplam otel sayısını kontrol et
  const totalAssigned = distribution.reduce((sum, d) => sum + d.hotelCount, 0);

  if (totalAssigned > seedHotels.length) {
    console.log(
      `Uyarı: Toplam atanan otel sayısı (${totalAssigned}) mevcut otel sayısından (${seedHotels.length}) fazla!`
    );
    console.log("Otel dağılımı mevcut oteller kadar ayarlanacak.");
  }

  return distribution;
}

async function seedDatabase() {
  try {
    const owners = await checkOwners();

    if (!owners || owners.length === 0) {
      console.log("Hiç owner bulunamadı. Önce users seed edin.");
    } else {
      // ask for hotel distribution among owners
      const distribution = await askForHotelDistribution(owners);

      // distribute hotels among owners
      await seedHotelsWithDistribution(distribution);
    }
  } catch (error) {
    console.error("Seed işlemi sırasında hata oluştu:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function seedHotelsWithDistribution(
  distribution: { ownerId: string; hotelCount: number }[]
) {
  // İsteğe bağlı: Mevcut otelleri temizleyin (mevcut verileri tutmak istiyorsanız yorum satırına yazın)
  /*   console.log("Mevcut oteller temizleniyor...");
  await prisma.hotel.deleteMany({}); */

  console.log("Oteller owner'lara dağıtılarak oluşturuluyor...");

  let hotelIndex = 0;
  let totalSuccessCount = 0;
  let totalErrorCount = 0;

  for (const dist of distribution) {
    if (dist.hotelCount === 0) continue;

    const owner = await prisma.user.findUnique({
      where: { id: dist.ownerId },
      select: { name: true, surname: true },
    });

    // oluşturulacak otel sayısını hesapla
    const actualHotelCount = Math.min(
      dist.hotelCount,
      seedHotels.length - hotelIndex
    );

    console.log(
      `\n${owner?.name} ${owner?.surname} için ${actualHotelCount} otel oluşturuluyor...`
    );

    let successCount = 0;
    let errorCount = 0;

    for (
      let i = 0;
      i < actualHotelCount && hotelIndex < seedHotels.length;
      i++, hotelIndex++
    ) {
      const hotelData = seedHotels[hotelIndex];

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
            ownerId: dist.ownerId,
            isActive: true,
          },
        });

        console.log(`  Otel oluşturuldu: ${hotel.name} - ${hotel.city}`);
        successCount++;
        totalSuccessCount++;
      } catch (error) {
        console.error(`  Otel oluşturulurken hata: ${hotelData.name}:`, error);
        errorCount++;
        totalErrorCount++;
      }
    }

    console.log(
      `${owner?.name} ${owner?.surname} için: ${successCount} başarılı, ${errorCount} hata`
    );
  }

  await printStatistics(totalSuccessCount, totalErrorCount);
}

async function printStatistics(successCount: number, errorCount: number) {
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

  const ownerStats = await prisma.user.findMany({
    where: { role: "OWNER" },
    select: {
      name: true,
      surname: true,
      _count: {
        select: {
          hotels: true,
        },
      },
    },
  });

  console.log("\nSeed İstatistikleri:");
  console.log(`Başarıyla oluşturulan: ${successCount} otel`);
  console.log(`Hatalar: ${errorCount} otel`);
  console.log(`Veritabanındaki toplam otel: ${totalHotels}`);
  console.log(`Otel bulunan şehir sayısı: ${uniqueCities.length}`);
  console.log(`Otel bulunan ülke sayısı: ${uniqueCountries.length}`);

  console.log("\nOwner'lara göre dağılım:");
  ownerStats.forEach((owner) => {
    console.log(
      `  - ${owner.name} ${owner.surname}: ${owner._count.hotels} otel`
    );
  });

  console.log("\nŞehirler:");
  uniqueCities.forEach((city) => {
    console.log(`  - ${city.city}: ${city._count.city} otel`);
  });

  console.log("\nÜlkeler:");
  uniqueCountries.forEach((country) => {
    console.log(`  - ${country.country}: ${country._count.country} otel`);
  });

  console.log("\nAI chat'i şu sorgularla test edebilirsiniz:");
  console.log('  - "İstanbul\'da otel arıyorum" (Türkçe)');
  console.log('  - "Looking for hotels in Paris" (İngilizce)');
  console.log('  - "Show me hotels in Dubai" (İngilizce)\n');
}

if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error("Veritabanı seed işlemi başarısız oldu:", error);
    process.exit(1);
  });
}

export { seedDatabase, seedHotels };
