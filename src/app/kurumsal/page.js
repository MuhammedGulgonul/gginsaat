export default function Kurumsal() {
  return (
    <main>
      <section className="section bg-light" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="section-title">Kurumsal</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          {/* Hakkında */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '2rem', borderBottom: '3px solid var(--accent-color)', paddingBottom: '0.8rem', display: 'inline-block' }}>Şirket Hakkında</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              <strong>Gülgönül İnşaat San. Tic. Ltd. Şti.</strong>, 1992 yılında Kurucumuz Merhum Mustafa GÜLGÖNÜL tarafından İstanbul'da kurulmuştur. 
              30 yılı aşkın tecrübesiyle inşaat sektöründe güvenin ve kalitenin simgesi olan firmamız, her zaman en iyi, en yenisini, en gelişmiş teknolojiyi ve vatandaşımıza en uygun çözümü sunmayı hedeflemiştir.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', color: 'var(--text-primary)' }}>
              Bugün aynı değerler ve kararlılıkla, <strong>Başkanımız Ali Kemal GÜLGÖNÜL</strong> önderliğinde, İstanbul Küçükçekmece başta olmak üzere çevre ilçelerde konut ve ticari projeler geliştirmeye devam etmekteyiz. Müşterilerimize güvenli, konforlu ve modern yaşam alanları sunmak temel önceliğimizdir.
            </p>
          </div>

          {/* Misyon & Vizyon */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--primary-color)' }}>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '1rem' }}>🎯 Misyonumuz</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                Çevreye uyumlu ve aile sıcaklığını yaşayabilecek yapılar inşa etmek.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--secondary-color)' }}>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '1rem' }}>🔭 Vizyonumuz</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                Bilgi birikimini, deneyimini, teknolojiyi ve nitelikli insan kaynağını kullanarak yaşam standartlarını yükseltmek; Türkiye'nin en kaliteli yaşam alanlarını kurmak ve en önemli yapı ustası olmak.
              </p>
            </div>
          </div>

          {/* Kalite Anlayışı */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '2rem', borderBottom: '3px solid var(--accent-color)', paddingBottom: '0.8rem', display: 'inline-block' }}>Kalite Anlayışımız</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', color: 'var(--text-primary)' }}>
              Firmamız, depreme dayanıklı yapı standartlarını, birinci sınıf malzeme kullanımını ve zamanında teslim ilkesini kalite anlayışının temeli olarak benimsemiştir. İnşa ettiğimiz her yapı, müşterilerimizin güveninin bir eseridir.
            </p>
          </div>

          {/* Yönetim ve Ortaklar */}
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', borderBottom: '3px solid rgba(255,255,255,0.3)', paddingBottom: '0.8rem', display: 'inline-block' }}>Yönetim Kurulu & Ortaklar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid var(--accent-color)' }}>
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Kurucu</strong>
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Merhum Mustafa GÜLGÖNÜL</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid var(--accent-color)' }}>
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Başkan</strong>
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Ali Kemal GÜLGÖNÜL</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', padding: '1.5rem', borderRadius: '10px', borderLeft: '4px solid var(--accent-color)' }}>
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ortaklar</strong>
                <span style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>Fidan GÜLGÖNÜL<br/>Ali Kemal GÜLGÖNÜL<br/>Fatih GÜLGÖNÜL<br/>Faruk GÜLGÖNÜL</span>
              </div>
            </div>
          </div>

          {/* Faaliyet Alanları */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '2rem', fontSize: '2rem', borderBottom: '3px solid var(--accent-color)', paddingBottom: '0.8rem', display: 'inline-block' }}>Faaliyet Alanlarımız</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '🏗️', title: 'İnşaat', desc: 'Konut ve ticari yapı üretimi' },
                { icon: '📋', title: 'Kat Karşılığı', desc: 'Arsaların kat karşılığı değerlendirilmesi' },
                { icon: '🏠', title: 'Emlak', desc: 'Konut satış ve danışmanlık' },
                { icon: '🪨', title: 'Ulutaş Madencilik', desc: 'Yapı malzemeleri ve madencilik' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.5rem', borderRadius: '10px', background: 'var(--bg-color)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{item.icon}</div>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
