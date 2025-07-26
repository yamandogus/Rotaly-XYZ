-- CreateEnum
CREATE TYPE "HotelType" AS ENUM ('APARTMENT', 'HOTEL', 'VILLA', 'BUNGALOW', 'ROOM', 'RESORT', 'HOSTEL', 'CAMP');

-- CreateEnum
CREATE TYPE "HotelFeatureS" AS ENUM ('WIFI', 'POOL', 'SPA', 'PARKING', 'GYM', 'PET_FRIENDLY', 'RESTAURANT', 'BREAKFAST_INCLUDED');

-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "discountRate" DOUBLE PRECISION,
ADD COLUMN     "isDiscounted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelFeature" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hotelFeatureId" TEXT NOT NULL,

    CONSTRAINT "HotelFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_hotelId_key" ON "Favorite"("userId", "hotelId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelFeature" ADD CONSTRAINT "HotelFeature_hotelFeatureId_fkey" FOREIGN KEY ("hotelFeatureId") REFERENCES "HotelFeature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelFeature" ADD CONSTRAINT "HotelFeature_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
