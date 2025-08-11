/*
  Warnings:

  - You are about to drop the column `googleEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('GOOGLE', 'FACEBOOK');

-- DropIndex
DROP INDEX "public"."users_googleEmail_key";

-- DropIndex
DROP INDEX "public"."users_googleId_key";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "googleEmail",
DROP COLUMN "googleId";

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "providerAccountId" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_providerAccountId_key" ON "public"."accounts"("providerAccountId");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
