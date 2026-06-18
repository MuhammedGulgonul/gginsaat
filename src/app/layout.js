import "./globals.css";

export const metadata = {
  title: "Gülgönül İnşaat & Emlak",
  description: "Yılların tecrübesiyle, güvenilir inşaat ve emlak projelerimizle hizmetinizdeyiz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <nav className="navbar">
          <div className="container nav-content">
            <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/images/logo.png" 
                alt="Gülgönül İnşaat Logo" 
                style={{ height: '60px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} 
              />
            </div>
            <input type="checkbox" id="nav-toggle" className="nav-toggle" />
            <label htmlFor="nav-toggle" className="nav-toggle-label">
              <span className="hamburger"></span>
            </label>
            <div className="nav-links">
              <a href="/">Anasayfa</a>
              <a href="/projeler/devam-eden">Devam Eden Projeler</a>
              <a href="/projeler/biten">Biten Projeler</a>
              <a href="/kurumsal">Kurumsal</a>
              <a href="/iletisim">İletişim</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="container footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>Gülgönül İnşaat Ltd. Şti.</h3>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>Arsalarınızı kat karşılığı değerlendiriyoruz...</p>
              <p style={{ opacity: 0.8 }}>&copy; {new Date().getFullYear()} Gülgönül İnşaat & Emlak. Tüm hakları saklıdır.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>Misyon & Vizyon</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}><strong>Misyon:</strong> Çevreye uyumlu ve aile sıcaklığını yaşayabilecek yapılar inşa etmek.</p>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginTop: '0.5rem' }}><strong>Vizyon:</strong> Türkiye'nin en kaliteli yaşam alanlarını kurmak ve en önemli yapı ustası olmak.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>İletişim</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>📍 <strong>Merkez:</strong> Cumhuriyet Mah. Aşıkveysel Cad. No:62 K.Çekmece/İSTANBUL</li>
                <li>📍 <strong>Şantiye:</strong> Cumhuriyet Mah. Gelincik Sok. K.Çekmece/İSTANBUL</li>
                <li>📞 0 212 426 88 61</li>
                <li>📱 0 532 382 12 41</li>
                <li>✉️ info@gulgonulinsaat.com</li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
