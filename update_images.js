const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.project.updateMany({
    where: { mainImage: '/images/logo.png' },
    data: { mainImage: '/images/hero.png' }
  });
  console.log("Images updated.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
