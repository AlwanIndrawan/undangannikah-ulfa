import React, { useState, useEffect } from 'react';
import { WEDDING } from '../config';
import { SectionLabel } from './Decorations';

function CountDown() {
  const calculateTime = () => {
    const target = new Date(`${WEDDING.tanggal}T09:00:00`);
    const now    = new Date();
    const diff   = target - now;

    if (diff <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0 };

    return {
      hari:  Math.floor(diff / (1000 * 60 * 60 * 24)),
      jam:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      menit: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      detik: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.hari,  label: 'Hari'  },
    { value: time.jam,   label: 'Jam'   },
    { value: time.menit, label: 'Menit' },
    { value: time.detik, label: 'Detik' },
  ];

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <SectionLabel>Hitung Mundur</SectionLabel>

      {/* Glass card gaya Stitch */}
      <div className="countdown-card glass-panel">
        <div className="countdown-grid">
          {units.map((u) => (
            <div key={u.label} className="countdown-box">
              <span className="num">{String(u.value).padStart(2, '0')}</span>
              <span className="lbl">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountDown;