import { prisma } from '../prisma';

const dropCouponItems = async () => {
  const deletedCouponItems = await prisma.couponItems.deleteMany({});
  console.log(deletedCouponItems);
};

dropCouponItems();
