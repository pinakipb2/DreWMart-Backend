/*
  Warnings:

  - You are about to alter the column `rating` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,1)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "rating" SET DEFAULT 1,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(9,1);
