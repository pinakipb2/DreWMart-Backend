-- DropForeignKey
ALTER TABLE "RetailerCoupons" DROP CONSTRAINT "RetailerCoupons_couponItemsId_fkey";

-- DropForeignKey
ALTER TABLE "RetailerCoupons" DROP CONSTRAINT "RetailerCoupons_retailerId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_productId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_retailerId_fkey";

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerCoupons" ADD CONSTRAINT "RetailerCoupons_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetailerCoupons" ADD CONSTRAINT "RetailerCoupons_couponItemsId_fkey" FOREIGN KEY ("couponItemsId") REFERENCES "CouponItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
