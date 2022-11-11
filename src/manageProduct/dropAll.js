import { prisma } from '../prisma';

const dropAll = async () => {
  const deletedStore = await prisma.store.deleteMany({});
  const deletedProducts = await prisma.product.deleteMany({});
  const deletedRetailers = await prisma.retailer.deleteMany({});
  const deletedCouponItems = await prisma.couponItems.deleteMany({});
  const deletedUser = await prisma.user.deleteMany({});
  const deletedAdmin = await prisma.admin.deleteMany({});
  console.log({ deletedProducts, deletedRetailers, deletedStore, deletedCouponItems, deletedUser, deletedAdmin });
};

dropAll();
