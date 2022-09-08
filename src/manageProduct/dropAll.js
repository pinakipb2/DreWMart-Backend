import { prisma } from '../prisma';

const dropAll = async () => {
  const deletedStore = await prisma.store.deleteMany({});
  const deletedProducts = await prisma.product.deleteMany({});
  const deletedRetailers = await prisma.retailer.deleteMany({});
  console.log({ deletedProducts, deletedRetailers, deletedStore });
};

dropAll();
