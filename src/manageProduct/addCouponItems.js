import { prisma } from "../prisma";

const couponItems = [
  {
    name: "GoldFish",
    price: 100,
  },
  {
    name: "Dolphin",
    price: 500,
  },
  {
    name: "Shark",
    price: 1000,
  },
];

const addCouponItems = async () => {
  const items = await prisma.CouponItems.createMany({
    data: couponItems,
  });
  console.log(items);
};

addCouponItems();
