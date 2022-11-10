/*
  Warnings:

  - You are about to alter the column `drewTokens` on the `Retailer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Retailer" ALTER COLUMN "drewTokens" SET DATA TYPE INTEGER;
