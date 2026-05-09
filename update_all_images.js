const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const imagePool = [
  "/images/modern_exterior.png",
  "/images/luxury_living.png",
  "/images/luxury_kitchen.png",
  "/images/luxury_bedroom.png",
  "/images/luxury_bathroom.png"
];

function getRandomImages(count) {
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log("Updating old projects and apartments...");

  const allProjects = await prisma.project.findMany({ include: { apartments: true } });

  for (const project of allProjects) {
    // Eski projeleri güncelle (Eğer resimleri yoksa veya placeholder varsa)
    const gallery = getRandomImages(4);
    await prisma.project.update({
      where: { id: project.id },
      data: {
        mainImage: gallery[0], // İlk resmi kapak yap
        gallery: JSON.stringify(gallery)
      }
    });

    for (const apt of project.apartments) {
      await prisma.apartment.update({
        where: { id: apt.id },
        data: {
          images: JSON.stringify(getRandomImages(3))
        }
      });
    }

    // Yeni projelere fazladan daire ekle
    if (project.title === "Zümrüt Evleri") {
      console.log("Adding more apartments to Zümrüt Evleri...");
      await prisma.apartment.createMany({
        data: [
          { title: "Zümrüt C Blok 1+1", type: "1+1", price: "3.200.000 TL", isSold: false, projectId: project.id, description: "Yatırımlık harika 1+1 stüdyo daire.", images: JSON.stringify(getRandomImages(2)) },
          { title: "Zümrüt C Blok 4+1", type: "4+1", price: "7.500.000 TL", isSold: false, projectId: project.id, description: "Geniş ailelere özel, ebeveyn banyolu devasa 4+1.", images: JSON.stringify(getRandomImages(4)) },
          { title: "Zümrüt D Blok 3+1", type: "3+1", price: "5.500.000 TL", isSold: true, projectId: project.id, description: "Ara kat, manzaralı 3+1 daire.", images: JSON.stringify(getRandomImages(3)) },
          { title: "Zümrüt D Blok 2+1", type: "2+1", price: "4.100.000 TL", isSold: false, projectId: project.id, description: "Mükemmel konumlu şirin 2+1.", images: JSON.stringify(getRandomImages(3)) },
        ]
      });
    }

    if (project.title === "Safir Konakları") {
      console.log("Adding more apartments to Safir Konakları...");
      await prisma.apartment.createMany({
        data: [
          { title: "Safir C Blok 2+1", type: "2+1", price: "4.800.000 TL", isSold: true, projectId: project.id, description: "Merkezi konum, sıfır daire.", images: JSON.stringify(getRandomImages(3)) },
          { title: "Safir C Blok 3+1", type: "3+1", price: "6.100.000 TL", isSold: false, projectId: project.id, description: "Güney cephe, ferah 3+1 daire.", images: JSON.stringify(getRandomImages(3)) },
          { title: "Safir D Blok 5+1 Dubleks", type: "5+1 Dubleks", price: "12.000.000 TL", isSold: false, projectId: project.id, description: "VIP lüks yaşam arayanlar için özel tasarım dubleks.", images: JSON.stringify(getRandomImages(5)) },
          { title: "Safir D Blok Dükkan", type: "Dükkan / Ticari", price: "8.000.000 TL", isSold: false, projectId: project.id, description: "Ana cadde üzeri yatırımlık ticari ünite.", images: JSON.stringify(["/images/modern_exterior.png"]) },
        ]
      });
    }
  }

  console.log("Update complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
