import React, { useState, useEffect, useRef } from 'react';
import { PHOTOS, PHOTO_PLACEHOLDERS } from '../config';

/* ─────────────────────────────────────────────
   Deteksi apakah path adalah foto asli
───────────────────────────────────────────── */
const isReal = (src) => src && !src.startsWith('/photos/foto');

/* ─────────────────────────────────────────────
   Layout config: setiap foto punya "span" di grid
   Bento-style: beberapa foto besar, beberapa kecil
───────────────────────────────────────────── */
const LAYOUT = [
  { col: 'span 2', row: 'span 2' }, // [0] besar — 2×2 (works di 2 & 3 kolom)
  { col: 'span 1', row: 'span 1' }, // [1]
  { col: 'span 1', row: 'span 1' }, // [2]
  { col: 'span 1', row: 'span 2' }, // [3] tinggi
  { col: 'span 1', row: 'span 1' }, // [4] ← ubah dari span 2 jadi span 1
  { col: 'span 1', row: 'span 1' }, // [5]
];

/* ─────────────────────────────────────────────
   Placeholder elegan
───────────────────────────────────────────── */
function Placeholder({ index }) {
  const icons = ['📸', '🌸', '💍', '🌿', '🕊️', '🌹'];
  return (
    <div className="gallery-placeholder">
      <span className="gallery-placeholder-icon">{icons[index] || '📷'}</span>
      <span className="gallery-placeholder-label">Foto {index + 1}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Satu item foto
───────────────────────────────────────────── */
function PhotoItem({ src, index, onClick, layout }) {
  const real = isReal(src);
  return (
    <div
      className={`gallery-item ${real ? 'gallery-item--real' : ''}`}
      style={{ gridColumn: layout.col, gridRow: layout.row }}
      onClick={() => real && onClick(index)}
      title={real ? 'Klik untuk perbesar' : ''}
    >
      {real ? (
        <>
          <img src={src} alt={`Momen ${index + 1}`} className="gallery-img" />
          <div className="gallery-overlay">
            <div className="gallery-overlay-inner">
              <span className="gallery-zoom-icon">⊕</span>
            </div>
          </div>
          <div className="gallery-frame-accent" />
        </>
      ) : (
        <Placeholder index={index} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Lightbox
───────────────────────────────────────────── */
function Lightbox({ index, onClose, onPrev, onNext }) {
  const total = PHOTOS.filter(isReal).length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')    onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight')onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        {/* Tombol tutup */}
        <button className="lb-close" onClick={onClose}>✕</button>

        {/* Navigasi kiri */}
        {index > 0 && (
          <button className="lb-nav lb-nav--left" onClick={onPrev}>‹</button>
        )}

        {/* Foto */}
        <img
          src={PHOTOS[index]}
          alt={`Foto ${index + 1}`}
          className="lb-img"
        />

        {/* Navigasi kanan */}
        {index < PHOTOS.length - 1 && isReal(PHOTOS[index + 1]) && (
          <button className="lb-nav lb-nav--right" onClick={onNext}>›</button>
        )}

        {/* Counter */}
        <div className="lb-counter">
          <span>{index + 1}</span>
          <span className="lb-counter-sep">of</span>
          <span>{PHOTOS.filter(isReal).length}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Gallery
───────────────────────────────────────────── */
function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const hasAny = PHOTOS.some(isReal);

  const openLightbox  = (i)  => setLightbox(i);
  const closeLightbox = ()   => setLightbox(null);
  const prevPhoto     = ()   => setLightbox((i) => Math.max(0, i - 1));
  const nextPhoto     = ()   => {
    setLightbox((i) => {
      let next = i + 1;
      while (next < PHOTOS.length && !isReal(PHOTOS[next])) next++;
      return next < PHOTOS.length ? next : i;
    });
  };

  return (
    <>
      {/* ── Dekorasi header galeri ── */}
      <div className="gallery-header-deco">
        <div className="gallery-header-line" />
        <span className="gallery-header-badge">✦ Momen Abadi ✦</span>
        <div className="gallery-header-line" />
      </div>

      {/* ── Grid utama ── */}
      <div className="gallery-grid">
        {PHOTOS.slice(0, 6).map((src, i) => (
          <PhotoItem
            key={i}
            src={src}
            index={i}
            onClick={openLightbox}
            layout={LAYOUT[i]}
          />
        ))}
      </div>

      {/* ── Petunjuk placeholder ── */}
      {!hasAny && (
        <p className="gallery-hint">
          Simpan foto di{' '}
          <code>public/photos/</code>{' '}
          lalu sesuaikan path di{' '}
          <code>src/config.js</code>
        </p>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}

export default Gallery;