import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";

// images alanı: JSON array | plain URL | virgüllü liste
function parseImages(images, fallback = "/images/hero.png") {
  if (!images) return [fallback];
  const s = images.trim();
  if (s.startsWith("[")) {
    try {
      const arr = JSON.parse(s);
      if (Array.isArray(arr) && arr.length > 0) return arr.filter(Boolean);
    } catch {}
  }
  const parts = s.split(",").map(x => x.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [fallback];
}

export default async function ApartmentDetail({ params }) {
  const { id, daireId } = await params;

  const apartment = await prisma.apartment.findUnique({
    where: { id: daireId },
    include: { project: true }
  });

  if (!apartment) return notFound();

  const imageUrls = parseImages(apartment.images);
  const sliderImages = imageUrls.map((src, i) => ({ src, caption: `Görsel ${i + 1}` }));

  return (
    <main style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", paddingTop: "2rem" }}>
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          <Link href={`/projeler/${id}`} style={{ color: "var(--primary-color)", textDecoration: "none", fontWeight: "500" }}>
            ← {apartment.project.title}
          </Link>
          <span>/</span>
          <span>{apartment.title}</span>
        </div>

        {/* Başlık Kartı */}
        <div style={{ background: "white", padding: "2rem 2.5rem", borderRadius: "12px", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-block", background: "var(--primary-color)", color: "white", padding: "0.35rem 1rem", borderRadius: "50px", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.8rem" }}>
                {apartment.type} Daire
              </div>
              <h1 style={{ color: "var(--primary-color)", fontSize: "2.2rem", marginBottom: "0.4rem" }}>{apartment.title}</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>{apartment.project.title} Projesi</p>
            </div>
          </div>

          {/* Açıklama */}
          {apartment.description && (
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color)" }}>
              <h3 style={{ color: "var(--secondary-color)", marginBottom: "0.8rem", fontSize: "1.1rem" }}>Daire Hakkında</h3>
              <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--text-primary)", whiteSpace: "pre-line" }}>
                {apartment.description}
              </p>
            </div>
          )}
        </div>

        {/* Görsel Slider */}
        <h2 style={{ color: "var(--primary-color)", marginBottom: "1.2rem", fontSize: "1.6rem" }}>Daire Görselleri</h2>
        <ImageSlider
          images={sliderImages}
          style={{ aspectRatio: "16/9", maxHeight: "600px", boxShadow: "var(--shadow-md)", marginBottom: "3rem", borderRadius: "12px", overflow: "hidden" }}
        />

        {/* Fiyat / İletişim */}
        <div style={{ background: "var(--accent-color)", padding: "2.5rem", borderRadius: "12px", textAlign: "center", borderLeft: "5px solid var(--secondary-color)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            {apartment.isSold || apartment.project.isCompleted ? "Satış Durumu" : "Yatırım Fırsatı"}
          </h3>
          
          {apartment.isSold || apartment.project.isCompleted ? (
             <>
               <div style={{ color: "#d32f2f", fontSize: "2rem", fontWeight: "bold" }}>
                 {apartment.project.isCompleted ? "Proje Satışları Tamamlandı" : "Bu Daire Satılmıştır"}
               </div>
               <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>İlginiz için teşekkür ederiz.</p>
             </>
          ) : apartment.price ? (
            <>
              <div style={{ color: "var(--secondary-color)", fontSize: "2.2rem", fontWeight: "bold" }}>
                {apartment.price}
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>Daire fiyatı</p>
            </>
          ) : apartment.project.startingPrice ? (
            <>
              <div style={{ color: "var(--secondary-color)", fontSize: "2.2rem", fontWeight: "bold" }}>
                {apartment.project.startingPrice}
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>'den başlayan cazip fiyatlarla...</p>
            </>
          ) : (
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Fiyat bilgisi için iletişime geçin</p>
          )}
          
          <a href="/iletisim" className="btn-primary" style={{ marginTop: "0.8rem", display: "inline-block", textDecoration: "none" }}>
            Bilgi Al →
          </a>
        </div>

      </div>
    </main>
  );
}
