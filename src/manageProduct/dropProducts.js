import { prisma } from '../prisma';

const dropProducts = async () => {
  const deletedProducts = await prisma.product.deleteMany({});
  console.log(deletedProducts);
};

dropProducts();
