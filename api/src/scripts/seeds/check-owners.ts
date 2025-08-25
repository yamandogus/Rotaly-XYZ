import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkOwners() {
  try {
    console.log("\nVeritabanındaki mevcut owner'lar kontrol ediliyor...");

    const owners = await prisma.user.findMany({
      where: {
        role: "OWNER",
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        _count: {
          select: {
            hotels: true,
          },
        },
      },
    });

    if (owners.length === 0) {
      console.log("Veritabanında hiç owner bulunamadı!");
      console.log("Önce owner oluşturmanız gerekiyor.");
      return null;
    }

    console.log(`Toplam ${owners.length} owner bulundu:\n`);

    owners.forEach((owner, index) => {
      console.log(`${index + 1}. ${owner.name} ${owner.surname}`);
      console.log(`   Email: ${owner.email}`);
      console.log(`   Mevcut otel sayısı: ${owner._count.hotels}`);
      console.log(`   ID: ${owner.id}\n`);
    });

    return owners;
  } catch (error) {
    console.error("Owner'lar kontrol edilirken hata oluştu:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  checkOwners().catch((error) => {
    console.error("Script başarısız oldu:", error);
    process.exit(1);
  });
}

export { checkOwners };
