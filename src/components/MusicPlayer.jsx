import React, { useState, useEffect, useRef } from 'react';
import { MUSIC } from '../config';

/**
 * MusicPlayer
 * Props:
 *   triggerPlay (boolean) – kalau berubah jadi true, langsung play musik.
 *                           Di-set dari luar saat user klik "Buka Undangan".
 */
function MusicPlayer({ triggerPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ended,     setEnded]     = useState(false); // musik sudah habis
  const [toast,     setToast]     = useState('');
  const audioRef = useRef(null);

  /* ── Trigger dari tombol "Buka Undangan" ── */
  useEffect(() => {
    if (!triggerPlay) return;
    if (!MUSIC.enabled) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setEnded(false);
        showToast('Musik diputar 🎵');
      })
      .catch(() => {
        showToast('Gagal memutar musik');
      });
  }, [triggerPlay]);

  /* ── Deteksi musik selesai ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      setIsPlaying(false);
      setEnded(true);
      showToast('Musik selesai 🎵');
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  /* ── Pause saat tab/layar tidak aktif, lanjut saat kembali ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Layar mati / user pindah tab → pause
        if (!audio.paused) {
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        // Kembali ke tab → lanjut otomatis (hanya jika belum habis)
        // Hapus blok else ini kalau tidak mau auto-resume
        if (audio.paused && !ended) {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [ended]); // ended sebagai dependency agar tidak resume setelah musik habis

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        showToast('Musik dijeda ⏸');
      } else {
        // Jika musik sudah habis, mulai ulang dari awal
        if (ended) {
          audio.currentTime = 0;
          setEnded(false);
        }
        await audio.play();
        setIsPlaying(true);
        showToast('Musik diputar 🎵');
      }
    } catch {
      showToast('Gagal memutar musik');
    }
  };

  /* ── Musik belum disetup ── */
  if (!MUSIC.enabled) {
    return (
      <>
        <button
          className="music-btn"
          onClick={() => showToast('Set enabled: true di config.js untuk memutar musik')}
          title="Setup musik di src/config.js"
        >
          🎵
        </button>
        <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
      </>
    );
  }

  return (
    <>
      {/*
        Loop dihapus → musik hanya diputar sekali, tidak diulang.
        Preload auto agar musik siap saat user buka undangan.
      */}
      <audio ref={audioRef} preload="auto">
        <source src={MUSIC.src} type="audio/mpeg" />
      </audio>

      {/* ── Tombol musik ── */}
      <div style={{
        position:      'fixed',
        top:           '50%',
        right:         '24px',
        transform:     'translateY(-50%)',
        zIndex:        200,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
      }}>
        <button
          className="music-btn"
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : ended ? 'Putar Ulang' : 'Play'}
        >
          {isPlaying ? '⏸' : ended ? '🔁' : '▶'}
        </button>
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </>
  );
}

export default MusicPlayer;