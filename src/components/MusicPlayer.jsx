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
  const [progress,  setProgress]  = useState(0);
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

  /* ── Progress bar ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener('timeupdate', update);
    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  /* ── Deteksi musik selesai ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      setIsPlaying(false);
      setEnded(true);
      setProgress(100);
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
          setProgress(0);
        }
        await audio.play();
        setIsPlaying(true);
        showToast('Musik diputar 🎵');
      }
    } catch {
      showToast('Gagal memutar musik');
    }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    // Jika musik sudah habis lalu user klik progress, reset state ended
    if (ended) {
      setEnded(false);
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

      {/* ── Tombol musik + progress ── */}
      <div style={{
        position:      'fixed',
        bottom:        '28px',
        right:         '24px',
        zIndex:        200,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '6px',
      }}>
        {/* Progress bar */}
        <div
          style={{
            width:        '52px',
            cursor:       'pointer',
            background:   'rgba(79,100,75,0.2)',
            borderRadius: '2px',
            height:       '3px',
          }}
          onClick={handleProgressClick}
        >
          <div style={{
            height:       '3px',
            background:   ended ? 'rgba(79,100,75,0.4)' : 'var(--rose)',
            borderRadius: '2px',
            width:        `${progress}%`,
            transition:   'width 0.5s linear',
          }} />
        </div>

        {/* Tombol play/pause/replay */}
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