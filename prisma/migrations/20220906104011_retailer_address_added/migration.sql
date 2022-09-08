/*
  Warnings:

  - A unique constraint covering the columns `[walletAddress]` on the table `Retailer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `walletAddress` to the `Retailer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Retailer" ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Retailer_walletAddress_key" ON "Retailer"("walletAddress");
