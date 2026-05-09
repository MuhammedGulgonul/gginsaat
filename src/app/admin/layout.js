import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("gg_admin_auth")?.value === "1";

  // Login sayfası göster
  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a3d6b 0%, #1565c0 100%)' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center', width: '100%', maxWidth: '420px' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--primary-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.8rem' }}>🔐</div>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem', fontSize: '1.8rem' }}>Yönetim Paneli</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Gülgönül İnşaat — Yetkili Erişim</p>
          <form action="/api/login" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input name="password" type="password" placeholder="Şifrenizi Girin" required style={{ padding: '0.9rem 1rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: '0.2s', fontFamily: 'inherit' }} />
            <button type="submit" className="btn-primary" style={{ padding: '0.9rem', fontSize: '1rem', borderRadius: '8px', cursor: 'pointer' }}>Giriş Yap</button>
          </form>
          <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Yetkisiz girişler kaydedilmektedir.</p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .navbar, .footer { display: none !important; }
        `}} />
      </div>
    );
  }

  // Admin Paneli
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <aside style={{ width: '260px', background: 'var(--primary-color)', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>Admin Panel</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Gülgönül İnşaat</p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <a href="/admin" style={{ color: 'white', textDecoration: 'none', padding: '0.7rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>📊 Dashboard</a>
          <a href="/admin/projeler" style={{ color: 'white', textDecoration: 'none', padding: '0.7rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>🏗️ Projeler</a>
          <a href="/admin/mesajlar" style={{ color: 'white', textDecoration: 'none', padding: '0.7rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>✉️ Gelen Mesajlar</a>
          <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', marginTop: 'auto', padding: '0.7rem 1rem' }}>&larr; Siteye Dön</a>
          <form action="/api/logout" method="POST">
            <button type="submit" style={{ background: 'transparent', color: '#ffaaaa', border: 'none', cursor: 'pointer', padding: '0.7rem 1rem', width: '100%', textAlign: 'left', fontSize: '1rem' }}>🚪 Çıkış Yap</button>
          </form>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        .navbar, .footer { display: none !important; }
      `}} />
    </div>
  );
}
