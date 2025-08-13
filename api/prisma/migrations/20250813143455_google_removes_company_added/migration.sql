/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- AlterTable
ALTER TABLE "public"."images" ADD COLUMN     "companyId" TEXT;

-- DropTable
DROP TABLE "public"."accounts";

-- DropEnum
DROP TYPE "public"."Provider";

-- CreateTable
CREATE TABLE "public"."company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "verificationOTP" TEXT,
    "verification_otp_expires" TIMESTAMP(3),
    "resetPasswordOTP" TEXT,
    "reset_password_otp_expires" TIMESTAMP(3),
    "companyTaxId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "public"."company"("email");

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
