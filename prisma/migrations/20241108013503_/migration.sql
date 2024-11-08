/*
  Warnings:

  - You are about to drop the column `donationId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_donationId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "donationId";

-- CreateTable
CREATE TABLE "DonationItem" (
    "id" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DonationItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationItem" ADD CONSTRAINT "DonationItem_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationItem" ADD CONSTRAINT "DonationItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
