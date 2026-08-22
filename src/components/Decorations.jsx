import React from 'react';

/* ══════════════════════════════════════════════════════════
   DECORATIONS — Blush Pastel
   Label section
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
