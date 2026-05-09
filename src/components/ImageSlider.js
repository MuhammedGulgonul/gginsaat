"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ImageSlider({ images, style = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '12px', ...style }}>
      {/* Images container */}
      <div 
        style={{ 
          display: 'flex', 
          transition: 'transform 0.5s ease-in-out', 
          transform: `translateX(-${currentIndex * 100}%)`,
          height: '100%'
        }}
      >
        {images.map((imgObj, index) => (
          <div key={index} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
            <img 
              src={imgObj.src} 
              alt={imgObj.alt || 'Görsel'} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {imgObj.caption && (
              <div style={{
                position: 'absolute', bottom: '0', left: '0', right: '0', 
                background: 'linear-gradient(transparent, rgba(10, 61, 107, 0.9))',
                color: 'white', padding: '2rem 1.5rem 1.5rem'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{imgObj.caption}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}
          >
            &#10094;
          </button>
          <button 
            onClick={nextSlide}
            style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}
          >
            &#10095;
          </button>
          
          {/* Dots */}
          <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {images.map((_, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentIndex === index ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: '0.3s' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
