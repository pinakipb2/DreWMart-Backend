import { prisma } from '../prisma';

const imageBase = process.env.BACKEND_URL + '/images';

// "warrantyDuration" is in Months
const ProductsToAdd = [
  {
    name: 'DreWMart Void V0 (8GB RAM, 256GB Storage)',
    price: 11990,
    image: `${imageBase}/phone-0.png`,
    rating: 4.5,
    color: 'Black',
    highlights: [
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quae perferendis impedit cumque, consequuntur minima maxime libero ratione, autem totam maiores quis est magni iure amet ab obcaecati! Odio, ea.',
    warrantyDuration: 24,
  },
  {
    name: 'DreWMart Void V1 (6GB RAM, 128GB Storage)',
    price: 15999,
    image: `${imageBase}/phone-1.png`,
    rating: 2.8,
    color: 'Black',
    highlights: [
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente suscipit eius at minus reiciendis in ex repellendus dolore repellat laudantium nobis obcaecati deserunt voluptas, quo illum. Obcaecati porro aut nisi? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam facilis earum distinctio ipsam amet cumque tenetur! Obcaecati voluptatibus deleniti suscipit, architecto, magni, esse facere illum quidem voluptas necessitatibus ab dolorem.',
    warrantyDuration: 30,
  },
  {
    name: 'DreWMart Void V2 (4GB RAM, 64GB Storage)',
    price: 13594,
    image: `${imageBase}/phone-2.png`,
    rating: 3.4,
    color: 'Black',
    highlights: [
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam facilis earum distinctio ipsam amet cumque tenetur! Obcaecati voluptatibus deleniti suscipit, architecto, magni, esse facere illum quidem voluptas necessitatibus ab dolorem.',
  },
  {
    name: 'DreWMart Void V3 (8GB RAM, 256GB Storage)',
    price: 10499,
    image: `${imageBase}/phone-3.png`,
    rating: 4.9,
    color: 'Black',
    highlights: [
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto sunt nulla quos soluta beatae exercitationem cumque provident, culpa corporis, saepe quo harum ut, nam magnam delectus ad reprehenderit alias aut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente suscipit eius at minus reiciendis in ex repellendus dolore repellat laudantium nobis obcaecati deserunt voluptas, quo illum. Obcaecati porro aut nisi?',
    warrantyDuration: 10,
  },
  {
    name: 'DreWMart Void V4 (4GB RAM, 128GB Storage)',
    price: 25999,
    image: `${imageBase}/phone-4.png`,
    rating: 3.6,
    color: 'Black',
    highlights: [
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente suscipit eius at minus reiciendis in ex repellendus dolore repellat laudantium nobis obcaecati deserunt voluptas, quo illum. Obcaecati porro aut nisi?',
    warrantyDuration: 26,
  },
  {
    name: 'DreWMart Void V5 (2GB RAM, 32GB Storage)',
    price: 17489,
    image: `${imageBase}/phone-5.png`,
    rating: 4.2,
    color: 'Black',
    highlights: [
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto sunt nulla quos soluta beatae exercitationem cumque provident, culpa corporis, saepe quo harum ut, nam magnam delectus ad reprehenderit alias aut!',
    warrantyDuration: 6,
  },
];

const addProducts = async () => {
  const addedProducts = await prisma.product.createMany({
    data: ProductsToAdd,
  });
  console.log(addedProducts);
};

addProducts();
