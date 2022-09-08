/*
  Warnings:

  - A unique constraint covering the columns `[highlights]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prodId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `highlights` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "highlights" JSONB NOT NULL,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "prodId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_highlights_key" ON "Product"("highlights");

-- CreateIndex
CREATE UNIQUE INDEX "Store_prodId_key" ON "Store"("prodId");
