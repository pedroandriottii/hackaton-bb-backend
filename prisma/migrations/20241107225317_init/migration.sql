/*
  Warnings:

  - You are about to drop the column `location` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Donation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userId_fkey";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "location",
DROP COLUMN "title",
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "img" TEXT;
