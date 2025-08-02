-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "addressProof" TEXT,
ADD COLUMN     "businessLicense" TEXT,
ADD COLUMN     "discountEndDate" TIMESTAMP(3),
ADD COLUMN     "discountStartDate" TIMESTAMP(3),
ADD COLUMN     "taxCertificate" TEXT,
ADD COLUMN     "taxId" TEXT,
ADD COLUMN     "taxOffice" TEXT,
ADD COLUMN     "tradeRegistryNumber" TEXT;

-- CreateTable
CREATE TABLE "payment_cards" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "last4" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_cards" ADD CONSTRAINT "payment_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
