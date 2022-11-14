import { prisma } from "../prisma";

const couponItems = [
  {
    name: "Tuna",
    price: 10,
  },
  {
    name: "Trout",
    price: 90,
  },
  {
    name: "ButterflyFish",
    price: 200,
  },
  {
    name: "GoldFish",
    price: 600,
  },
  {
    name: "Dolphin",
    price: 900,
  },
  {
    name: "Shark",
    price: 1200,
  },
];

const addCouponItems = async () => {
  const items = await prisma.CouponItems.createMany({
    data: couponItems,
  });
  console.log(items);
};

addCouponItems();
