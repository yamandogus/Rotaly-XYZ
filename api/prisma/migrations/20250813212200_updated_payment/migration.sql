/*
  Warnings:

  - Added the required column `endDate` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelAddress` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nightCount` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxAdults` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxChildren` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RoomType" AS ENUM ('STANDARD', 'DELUXE', 'SUITE', 'PRESIDENTIAL', 'EXECUTIVE');

-- AlterEnum
ALTER TYPE "public"."HotelFeatures" ADD VALUE 'CANCEL_POLICY';

-- AlterTable
ALTER TABLE "public"."hotels" ADD COLUMN     "checkIn" TEXT NOT NULL DEFAULT '12:00',
ADD COLUMN     "checkOut" TEXT NOT NULL DEFAULT '14:00';

-- AlterTable
ALTER TABLE "public"."reservations" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hotelAddress" TEXT NOT NULL,
ADD COLUMN     "nightCount" INTEGER NOT NULL,
ADD COLUMN     "paymentCardId" TEXT,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "specialRequest" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userPhone" TEXT NOT NULL,
ALTER COLUMN "checkIn" SET DEFAULT '12:00',
ALTER COLUMN "checkIn" SET DATA TYPE TEXT,
ALTER COLUMN "checkOut" SET DEFAULT '14:00',
ALTER COLUMN "checkOut" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."rooms" ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "maxAdults" INTEGER NOT NULL,
ADD COLUMN     "maxChildren" INTEGER NOT NULL,
ADD COLUMN     "roomNumber" INTEGER NOT NULL,
ADD COLUMN     "type" "public"."RoomType" NOT NULL DEFAULT 'STANDARD';

-- AddForeignKey
ALTER TABLE "public"."reservations" ADD CONSTRAINT "reservations_paymentCardId_fkey" FOREIGN KEY ("paymentCardId") REFERENCES "public"."payment_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
