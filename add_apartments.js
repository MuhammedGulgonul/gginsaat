const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();

  if (projects.length === 0) {
    console.log("Hiç proje bulunamadı.");
    return;
  }

  for (const project of projects) {
    // Add two apartments to each project
    await prisma.apartment.create({
      data: {
        title: "A Blok 3. Kat Kuzey Cephe",
        type: "2+1",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });

    await prisma.apartment.create({
      data: {
        title: "VIP Teraslı Çatı Katı",
        type: "4+1 Dubleks",
        images: "[\"/images/interior.png\"]",
        projectId: project.id
      }
    });
  }

  console.log("Veritabanındaki projelere örnek daireler başarıyla eklendi.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
