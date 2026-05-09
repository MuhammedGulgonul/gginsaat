const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();

  if (projects.length === 0) return;

  for (const project of projects) {
    // Add 2 more 2+1 to make it 3
    await prisma.apartment.create({
      data: {
        title: "B Blok 2. Kat Doğu Cephe",
        type: "2+1",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    await prisma.apartment.create({
      data: {
        title: "C Blok 5. Kat Güney Cephe",
        type: "2+1",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    // Add 2 more 4+1 Dubleks to make it 3
    await prisma.apartment.create({
      data: {
        title: "A Blok Çatı Dubleks (Manzaralı)",
        type: "4+1 Dubleks",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    await prisma.apartment.create({
      data: {
        title: "B Blok Teraslı Geniş Dubleks",
        type: "4+1 Dubleks",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    // Add exactly 3 items of 3+1
    await prisma.apartment.create({
      data: {
        title: "A Blok 1. Kat Aile Tipi",
        type: "3+1",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    await prisma.apartment.create({
      data: {
        title: "B Blok 4. Kat Köşe Daire",
        type: "3+1",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    await prisma.apartment.create({
      data: {
        title: "C Blok 6. Kat Havuz Manzaralı",
        type: "3+1",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });
  }

  console.log("3'lü şablon için ekstra daireler eklendi.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
