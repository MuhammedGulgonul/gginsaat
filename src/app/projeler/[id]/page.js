import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";

// images alanı: JSON array string | plain URL | virgüllü liste — ilk geçerli URL'yi döndürür
function parseFirstImage(images, fallback = "/images/hero.png") {
  if (!images) return fallback;
  const s = images.trim();
  if (s.startsWith("[")) {
    try {
      const arr = JSON.parse(s);
      if (Array.isArray(arr) && arr[0]) return arr[0];
    } catch {}
  }
  const first = s.split(",")[0].trim();
  return first || fallback;
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { apartments: true }
  });

  if (!project) return notFound();

  // Daireleri tiplerine göre gruplandır
  const groupedApartments = project.apartments.reduce((acc, curr) => {
    if (!acc[curr.type]) acc[curr.type] = [];
    acc[curr.type].push(curr);
    return acc;
  }, {});

  // Galeri görselleri
  const galleryUrls = (() => {
    try { return JSON.parse(project.gallery || "[]"); } catch { return []; }
  })();

  // Slider için: önce kapak, sonra galerideki görseller
  const sliderImages = [
    ...(project.mainImage ? [{ src: project.mainImage, caption: "Genel Görünüm" }] : []),
    ...galleryUrls.map((url, i) => ({ src: url, caption: `Görsel ${i + 1}` })),
    // En az 1 görsel garantisi
    ...(galleryUrls.length === 0 && !project.mainImage
      ? [{ src: "/images/hero.png", caption: "Proje Görseli" }]
      : []),
  ];

  return (
    <main>
      {/* Hero */}
      <section className="hero" style={{
        minHeight: "450px",
        background: `linear-gradient(rgba(10,61,107,0.7), rgba(21,101,192,0.5)), url(${project.mainImage || "/images/hero.png"}) center center / cover no-repeat`,
        display: "flex", alignItems: "center", justifyContent: "center", color: "white", textAlign: "center"
      }}>
        <div className="container" style={{ marginTop: "4rem" }}>
          <div style={{ display: "inline-block", background: "var(--secondary-color)", padding: "0.4rem 1rem", borderRadius: "50px", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {project.isCompleted ? "Tamamlandı" : "Devam Ediyor"}
          </div>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1rem" }}>{project.title}</h1>
          <p style={{ fontSize: "1.2rem", opacity: "0.9", maxWidth: "600px", margin: "0 auto" }}>📍 {project.address}</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ margin: "0 auto" }}>
          
          {/* Proje Görselleri Slider */}
          {sliderImages.length > 0 && (
            <div style={{ marginBottom: "4rem" }}>
              <h2 style={{ color: "var(--primary-color)", marginBottom: "1.2rem", fontSize: "2rem" }}>Proje Görselleri</h2>
              <ImageSlider images={sliderImages} style={{ aspectRatio: "16/9", maxHeight: "600px", width: "100%", borderRadius: "12px", overflow: "hidden", boxShadow: "var(--shadow-md)" }} />
            </div>
          )}

          {/* Proje Açıklaması */}
          <div style={{ background: "white", padding: "3rem", borderRadius: "12px", boxShadow: "var(--shadow-sm)", marginBottom: "4rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h2 style={{ color: "var(--primary-color)", marginBottom: "1rem", fontSize: "2rem" }}>Proje İncelemesi</h2>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-primary)", whiteSpace: "pre-line" }}>
                  {project.description}
                </p>
                {project.startingPrice && (
                  <div style={{ marginTop: "1.5rem", padding: "1.2rem 1.5rem", background: "var(--accent-color)", borderRadius: "8px", borderLeft: "4px solid var(--secondary-color)", display: "inline-block" }}>
                    <strong style={{ fontSize: "1.2rem", color: "var(--primary-color)" }}>Başlangıç Fiyatı: </strong>
                    <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{project.startingPrice}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Daire Seçenekleri */}
          <h2 className="section-title">Daire Seçenekleri</h2>

          {Object.keys(groupedApartments).length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", background: "white", borderRadius: "8px" }}>
              Bu projeye ait daire planı henüz eklenmemiş.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {Object.entries(groupedApartments).map(([type, apts]) => (
                <div key={type}>
                  <h3 style={{ fontSize: "1.8rem", color: "var(--secondary-color)", marginBottom: "1.5rem", borderBottom: "3px solid var(--accent-color)", paddingBottom: "0.5rem", display: "inline-block" }}>
                    {type} Daireler
                  </h3>
                  <div className="apt-grid">
                    {apts.map(apt => (
                      <a href={`/projeler/${id}/daire/${apt.id}`} key={apt.id}
                        style={{ border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", background: "white", transition: "transform 0.3s, box-shadow 0.3s", textDecoration: "none" }}
                        className="apt-card">
                        {/* Görsel */}
                        <div style={{ width: "100%", paddingTop: "66%", position: "relative", background: "#f5f5f5" }}>
                          <img
                            src={parseFirstImage(apt.images)}
                            alt={apt.title}
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        {/* Bilgi */}
                        <div style={{ padding: "1.2rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignSelf: "flex-start" }}>
                            <span style={{ background: "var(--primary-color)", color: "white", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.8rem" }}>
                              {apt.type}
                            </span>
                            {(apt.isSold || project.isCompleted) && (
                              <span style={{ background: "#d32f2f", color: "white", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}>
                                {project.isCompleted ? "Satışları Tamamlandı" : "Satıldı"}
                              </span>
                            )}
                          </div>
                          <h4 style={{ color: "var(--primary-color)", fontSize: "1.1rem", margin: 0, fontWeight: "bold" }}>{apt.title}</h4>
                          {apt.description && (
                            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                              {apt.description.length > 80 ? apt.description.slice(0, 80) + "…" : apt.description}
                            </p>
                          )}
                          {apt.price && !apt.isSold && !project.isCompleted && (
                            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "var(--secondary-color)", marginTop: "0.2rem" }}>
                              {apt.price}
                            </div>
                          )}
                          <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #eee", paddingTop: "0.8rem", marginTop: "auto" }}>
                            <span style={{ fontSize: "0.9rem", background: "var(--accent-color)", color: "var(--primary-color)", padding: "0.35rem 1rem", borderRadius: "50px", fontWeight: "bold" }}>
                              İncele →
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .apt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .apt-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-md); }
        @media (max-width: 992px) { .apt-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .apt-grid { grid-template-columns: 1fr; } }
      `}} />
    </main>
  );
}
