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

/* ── Badik — senjata tradisional Bugis-Makassar ──
   Interpretasi vektor sederhana: gagang melengkung khas (kait) +
   cincin pendok + bilah meruncing asimetris.
   Versi lengkap: ornamen ukuran sedang, bertebaran di background. ── */
function Badik({ color, size = 48 }) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Bilah meruncing */}
      <path d="M16 22 L24 22 L21.5 58 L20 62 L18.5 58 Z" fill={color} opacity="0.55" />
      <path d="M18.5 26 C18 36 18.8 48 18 56 M21.5 26 C21.8 36 20.6 48 20 56" stroke="#FFF8F6" strokeWidth="0.5" opacity="0.35" fill="none" />
      {/* Cincin pendok */}
      <rect x="15.5" y="18" width="9" height="4.5" rx="1" fill={color} opacity="0.7" />
      {/* Gagang melengkung khas badik (kait ke kanan-atas) */}
      <path d="M17 18 C16 13 16 8 19 5 C23 1 30 1 34 5 C37 8 36.5 12 33 13.5 C29.5 15 25.5 13 23 16 C21.5 17.7 20 18 17 18 Z" fill={color} opacity="0.88" />
      <path d="M20 6 C24 3 30 3.5 33 7" stroke="#FFF8F6" strokeWidth="0.6" opacity="0.4" fill="none" />
    </svg>
  );
}

/* ── Siluet badik — versi minimal untuk ornamen sangat kecil ── */
function BadikMini({ color, size = 22 }) {
  return (
    <svg width={size * 0.6} height={size} viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 22 L24 22 L21.5 58 L20 62 L18.5 58 Z" fill={color} opacity="0.5" />
      <path d="M17 18 C16 13 16 8 19 5 C23 1 30 1 34 5 C37 8 36.5 12 33 13.5 C29.5 15 25.5 13 23 16 C21.5 17.7 20 18 17 18 Z" fill={color} opacity="0.6" />
    </svg>
  );
}

/* ── Generator sebaran badik — deterministik (pola sama tiap render).
      Sebaran gaussian berpusat di sekitar TENGAH section, ukuran kecil-menengah
      agar tetap rapi di layar ponsel. ── */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BADIK_COLORS = ['#864E5A', '#4F644B'];

function scatterBadik(seed, count = 26) {
  const rnd = mulberry32(seed);
  const gauss = () => {
    let u = 0, v = 0;
    while (u === 0) u = rnd();
    while (v === 0) v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const clamp = (val, lo, hi) => Math.min(hi, Math.max(lo, val));
  const items = [];
  for (let i = 0; i < count; i++) {
    const mini = rnd() < 0.6;
    const x = clamp(50 + gauss() * 17, 3, 92);
    const y = clamp(50 + gauss() * 19, 4, 90);
    items.push({
      type: mini ? 'badikMini' : 'badik',
      top: `${y.toFixed(1)}%`,
      left: `${x.toFixed(1)}%`,
      size: Math.round(mini ? 12 + rnd() * 10 : 20 + rnd() * 18),
      rotate: Math.round(rnd() * 360),
      opacity: +(0.16 + rnd() * 0.18).toFixed(2),
      color: BADIK_COLORS[i % 2],
      sway: rnd() < 0.15,
      cls: 'badik-scatter',
    });
  }
  return items;
}

/* ── Preset posisi ornamen per section — MENIRU POLA STITCH ──
   Stitch selalu memakai 2 gambar besar per halaman:
   1) pojok atas (mengambang, floating-element, opacity 0.8)
   2) pojok bawah berlawanan (statis, opacity 0.6)
   Ditambah ornamen kecil badik (senjata tradisional Bugis-Makassar) yang bertebaran
   di ruang kosong sebagai tekstur latar (opacity rendah, non-intrusive).
   Item: type (blossom|sprig|bud|rumah|atap|png), posisi via top/right/bottom/left,
   size, rotate, opacity, color, sway/float (animasi) */
const PRESETS = {
  // Beranda — identik dengan hero Stitch: top-right floating + bottom-left static
  cover: [
    { type: 'png', png: treeArch, top: '-8%', right: '-14%', size: 320, opacity: 0.8, float: true },
    { type: 'png', png: bouquetVertical, bottom: '4%', left: '-8%', size: 230, opacity: 0.6 },
    ...scatterBadik(101, 30),
  ],
  // Mempelai / Kisah / RSVP / Ucapan — pola sama, dicerminkan (top-left floating + bottom-right static)
  a: [
    { type: 'png', png: bouquetCorner, top: '-6%', left: '-12%', size: 210, opacity: 0.8, float: true },
    { type: 'png', png: sprigDiagonal, bottom: '2%', right: '-8%', size: 190, opacity: 0.55 },
    ...scatterBadik(202, 28),
  ],
  // Acara / Galeri / Amplop / Hormat — top-right floating + bottom-left static
  b: [
    { type: 'png', png: bouquetDiagonal, top: '-5%', right: '-12%', size: 220, opacity: 0.8, float: true },
    { type: 'png', png: peonySingle, bottom: '3%', left: '-6%', size: 160, opacity: 0.55 },
    ...scatterBadik(303, 28),
  ],
  // Footer — versi kecil dari pola yang sama
  c: [
    { type: 'png', png: wreathArc, top: '-4%', left: '-10%', size: 260, opacity: 0.7, float: true },
    { type: 'png', png: stemSingle, bottom: '2%', right: '-4%', size: 130, opacity: 0.5 },
    ...scatterBadik(404, 20),
  ],
};

const MOTIFS = { blossom: Blossom, sprig: Sprig, bud: Bud, badik: Badik, badikMini: BadikMini };

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
          <span key={i} className={`section-flower-item ${s.sway ? 'section-flower-item--sway' : ''} ${s.cls || ''}`} style={style}>
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