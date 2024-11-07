/*
  Warnings:

  - Added the required column `weight` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "weight" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "maxStorage" INTEGER NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);
