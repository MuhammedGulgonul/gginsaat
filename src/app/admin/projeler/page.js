import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ImageUploadInput } from "@/components/ImageUploadInput";

// Server action for adding a project
async function addProject(formData) {
  "use server";
  const title = formData.get("title");
  const description = formData.get("description");
  const address = formData.get("address");
  const startingPrice = formData.get("startingPrice");
  const isCompleted = formData.get("isCompleted") === "on";
  const mainImage = formData.get("mainImage") || null;

  await prisma.project.create({
    data: {
      title,
      description,
      address,
      startingPrice,
      isCompleted,
      mainImage,
    },
  });

  revalidatePath("/admin/projeler");
}

// Server action for deleting
async function deleteProject(formData) {
  "use server";
  const id = formData.get("id");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projeler");
}

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 style={{ color: "var(--primary-color)", marginBottom: "2rem" }}>Projeler Yönetimi</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
        
        {/* Ekleme Formu */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--secondary-color)" }}>Yeni Proje Ekle</h3>
          <form action={addProject} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input name="title" placeholder="Proje Adı (örn: Mavi Konaklar)" required style={inputStyle} />
            <textarea name="description" placeholder="Açıklama" required style={{...inputStyle, minHeight: "100px"}}></textarea>
            <input name="address" placeholder="Adres" required style={inputStyle} />
            <input name="startingPrice" placeholder="Başlangıç Fiyatı (örn: 3.000.000 TL)" required style={inputStyle} />

            {/* Ana Görsel */}
            <div>
              <ImageUploadInput name="mainImage" label="Ana Görsel (Proje Kapak Fotoğrafı)" />
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.4rem", marginBottom: 0 }}>💡 Önerilen: 16:9 yatay format (Örn: 1920x1080px)</p>
            </div>
            
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "500", marginTop: "0.5rem" }}>
              <input type="checkbox" name="isCompleted" />
              Proje Bitti mi? (Biten Projelere Ekler)
            </label>

            <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>Projeyi Kaydet</button>
          </form>
        </div>

        {/* Proje Listesi */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--secondary-color)" }}>Mevcut Projeler</h3>
          {projects.length === 0 ? <p>Henüz proje eklenmemiş.</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--accent-color)", textAlign: "left" }}>
                  <th style={thStyle}>Görsel</th>
                  <th style={thStyle}>Proje Adı</th>
                  <th style={thStyle}>Durum</th>
                  <th style={thStyle}>Fiyat</th>
                  <th style={thStyle}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={tdStyle}>
                      {p.mainImage ? (
                        <img src={p.mainImage} alt={p.title} style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px" }} />
                      ) : (
                        <div style={{ width: "60px", height: "45px", background: "#eee", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏗️</div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <a href={`/admin/projeler/${p.id}`} style={{ fontWeight: "600", color: "var(--primary-color)" }}>{p.title}</a>
                      {(() => { try { const g = JSON.parse(p.gallery || "[]"); return g.length > 0 ? <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>📸 {g.length} galeri görseli</div> : <div style={{ fontSize: "0.75rem", color: "#ccc", marginTop: "0.2rem" }}>Galeri boş</div>; } catch { return null; } })()}
                    </td>
                    <td style={tdStyle}>{p.isCompleted ? "✅ Bitti" : "🔄 Devam"}</td>
                    <td style={tdStyle}>{p.startingPrice}</td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <a href={`/admin/projeler/${p.id}`} className="btn-outline" style={{ padding: "0.3rem 0.8rem", fontSize: "0.85rem" }}>Galeri / Daire Yönet</a>
                        <form action={deleteProject}>
                          <input type="hidden" name="id" value={p.id} />
                          <button type="submit" style={{ background: "#d32f2f", color: "white", padding: "0.3rem 0.8rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>Sil</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  border: "1px solid var(--border-color)",
  borderRadius: "4px",
  fontFamily: "inherit"
};

const thStyle = { padding: "1rem", fontWeight: "600" };
const tdStyle = { padding: "1rem" };
