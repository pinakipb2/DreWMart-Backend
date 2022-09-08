import { prisma } from '../prisma';

const ProductsToAdd = [
  {
    name: 'Product 1',
    price: 16564.67,
    image: `${process.env.BACKEND_URL}/image1.jpg`,
    rating: 4,
    color: 'Black',
    highlights: [
      {
        desc: 'ABC',
      },
      {
        desc: 'DEF',
      },
    ],
    description: 'Desc 1',
    warrantyDuration: 10,
  },
  {
    name: 'Product 2',
    price: 16594.67,
    image: `${process.env.BACKEND_URL}/image2.jpg`,
    rating: 2,
    color: 'Black',
    highlights: [
      {
        desc: 'GHI',
      },
      {
        desc: 'DEF',
      },
    ],
    description: 'Desc 2',
    warrantyDuration: 10,
  },
  {
    name: 'Product 3',
    price: 16594.67,
    image: `${process.env.BACKEND_URL}/image3.jpg`,
    rating: 1,
    color: 'Black',
    highlights: [
      {
        desc: 'JKL',
      },
      {
        desc: 'DEF',
      },
    ],
    description: 'Desc 3',
  },
];

const addProducts = async () => {
  const addedProducts = await prisma.product.createMany({
    data: ProductsToAdd,
  });
  console.log(addedProducts);
};

addProducts();
