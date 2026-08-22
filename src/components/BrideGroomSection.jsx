import React, { useState } from 'react';
import './bridegroom.css';

/* ══════════════════════════════════════════════════════════
   BrideGroomSection
   Props: mempelai — array 2 item dari config.js (MEMPELAI)
   Styling: src/components/bridegroom.css
   ══════════════════════════════════════════════════════════ */

/* ── Foto atau placeholder di dalam frame ── */
function FramePhoto({ foto, nama }) {
  const [imgError, setImgError] = useState(false);

  if (!foto || imgError) {
    return (
      <div className="bg-photo-placeholder">
        <span className="bg-placeholder-icon">📷</span>
        <span className="bg-placeholder-label">Foto Mempelai</span>
        <span className="bg-placeholder-hint">Simpan di public/photos/</span>
      </div>
    );
  }

  return (
    <img
      src={foto}
      alt={`Foto ${nama}`}
      onError={() => setImgError(true)}
      className="bg-photo-img"
    />
  );
}

/* ── Satu card mempelai ── */
function MempelaiCard({ data, index }) {
  return (
    <div className="bg-card" style={{ animationDelay: `${index * 0.2}s` }}>

      {/* Label gelar */}
      <p className="bg-gelar">{data.gelar}</p>

      {/* Frame + Foto */}
      <div className="bg-frame-wrap">
        <div className="bg-frame-glow" />
        <FramePhoto foto={data.foto} nama={data.nama} />
      </div>

      {/* Nama mempelai */}
      <h3 className="bg-nama">{data.nama}</h3>

      {/* Divider */}
      <div className="bg-divider" />

      {/* Urutan anak */}
      <p className="bg-urutan">{data.urutan}</p>

      {/* Nama orang tua */}
      <p className="bg-ortu">
        {data.ayah}<br />
        <span className="bg-ortu-amp">&amp;</span>{' '}
        {data.ibu}
      </p>

      {/* Tombol Instagram */}
      <a
        href={data.igUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-ig-btn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"
            stroke="currentColor" strokeWidth="1.8" fill="none"/>
          <circle cx="12" cy="12" r="4.5"
            stroke="currentColor" strokeWidth="1.8" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
        </svg>
        {data.instagram}
      </a>
    </div>
  );
}

/* ── Separator "&" antara dua mempelai ── */
function AndSeparator() {
  return (
    <div className="bg-separator">
      <div className="bg-sep-line bg-sep-line--top" />
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <polygon points="12,2 22,12 12,22 2,12"
          stroke="rgba(134,78,90,0.5)" strokeWidth="1" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="rgba(134,78,90,0.4)"/>
      </svg>
      <p className="bg-sep-ampersand">&amp;</p>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <polygon points="12,2 22,12 12,22 2,12"
          stroke="rgba(134,78,90,0.5)" strokeWidth="1" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="rgba(134,78,90,0.4)"/>
      </svg>
      <div className="bg-sep-line bg-sep-line--bottom" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KOMPONEN UTAMA
   ══════════════════════════════════════════════════════════ */
function BrideGroomSection({ mempelai }) {
  return (
    <div className="bg-section">
      <MempelaiCard data={mempelai[0]} index={0} />
      <AndSeparator />
      <MempelaiCard data={mempelai[1]} index={1} />
    </div>
  );
}

export default BrideGroomSection;