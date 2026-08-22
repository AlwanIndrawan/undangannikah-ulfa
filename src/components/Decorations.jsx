import React, { useEffect, useState } from 'react';

/* ══════════════════════════════════════════════════════════
   DECORATIONS — Blush Pastel
   Label section + efek kelopak bunga jatuh
   ══════════════════════════════════════════════════════════ */

/* ── Label uppercase kecil ── */
export function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'var(--rose)',
      textAlign: 'center',
      marginBottom: '14px',
    }}>
      {children}
    </p>
  );
}

export function HeadingRule() {
  return (
    <div style={{
      width: '48px', height: '1px',
      background: 'var(--gold)',
      margin: '16px auto 0',
    }} />
  );
}

/* ══════════════════════════════════════════════════════════
   FALLING PETALS — kelopak bunga jatuh
   ══════════════════════════════════════════════════════════ */

const PETAL_COLORS = ['#E8A2AF', '#864E5A', '#CFE6C7', '#4F644B'];

function petalSpec() {
  return {
    left: `${Math.random() * 100}vw`,
    size: `${10 + Math.random() * 10}px`,
    duration: 7 + Math.random() * 6,
    drift: `${Math.random() * 160 - 80}px`,
    spin: `${Math.random() * 360}deg`,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  };
}

export function FallingPetals({ interval = 550, max = 30 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    let nextId = 0;

    const spawn = () => {
      const id = nextId++;
      setPetals((prev) => {
        const item = { id, ...petalSpec() };
        return prev.length >= max ? [...prev.slice(1), item] : [...prev, item];
      });
      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 13500);
    };

    spawn();
    const t = setInterval(spawn, interval);
    return () => clearInterval(t);
  }, [interval, max]);

  return (
    <div className="petal-layer">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            animationDuration: `${p.duration}s`,
            '--drift': p.drift,
            '--spin': p.spin,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M9 0 C13 3 18 6 9 18 C0 6 5 3 9 0 Z" fill={p.color} />
          </svg>
        </div>
      ))}
    </div>
  );
}