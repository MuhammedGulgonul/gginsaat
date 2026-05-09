"use client";

import { useState, useRef } from "react";

const ACCEPTED = ".jpg,.jpeg,.png,.webp,.gif";
const FORMAT_INFO = "Desteklenen formatlar: JPG, PNG, WebP, GIF • Maks. 10 MB";

// ─── Tekil görsel yükleme bileşeni ─────────────────────────────────────────
export function ImageUploadInput({ name, label = "Görsel", currentUrl = null, onUpload }) {
  const [preview, setPreview] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Yükleme başarısız."); setUploading(false); return; }
      setPreview(data.url);
      if (onUpload) onUpload(data.url);
    } catch { setError("Bağlantı hatası."); }
    setUploading(false);
  }

  function handleRemove() {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onUpload) onUpload(null);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {label && <label style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--secondary-color)" }}>{label}</label>}
      {preview ? (
        <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "2px solid var(--border-color)" }}>
          <img src={preview} alt="Önizleme" style={{ width: "100%", maxHeight: "180px", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", display: "flex", gap: "0.4rem" }}>
            <button type="button" onClick={() => inputRef.current?.click()}
              style={{ background: "rgba(0,0,0,0.65)", color: "white", border: "none", borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer", fontSize: "0.78rem" }}>
              ✏️ Değiştir
            </button>
            <button type="button" onClick={handleRemove}
              style={{ background: "rgba(211,47,47,0.85)", color: "white", border: "none", borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer", fontSize: "0.78rem" }}>
              🗑️ Kaldır
            </button>
          </div>
        </div>
      ) : (
        <div onClick={() => inputRef.current?.click()}
          style={{ border: "2px dashed #ccc", borderRadius: "8px", padding: "1.5rem 1rem", textAlign: "center", cursor: "pointer", background: "#fafafa", color: "#888" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary-color)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}>
          {uploading
            ? <span style={{ color: "var(--primary-color)", fontWeight: "600" }}>⏳ Yükleniyor...</span>
            : <><div style={{ fontSize: "1.8rem" }}>📷</div><div style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>Tıklayarak görsel seçin</div></>
          }
        </div>
      )}
      <input ref={inputRef} type="file" accept={ACCEPTED} style={{ display: "none" }} onChange={handleFileChange} disabled={uploading} />
      <input type="hidden" name={name} value={preview ?? ""} />
      {error && <p style={{ color: "#d32f2f", fontSize: "0.82rem", margin: 0 }}>⚠️ {error}</p>}
      <p style={{ fontSize: "0.72rem", color: "#999", margin: 0 }}>ℹ️ {FORMAT_INFO}</p>
    </div>
  );
}

// ─── Çoklu galeri yöneticisi ────────────────────────────────────────────────
export function GalleryManager({ name, initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  async function handleAdd(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Yükleme başarısız."); setUploading(false); return; }
      setImages(prev => [...prev, data.url]);
    } catch { setError("Bağlantı hatası."); }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(idx) {
    setImages(prev => prev.filter((_, i) => i !== idx));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      {/* Hidden input with JSON */}
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      {/* Images grid */}
      {images.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
          {images.map((url, idx) => (
            <div key={idx} style={{ position: "relative", borderRadius: "6px", overflow: "hidden", aspectRatio: "4/3", background: "#f0f0f0" }}>
              <img src={url} alt={`Görsel ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button type="button" onClick={() => removeImage(idx)}
                style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(211,47,47,0.85)", color: "white", border: "none", borderRadius: "4px", padding: "0.2rem 0.45rem", cursor: "pointer", fontSize: "0.75rem", lineHeight: 1 }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add button */}
      <div onClick={() => inputRef.current?.click()}
        style={{ border: "2px dashed #ccc", borderRadius: "8px", padding: "1rem", textAlign: "center", cursor: "pointer", background: "#fafafa", color: "#888" }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary-color)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}>
        {uploading
          ? <span style={{ color: "var(--primary-color)", fontWeight: "600" }}>⏳ Yükleniyor...</span>
          : <><span style={{ fontSize: "1.4rem" }}>＋</span><span style={{ fontSize: "0.85rem", marginLeft: "0.5rem" }}>Görsel Ekle</span></>
        }
      </div>
      <input ref={inputRef} type="file" accept={ACCEPTED} style={{ display: "none" }} onChange={handleAdd} disabled={uploading} />
      {error && <p style={{ color: "#d32f2f", fontSize: "0.82rem", margin: 0 }}>⚠️ {error}</p>}
      <p style={{ fontSize: "0.72rem", color: "#999", margin: 0 }}>
        {images.length} görsel • ℹ️ {FORMAT_INFO}
      </p>
    </div>
  );
}

export default ImageUploadInput;
