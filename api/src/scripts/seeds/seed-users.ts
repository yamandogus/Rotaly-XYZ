import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface SeedUser {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string | null;
  role: "ADMIN" | "OWNER" | "CUSTOMER" | "SUPPORT" | "AI";
  isVerified: boolean;
}

const seedUsers: SeedUser[] = [
  // 1 Admin
  {
    name: "Admin",
    surname: "User",
    email: "admin@rotaly.com",
    phone: "+905001234567",
    password: "pass1234",
    role: "ADMIN",
    isVerified: true,
  },

  // 2 Owners
  {
    name: "John",
    surname: "Smith",
    email: "owner1@rotaly.com",
    phone: "+905001234568",
    password: "pass1234",
    role: "OWNER",
    isVerified: true,
  },
  {
    name: "Sarah",
    surname: "Johnson",
    email: "owner2@rotaly.com",
    phone: "+905001234569",
    password: "pass1234",
    role: "OWNER",
    isVerified: true,
  },

  // 3 Regular Users
  {
    name: "Emily",
    surname: "Davis",
    email: "user1@rotaly.com",
    phone: "+905001234570",
    password: "pass1234",
    role: "CUSTOMER",
    isVerified: true,
  },
  {
    name: "James",
    surname: "Wilson",
    email: "user2@rotaly.com",
    phone: "+905001234571",
    password: "pass1234",
    role: "CUSTOMER",
    isVerified: true,
  },
  {
    name: "Michael",
    surname: "Brown",
    email: "user3@rotaly.com",
    phone: "+905001234572",
    password: "pass1234",
    role: "CUSTOMER",
    isVerified: false, // one unverified user for testing
  },

  // 2 Support Users
  {
    name: "Lisa",
    surname: "Wilson",
    email: "support1@rotaly.com",
    phone: "+905001234573",
    password: "pass1234",
    role: "SUPPORT",
    isVerified: true,
  },
  {
    name: "David",
    surname: "Martinez",
    email: "support2@rotaly.com",
    phone: "+905001234574",
    password: "pass1234",
    role: "SUPPORT",
    isVerified: true,
  },

  // 1 AI User
  {
    name: "Rotaly",
    surname: "AI",
    email: "ai@rotaly.com",
    phone: "+905001234575",
    password: null,
    role: "AI",
    isVerified: true,
  },
];

async function hashPassword(password: string | null): Promise<string | null> {
  if (!password) return null;
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function seedDatabase() {
  try {
    // Opsiyonel: SIFIRDAN BAŞLAMAK İÇİN varolan kullanıcıları sil
    // (mevcut verileri tutmak istiyorsanız yorum satırına alın)
    // Bu işlem için malesef ilk önce user'a bağlı herşeyi silmemiz gerekiyor...
    /*     await prisma.token.deleteMany({});
    await prisma.reservation.deleteMany({});
    await prisma.paymentCard.deleteMany({});
    await prisma.support.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.favorite.deleteMany({});
    await prisma.image.deleteMany({});
    await prisma.hotel.deleteMany({});
    await prisma.user.deleteMany({});
  */

    // tek tek oluştur
    for (const userData of seedUsers) {
      try {
        // kullanıcı zaten var mı kontrol et
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: userData.email }, { phone: userData.phone }],
          },
        });

        if (existingUser) {
          console.log(
            `Atladı - ${userData.name} ${userData.surname} (${userData.role}): Kullanıcı zaten var`
          );
          continue;
        }

        // hash password
        const hashedPassword = await hashPassword(userData.password);

        await prisma.user.create({
          data: {
            id: userData.role === "AI" ? "ai-assistant" : undefined,
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            phone: userData.phone,
            hashedPassword: hashedPassword,
            role: userData.role,
            isVerified: userData.isVerified,
          },
        });
      } catch (error) {
        console.error(
          `${userData.name} ${userData.surname} oluşturulurken hata:`,
          error
        );
      }
    }

    // istatistik
    const totalUsers = await prisma.user.count();
    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
      _count: {
        role: true,
      },
    });

    const verifiedUsers = await prisma.user.findMany({
      where: { isVerified: true },
      select: { name: true, surname: true, email: true, role: true },
    });

    const unverifiedUsers = await prisma.user.findMany({
      where: { isVerified: false },
      select: { name: true, surname: true, email: true, role: true },
    });

    console.log(`Veritabanına eklenen toplam kullanıcı sayısı: ${totalUsers}`);

    console.log(`\nDoğrulanmış kullanıcılar (${verifiedUsers.length}):`);
    verifiedUsers.forEach((user) => {
      console.log(
        `  - ${user.role}: ${user.name} ${user.surname} (${user.email})`
      );
    });

    console.log(`\nDoğrulanmamış kullanıcılar (${unverifiedUsers.length}):`);
    if (unverifiedUsers.length > 0) {
      unverifiedUsers.forEach((user) => {
        console.log(
          `  - ${user.role}: ${user.name} ${user.surname} (${user.email})`
        );
      });
    } else {
      console.log(`  - Doğrulanmamış kullanıcı yok`);
    }

    console.log("\nRol Bazında Kullanıcılar:");
    usersByRole.forEach((roleGroup) => {
      console.log(`  - ${roleGroup.role}: ${roleGroup._count.role} kullanıcı`);
    });

    console.log("\n!!! TÜM KULLANICILARIN ŞİFRESİ : pass1234\n");
  } catch (error) {
    console.error("Kullanıcı yerleştirme sırasında hata:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error("Veritabanına kullanıcı yerleştirme sırasında hata:", error);
    process.exit(1);
  });
}

export { seedDatabase, seedUsers };
