import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  console.log(":seedling: Seeding database...");
  // 1. Admin kullanıcısı
  const hashedAdminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@rotaly.com" },
    update: {},
    create: {
      name: "Admin",
      surname: "User",
      email: "admin@rotaly.com",
      phone: "+905551234567",
      hashedPassword: hashedAdminPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });
  // 2. Otel sahibi 1
  const hashedOwner1Password = await bcrypt.hash("owner123", 12);
  const owner1 = await prisma.user.upsert({
    where: { email: "owner1@rotaly.com" },
    update: {},
    create: {
      name: "Mehmet",
      surname: "Yılmaz",
      email: "owner1@rotaly.com",
      phone: "+905551234568",
      hashedPassword: hashedOwner1Password,
      role: "OWNER",
      isVerified: true,
    },
  });
  // 3. Otel sahibi 2
  const hashedOwner2Password = await bcrypt.hash("owner456", 12);
  const owner2 = await prisma.user.upsert({
    where: { email: "owner2@rotaly.com" },
    update: {},
    create: {
      name: "Ayşe",
      surname: "Demir",
      email: "owner2@rotaly.com",
      phone: "+905551234569",
      hashedPassword: hashedOwner2Password,
      role: "OWNER",
      isVerified: true,
    },
  });
  // 4. Normal müşteri
  const hashedCustomerPassword = await bcrypt.hash("customer123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@rotaly.com" },
    update: {},
    create: {
      name: "Ali",
      surname: "Kaya",
      email: "customer@rotaly.com",
      phone: "+905551234570",
      hashedPassword: hashedCustomerPassword,
      role: "CUSTOMER",
      isVerified: true,
    },
  });
  // OTEL 1 - İstanbul'da lüks otel
  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Rotaly Grand Hotel Istanbul",
      description:
        "Boğaz manzaralı 5 yıldızlı lüks otel. Modern amenities ve geleneksel Türk misafirperverliği.",
      location: "Beşiktaş",
      address: "Barbaros Bulvarı No:123 Beşiktaş/İstanbul",
      city: "İstanbul",
      country: "Türkiye",
      type: "HOTEL",
      rating: 4.8,
      ownerId: owner1.id,
      checkIn: "14:00",
      checkOut: "12:00",
      isDiscounted: true,
      discountRate: 15.0,
      discountStartDate: new Date("2024-01-01"),
      discountEndDate: new Date("2024-12-31"),
      taxId: "1234567890",
      taxOffice: "Beşiktaş Vergi Dairesi",
      tradeRegistryNumber: "TR123456789",
      businessLicense: "BL123456789",
    },
  });
  // OTEL 2 - Antalya'da villa
  const hotel2 = await prisma.hotel.create({
    data: {
      name: "Mediterranean Villa Resort",
      description:
        "Akdeniz kıyısında özel villalar. Deniz manzaralı ve özel havuzlu.",
      location: "Kaleiçi",
      address: "Selçuk Mahallesi Atatürk Caddesi No:45 Muratpaşa/Antalya",
      city: "Antalya",
      country: "Türkiye",
      type: "VILLA",
      rating: 4.6,
      ownerId: owner1.id,
      checkIn: "15:00",
      checkOut: "11:00",
      taxId: "9876543210",
      taxOffice: "Muratpaşa Vergi Dairesi",
      tradeRegistryNumber: "TR987654321",
      businessLicense: "BL987654321",
    },
  });
  // OTEL 3 - İzmir'de butik otel
  const hotel3 = await prisma.hotel.create({
    data: {
      name: "Aegean Boutique Hotel",
      description: "Ege Denizi kıyısında butik otel. Sakin ve huzurlu ortam.",
      location: "Alsancak",
      address: "Kordon Boyu No:78 Konak/İzmir",
      city: "İzmir",
      country: "Türkiye",
      type: "HOTEL",
      rating: 4.3,
      ownerId: owner2.id,
      checkIn: "14:00",
      checkOut: "12:00",
      isDiscounted: true,
      discountRate: 10.0,
      discountStartDate: new Date("2024-06-01"),
      discountEndDate: new Date("2024-09-30"),
      taxId: "5555666677",
      taxOffice: "Konak Vergi Dairesi",
      tradeRegistryNumber: "TR555566667",
      businessLicense: "BL555566667",
    },
  });
  // OTEL 4 - Kapadokya'da bungalov
  const hotel4 = await prisma.hotel.create({
    data: {
      name: "Cappadocia Cave Bungalows",
      description:
        "Kapadokya'nın eşsiz manzarasında mağara bungalovlar. Balon turları dahil.",
      location: "Göreme",
      address: "Müze Caddesi No:12 Göreme/Nevşehir",
      city: "Nevşehir",
      country: "Türkiye",
      type: "BUNGALOW",
      rating: 4.9,
      ownerId: owner2.id,
      checkIn: "15:00",
      checkOut: "11:00",
      taxId: "3333444455",
      taxOffice: "Nevşehir Vergi Dairesi",
      tradeRegistryNumber: "TR333344445",
      businessLicense: "BL333344445",
    },
  });
  // Otel özelliklerini ekle
  await prisma.hotelProps.createMany({
    data: [
      // Hotel 1 özellikleri
      { hotelId: hotel1.id, feature: "WIFI" },
      { hotelId: hotel1.id, feature: "POOL" },
      { hotelId: hotel1.id, feature: "SPA" },
      { hotelId: hotel1.id, feature: "PARKING" },
      { hotelId: hotel1.id, feature: "GYM" },
      { hotelId: hotel1.id, feature: "RESTAURANT" },
      { hotelId: hotel1.id, feature: "BREAKFAST_INCLUDED" },
      // Hotel 2 özellikleri
      { hotelId: hotel2.id, feature: "WIFI" },
      { hotelId: hotel2.id, feature: "POOL" },
      { hotelId: hotel2.id, feature: "PARKING" },
      { hotelId: hotel2.id, feature: "RESTAURANT" },
      { hotelId: hotel2.id, feature: "BREAKFAST_INCLUDED" },
      // Hotel 3 özellikleri
      { hotelId: hotel3.id, feature: "WIFI" },
      { hotelId: hotel3.id, feature: "SPA" },
      { hotelId: hotel3.id, feature: "PARKING" },
      { hotelId: hotel3.id, feature: "RESTAURANT" },
      // Hotel 4 özellikleri
      { hotelId: hotel4.id, feature: "WIFI" },
      { hotelId: hotel4.id, feature: "PARKING" },
      { hotelId: hotel4.id, feature: "BREAKFAST_INCLUDED" },
    ],
  });
  // Her otel için odalar oluştur
  const rooms = await prisma.room.createMany({
    data: [
      // Hotel 1 odaları
      {
        name: "Deluxe Boğaz Manzaralı Oda",
        description: "Boğaz manzaralı geniş oda, modern amenities.",
        price: 450.0,
        maxAdults: 2,
        maxChildren: 1,
        floor: 8,
        roomNumber: 801,
        capacity: 3,
        bedCount: 1,
        hotelId: hotel1.id,
        type: "DELUXE",
      },
      {
        name: "Presidential Suite",
        description: "En lüks süit, panoramik manzara ve VIP hizmetler.",
        price: 850.0,
        maxAdults: 4,
        maxChildren: 2,
        floor: 12,
        roomNumber: 1201,
        capacity: 6,
        bedCount: 2,
        hotelId: hotel1.id,
        type: "PRESIDENTIAL",
      },
      // Hotel 2 odaları
      {
        name: "Deniz Manzaralı Villa",
        description: "Özel havuzlu, deniz manzaralı villa.",
        price: 650.0,
        maxAdults: 6,
        maxChildren: 4,
        floor: 1,
        roomNumber: 101,
        capacity: 10,
        bedCount: 3,
        hotelId: hotel2.id,
        type: "SUITE",
      },
      // Hotel 3 odaları
      {
        name: "Ege Standard Oda",
        description: "Konforlu standart oda, şehir manzaralı.",
        price: 280.0,
        maxAdults: 2,
        maxChildren: 0,
        floor: 3,
        roomNumber: 301,
        capacity: 2,
        bedCount: 1,
        hotelId: hotel3.id,
        type: "STANDARD",
      },
      // Hotel 4 odaları
      {
        name: "Mağara Bungalov",
        description: "Geleneksel mağara mimarisi, eşsiz deneyim.",
        price: 380.0,
        maxAdults: 3,
        maxChildren: 2,
        floor: 1,
        roomNumber: 1,
        capacity: 5,
        bedCount: 2,
        hotelId: hotel4.id,
        type: "DELUXE",
      },
    ],
  });
  // Yorumlar ekle
  await prisma.comment.createMany({
    data: [
      {
        rating: 5,
        text: "Muhteşem bir otel! Boğaz manzarası ve hizmet kalitesi harika.",
        hotelId: hotel1.id,
        userId: customer.id,
      },
      {
        rating: 4,
        text: "Villa çok güzeldi, ailecek harika vakit geçirdik.",
        hotelId: hotel2.id,
        userId: customer.id,
      },
      {
        rating: 4,
        text: "İzmir'de kalabileceğiniz en iyi yerlerden biri.",
        hotelId: hotel3.id,
        userId: customer.id,
      },
      {
        rating: 5,
        text: "Kapadokya deneyimi unutulmaz! Mağara oda çok özeldi.",
        hotelId: hotel4.id,
        userId: customer.id,
      },
    ],
  });
  // Şirket bilgileri
  const hashedCompanyPassword = await bcrypt.hash("company123", 12);
  await prisma.company.upsert({
    where: { email: "info@rotaly.com" },
    update: {},
    create: {
      companyName: "Rotaly Tourism Ltd.",
      email: "info@rotaly.com",
      hashedPassword: hashedCompanyPassword,
      companyTaxId: "1234567890",
      country: "Türkiye",
      city: "İstanbul",
      state: "İstanbul",
      postCode: "34000",
      fullAddress: "Maslak Mahallesi Büyükdere Caddesi No:123 Sarıyer/İstanbul",
    },
  });
  console.log(":white_check_mark: Database seeded successfully!");
  console.log("\n:e-mail: Test Kullanıcıları:");
  console.log(":key: Admin: admin@rotaly.com - Password: admin123");
  console.log(":hotel: Owner 1: owner1@rotaly.com - Password: owner123");
  console.log(":hotel: Owner 2: owner2@rotaly.com - Password: owner456");
  console.log(
    ":bust_in_silhouette: Customer: customer@rotaly.com - Password: customer123"
  );
  console.log("\n:hotel: Oluşturulan Oteller:");
  console.log("1. Rotaly Grand Hotel Istanbul (İstanbul)");
  console.log("2. Mediterranean Villa Resort (Antalya)");
  console.log("3. Aegean Boutique Hotel (İzmir)");
  console.log("4. Cappadocia Cave Bungalows (Nevşehir)");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(":x: Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
