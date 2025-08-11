/*
  Warnings:

  - You are about to drop the column `status` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `supports` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleEmail]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `supports` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SupportCategory" AS ENUM ('TECHNICAL', 'BILLING', 'RESERVATION', 'GENERAL', 'COMPLAINT', 'FEATURE_REQUEST', 'OTHER');

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "supports" DROP COLUMN "status",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "category" "SupportCategory" NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "googleEmail" TEXT,
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "hashedPassword" DROP NOT NULL;

-- DropEnum
DROP TYPE "ReservationStatus";

-- DropEnum
DROP TYPE "SupportStatus";

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleEmail_key" ON "users"("googleEmail");
