import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function BitenProjeler() {
  const projects = await prisma.project.findMany({
    where: { isCompleted: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <section className="section bg-light" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="section-title">Tamamlanan Projelerimiz</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-cards">
            {projects.length === 0 ? (
              <p style={{ textAlign: 'center', width: '100%', padding: '3rem' }}>Şu an için listelenecek bitmiş proje bulunmamaktadır.</p>
            ) : (
              projects.map(project => (
                <Link key={project.id} href={`/projeler/${project.id}`} className="card">
                  <div className="card-image-wrap">
                    <Image 
                      src={project.mainImage || "/images/hero.png"} 
                      alt={project.title} 
                      width={400} 
                      height={240} 
                      className="card-image"
                      style={{ filter: "grayscale(20%)" }} 
                    />
                    <div className="badge" style={{ backgroundColor: 'var(--text-secondary)' }}>Tamamlandı</div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc" style={{ flex: 1 }}>{project.description.substring(0, 100)}...</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      📍 {project.address}
                    </p>
                    <div className="btn-outline" style={{ width: "100%", marginTop: 'auto' }}>Projeyi İncele</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .card-image-wrap { position: relative; }
        .badge {
          position: absolute; top: 1rem; right: 1rem; background: var(--secondary-color);
          color: white; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.8rem;
          font-weight: 600; box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
      `}} />
    </main>
  );
}
