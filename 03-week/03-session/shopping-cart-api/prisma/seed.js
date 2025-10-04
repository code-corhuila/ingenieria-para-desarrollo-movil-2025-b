/// <summary>
/// Script de seed para poblar productos iniciales en la BD.
/// </summary>

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const products = [
    {
      name: 'Mouse Inalámbrico',
      sku: 'MOUSE-001',
      description: 'Mouse inalámbrico ergonómico con conexión USB.',
      price: 50000.00,
      stock: 100
    },
    {
      name: 'Teclado Mecánico',
      sku: 'KEYB-001',
      description: 'Teclado mecánico retroiluminado RGB.',
      price: 120000.00,
      stock: 50
    },
    {
      name: 'Laptop Gamer',
      sku: 'LAPTOP-001',
      description: 'Laptop gamer con procesador i7 y RTX 3060.',
      price: 2500000.00,
      stock: 15
    },
    {
      name: 'Monitor 27"',
      sku: 'MONITOR-001',
      description: 'Monitor 27 pulgadas Full HD IPS.',
      price: 300000.00,
      stock: 30
    },
    {
      name: 'Auriculares Inalámbricos',
      sku: 'HEADPH-001',
      description: 'Auriculares Bluetooth con cancelación de ruido.',
      price: 80000.00,
      stock: 75
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {}, // Si ya existe, no lo toca
      create: product,
    });
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
