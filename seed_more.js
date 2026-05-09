const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding new projects and apartments...");

  // Project 1: Zümrüt Evleri (Devam Eden)
  const p1 = await prisma.project.create({
    data: {
      title: "Zümrüt Evleri",
      description: "Modern mimarisi ve lüks detaylarıyla İstanbul'un yeni gözdesi Zümrüt Evleri projemiz hızla yükseliyor. Aile yaşamına uygun, ferah ve konforlu alanlar.",
      address: "Küçükçekmece, İstanbul",
      startingPrice: "4.500.000 TL",
      isCompleted: false,
      mainImage: "/images/modern_exterior.png",
      gallery: JSON.stringify([
        "/images/modern_exterior.png",
        "/images/luxury_living.png",
        "/images/luxury_kitchen.png"
      ])
    }
  });

  // Project 2: Safir Konakları (Biten)
  const p2 = await prisma.project.create({
    data: {
      title: "Safir Konakları",
      description: "Tamamlanmış olan Safir Konakları, şehrin gürültüsünden uzak ama merkeze çok yakın. Yüksek kaliteli malzemeler ve ince işçilikle inşa edildi.",
      address: "Avcılar, İstanbul",
      startingPrice: "5.200.000 TL",
      isCompleted: true,
      mainImage: "/images/modern_exterior.png",
      gallery: JSON.stringify([
        "/images/luxury_living.png",
        "/images/luxury_kitchen.png"
      ])
    }
  });

  // Add Apartments for Zümrüt Evleri
  await prisma.apartment.create({
    data: {
      title: "Zümrüt A Blok 2+1",
      type: "2+1",
      images: JSON.stringify(["/images/luxury_living.png", "/images/luxury_kitchen.png"]),
      description: "Geniş salonu ve modern mutfağıyla 2+1 lüks daire.",
      price: "4.500.000 TL",
      isSold: false,
      projectId: p1.id
    }
  });

  await prisma.apartment.create({
    data: {
      title: "Zümrüt B Blok 3+1",
      type: "3+1",
      images: JSON.stringify(["/images/luxury_living.png", "/images/modern_exterior.png"]),
      description: "Geniş aileler için ideal, ebeveyn banyolu 3+1 daire.",
      price: "5.800.000 TL",
      isSold: true, // Satılmış olsun
      projectId: p1.id
    }
  });

  // Add Apartments for Safir Konakları
  await prisma.apartment.create({
    data: {
      title: "Safir A Blok 3+1",
      type: "3+1",
      images: JSON.stringify(["/images/luxury_living.png", "/images/luxury_kitchen.png"]),
      description: "Lüks detaylarla bezenmiş, oturuma hazır 3+1 daire.",
      price: "5.200.000 TL",
      isSold: false,
      projectId: p2.id
    }
  });

  await prisma.apartment.create({
    data: {
      title: "Safir B Blok 4+1 Dubleks",
      type: "4+1 Dubleks",
      images: JSON.stringify(["/images/luxury_kitchen.png"]),
      description: "Muhteşem manzaralı, geniş teraslı dubleks daire.",
      price: "8.500.000 TL",
      isSold: true,
      projectId: p2.id
    }
  });

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
