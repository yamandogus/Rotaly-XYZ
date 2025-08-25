import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Payment Card seed fonksiyonları
async function seedPaymentCardsForUser(userId: string) {
  const seedPaymentCards = [
    {
      cardNumber: "4111111111111111",
      cardHolderName: "Ahmet Yılmaz",
      expiryDate: "12/25",
      cvv: "123",
      brand: "Visa",
      last4: "1111"
    },
    {
      cardNumber: "5555555555554444",
      cardHolderName: "Ahmet Yılmaz",
      expiryDate: "12/26",
      cvv: "123",
      brand: "Mastercard",
      last4: "4444"
    },
    {
      cardNumber: "378282246310005",
      cardHolderName: "Ahmet Yılmaz",
      expiryDate: "12/27",
      cvv: "1234",
      brand: "American Express",
      last4: "0005"
    },
    {
      cardNumber: "4000056655665556",
      cardHolderName: "Ahmet Yılmaz",
      expiryDate: "12/28",
      cvv: "123",
      brand: "Visa",
      last4: "5556"
    },
    {
      cardNumber: "5105105105105100",
      cardHolderName: "Ahmet Yılmaz",
      expiryDate: "12/29",
      cvv: "123",
      brand: "Mastercard",
      last4: "5100"
    }
  ];

  console.log(`\n💳 ${userId} kullanıcısı için ${seedPaymentCards.length} kredi kartı oluşturuluyor...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const cardData of seedPaymentCards) {
    try {
      // Kart bilgilerini tokenize et (gerçek uygulamada güvenli şekilde yapılır)
      const token = `tok_${Math.random().toString(36).substr(2, 9)}_${cardData.last4}`;
      
      // Son kullanma tarihini Date objesine çevir
      const [month, year] = cardData.expiryDate.split('/');
      const expiresAt = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);

      const paymentCard = await prisma.paymentCard.create({
        data: {
          token: token,
          brand: cardData.brand,
          last4: cardData.last4,
          expiresAt: expiresAt,
          userId: userId
        },
      });

      console.log(`  ✅ Kredi kartı oluşturuldu: ${cardData.brand} ****${cardData.last4} - ${paymentCard.id}`);
      successCount++;
      
    } catch (error) {
      console.error(`  ❌ Kredi kartı oluşturulurken hata: ${cardData.brand} ****${cardData.last4}:`, error);
      errorCount++;
    }
  }

  console.log(`  📊 Sonuç: ${successCount} başarılı, ${errorCount} hata`);
  return { successCount, errorCount };
}

async function seedPaymentCardsForSpecificUser() {
  try {
    const userId = "32c5ac15-f0a5-4ffe-bd12-29bde046b69a";
    
    // Kullanıcıyı kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, surname: true, email: true }
    });

    if (!user) {
      console.log("❌ Kullanıcı bulunamadı:", userId);
      return;
    }

    console.log(`👤 Kullanıcı: ${user.name} ${user.surname} (${user.email})`);

    // Kullanıcı için payment card oluştur
    const result = await seedPaymentCardsForUser(userId);

    // İstatistikler
    await printPaymentCardStatistics(userId);

    console.log(`\n🎉 Payment Card seed işlemi tamamlandı!`);
    console.log(`📊 Toplam: ${result.successCount} başarılı, ${result.errorCount} hata`);

  } catch (error) {
    console.error("❌ Payment Card seed işlemi sırasında hata oluştu:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function printPaymentCardStatistics(userId: string) {
  const totalCards = await prisma.paymentCard.count({
    where: { userId: userId }
  });

  const cardBrands = await prisma.paymentCard.groupBy({
    by: ["brand"],
    where: { userId: userId },
    _count: {
      brand: true
    }
  });

  const expiryStats = await prisma.paymentCard.aggregate({
    where: { userId: userId },
    _count: {
      id: true
    },
    _min: {
      expiresAt: true
    }
  });

  console.log("\n📊 Payment Card İstatistikleri:");
  console.log(`Toplam kart sayısı: ${totalCards}`);
  console.log(`En yakın son kullanma tarihi: ${expiryStats._min.expiresAt?.toLocaleDateString('tr-TR')}`);

  console.log("\nKart markaları:");
  cardBrands.forEach(brand => {
    console.log(`  - ${brand.brand}: ${brand._count.brand} kart`);
  });
}

if (require.main === module) {
  seedPaymentCardsForSpecificUser().catch((error) => {
    console.error("Payment Card seed işlemi başarısız oldu:", error);
    process.exit(1);
  });
}

export { seedPaymentCardsForSpecificUser };
