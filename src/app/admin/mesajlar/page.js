import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteMessage(formData) {
  "use server";
  const id = formData.get("id");
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/mesajlar");
}

async function markAsRead(formData) {
  "use server";
  const id = formData.get("id");
  await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/mesajlar");
}

export default async function AdminMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '2rem' }}>Gelen Mesajlar</h1>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <p>Henüz gelen bir mesaj bulunmuyor.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                padding: '1.5rem',
                background: msg.isRead ? '#f9f9f9' : '#fff',
                borderLeft: msg.isRead ? '1px solid var(--border-color)' : '4px solid var(--primary-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {msg.name} {!msg.isRead && <span style={{ background: 'var(--accent-color)', color: 'var(--primary-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>YENİ</span>}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <span>📞 <a href={`tel:${msg.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{msg.phone}</a></span>
                      <span>✉️ <a href={`mailto:${msg.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{msg.email}</a></span>
                      <span>📅 {new Date(msg.createdAt).toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {!msg.isRead && (
                      <form action={markAsRead}>
                        <input type="hidden" name="id" value={msg.id} />
                        <button type="submit" style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                          Okundu İşaretle
                        </button>
                      </form>
                    )}
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button type="submit" style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        Sil
                      </button>
                    </form>
                  </div>
                </div>

                <div style={{ background: '#fff', padding: '1rem', borderRadius: '6px', border: '1px solid #eee' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Konu: {msg.subject}</strong>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
