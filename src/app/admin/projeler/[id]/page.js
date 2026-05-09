import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageUploadInput, GalleryManager } from "@/components/ImageUploadInput";

// images alanı JSON array | plain URL | virgüllü liste — ilk geçerli URL
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

// ─── Server Actions ──────────────────────────────────────────────────────────

async function addApartment(formData) {
  "use server";
  const projectId = formData.get("projectId");
  const title = formData.get("title");
  const type = formData.get("type");
  const description = formData.get("description") || "";
  const price = formData.get("price") || null;
  const images = formData.get("images") || '["/images/hero.png"]';
  // Ensure images is always stored as a JSON array string
  let imagesStr = images;
  if (!images.startsWith("[")) {
    imagesStr = JSON.stringify([images]);
  }
  await prisma.apartment.create({ data: { title, type, images: imagesStr, description, price, projectId } });
  revalidatePath(`/admin/projeler/${projectId}`);
}

async function updateApartment(formData) {
  "use server";
  const id = formData.get("id");
  const projectId = formData.get("projectId");
  const title = formData.get("title");
  const type = formData.get("type");
  const description = formData.get("description") || "";
  const price = formData.get("price") || null;
  const images = formData.get("images") || "";
  // Always update images, ensure JSON array format
  let imagesStr = images;
  if (images && !images.startsWith("[")) {
    imagesStr = JSON.stringify([images]);
  }
  await prisma.apartment.update({
    where: { id },
    data: { title, type, description, price, ...(imagesStr ? { images: imagesStr } : {}) }
  });
  revalidatePath(`/admin/projeler/${projectId}`);
}

async function deleteApartment(formData) {
  "use server";
  const id = formData.get("id");
  const projectId = formData.get("projectId");
  await prisma.apartment.delete({ where: { id } });
  revalidatePath(`/admin/projeler/${projectId}`);
}

async function toggleProjectStatus(formData) {
  "use server";
  const id = formData.get("id");
  const isCompleted = formData.get("isCompleted") === "true";
  await prisma.project.update({ where: { id }, data: { isCompleted: !isCompleted } });
  revalidatePath(`/admin/projeler/${id}`);
}

async function toggleApartmentSoldStatus(formData) {
  "use server";
  const id = formData.get("id");
  const projectId = formData.get("projectId");
  const isSold = formData.get("isSold") === "true";
  await prisma.apartment.update({ where: { id }, data: { isSold: !isSold } });
  revalidatePath(`/admin/projeler/${projectId}`);
}

async function updateProjectMainImage(formData) {
  "use server";
  const projectId = formData.get("projectId");
  const mainImage = formData.get("mainImage") || null;
  await prisma.project.update({ where: { id: projectId }, data: { mainImage } });
  revalidatePath(`/admin/projeler/${projectId}`);
}

async function updateProjectGallery(formData) {
  "use server";
  const projectId = formData.get("projectId");
  const galleryJson = formData.get("gallery");
  await prisma.project.update({ where: { id: projectId }, data: { gallery: galleryJson } });
  revalidatePath(`/admin/projeler/${projectId}`);
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function AdminProjectDetail({ params }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { apartments: true }
  });
  if (!project) return notFound();

  const galleryImages = (() => {
    try { return JSON.parse(project.gallery || "[]"); } catch { return []; }
  })();

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin/projeler" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>← Geri Dön</Link>
          <h1 style={{ color: "var(--primary-color)", margin: 0 }}>Proje: {project.title}</h1>
        </div>
        
        {/* Proje Durumu Değiştirme */}
        <form action={toggleProjectStatus} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.8rem 1.2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="isCompleted" value={project.isCompleted.toString()} />
          <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Durum:</span>
          <span style={{ 
            background: project.isCompleted ? '#e8f5e9' : '#fff3e0', 
            color: project.isCompleted ? '#2e7d32' : '#ef6c00', 
            padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.9rem' 
          }}>
            {project.isCompleted ? '✅ Biten Proje' : '🔄 Devam Eden Proje'}
          </span>
          <button type="submit" className="btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
            Değiştir
          </button>
        </form>
      </div>

      {/* ── KAPAK GÖRSELİ ── */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--secondary-color)" }}>🖼️ Kapak Görseli (Ana Görsel)</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: "1.6" }}>
          Bu görsel proje listesinde ve detay sayfasının üst kısmında (hero) görünür.<br />
          <strong style={{ color: "var(--primary-color)" }}>💡 Önerilen boyut: 16:9 yatay format (Örn: 1920x1080px)</strong>
        </p>
        <form action={updateProjectMainImage}>
          <input type="hidden" name="projectId" value={project.id} />
          <ImageUploadInput name="mainImage" label="Kapak Görseli" currentUrl={project.mainImage || null} />
          <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>Kapak Görselini Kaydet</button>
        </form>
      </div>

      {/* ── PROJE GALERİSİ ── */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--secondary-color)" }}>📸 Proje Galeri Görselleri</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: "1.6" }}>
          Bu görseller proje detay sayfasındaki slayt gösterisinde yer alır (kapak görseli ile birlikte).<br />
          <strong style={{ color: "var(--primary-color)" }}>💡 Önerilen boyut: 16:9 yatay format (Örn: 1920x1080px)</strong>
        </p>
        <form action={updateProjectGallery}>
          <input type="hidden" name="projectId" value={project.id} />
          <GalleryManager name="gallery" initialImages={galleryImages} />
          <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }}>Galeriyi Kaydet</button>
        </form>
      </div>

      {/* ── DAİRE YÖNETİMİ ── */}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "2rem" }}>

        {/* Ekleme Formu */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "var(--shadow-sm)", height: "fit-content" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--secondary-color)" }}>Yeni Daire Ekle</h3>
          <form action={addApartment} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="hidden" name="projectId" value={project.id} />
            <input name="title" placeholder="Başlık (örn: A Blok 3+1)" required style={inputStyle} />

            <input list="daire-tipleri" name="type" placeholder="Daire Tipi" required style={inputStyle} />
            <datalist id="daire-tipleri">
              {["1+0 (Stüdyo)", "1+1", "2+1", "3+1", "3+2", "4+1", "4+2", "5+1", "Dubleks", "Villa", "Dükkan / Ticari"]
                .map(v => <option key={v} value={v} />)}
            </datalist>

            <textarea name="description" placeholder="Daire açıklaması (isteğe bağlı)" rows={3}
              style={{ ...inputStyle, resize: "vertical" }} />

            <input name="price" placeholder="Fiyat (isteğe bağlı, örn: 3.500.000 TL)" style={inputStyle} />

            <div>
              <label style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--secondary-color)", display: "block", marginBottom: "0.5rem" }}>Daire Görselleri</label>
              <GalleryManager name="images" initialImages={[]} />
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.4rem", marginBottom: 0 }}>💡 Önerilen boyut: 4:3 veya 16:9 yatay format</p>
            </div>

            <button type="submit" className="btn-primary">Daireyi Ekle</button>
          </form>
        </div>

        {/* Daire Listesi */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <h3 style={{ color: "var(--secondary-color)", margin: 0 }}>
            Mevcut Daireler ({project.apartments.length})
          </h3>

          {project.apartments.length === 0 ? (
            <div style={{ background: "white", padding: "3rem", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)" }}>
              <div style={{ fontSize: "2.5rem" }}>🏠</div>
              <p>Henüz daire eklenmemiş.</p>
            </div>
          ) : (
            project.apartments.map(apt => (
              <ApartmentCard key={apt.id} apt={apt} projectId={project.id}
                updateApartment={updateApartment} deleteApartment={deleteApartment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Daire Kartı (server component — form action refs) ───────────────────────
function ApartmentCard({ apt, projectId, updateApartment, deleteApartment }) {
  return (
    <div style={{ background: "white", borderRadius: "10px", boxShadow: "var(--shadow-sm)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
      {/* Üst satır: görsel + bilgi */}
      <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", minHeight: "120px" }}>
        <div style={{ overflow: "hidden", background: "#f5f5f5" }}>
          <img src={parseFirstImage(apt.images)} alt={apt.title}
            style={{ width: "160px", height: "120px", objectFit: "cover" }} />
        </div>
        <div style={{ padding: "1rem 1.2rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <div style={{ fontWeight: "700", fontSize: "1.05rem", color: "var(--secondary-color)" }}>{apt.title}</div>
          <div>
            <span style={{ background: "var(--primary-color)", color: "white", padding: "0.15rem 0.6rem", borderRadius: "4px", fontSize: "0.8rem", marginRight: "0.5rem" }}>
              {apt.type}
            </span>
            {apt.isSold && (
              <span style={{ background: "#d32f2f", color: "white", padding: "0.15rem 0.6rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}>
                Satıldı
              </span>
            )}
          </div>
          {apt.description && (
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0.3rem 0 0", lineHeight: 1.5 }}>
              {apt.description.length > 120 ? apt.description.slice(0, 120) + "…" : apt.description}
            </p>
          )}
          {apt.price && (
            <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--secondary-color)", marginTop: "0.3rem" }}>
              💰 {apt.price}
            </div>
          )}
          {/* Aksiyon Butonları */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: "auto" }}>
            <form action={toggleApartmentSoldStatus}>
              <input type="hidden" name="id" value={apt.id} />
              <input type="hidden" name="projectId" value={projectId} />
              <input type="hidden" name="isSold" value={apt.isSold?.toString() || "false"} />
              <button type="submit" style={{ background: apt.isSold ? "#4caf50" : "#ff9800", color: "white", padding: "0.25rem 0.7rem", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>
                {apt.isSold ? "Satışa Çıkar" : "Satıldı Olarak İşaretle"}
              </button>
            </form>
            <form action={deleteApartment}>
              <input type="hidden" name="id" value={apt.id} />
              <input type="hidden" name="projectId" value={projectId} />
              <button type="submit" style={{ background: "#d32f2f", color: "white", padding: "0.25rem 0.7rem", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}>
                🗑️ Sil
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Alt düzenleme formu */}
      <details style={{ borderTop: "1px solid var(--border-color)" }}>
        <summary style={{ padding: "0.7rem 1.2rem", cursor: "pointer", fontSize: "0.88rem", color: "var(--primary-color)", fontWeight: "600", background: "#f9f9f9", listStyle: "none" }}>
          ✏️ Düzenle / Görseli Güncelle
        </summary>
        <div style={{ padding: "1.2rem" }}>
          <form action={updateApartment} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <input type="hidden" name="id" value={apt.id} />
            <input type="hidden" name="projectId" value={projectId} />
            <input name="title" defaultValue={apt.title} placeholder="Başlık" required style={inputStyle} />
            <input list="daire-tipleri-edit" name="type" defaultValue={apt.type} placeholder="Tip" required style={inputStyle} />
            <datalist id="daire-tipleri-edit">
              {["1+0 (Stüdyo)", "1+1", "2+1", "3+1", "3+2", "4+1", "4+2", "5+1", "Dubleks", "Villa", "Dükkan / Ticari"]
                .map(v => <option key={v} value={v} />)}
            </datalist>
            <textarea name="description" defaultValue={apt.description || ""} placeholder="Daire açıklaması" rows={3}
              style={{ ...inputStyle, resize: "vertical" }} />
            <input name="price" defaultValue={apt.price || ""} placeholder="Fiyat (isteğe bağlı, örn: 3.500.000 TL)" style={inputStyle} />
            <div>
              <label style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--secondary-color)", display: "block", marginBottom: "0.5rem" }}>Daire Görselleri</label>
              <GalleryManager name="images" initialImages={(() => { try { const arr = JSON.parse(apt.images || '[]'); return Array.isArray(arr) ? arr : [apt.images]; } catch { return apt.images ? [apt.images] : []; } })()} />
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.4rem", marginBottom: 0 }}>💡 Önerilen boyut: 4:3 veya 16:9 yatay format</p>
            </div>
            <button type="submit" style={{ alignSelf: "flex-start", background: "var(--primary-color)", color: "white", padding: "0.4rem 1.2rem", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
              Kaydet
            </button>
          </form>
        </div>
      </details>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "0.75rem", border: "1px solid var(--border-color)",
  borderRadius: "6px", fontFamily: "inherit", fontSize: "0.9rem", outline: "none", boxSizing: "border-box"
};
