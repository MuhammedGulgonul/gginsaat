import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import "./globals.css";

export default async function Home() {
  // Fetch latest projects from DB
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="hero fade-in">
        <div className="hero-content container">
          <h1>Geleceğin Yapılarını<br/><span className="text-highlight">Bugünden İnşa Ediyoruz</span></h1>
          <p>Gülgönül İnşaat ile hayatınıza değer katan, güvenli ve modern yaşam alanları.</p>
          <div className="hero-btns">
            <Link href="/projeler/devam-eden" className="btn-primary">Devam Eden Projeler</Link>
            <Link href="/iletisim" className="btn-outline" style={{ borderColor: "white", color: "white" }}>İletişime Geçin</Link>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>20+</h3>
              <p>Yıllık Tecrübe</p>
            </div>
            <div className="stat-card">
              <h3>20+</h3>
              <p>Tamamlanan Proje</p>
            </div>
            <div className="stat-card">
              <h3>1000+</h3>
              <p>Mutlu Müşteri</p>
            </div>
            <div className="stat-card">
              <h3>%100</h3>
              <p>Güven ve Kalite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="section bg-light" style={{ borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">Hakkımızda</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
              Kurucumuz Merhum <strong>Mustafa GÜLGÖNÜL</strong> 01.01.1957 Trabzon'da doğmuş, azmi ve güvenilirliği sayesinde 1992 yılında şirketimizin temellerini atmıştır. Uzmanlığı olan inşaat sektöründe her zaman en iyi, en yenisini, en gelişmiş teknolojiyi ve hep vatandaşımıza en uygun çözümü sunmaya çalışmıştır.
              Bugün bu bayrağı <strong>Ali Kemal GÜLGÖNÜL</strong> önderliğinde, aynı güven ve kalite standartlarıyla geleceğe taşımaya devam ediyoruz.
            </p>
          </div>

          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ borderBottom: '3px solid var(--accent-color)', paddingBottom: '0.8rem', marginBottom: '1.5rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>Misyonumuz</h3>
              <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Çevreye uyumlu ve aile sıcaklığını yaşayabilecek yapılar inşa etmek.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ borderBottom: '3px solid var(--accent-color)', paddingBottom: '0.8rem', marginBottom: '1.5rem', color: 'var(--primary-color)', fontSize: '1.8rem' }}>Vizyonumuz</h3>
              <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Bilgi birikimini, deneyimini, teknolojiyi, nitelikli insan kaynağını ve yenilikçi yaklaşımını kullanarak yaşam standartlarını yükseltmek, Türkiye'nin en kaliteli yaşam alanlarını kurmak ve Türkiye'nin en önemli yapı ustası olmak.
              </p>
            </div>
          </div>
          
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: '3rem 2rem', borderRadius: '12px', marginTop: '4rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', color: 'var(--accent-color)' }}>Yönetim Kurulu & Ortaklar</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '8px' }}>
                <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Kurucu</strong>
                <span style={{ fontSize: '1.1rem' }}>Merhum Mustafa GÜLGÖNÜL</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '8px' }}>
                <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Başkan</strong>
                <span style={{ fontSize: '1.1rem' }}>Ali Kemal GÜLGÖNÜL</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '8px' }}>
                <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Ortaklar</strong>
                <span style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>Fidan, Ali Kemal,<br/>Fatih, Faruk GÜLGÖNÜL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Dynamic from DB */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Öne Çıkan Projeler</h2>
          <div className="grid-cards">
            {projects.length === 0 ? (
              <p style={{ textAlign: 'center', width: '100%', padding: '3rem', color: 'var(--text-secondary)' }}>Henüz proje eklenmemiş.</p>
            ) : (
              projects.map(project => (
                <Link key={project.id} href={`/projeler/${project.id}`} className="card">
                  <div className="card-image-wrap">
                    <Image src={project.mainImage || "/images/hero.png"} alt={project.title} width={400} height={240} className="card-image" 
                      style={project.isCompleted ? { filter: "grayscale(10%)" } : {}} />
                    <div className="badge" style={project.isCompleted ? { backgroundColor: "var(--text-secondary)" } : {}}>
                      {project.isCompleted ? "Tamamlandı" : "Devam Ediyor"}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.description.substring(0, 100)}...</p>
                    {project.startingPrice && (
                      <p className="card-price">{project.startingPrice}'den başlayan fiyatlarla</p>
                    )}
                    <div className={project.isCompleted ? "btn-outline" : "btn-primary"} style={{ width: "100%" }}>
                      {project.isCompleted ? "Projeyi İncele" : "Daireleri İncele"}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Styled JSX for page-specific styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hero {
          position: relative;
          height: 80vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(rgba(10, 61, 107, 0.7), rgba(21, 101, 192, 0.5)), url('/images/hero.png') center/cover no-repeat;
          color: white;
          text-align: center;
          margin-top: -80px; /* pull up behind navbar */
          padding-top: 80px; /* offset navbar height */
        }
        .hero-content h1 {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }
        .text-highlight {
          color: var(--accent-color);
        }
        .hero-content p {
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto 3rem;
          opacity: 0.9;
        }
        .hero-btns {
          display: flex; gap: 1rem; justify-content: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }
        .stat-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        .stat-card h3 {
          font-size: 3rem;
          color: var(--secondary-color);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .stat-card p {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 1.1rem;
        }
        .card-image-wrap {
          position: relative;
        }
        .badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--secondary-color);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
      `}} />
    </main>
  );
}

