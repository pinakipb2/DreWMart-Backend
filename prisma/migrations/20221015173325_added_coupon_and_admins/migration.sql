-- AlterTable
ALTER TABLE "Retailer" ADD COLUMN     "drewTokens" BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponItems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" BIGINT NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouponItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailerCoupons" (
    "id" TEXT NOT NULL,
    "retailerId" TEXT NOT NULL,
    "couponItemsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetailerCoupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CouponItems_name_key" ON "CouponItems"("name");

-- AddForeignKey
ALTER TABLE "RetailerCoupons" ADD CONSTRAINT "RetailerCoupons_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerCoupons" ADD CONSTRAINT "RetailerCoupons_couponItemsId_fkey" FOREIGN KEY ("couponItemsId") REFERENCES "CouponItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
