import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import ContactForm from "@/components/ContactForm";

async function submitMessage(formData) {
  "use server";
  
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  await prisma.contactMessage.create({
    data: { name, phone, email, subject, message }
  });

  revalidatePath("/iletisim");
}

export default async function Iletisim() {
  return (
    <main>
      <section className="section bg-light" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h1 className="section-title">İletişim</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            {/* Sol - Bilgiler */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.6rem' }}>İletişim Bilgileri</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem' }}>📍</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-color)', marginBottom: '0.3rem' }}>Merkez Adres</strong>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Cumhuriyet Mah. Aşıkveysel Cad. No:62<br/>K.Çekmece / İSTANBUL</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem' }}>🏗️</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-color)', marginBottom: '0.3rem' }}>Şantiye Adresi</strong>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Cumhuriyet Mah. Gelincik Sok.<br/>K.Çekmece / İSTANBUL</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>📞</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-color)', marginBottom: '0.3rem' }}>Sabit Hat</strong>
                      <a href="tel:02124268861" style={{ color: 'var(--secondary-color)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '600' }}>0 212 426 88 61</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>📱</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-color)', marginBottom: '0.3rem' }}>Cep Hattı</strong>
                      <a href="tel:05323821241" style={{ color: 'var(--secondary-color)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '600' }}>0 532 382 12 41</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>✉️</span>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-color)', marginBottom: '0.3rem' }}>E-Posta</strong>
                      <a href="mailto:info@gulgonulinsaat.com" style={{ color: 'var(--secondary-color)', textDecoration: 'none', fontSize: '1rem', fontWeight: '600' }}>info@gulgonulinsaat.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kat Karşılığı Bilgi Kutusu */}
              <div style={{ background: 'var(--primary-color)', color: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--accent-color)' }}>Arsanızı Değerlendirin</h3>
                <p style={{ lineHeight: '1.7', opacity: 0.9, fontSize: '0.95rem' }}>
                  Arsalarınızı <strong>kat karşılığı</strong> en avantajlı şekilde değerlendirmek için hemen arayın.
                </p>
                <a href="tel:05323821241" style={{ display: 'inline-block', marginTop: '1.2rem', background: 'var(--secondary-color)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Hemen Ara</a>
              </div>
            </div>

            {/* Sağ - Form */}
            <div id="form-section" style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
              <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.6rem' }}>Bize Ulaşın</h2>
              <ContactForm submitAction={submitMessage} />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.85rem 1rem",
  border: "1.5px solid #e0e0e0",
  borderRadius: "8px",
  fontFamily: "inherit",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};
