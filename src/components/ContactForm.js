"use client";
import { useState } from 'react';

export default function ContactForm({ submitAction }) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.target);
    try {
      await submitAction(formData);
      setIsSuccess(true);
      e.target.reset();
    } catch (error) {
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setIsPending(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ 
        background: '#e8f5e9', 
        color: '#2e7d32', 
        padding: '2.5rem 1.5rem', 
        borderRadius: '12px', 
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ marginBottom: '0.8rem', fontSize: '1.5rem' }}>Mesajınız Gönderildi!</h3>
        <p style={{ marginBottom: '1.5rem' }}>Sizinle en kısa sürede iletişime geçeceğiz.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          style={{ 
            background: 'var(--primary-color)', 
            color: 'white', 
            border: 'none', 
            padding: '0.7rem 1.5rem', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Yeni Mesaj Gönder
        </button>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ position: 'relative' }}>
        <input name="name" type="text" placeholder="Adınız Soyadınız" required style={inputStyle} disabled={isPending} />
      </div>
      <div style={{ position: 'relative' }}>
        <input name="phone" type="tel" placeholder="Telefon Numaranız" required style={inputStyle} disabled={isPending} />
      </div>
      <div style={{ position: 'relative' }}>
        <input name="email" type="email" placeholder="E-Posta Adresiniz" required style={inputStyle} disabled={isPending} />
      </div>
      <div style={{ position: 'relative' }}>
        <input name="subject" type="text" placeholder="Konu (Proje, Kat Karşılığı, vb.)" required style={inputStyle} disabled={isPending} />
      </div>
      <div style={{ position: 'relative' }}>
        <textarea name="message" placeholder="Mesajınız..." required rows={5} style={{...inputStyle, resize: 'vertical'}} disabled={isPending}></textarea>
      </div>
      
      <button 
        type="submit" 
        className="btn-primary" 
        disabled={isPending}
        style={{ 
          marginTop: '0.5rem', 
          padding: '1rem', 
          fontSize: '1rem', 
          borderRadius: '8px', 
          cursor: isPending ? 'not-allowed' : 'pointer', 
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8rem',
          opacity: isPending ? 0.7 : 1,
          transition: 'all 0.2s'
        }}
      >
        {isPending ? (
          <>
            <span className="spinner"></span>
            Gönderiliyor...
          </>
        ) : "Mesaj Gönder"}
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />
    </form>
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
  transition: "all 0.2s",
  boxSizing: "border-box",
};
