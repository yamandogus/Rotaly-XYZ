import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

// This is a placeholder for the actual hotel data.
// The hotelsData.json file is too large to be directly embedded or fully read by the tool in one go.
// Please provide a smaller sample of hotelsData.json or specify how you'd like to handle the large file (e.g., process a limited number of entries, or a different access method).
// const hotelsData = []; // Will be populated dynamically or with a smaller subset.

async function seedHotels() {
  console.log("\n🏨 Otel seed işlemi başlatılıyor...");

  const ownerId = "43ccd9c0-d5bb-4495-88fe-28690542415c"; // Replace with an actual owner ID from your database or create one

  try {
    // Clear existing data to prevent duplicates during re-seeding
    console.log("🧹 Mevcut otel verileri temizleniyor...");
    await prisma.comment.deleteMany({});
    await prisma.roomFeatureStatus.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.hotelProps.deleteMany({});
    await prisma.image.deleteMany({});
    await prisma.hotel.deleteMany({});
    console.log("✅ Mevcut otel verileri temizlendi.");

    console.log("⏳ hotelsData.json okunuyor...");
    const data = await fs.readFile('../web/src/data/hotelsData.json', 'utf-8');
    const hotelsData = JSON.parse(data);
    console.log(`✅ ${hotelsData.length} otel verisi okundu.`);

    let hotelSuccessCount = 0;
    let roomSuccessCount = 0;
    let imageSuccessCount = 0;
    let propSuccessCount = 0;
    let commentSuccessCount = 0;
    let errorCount = 0;

    for (const hotelData of hotelsData) {
      try {
        // Create Hotel
        const hotel = await prisma.hotel.create({
          data: {
            id: hotelData.id,
            name: hotelData.name,
            description: hotelData.description,
            checkIn: hotelData.checkIn,
            checkOut: hotelData.checkOut,
            location: hotelData.location,
            address: hotelData.address,
            city: hotelData.city,
            country: hotelData.country,
            rating: hotelData.rating,
            discountRate: hotelData.discountRate,
            isDiscounted: hotelData.isDiscounted,
            discountStartDate: hotelData.discountStartDate ? new Date(hotelData.discountStartDate) : null,
            discountEndDate: hotelData.discountEndDate ? new Date(hotelData.discountEndDate) : null,
            type: hotelData.type,
            ownerId: ownerId, // Assign to the predefined owner
            isActive: hotelData.isActive,
            createdAt: new Date(hotelData.createdAt),
            updatedAt: new Date(hotelData.updatedAt),
            deletedAt: hotelData.deletedAt ? new Date(hotelData.deletedAt) : null,
            taxId: hotelData.taxId,
            taxOffice: hotelData.taxOffice,
            tradeRegistryNumber: String(hotelData.tradeRegistryNumber), // Ensure it's a string
            businessLicense: hotelData.businessLicense,
            addressProof: hotelData.addressProof,
            taxCertificate: hotelData.taxCertificate,
          },
        });
        console.log(`  ✅ Otel oluşturuldu: ${hotel.name} (${hotel.id})`);
        hotelSuccessCount++;

        // Create Rooms
        for (const roomData of hotelData.rooms) {
          const room = await prisma.room.create({
            data: {
              id: roomData.id,
              name: roomData.name,
              description: roomData.description,
              price: roomData.price,
              maxAdults: roomData.maxAdults,
              maxChildren: roomData.maxChildren,
              floor: roomData.floor,
              roomNumber: roomData.roomNumber,
              capacity: roomData.capacity,
              bedCount: roomData.bedCount,
              isAvailable: roomData.isAvailable,
              type: roomData.type,
              hotelId: hotel.id,
              createdAt: new Date(roomData.createdAt),
              updatedAt: new Date(roomData.updatedAt),
              deletedAt: roomData.deletedAt ? new Date(roomData.deletedAt) : null,
              featureStatus: {
                create: roomData.featureStatus.map((fs: any) => ({
                  id: fs.id,
                  feature: fs.feature,
                  isAvailable: fs.isAvailable,
                  deletedAt: fs.deletedAt ? new Date(fs.deletedAt) : null,
                })),
              },
            },
            include: {
              featureStatus: true,
            },
          });
          console.log(`    ✅ Oda oluşturuldu: ${room.name} (${room.id})`);
          roomSuccessCount++;
        }

        // Create Images
        for (const imageData of hotelData.images) {
          const image = await prisma.image.create({
            data: {
              id: imageData.id,
              url: imageData.url,
              hotelId: hotel.id,
              createdAt: new Date(imageData.createdAt),
              deletedAt: imageData.deletedAt ? new Date(imageData.deletedAt) : null,
            },
          });
          console.log(`    🖼️ Resim oluşturuldu: ${image.url}`);
          imageSuccessCount++;
        }

        // Create Properties
        for (const propData of hotelData.props) {
          const property = await prisma.hotelProps.create({
            data: {
              id: propData.id,
              hotelId: hotel.id,
              feature: propData.feature,
              createdAt: new Date(propData.createdAt),
            },
          });
          console.log(`    ✨ Özellik oluşturuldu: ${property.feature}`);
          propSuccessCount++;
        }

        // Create Comments
        for (const commentData of hotelData.comments) {
          const comment = await prisma.comment.create({
            data: {
              id: commentData.id || uuidv4(),
              rating: commentData.rating,
              text: commentData.text,
              userId: commentData.userId,
              hotelId: hotel.id,
              createdAt: new Date(), // Assuming comments are newly created
              updatedAt: new Date(),
            },
          });
          console.log(`    💬 Yorum oluşturuldu: ${comment.id}`);
          commentSuccessCount++;
        }

      } catch (hotelError) {
        console.error(`  ❌ Otel oluşturulurken hata: ${hotelData.name}:`, hotelError);
        errorCount++;
      }
    }

    console.log(`
🎉 Otel seed işlemi tamamlandı!`);
    console.log(`📊 Sonuç: ${hotelSuccessCount} otel, ${roomSuccessCount} oda, ${imageSuccessCount} resim, ${propSuccessCount} özellik, ${commentSuccessCount} yorum başarılı. Toplam ${errorCount} hata.`);

  } catch (globalError) {
    console.error("❌ Otel seed işlemi sırasında genel bir hata oluştu:", globalError);
    throw globalError;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedHotels().catch((error) => {
    console.error("Otel seed işlemi başarısız oldu:", error);
    process.exit(1);
  });
}

export { seedHotels };
