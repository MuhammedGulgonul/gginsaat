const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.project.create({
    data: {
      title: "Mavi Konakları",
      description: "Modern mimarisi ve eşsiz boğaz manzarasıyla hayatınıza değer katan yeni projemiz.",
      address: "Beşiktaş / İstanbul",
      startingPrice: "5.000.000",
      isCompleted: false,
      mainImage: "/images/logo.png"
    }
  });

  await prisma.project.create({
    data: {
      title: "Gülgönül Yaşam Evleri",
      description: "Şehrin kalbinde, doğayla iç içe huzurlu bir yaşam alanı. Sınırlı sayıda fırsat.",
      address: "Kadıköy / İstanbul",
      startingPrice: "3.200.000",
      isCompleted: false,
      mainImage: "/images/logo.png"
    }
  });

  await prisma.project.create({
    data: {
      title: "Elit Rezidans",
      description: "Geçtiğimiz yıl teslim ettiğimiz, tam doluluk oranına ulaşan en prestijli projelerimizden.",
      address: "Şişli / İstanbul",
      startingPrice: "Satışlar Tamamlandı",
      isCompleted: true,
      mainImage: "/images/logo.png"
    }
  });

  console.log("Projeler eklendi.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
