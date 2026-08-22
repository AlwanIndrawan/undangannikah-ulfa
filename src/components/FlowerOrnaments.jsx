import React from 'react';
import treeArch from '../assets/tree-arch.png';
import wreathArc from '../assets/wreath-arc.png';
import bouquetCorner from '../assets/bouquet-corner.png';
import bouquetDiagonal from '../assets/bouquet-diagonal.png';
import sprigDiagonal from '../assets/sprig-diagonal.png';
import peonySingle from '../assets/peony-single.png';
import bouquetVertical from '../assets/bouquet-vertical.png';
import stemSingle from '../assets/stem-single.png';

/* ══════════════════════════════════════════════════════════
   FLOWER ORNAMENTS — ornamen bunga/ranting untuk latar section
   Gabungan SVG vektor (utama) + PNG bingkai (watermark lembut)
   ══════════════════════════════════════════════════════════ */

/* ── Bunga 5 kelopak ── */
function Blossom({ color, size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          transform={`rotate(${a} 24 24)`}
          d="M24 26 C17 20 17 7 24 3 C31 7 31 20 24 26 Z"
          fill={color}
        />
      ))}
      <circle cx="24" cy="24" r="4.2" fill={color} opacity="0.4" />
    </svg>
  );
}

/* ── Ranting / tangkai dengan daun + kuntum ── */
function Sprig({ color, size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 62 C34 46 32 30 32 10" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
      <path d="M32 50 C20 48 14 40 16 32 C27 34 32 42 32 50 Z" fill={color} opacity="0.45" />
      <path d="M32 36 C22 36 15 31 14 24 C25 23 31 28 32 36 Z" fill={color} opacity="0.35" />
      <path d="M32 42 C44 40 49 31 47 23 C36 26 32 34 32 42 Z" fill={color} opacity="0.45" />
      <path d="M32 26 C42 25 47 17 45 11 C35 14 32 20 32 26 Z" fill={color} opacity="0.3" />
      <circle cx="32" cy="12" r="4" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ── Kuntum kecil ── */
function Bud({ color, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 22 C12 14 12 10 12 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M12 14 C8 13 5 10 5 7 C9 7 12 9 12 14 Z" fill={color} opacity="0.4" />
      <path d="M12 12 C16 11 18 8 18 5 C14 6 12 8 12 12 Z" fill={color} opacity="0.4" />
      <circle cx="12" cy="4" r="2.4" fill={color} opacity="0.7" />
    </svg>
  );
}

/* ── Preset posisi ornamen per section — MENIRU POLA STITCH ──
   Stitch selalu memakai 2 gambar besar per halaman:
   1) pojok atas (mengambang, floating-element, opacity 0.8)
   2) pojok bawah berlawanan (statis, opacity 0.6)
   Item: type (blossom|sprig|bud|png), posisi via top/right/bottom/left,
   size, rotate, opacity, color, sway/float (animasi) */
const PRESETS = {
  // Beranda — identik dengan hero Stitch: top-right floating + bottom-left static
  cover: [
    { type: 'png', png: treeArch, top: '-8%', right: '-14%', size: 320, opacity: 0.8, float: true },
    { type: 'png', png: bouquetVertical, bottom: '4%', left: '-8%', size: 230, opacity: 0.6 },
  ],
  // Mempelai / Kisah / RSVP / Ucapan — pola sama, dicerminkan (top-left floating + bottom-right static)
  a: [
    { type: 'png', png: bouquetCorner, top: '-6%', left: '-12%', size: 210, opacity: 0.8, float: true },
    { type: 'png', png: sprigDiagonal, bottom: '2%', right: '-8%', size: 190, opacity: 0.55 },
  ],
  // Acara / Galeri / Amplop / Hormat — top-right floating + bottom-left static
  b: [
    { type: 'png', png: bouquetDiagonal, top: '-5%', right: '-12%', size: 220, opacity: 0.8, float: true },
    { type: 'png', png: peonySingle, bottom: '3%', left: '-6%', size: 160, opacity: 0.55 },
  ],
  // Footer — versi kecil dari pola yang sama
  c: [
    { type: 'png', png: wreathArc, top: '-4%', left: '-10%', size: 260, opacity: 0.7, float: true },
    { type: 'png', png: stemSingle, bottom: '2%', right: '-4%', size: 130, opacity: 0.5 },
  ],
};

const MOTIFS = { blossom: Blossom, sprig: Sprig, bud: Bud };

function FlowerOrnaments({ preset = 'a' }) {
  const spots = PRESETS[preset] || PRESETS.a;

  return (
    <div className="section-flowers" aria-hidden="true">
      {spots.map((s, i) => {
        const style = { ...(s.top && { top: s.top }), ...(s.bottom && { bottom: s.bottom }), ...(s.left && { left: s.left }), ...(s.right && { right: s.right }) };
        if (s.translate) style.transform = `translate(${s.translate})`;
        else if (s.rotate) style.transform = `rotate(${s.rotate}deg)`;
        if (s.opacity) style.opacity = s.opacity;

        if (s.type === 'png') {
          return (
            <span
              key={i}
              className={`section-flower-item section-flower-item--png ${s.float ? 'floating-element' : ''}`}
              style={style}
            >
              <img className="section-flower-png" src={s.png} alt="" style={{ width: s.size }} />
            </span>
          );
        }

        const Motif = MOTIFS[s.type];
        return (
          <span key={i} className={`section-flower-item ${s.sway ? 'section-flower-item--sway' : ''}`} style={style}>
            <span className="section-flower-inner">
              <Motif color={s.color} size={s.size} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default FlowerOrnaments;