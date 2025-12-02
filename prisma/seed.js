import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateProducts(n) {
  const products = [];

  // Nomes de exemplo para variar um pouco os produtos
  const productNames = [
    "Camiseta Algodão Premium",
    "Calça Jeans Slim Fit",
    "Tênis Esportivo Pro",
    "Relógio Smartwatch X",
    "Fones de Ouvido Wireless",
    "Mochila Casual Reforçada",
    "Jaqueta Corta Vento",
    "Óculos de Sol Polarizado",
  ];

  for (let i = 1; i <= n; i++) {
    const productId = i;
    const randomNameIndex = Math.floor(Math.random() * productNames.length);
    const baseName = productNames[randomNameIndex];
    const price = parseFloat((Math.random() * 480 + 20).toFixed(2));

    products.push({
      id: productId,
      name: `${baseName}`,
      image: `https://picsum.photos/seed/product${productId}/400/400`,
      price: price,
    });
  }
  return products;
}

async function main() {
  const productsToCreate = generateProducts(100);
  await prisma.product.createMany({
        data: productsToCreate,
      });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
