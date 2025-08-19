import { HotelType, PrismaClient, Role, RoomType, RoomFeature, HotelFeatures } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed işlemi başlatılıyor...");

  // 1. Admin kullanıcısı
  console.log("Admin kullanıcısı oluşturuluyor...");
  const hashedAdminPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@rotaly.com" },
    update: {},
    create: {
      name: "Super",
      surname: "Admin",
      email: "admin@rotaly.com",
      phone: "+905551112200",
      hashedPassword: hashedAdminPassword,
      role: Role.ADMIN,
      isVerified: true,
    },
  });
  console.log(`Admin kullanıcısı oluşturuldu: ${admin.email}`);

  // 2. Owner kullanıcıları (5 adet)
  console.log("Owner kullanıcıları oluşturuluyor...");
  const hashedOwnerPassword = await bcrypt.hash("Owner123!", 12);
  const owners = [
    { name: "Ahmet", surname: "Yılmaz", email: "owner1@rotaly.com", phone: "+905551113301" },
    { name: "Ayşe", surname: "Kaya", email: "owner2@rotaly.com", phone: "+905551113302" },
    { name: "Ali", surname: "Demir", email: "owner3@rotaly.com", phone: "+905551113303" },
    { name: "Fatma", surname: "Çelik", email: "owner4@rotaly.com", phone: "+905551113304" },
    { name: "Mehmet", surname: "Şahin", email: "owner5@rotaly.com", phone: "+905551113305" },
  ];

  const createdOwners = [];
  for (const ownerData of owners) {
    const owner = await prisma.user.upsert({
      where: { email: ownerData.email },
      update: {},
      create: {
        ...ownerData,
        hashedPassword: hashedOwnerPassword,
        role: Role.OWNER,
        isVerified: true,
      },
    });
    createdOwners.push(owner);
    console.log(`Owner kullanıcısı oluşturuldu: ${owner.email}`);
  }
  console.log(`${owners.length} adet owner kullanıcısı oluşturuldu.`);

  // 3. Support kullanıcıları (5 adet)
  console.log("Support kullanıcıları oluşturuluyor...");
  const hashedSupportPassword = await bcrypt.hash("Support123!", 12);
  const supportUsers = [
    { name: "Destek", surname: "Personeli1", email: "support1@rotaly.com", phone: "+905551114401" },
    { name: "Destek", surname: "Personeli2", email: "support2@rotaly.com", phone: "+905551114402" },
    { name: "Destek", surname: "Personeli3", email: "support3@rotaly.com", phone: "+905551114403" },
    { name: "Destek", surname: "Personeli4", email: "support4@rotaly.com", phone: "+905551114404" },
    { name: "Destek", surname: "Personeli5", email: "support5@rotaly.com", phone: "+905551114405" },
  ];

  for (const supportData of supportUsers) {
    const support = await prisma.user.upsert({
      where: { email: supportData.email },
      update: {},
      create: {
        ...supportData,
        hashedPassword: hashedSupportPassword,
        role: Role.SUPPORT,
        isVerified: true,
      },
    });
    console.log(`Support kullanıcısı oluşturuldu: ${support.email}`);
  }
  console.log(`${supportUsers.length} adet support kullanıcısı oluşturuldu.`);

  // 4. Normal kullanıcılar (20 adet)
  console.log("Normal kullanıcılar oluşturuluyor...");
  const hashedCustomerPassword = await bcrypt.hash("Customer123!", 12);
  const customers = [
    { name: "Emre", surname: "Yılmaz", email: "customer1@example.com", phone: "+905551115501" },
    { name: "Selin", surname: "Kaya", email: "customer2@example.com", phone: "+905551115502" },
    { name: "Burak", surname: "Demir", email: "customer3@example.com", phone: "+905551115503" },
    { name: "Deniz", surname: "Çelik", email: "customer4@example.com", phone: "+905551115504" },
    { name: "Elif", surname: "Şahin", email: "customer5@example.com", phone: "+905551115505" },
    { name: "Can", surname: "Öztürk", email: "customer6@example.com", phone: "+905551115506" },
    { name: "Aylin", surname: "Arslan", email: "customer7@example.com", phone: "+905551115507" },
    { name: "Mert", surname: "Aydın", email: "customer8@example.com", phone: "+905551115508" },
    { name: "İrem", surname: "Yıldız", email: "customer9@example.com", phone: "+905551115509" },
    { name: "Cem", surname: "Korkmaz", email: "customer10@example.com", phone: "+905551115510" },
    { name: "Berk", surname: "Aksoy", email: "customer11@example.com", phone: "+905551115511" },
    { name: "Ceren", surname: "Güneş", email: "customer12@example.com", phone: "+905551115512" },
    { name: "Kaan", surname: "Erdoğan", email: "customer13@example.com", phone: "+905551115513" },
    { name: "Zehra", surname: "Koç", email: "customer14@example.com", phone: "+905551115514" },
    { name: "Onur", surname: "Özdemir", email: "customer15@example.com", phone: "+905551115515" },
    { name: "Merve", surname: "Tekin", email: "customer16@example.com", phone: "+905551115516" },
    { name: "Tolga", surname: "Doğan", email: "customer17@example.com", phone: "+905551115517" },
    { name: "Sude", surname: "Kurt", email: "customer18@example.com", phone: "+905551115518" },
    { name: "Ege", surname: "Çetin", email: "customer19@example.com", phone: "+905551115519" },
    { name: "Yağmur", surname: "Kılıç", email: "customer20@example.com", phone: "+905551115520" },
  ];

  for (const customerData of customers) {
    const customer = await prisma.user.upsert({
      where: { email: customerData.email },
      update: {},
      create: {
        ...customerData,
        hashedPassword: hashedCustomerPassword,
        role: Role.CUSTOMER,
        isVerified: true,
      },
    });
    console.log(`Müşteri kullanıcısı oluşturuldu: ${customer.email}`);
  }
  console.log(`${customers.length} adet müşteri kullanıcısı oluşturuldu.`);

  // 5. Oteller (10 adet)
  console.log("Oteller oluşturuluyor...");
  const hotels = [
    {
      name: "Grand Palace Hotel İstanbul",
      description: "İstanbul'un kalbinde, Boğaz manzaralı lüks otel. Tarihi yarımada üzerinde konumlanmış, modern konfor ve Osmanlı mimarisi bir arada.",
      checkIn: "14:00",
      checkOut: "12:00",
      location: "Sultanahmet, İstanbul",
      address: "Sultanahmet Meydanı No:15, Fatih/İstanbul",
      city: "İstanbul",
      country: "Türkiye",
      rating: 4.8,
      discountRate: 15.0,
      isDiscounted: true,
      discountStartDate: new Date("2024-12-01T00:00:00Z"),
      discountEndDate: new Date("2024-12-31T23:59:59Z"),
      type: HotelType.HOTEL,
      ownerIndex: 0,
      taxId: "1234567890",
      taxOffice: "Fatih Vergi Dairesi",
      tradeRegistryNumber: "TR123456",
      businessLicense: "BL789012",
      addressProof: "https://example.com/address-proof.pdf",
      taxCertificate: "https://example.com/tax-certificate.pdf"
    },
    {
      name: "Blue Sea Resort Antalya",
      description: "Antalya'nın en güzel plajında, deniz manzaralı lüks resort",
      checkIn: "15:00",
      checkOut: "11:00",
      location: "Kemer, Antalya",
      address: "Kemer Sahil Caddesi No:25, Kemer/Antalya",
      city: "Antalya",
      country: "Türkiye",
      rating: 4.6,
      discountRate: 10.0,
      isDiscounted: true,
      discountStartDate: new Date("2024-12-01T00:00:00Z"),
      discountEndDate: new Date("2024-12-31T23:59:59Z"),
      type: HotelType.RESORT,
      ownerIndex: 1,
      taxId: "2345678901",
      taxOffice: "Kemer Vergi Dairesi",
      tradeRegistryNumber: "TR234567",
      businessLicense: "BL890123",
      addressProof: "https://example.com/address-proof-2.pdf",
      taxCertificate: "https://example.com/tax-certificate-2.pdf"
    },
    {
      name: "Mountain View Villa Bursa",
      description: "Uludağ'ın eteklerinde, dağ manzaralı özel villa",
      checkIn: "14:00",
      checkOut: "12:00",
      location: "Uludağ, Bursa",
      address: "Uludağ Yolu No:10, Nilüfer/Bursa",
      city: "Bursa",
      country: "Türkiye",
      rating: 4.7,
      discountRate: 0,
      isDiscounted: false,
      type: HotelType.VILLA,
      ownerIndex: 2,
      taxId: "3456789012",
      taxOffice: "Nilüfer Vergi Dairesi",
      tradeRegistryNumber: "TR345678",
      businessLicense: "BL901234",
      addressProof: "https://example.com/address-proof-3.pdf",
      taxCertificate: "https://example.com/tax-certificate-3.pdf"
    },
    {
      name: "Forest Camp Çanakkale",
      description: "Kazdağları'nın kalbinde, doğayla iç içe kamp deneyimi",
      checkIn: "13:00",
      checkOut: "11:00",
      location: "Kazdağları, Çanakkale",
      address: "Kazdağları Milli Parkı, Bayramiç/Çanakkale",
      city: "Çanakkale",
      country: "Türkiye",
      rating: 4.3,
      discountRate: 0,
      isDiscounted: false,
      type: HotelType.CAMP,
      ownerIndex: 3,
      taxId: "4567890123",
      taxOffice: "Bayramiç Vergi Dairesi",
      tradeRegistryNumber: "TR456789",
      businessLicense: "BL012345",
      addressProof: "https://example.com/address-proof-4.pdf",
      taxCertificate: "https://example.com/tax-certificate-4.pdf"
    },
    {
      name: "Luxury Bungalow Fethiye",
      description: "Fethiye'nin en güzel koyunda, özel bungalov keyfi",
      checkIn: "15:00",
      checkOut: "11:00",
      location: "Fethiye, Muğla",
      address: "Ölüdeniz Mahallesi No:5, Fethiye/Muğla",
      city: "Muğla",
      country: "Türkiye",
      rating: 4.5,
      discountRate: 20.0,
      isDiscounted: true,
      discountStartDate: new Date("2024-12-01T00:00:00Z"),
      discountEndDate: new Date("2024-12-31T23:59:59Z"),
      type: HotelType.BUNGALOW,
      ownerIndex: 4,
      taxId: "5678901234",
      taxOffice: "Fethiye Vergi Dairesi",
      tradeRegistryNumber: "TR567890",
      businessLicense: "BL123456",
      addressProof: "https://example.com/address-proof-5.pdf",
      taxCertificate: "https://example.com/tax-certificate-5.pdf"
    },
    {
      name: "Backpacker Hostel İstanbul",
      description: "Sultanahmet'in kalbinde, ekonomik ve sosyal konaklama",
      checkIn: "14:00",
      checkOut: "11:00",
      location: "Sultanahmet, İstanbul",
      address: "Sultanahmet Meydanı No:8, Fatih/İstanbul",
      city: "İstanbul",
      country: "Türkiye",
      rating: 4.1,
      discountRate: 0,
      isDiscounted: false,
      type: HotelType.HOSTEL,
      ownerIndex: 0,
      taxId: "6789012345",
      taxOffice: "Fatih Vergi Dairesi",
      tradeRegistryNumber: "TR678901",
      businessLicense: "BL234567",
      addressProof: "https://example.com/address-proof-6.pdf",
      taxCertificate: "https://example.com/tax-certificate-6.pdf"
    },
    {
      name: "Business Hotel İstanbul",
      description: "Levent'te, iş seyahatleri için ideal modern otel",
      checkIn: "15:00",
      checkOut: "12:00",
      location: "Levent, İstanbul",
      address: "Levent Mahallesi No:20, Beşiktaş/İstanbul",
      city: "İstanbul",
      country: "Türkiye",
      rating: 4.4,
      discountRate: 0,
      isDiscounted: false,
      type: HotelType.HOTEL,
      ownerIndex: 1,
      taxId: "7890123456",
      taxOffice: "Beşiktaş Vergi Dairesi",
      tradeRegistryNumber: "TR789012",
      businessLicense: "BL345678",
      addressProof: "https://example.com/address-proof-7.pdf",
      taxCertificate: "https://example.com/tax-certificate-7.pdf"
    },
    {
      name: "Seaside Resort Bodrum",
      description: "Bodrum'un en güzel plajında, deniz kenarında tatil",
      checkIn: "14:00",
      checkOut: "11:00",
      location: "Bodrum, Muğla",
      address: "Bodrum Sahil Caddesi No:30, Bodrum/Muğla",
      city: "Muğla",
      country: "Türkiye",
      rating: 4.7,
      discountRate: 25.0,
      isDiscounted: true,
      discountStartDate: new Date("2024-12-01T00:00:00Z"),
      discountEndDate: new Date("2024-12-31T23:59:59Z"),
      type: HotelType.RESORT,
      ownerIndex: 2,
      taxId: "8901234567",
      taxOffice: "Bodrum Vergi Dairesi",
      tradeRegistryNumber: "TR890123",
      businessLicense: "BL456789",
      addressProof: "https://example.com/address-proof-8.pdf",
      taxCertificate: "https://example.com/tax-certificate-8.pdf"
    },
    {
      name: "Historic Hotel Safranbolu",
      description: "Safranbolu'nun tarihi evlerinde, tarihi atmosferde konaklama",
      checkIn: "14:00",
      checkOut: "12:00",
      location: "Safranbolu, Karabük",
      address: "Tarihi Evler Mahallesi No:12, Safranbolu/Karabük",
      city: "Karabük",
      country: "Türkiye",
      rating: 4.6,
      discountRate: 0,
      isDiscounted: false,
      type: HotelType.HOTEL,
      ownerIndex: 3,
      taxId: "9012345678",
      taxOffice: "Safranbolu Vergi Dairesi",
      tradeRegistryNumber: "TR901234",
      businessLicense: "BL567890",
      addressProof: "https://example.com/address-proof-9.pdf",
      taxCertificate: "https://example.com/tax-certificate-9.pdf"
    },
    {
      name: "Ski Resort Erzurum",
      description: "Palandöken'de, kayak tatili için mükemmel resort",
      checkIn: "15:00",
      checkOut: "11:00",
      location: "Palandöken, Erzurum",
      address: "Palandöken Kayak Merkezi No:5, Palandöken/Erzurum",
      city: "Erzurum",
      country: "Türkiye",
      rating: 4.5,
      discountRate: 30.0,
      isDiscounted: true,
      discountStartDate: new Date("2024-12-01T00:00:00Z"),
      discountEndDate: new Date("2024-12-31T23:59:59Z"),
      type: HotelType.RESORT,
      ownerIndex: 4,
      taxId: "0123456789",
      taxOffice: "Palandöken Vergi Dairesi",
      tradeRegistryNumber: "TR012345",
      businessLicense: "BL678901",
      addressProof: "https://example.com/address-proof-10.pdf",
      taxCertificate: "https://example.com/tax-certificate-10.pdf"
    }
  ];

  // Otelleri oluştur
  for (const hotelData of hotels) {
    const ownerId = createdOwners[hotelData.ownerIndex]?.id;
    if (ownerId) {
      // Aynı isimde ve owner'a ait hotel var mı kontrol et
      const existingHotel = await prisma.hotel.findFirst({
        where: {
          name: hotelData.name,
          ownerId: ownerId,
          deletedAt: null
        }
      });

      if (!existingHotel) {
        const hotel = await prisma.hotel.create({
          data: {
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
            discountStartDate: hotelData.discountStartDate,
            discountEndDate: hotelData.discountEndDate,
            type: hotelData.type,
            ownerId: ownerId,
            taxId: hotelData.taxId,
            taxOffice: hotelData.taxOffice,
            tradeRegistryNumber: hotelData.tradeRegistryNumber,
            businessLicense: hotelData.businessLicense,
            addressProof: hotelData.addressProof,
            taxCertificate: hotelData.taxCertificate,
          },
        });
        console.log(`Otel oluşturuldu: ${hotel.name}`);

        // Grand Palace Hotel için özel odalar ekle
        if (hotel.name === "Grand Palace Hotel İstanbul") {
          const rooms = [
            {
              name: "Deluxe Boğaz Manzaralı Oda",
              description: "Boğaz manzaralı, 35 m² genişliğinde, king size yatak ve jakuzili banyo",
              price: 2500.0,
              maxAdults: 2,
              maxChildren: 1,
              floor: 5,
              roomNumber: 501,
              capacity: 3,
              bedCount: 1,
              type: RoomType.DELUXE,
              features: [RoomFeature.WIFI, RoomFeature.AIR_CONDITIONER, RoomFeature.TV, RoomFeature.MINIBAR, RoomFeature.BALCONY]
            },
            {
              name: "Standart Şehir Manzaralı Oda",
              description: "Şehir manzaralı, 25 m² genişliğinde, çift kişilik yatak",
              price: 1800.0,
              maxAdults: 2,
              maxChildren: 0,
              floor: 3,
              roomNumber: 302,
              capacity: 2,
              bedCount: 1,
              type: RoomType.STANDARD,
              features: [RoomFeature.WIFI, RoomFeature.AIR_CONDITIONER, RoomFeature.TV]
            },
            {
              name: "Presidential Suite",
              description: "Lüks suite oda, 65 m² genişliğinde, oturma odası ve jakuzili banyo",
              price: 4500.0,
              maxAdults: 3,
              maxChildren: 2,
              floor: 8,
              roomNumber: 801,
              capacity: 5,
              bedCount: 2,
              type: RoomType.PRESIDENTIAL,
              features: [RoomFeature.WIFI, RoomFeature.AIR_CONDITIONER, RoomFeature.TV, RoomFeature.MINIBAR, RoomFeature.BALCONY, RoomFeature.BATH_TUB, RoomFeature.SAFE_BOX]
            }
          ];

          for (const roomData of rooms) {
            const room = await prisma.room.create({
              data: {
                name: roomData.name,
                description: roomData.description,
                price: roomData.price,
                maxAdults: roomData.maxAdults,
                maxChildren: roomData.maxChildren,
                floor: roomData.floor,
                roomNumber: roomData.roomNumber,
                capacity: roomData.capacity,
                bedCount: roomData.bedCount,
                type: roomData.type,
                hotelId: hotel.id,
              },
            });

            // Oda özelliklerini ekle
            for (const feature of roomData.features) {
              await prisma.roomFeatureStatus.create({
                data: {
                  feature: feature,
                  isAvailable: true,
                  roomId: room.id,
                },
              });
            }

            console.log(`Oda oluşturuldu: ${room.name}`);
          }

          // Hotel özelliklerini ekle
          const hotelFeatures = [
            HotelFeatures.WIFI,
            HotelFeatures.POOL,
            HotelFeatures.SPA,
            HotelFeatures.PARKING,
            HotelFeatures.RESTAURANT,
            HotelFeatures.BREAKFAST_INCLUDED
          ];

          for (const feature of hotelFeatures) {
            await prisma.hotelProps.create({
              data: {
                hotelId: hotel.id,
                feature: feature,
              },
            });
          }

          console.log(`Hotel özellikleri eklendi: ${hotel.name}`);
        }
      }
    }
  }

  console.log("Seed işlemi tamamlandı!");
  console.log("Oluşturulan kullanıcılar:");
  console.log(`- 1 Admin: admin@rotaly.com (Admin123!)`);
  console.log(`- 5 Owner: owner1@rotaly.com - owner5@rotaly.com (Owner123!)`);
  console.log(`- 5 Support: support1@rotaly.com - support5@rotaly.com (Support123!)`);
  console.log(`- 20 Customer: customer1@example.com - customer20@example.com (Customer123!)`);
  console.log("Oluşturulan oteller: 10 adet");
}

main()
  .catch((e) => {
    console.error("Seed işlemi sırasında hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });