import { PrismaClient, Role } from "@prisma/client";
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

  // 2. Owner kullanıcısı
  console.log("Owner kullanıcısı oluşturuluyor...");
  const hashedOwnerPassword = await bcrypt.hash("Owner123!", 12);
  const owner = await prisma.user.upsert({
    where: { email: "owner@rotaly.com" },
    update: {},
    create: {
      name: "Hotel",
      surname: "Owner",
      email: "owner@rotaly.com",
      phone: "+905551113300",
      hashedPassword: hashedOwnerPassword,
      role: Role.OWNER,
      isVerified: true,
    },
  });
  console.log(`Owner kullanıcısı oluşturuldu: ${owner.email}`);

  // 3. Support kullanıcısı
  console.log("Support kullanıcısı oluşturuluyor...");
  const hashedSupportPassword = await bcrypt.hash("Support123!", 12);
  const support = await prisma.user.upsert({
    where: { email: "support@rotaly.com" },
    update: {},
    create: {
      name: "Support",
      surname: "Personel",
      email: "support@rotaly.com",
      phone: "+905551114400",
      hashedPassword: hashedSupportPassword,
      role: Role.SUPPORT,
      isVerified: true,
    },
  });
  console.log(`Support kullanıcısı oluşturuldu: ${support.email}`);

  // 4. Customer kullanıcısı
  console.log("Customer kullanıcısı oluşturuluyor...");
  const hashedCustomerPassword = await bcrypt.hash("Customer123!", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@rotaly.com" },
    update: {},
    create: {
      name: "Normal",
      surname: "Customer",
      email: "customer@rotaly.com",
      phone: "+905551115500",
      hashedPassword: hashedCustomerPassword,
      role: Role.CUSTOMER,
      isVerified: true,
    },
  });
  console.log(`Customer kullanıcısı oluşturuldu: ${customer.email}`);

  console.log("\nSeed işlemi tamamlandı!");
  console.log("\nOluşturulan kullanıcılar:");
  console.log("┌─────────────────┬─────────────────────┬──────────────┐");
  console.log("│ Rol             │ Email               │ Şifre        │");
  console.log("├─────────────────┼─────────────────────┼──────────────┤");
  console.log("│ ADMIN           │ admin@rotaly.com    │ Admin123!    │");
  console.log("│ OWNER           │ owner@rotaly.com    │ Owner123!    │");
  console.log("│ SUPPORT         │ support@rotaly.com  │ Support123!  │");
  console.log("│ CUSTOMER        │ customer@rotaly.com │ Customer123! │");
  console.log("└─────────────────┴─────────────────────┴──────────────┘");
}

main()
  .catch((e) => {
    console.error("Seed işlemi sırasında hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
