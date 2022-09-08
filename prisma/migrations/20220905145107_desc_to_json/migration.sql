/*
  Warnings:

  - Changed the type of `description` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_description_key" ON "Product"("description");
