import { PrismaClient, Role, HotelType, RoomType, RoomFeature, HotelFeatures } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed işlemi başlatılıyor...");

  // 1. Owner kullanıcısı
  console.log("Owner kullanıcısı oluşturuluyor...");
  const hashedOwnerPassword1 = await bcrypt.hash("Owner123!", 12);
  const owner1 = await prisma.user.upsert({
    where: { email: "owner1@rotaly.com" },
    update: {},
    create: {
      name: "Mehmet",
      surname: "Yılmaz",
      email: "owner1@rotaly.com",
      phone: "+905551116600",
      hashedPassword: hashedOwnerPassword1,
      role: Role.OWNER,
      isVerified: true,
    },
  });
  console.log(`Owner kullanıcısı oluşturuldu: ${owner1.email}`);

  // 2. Owner kullanıcısı
  console.log("Owner kullanıcısı oluşturuluyor...");
  const hashedOwnerPassword2 = await bcrypt.hash("Owner123!", 12);
  const owner2 = await prisma.user.upsert({
    where: { email: "owner2@rotaly.com" },
    update: {},
    create: {
      name: "Ayşe",
      surname: "Kaya",
      email: "owner2@rotaly.com",
      phone: "+905551117700",
      hashedPassword: hashedOwnerPassword2,
      role: Role.OWNER,
      isVerified: true,
    },
  });
  console.log(`Owner kullanıcısı oluşturuldu: ${owner2.email}`);

  // 3. Owner kullanıcısı
  console.log("Owner kullanıcısı oluşturuluyor...");
  const hashedOwnerPassword3 = await bcrypt.hash("Owner123!", 12);
  const owner3 = await prisma.user.upsert({
    where: { email: "owner3@rotaly.com" },
    update: {},
    create: {
      name: "Ali",
      surname: "Demir",
      email: "owner3@rotaly.com",
      phone: "+905551118800",
      hashedPassword: hashedOwnerPassword3,
      role: Role.OWNER,
      isVerified: true,
    },
  });
  console.log(`Owner kullanıcısı oluşturuldu: ${owner3.email}`);

  // 4. Owner kullanıcısı
  console.log("Owner kullanıcısı oluşturuluyor...");
  const hashedOwnerPassword4 = await bcrypt.hash("Owner123!", 12);
  const owner4 = await prisma.user.upsert({
    where: { email: "owner4@rotaly.com" },
    update: {},
    create: {
      name: "Fatma",
      surname: "Çelik",
      email: "owner4@rotaly.com",
      phone: "+905551119900",
      hashedPassword: hashedOwnerPassword4,
      role: Role.OWNER,
      isVerified: true,
    },
  });
  console.log(`Owner kullanıcısı oluşturuldu: ${owner4.email}`);

  // 5. Owner kullanıcısı
  console.log("Owner kullanıcısı oluşturuluyor...");
  const hashedOwnerPassword5 = await bcrypt.hash("Owner123!", 12);
  const owner5 = await prisma.user.upsert({
    where: { email: "owner5@rotaly.com" },
    update: {},
    create: {
      name: "Hasan",
      surname: "Özkan",
      email: "owner5@rotaly.com",
      phone: "+905551120000",
      hashedPassword: hashedOwnerPassword5,
      role: Role.OWNER,
      isVerified: true,
    },
  });
  console.log(`Owner kullanıcısı oluşturuldu: ${owner5.email}`);

  const owners = [owner1, owner2, owner3, owner4, owner5];

  // Oteller ve odalar oluşturuluyor
  console.log("\nOteller oluşturuluyor...");
  
  // İlk 10 otel
  await createHotelBatch1(prisma, owners);
  
  // İkinci 10 otel  
  await createHotelBatch2(prisma, owners);
  
  // Üçüncü 10 otel
  await createHotelBatch3(prisma, owners);
  
  // Son 2 otel
  await createHotelBatch4(prisma, owners);

  console.log("\nSeed işlemi tamamlandı!");
  console.log("\nOluşturulan Yeni Owner Kullanıcıları:");
  console.log("┌─────────────────┬─────────────────────┬──────────────┐");
  console.log("│ Rol             │ Email               │ Şifre        │");
  console.log("├─────────────────┼─────────────────────┼──────────────┤");
  console.log("│ OWNER           │ owner1@rotaly.com   │ Owner123!    │");
  console.log("│ OWNER           │ owner2@rotaly.com   │ Owner123!    │");
  console.log("│ OWNER           │ owner3@rotaly.com   │ Owner123!    │");
  console.log("│ OWNER           │ owner4@rotaly.com   │ Owner123!    │");
  console.log("│ OWNER           │ owner5@rotaly.com   │ Owner123!    │");
  console.log("└─────────────────┴─────────────────────┴──────────────┘");
  
  console.log("\nToplam oluşturulan otel sayısı: 32");
  console.log("Owner başına otel dağılımı:");
  console.log("- Mehmet Yılmaz (owner1): ~6-7 otel");
  console.log("- Ayşe Kaya (owner2): ~6-7 otel");
  console.log("- Ali Demir (owner3): ~6-7 otel");
  console.log("- Fatma Çelik (owner4): ~6-7 otel");
  console.log("- Hasan Özkan (owner5): ~6-7 otel");
}

// Owner ID eşleştirmesi
const ownerIdMapping: { [key: string]: number } = {
  '550e8400-e29b-41d4-a716-446655440101': 0,
  '550e8400-e29b-41d4-a716-446655440102': 1,
  '550e8400-e29b-41d4-a716-446655440103': 2,
  '550e8400-e29b-41d4-a716-446655440104': 3,
  '550e8400-e29b-41d4-a716-446655440105': 4,
  '550e8400-e29b-41d4-a716-446655440200': 0,
  '550e8400-e29b-41d4-a716-446655440201': 1,
  '550e8400-e29b-41d4-a716-446655440301': 2,
  '550e8400-e29b-41d4-a716-446655440401': 3,
  '550e8400-e29b-41d4-a716-446655440150': 4,
  '550e8400-e29b-41d4-a716-446655440151': 0,
  '550e8400-e29b-41d4-a716-446655440152': 1,
  '550e8400-e29b-41d4-a716-446655440153': 2,
  '550e8400-e29b-41d4-a716-446655440154': 3,
  '550e8400-e29b-41d4-a716-446655440155': 4,
  '550e8400-e29b-41d4-a716-446655440156': 0,
  '550e8400-e29b-41d4-a716-446655440157': 1,
  '550e8400-e29b-41d4-a716-446655440158': 2,
  '550e8400-e29b-41d4-a716-446655440159': 3,
  '550e8400-e29b-41d4-a716-446655440160': 4,
  '550e8400-e29b-41d4-a716-446655440106': 0,
  '550e8400-e29b-41d4-a716-446655440107': 1,
  '550e8400-e29b-41d4-a716-446655440108': 2,
  '550e8400-e29b-41d4-a716-446655440109': 3,
  '550e8400-e29b-41d4-a716-446655440110': 4,
  '550e8400-e29b-41d4-a716-446655440111': 0,
  '550e8400-e29b-41d4-a716-446655440112': 1,
  '550e8400-e29b-41d4-a716-446655440113': 2,
  '550e8400-e29b-41d4-a716-446655440114': 3
};

// Hotel oluşturma fonksiyonları
async function createHotelBatch1(prisma: PrismaClient, owners: any[]) {
  console.log("İlk 10 otel oluşturuluyor...");
  
  // JSON dosyasını oku
  const hotelsDataPath = path.join(__dirname, '../../web/src/data/hotelsData.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsDataPath, 'utf8'));
  
  const batch1Hotels = hotelsData.slice(0, 10);
  
  for (const hotelData of batch1Hotels) {
    await createSingleHotel(prisma, hotelData, owners);
  }
}

async function createHotelBatch2(prisma: PrismaClient, owners: any[]) {
  console.log("İkinci 10 otel oluşturuluyor...");
  
  const hotelsDataPath = path.join(__dirname, '../../web/src/data/hotelsData.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsDataPath, 'utf8'));
  
  const batch2Hotels = hotelsData.slice(10, 20);
  
  for (const hotelData of batch2Hotels) {
    await createSingleHotel(prisma, hotelData, owners);
  }
}

async function createHotelBatch3(prisma: PrismaClient, owners: any[]) {
  console.log("Üçüncü 10 otel oluşturuluyor...");
  
  const hotelsDataPath = path.join(__dirname, '../../web/src/data/hotelsData.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsDataPath, 'utf8'));
  
  const batch3Hotels = hotelsData.slice(20, 30);
  
  for (const hotelData of batch3Hotels) {
    await createSingleHotel(prisma, hotelData, owners);
  }
}

async function createHotelBatch4(prisma: PrismaClient, owners: any[]) {
  console.log("Son 2 otel oluşturuluyor...");
  
  const hotelsDataPath = path.join(__dirname, '../../web/src/data/hotelsData.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsDataPath, 'utf8'));
  
  const batch4Hotels = hotelsData.slice(30, 32);
  
  for (const hotelData of batch4Hotels) {
    await createSingleHotel(prisma, hotelData, owners);
  }
}

// Room type mapping fonksiyonu
function mapRoomType(jsonRoomType: string): RoomType {
  switch (jsonRoomType) {
    case 'STANDARD':
    case 'ECONOMY':
    case 'SUPERIOR':
    case 'TRADITIONAL':
    case 'ROOM':
    case 'FAMILY':
    case 'BUSINESS':
      return RoomType.STANDARD;
    case 'DELUXE':
    case 'DELUXE_VILLA':
    case 'ROMANTIC':
    case 'HONEYMOON':
      return RoomType.DELUXE;
    case 'SUITE':
    case 'JUNIOR_SUITE':
    case 'FAMILY_SUITE':
    case 'CAVE_SUITE':
    case 'CLIFF_SUITE':
    case 'VILLA':
    case 'FAMILY_HOUSE':
    case 'CHALET':
      return RoomType.SUITE;
    case 'PRESIDENTIAL':
    case 'IMPERIAL':
      return RoomType.PRESIDENTIAL;
    case 'EXECUTIVE':
      return RoomType.EXECUTIVE;
    default:
      return RoomType.STANDARD;
  }
}

// Hotel type mapping fonksiyonu
function mapHotelType(jsonHotelType: string): HotelType {
  switch (jsonHotelType) {
    case 'HOTEL':
    case 'BOUTIQUE':
    case 'BUSINESS_HOTEL':
    case 'THERMAL_HOTEL':
      return HotelType.HOTEL;
    case 'RESORT':
    case 'MOUNTAIN_RESORT':
    case 'LAKE_RESORT':
    case 'MOUNTAIN':
      return HotelType.RESORT;
    case 'VILLA':
      return HotelType.VILLA;
    case 'BUNGALOW':
    case 'TREE_HOUSE':
      return HotelType.BUNGALOW;
    case 'APARTMENT':
      return HotelType.APARTMENT;
    case 'HOSTEL':
      return HotelType.HOSTEL;
    default:
      return HotelType.HOTEL;
  }
}

// Room feature mapping fonksiyonu
function mapRoomFeature(jsonFeature: string): RoomFeature | null {
  switch (jsonFeature) {
    case 'WIFI':
      return RoomFeature.WIFI;
    case 'AIR_CONDITIONER':
      return RoomFeature.AIR_CONDITIONER;
    case 'TV':
      return RoomFeature.TV;
    case 'MINIBAR':
      return RoomFeature.MINIBAR;
    case 'SAFE_BOX':
      return RoomFeature.SAFE_BOX;
    case 'BALCONY':
      return RoomFeature.BALCONY;
    case 'ROOM_SERVICE':
      return RoomFeature.ROOM_SERVICE;
    case 'BATH_TUB':
      return RoomFeature.BATH_TUB;
    case 'HAIR_DRYER':
      return RoomFeature.HAIR_DRYER;
    // Desteklenmeyen özellikler null döndürür
    case 'FIREPLACE':
    case 'KITCHEN':
    case 'GARDEN':
    case 'BBQ':
    case 'GARDEN_VIEW':
    case 'HEATING':
    case 'PRIVATE_POOL':
    case 'DESK':
    case 'LIVING_ROOM':
      return null;
    default:
      return null;
  }
}

// Hotel feature mapping fonksiyonu
function mapHotelFeature(jsonFeature: string): HotelFeatures | null {
  switch (jsonFeature) {
    case 'WIFI':
      return HotelFeatures.WIFI;
    case 'POOL':
      return HotelFeatures.POOL;
    case 'SPA':
      return HotelFeatures.SPA;
    case 'PARKING':
      return HotelFeatures.PARKING;
    case 'GYM':
      return HotelFeatures.GYM;
    case 'PET_FRIENDLY':
      return HotelFeatures.PET_FRIENDLY;
    case 'RESTAURANT':
      return HotelFeatures.RESTAURANT;
    case 'BREAKFAST_INCLUDED':
      return HotelFeatures.BREAKFAST_INCLUDED;
    case 'CANCEL_POLICY':
      return HotelFeatures.CANCEL_POLICY;
    // Desteklenmeyen özellikler null döndürür
    case 'ROOM_SERVICE':
    case 'TERRACE':
    case 'AIRPORT_SHUTTLE':
    case 'KITCHEN':
    case 'BBQ':
    case 'GARDEN':
    case 'LAKE_VIEW':
    case 'SKI_IN_OUT':
    case 'FIREPLACE':
    case 'HISTORICAL_BUILDING':
    case 'PRIVATE_BEACH':
    case 'WATER_SPORTS':
    case 'HIKING_TRAILS':
    case 'THERMAL_POOL':
    case 'HEALTH_CENTER':
    case 'BUSINESS_CENTER':
      return null;
    default:
      return null;
  }
}

// Tek otel oluşturma fonksiyonu
async function createSingleHotel(prisma: PrismaClient, hotelData: any, owners: any[]) {
  const ownerIndex = ownerIdMapping[hotelData.ownerId];
  
  // Otel bilgilerini hazırla
  const hotelInfo = {
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
    type: mapHotelType(hotelData.type),
    ownerId: owners[ownerIndex].id,
    isActive: hotelData.isActive !== undefined ? hotelData.isActive : true,
    taxId: hotelData.taxId,
    taxOffice: hotelData.taxOffice,
    tradeRegistryNumber: hotelData.tradeRegistryNumber ? hotelData.tradeRegistryNumber.toString() : null,
    businessLicense: hotelData.businessLicense,
    addressProof: hotelData.addressProof,
    taxCertificate: hotelData.taxCertificate,
    createdAt: hotelData.createdAt ? new Date(hotelData.createdAt) : new Date(),
    updatedAt: hotelData.updatedAt ? new Date(hotelData.updatedAt) : new Date(),
    deletedAt: hotelData.deletedAt ? new Date(hotelData.deletedAt) : null
  };

  // Oteli oluştur
  const hotel = await prisma.hotel.upsert({
    where: { id: hotelInfo.id },
    update: {},
    create: hotelInfo
  });

  // Odaları oluştur
  if (hotelData.rooms && hotelData.rooms.length > 0) {
    for (const roomData of hotelData.rooms) {
      const room = await prisma.room.upsert({
        where: { id: roomData.id },
        update: {},
        create: {
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
          isAvailable: roomData.isAvailable !== undefined ? roomData.isAvailable : true,
          type: mapRoomType(roomData.type),
          hotelId: hotel.id,
          createdAt: roomData.createdAt ? new Date(roomData.createdAt) : new Date(),
          updatedAt: roomData.updatedAt ? new Date(roomData.updatedAt) : new Date(),
          deletedAt: roomData.deletedAt ? new Date(roomData.deletedAt) : null
        }
      });

      // Oda özelliklerini oluştur
      if (roomData.featureStatus && roomData.featureStatus.length > 0) {
        for (const featureData of roomData.featureStatus) {
          const mappedFeature = mapRoomFeature(featureData.feature);
          if (mappedFeature) { // Sadece desteklenen özellikleri ekle
            await prisma.roomFeatureStatus.upsert({
              where: { id: featureData.id },
              update: {},
              create: {
                id: featureData.id,
                roomId: room.id,
                feature: mappedFeature,
                isAvailable: featureData.isAvailable !== undefined ? featureData.isAvailable : false,
                deletedAt: featureData.deletedAt ? new Date(featureData.deletedAt) : null
              }
            });
          }
        }
      }
    }
  }

  // Otel özelliklerini oluştur
  if (hotelData.props && hotelData.props.length > 0) {
    for (const propData of hotelData.props) {
      const mappedFeature = mapHotelFeature(propData.feature);
      if (mappedFeature) { // Sadece desteklenen özellikleri ekle
        await prisma.hotelProps.upsert({
          where: { id: propData.id },
          update: {},
          create: {
            id: propData.id,
            hotelId: hotel.id,
            feature: mappedFeature,
            createdAt: propData.createdAt ? new Date(propData.createdAt) : new Date()
          }
        });
      }
    }
  }

  // Otel resimlerini oluştur
  if (hotelData.images && hotelData.images.length > 0) {
    for (const imageData of hotelData.images) {
      await prisma.image.upsert({
        where: { id: imageData.id },
        update: {},
        create: {
          id: imageData.id,
          url: imageData.url,
          hotelId: hotel.id,
          createdAt: imageData.createdAt ? new Date(imageData.createdAt) : new Date(),
          deletedAt: imageData.deletedAt ? new Date(imageData.deletedAt) : null
        }
      });
    }
  }

  console.log(`Otel oluşturuldu: ${hotel.name}`);
}

main()
  .catch((e) => {
    console.error("Seed işlemi sırasında hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
