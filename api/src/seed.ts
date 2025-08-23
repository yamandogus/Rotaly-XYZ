import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed işlemi başlatılıyor...");

  // Customer kullanıcıları oluşturuluyor
  console.log("\nCustomer kullanıcıları oluşturuluyor...");
  
  const customerNames = [
    { name: "Ahmet", surname: "Yıldız" },
    { name: "Ayşe", surname: "Kara" },
    { name: "Mehmet", surname: "Özkan" },
    { name: "Fatma", surname: "Demir" },
    { name: "Ali", surname: "Çelik" },
    { name: "Zeynep", surname: "Kaya" },
    { name: "Mustafa", surname: "Arslan" },
    { name: "Elif", surname: "Koç" },
    { name: "Hasan", surname: "Şahin" },
    { name: "Meryem", surname: "Yılmaz" },
    { name: "İbrahim", surname: "Özdemir" },
    { name: "Hatice", surname: "Aydın" },
    { name: "Osman", surname: "Kurt" },
    { name: "Emine", surname: "Koşar" },
    { name: "Yusuf", surname: "Aslan" },
    { name: "Hacer", surname: "Çetin" },
    { name: "Murat", surname: "Korkmaz" },
    { name: "Sevgi", surname: "Özkan" },
    { name: "Kemal", surname: "Erdoğan" },
    { name: "Gülşah", surname: "Yavuz" },
    { name: "Burak", surname: "Polat" },
    { name: "Selin", surname: "Taş" },
    { name: "Emre", surname: "Güneş" },
    { name: "Deniz", surname: "Aktaş" },
    { name: "Can", surname: "Yalçın" },
    { name: "Ece", surname: "Kılıç" },
    { name: "Berk", surname: "Özkan" },
    { name: "İrem", surname: "Çelik" },
    { name: "Ege", surname: "Demir" },
    { name: "Ada", surname: "Kara" },
    { name: "Arda", surname: "Yıldız" },
    { name: "Zara", surname: "Özkan" },
    { name: "Kaan", surname: "Arslan" },
    { name: "Leyla", surname: "Koç" },
    { name: "Mert", surname: "Şahin" },
    { name: "Yağmur", surname: "Yılmaz" },
    { name: "Doruk", surname: "Özdemir" },
    { name: "Mira", surname: "Aydın" },
    { name: "Taha", surname: "Kurt" },
    { name: "Elif", surname: "Koşar" },
    { name: "Kuzey", surname: "Aslan" },
    { name: "Defne", surname: "Çetin" },
    { name: "Atlas", surname: "Korkmaz" },
    { name: "Su", surname: "Özkan" },
    { name: "Rüzgar", surname: "Erdoğan" },
    { name: "Toprak", surname: "Yavuz" }
  ];

  const hashedCustomerPassword = await bcrypt.hash("Customer123!", 12);

  for (let i = 0; i < 40; i++) {
    const customer = customerNames[i];
    const isVerified = i < 30; // İlk 30 customer verified, son 10 customer unverified
    
    const customerUser = await prisma.user.upsert({
      where: { email: `customer${i + 1}@rotaly.com` },
      update: {},
      create: {
        name: customer.name,
        surname: customer.surname,
        email: `customer${i + 1}@rotaly.com`,
        phone: `+90555${String(i + 1).padStart(6, '0')}`,
        hashedPassword: hashedCustomerPassword,
        role: Role.CUSTOMER,
        isVerified: isVerified,
      },
    });
    console.log(`Customer kullanıcısı oluşturuldu: ${customerUser.email} (Verified: ${isVerified})`);
  }

  console.log("\nSeed işlemi tamamlandı!");
  console.log("\nOluşturulan Customer Kullanıcıları:");
  console.log("┌─────────────────┬─────────────────────┬──────────────┬──────────┐");
  console.log("│ Rol             │ Email               │ Şifre        │ Verified │");
  console.log("├─────────────────┼─────────────────────┼──────────────┼──────────┤");
  console.log("│ CUSTOMER        │ customer1@rotaly.com│ Customer123! │ true     │");
  console.log("│ CUSTOMER        │ customer2@rotaly.com│ Customer123! │ true     │");
  console.log("│ ...             │ ...                 │ ...          │ ...      │");
  console.log("│ CUSTOMER        │ customer30@rotaly.com│ Customer123! │ true     │");
  console.log("│ CUSTOMER        │ customer31@rotaly.com│ Customer123! │ false    │");
  console.log("│ CUSTOMER        │ customer32@rotaly.com│ Customer123! │ false    │");
  console.log("│ ...             │ ...                 │ ...          │ ...      │");
  console.log("│ CUSTOMER        │ customer40@rotaly.com│ Customer123! │ false    │");
  console.log("└─────────────────┴─────────────────────┴──────────────┴──────────┘");
  
  console.log("\nToplam oluşturulan customer sayısı: 40");
  console.log("- 30 Customer (verified)");
  console.log("- 10 Customer (unverified)");
}

main()
  .catch((e) => {
    console.error("Seed işlemi sırasında hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
