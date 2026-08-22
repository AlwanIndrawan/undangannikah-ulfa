import './index.css';
import './gallery.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import {
  WEDDING, MEMPELAI, BANKS, LOVE_STORY, PENGUNDANG,
} from './config';

import BrideGroomSection from './components/BrideGroomSection';
import CountDown         from './components/CountDown';
import MusicPlayer       from './components/MusicPlayer';
import RSVPForm          from './components/RSVPForm';
import GuestBook         from './components/GuestBook';
import Gallery           from './components/Gallery';

import FlowerOrnaments from './components/FlowerOrnaments';

/* Gambar bunga — dipakai untuk divider, header, & footer floral
   (persis pola penempatan dari kode Stitch) */
import dividerRow      from './assets/divider-row.png';
import bouquetDiagonal from './assets/bouquet-diagonal.png';
import peonySingle     from './assets/peony-single.png';
import sprigDiagonal   from './assets/sprig-diagonal.png';
import coverLeft       from './assets/cover-left.png';
import coverRight      from './assets/cover-right.png';
import ballaLompoa     from './assets/balla-lompoa.png';

/* ════════════════════════════════════════════════════════════
   TANGGAL DINAMIS — dari config (tanpa hardcode)
   ════════════════════════════════════════════════════════════ */
const _toTanggal = (iso) => new Date(`${iso}T00:00:00`);
const _bulanTahun = (iso) => {
  const d = _toTanggal(iso);
  return `${d.toLocaleDateString('id-ID', { month: 'long' })} ${d.getFullYear()}`;
};
const _tglAkad = _toTanggal(WEDDING.tanggal);
const COVER_DATE = `${_tglAkad.getDate()} · ${_tglAkad.toLocaleDateString('id-ID', { month: 'long' })} · ${_tglAkad.getFullYear()}`;
const FOOTER_DATE = [
  String(_tglAkad.getDate()).padStart(2, '0'),
  String(_tglAkad.getMonth() + 1).padStart(2, '0'),
  _tglAkad.getFullYear(),
].join(' . ');
const HARI_AKAD = String(_tglAkad.getDate());
const BULAN_TAHUN_AKAD = _bulanTahun(WEDDING.tanggal);
const HARI_KHATAM = String(_toTanggal(WEDDING.khatam.tanggal).getDate());
const BULAN_TAHUN_KHATAM = _bulanTahun(WEDDING.khatam.tanggal);

/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ════════════════════════════════════════════════════════════ */

function useScrollReveal(isOpen) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const observe = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        if (!el.classList.contains('reveal--visible')) observer.observe(el);
      });
    };
    observe();
    const t = setTimeout(observe, 400);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [isOpen]);
}

function Reveal({ children, anim = 'up', delay = '0ms', style = {}, className = '' }) {
  return (
    <div className={`reveal reveal--${anim} ${className}`}
      style={{ '--reveal-delay': delay, ...style }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LOCAL COMPONENTS
   ════════════════════════════════════════════════════════════ */

function SectionDivider() { return <div className="divider" />; }

/* Style shortcuts */
const TG = { color: 'var(--rose)' };
const T2 = { color: 'var(--text-secondary)' };

// Nama tamu dari URL ?to=...
function useGuestName() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('to') || WEDDING.namaUndangan;
  }, []);
}

/* NAV ITEMS */
const NAV_ITEMS = [
  { id: 'cover',    label: 'Beranda',  icon: '🏠' },
  { id: 'mempelai', label: 'Mempelai', icon: '💍' },
  { id: 'info',     label: 'Acara',    icon: '📅' },
  { id: 'story',    label: 'Kisah',    icon: '💌' },
  { id: 'gallery',  label: 'Galeri',   icon: '📸' },
  { id: 'rsvp',     label: 'RSVP',     icon: '✉️' },
  { id: 'amplop',   label: 'Amplop',   icon: '💝' },
  { id: 'pesan',    label: 'Ucapan',   icon: '🌸' },
];

/* BOTTOM NAV ITEMS — versi ringkas gaya Stitch (Material Symbols) */
const BOTTOM_NAV_ITEMS = [
  { id: 'cover',   label: 'Beranda', icon: 'home' },
  { id: 'info',    label: 'Acara',   icon: 'event' },
  { id: 'story',   label: 'Kisah',   icon: 'auto_stories' },
  { id: 'gallery', label: 'Galeri',  icon: 'photo_library' },
  { id: 'rsvp',    label: 'RSVP',    icon: 'mail' },
];

/* ════════════════════════════════════════════════════════════
   AUTO SCROLL
   ════════════════════════════════════════════════════════════ */

function useAutoScroll(isOpen) {
  const rafRef       = useRef(null);
  const activeRef    = useRef(false);
  const listenersRef = useRef([]);

  useEffect(() => {
    if (!isOpen) return;

    const stop = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const removeListeners = () => {
      listenersRef.current.forEach(({ type, fn, opts }) =>
        window.removeEventListener(type, fn, opts)
      );
      listenersRef.current = [];
    };

    const startTimer = setTimeout(() => {
      activeRef.current = true;
      const SPEED = 1.5;

      const tick = () => {
        if (!activeRef.current) return;
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
        if (atBottom) { stop(); return; }
        window.scrollBy(0, SPEED);
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

      const onMove  = () => { stop(); removeListeners(); };
      const onWheel = () => { stop(); removeListeners(); };
      const onKey   = () => { stop(); removeListeners(); };

      window.addEventListener('touchmove', onMove,  { passive: true });
      window.addEventListener('wheel',     onWheel, { passive: true });
      window.addEventListener('keydown',   onKey);

      listenersRef.current = [
        { type: 'touchmove', fn: onMove,  opts: { passive: true } },
        { type: 'wheel',     fn: onWheel, opts: { passive: true } },
        { type: 'keydown',   fn: onKey,   opts: undefined },
      ];
    }, 1200);

    return () => {
      clearTimeout(startTimer);
      stop();
      removeListeners();
    };
  }, [isOpen]);
}

function App() {
  const guestName = useGuestName();
  const [activeSection, setActiveSection] = useState('cover');
  const [copiedBank,    setCopiedBank]    = useState('');
  const [toast,         setToast]         = useState('');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [isOpen,        setIsOpen]        = useState(false);
  const [playMusic,     setPlayMusic]     = useState(false);

  useScrollReveal(isOpen);
  useAutoScroll(isOpen);

  /* Kunci scroll saat cover */
  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
    document.documentElement.style.overflow = isOpen ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  /* Active nav via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const copyNorek = (norek) => {
    navigator.clipboard.writeText(norek).then(() => {
      setCopiedBank(norek);
      showToast('Nomor rekening tersalin! ✓');
      setTimeout(() => setCopiedBank(''), 3000);
    });
  };

  const handleOpenInvite = () => {
    setIsOpen(true);
    setPlayMusic(true);
  };

  /* ══════════════════════════════════════════════════════════
     COVER PAGE
     ══════════════════════════════════════════════════════════ */
  if (!isOpen) {
    return (
      <>
        <div className="cover-page">
          <div className="cover-card">
            {/* ── ATAS: eyebrow, monogram, nama mempelai ── */}
            <p className="cover-eyebrow">The Wedding of</p>

            <div className="cover-monogram">
              {WEDDING.namasingkat1[0]}
              <span className="slash">&amp;</span>
              {WEDDING.namasingkat2[0]}
            </div>

            <p className="cover-couple">
              {WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}
            </p>

            {/* ── TENGAH: bunga kiri — foto arch — bunga kanan ── */}
            <div className="cover-photo-row">
              <img src={coverLeft} alt="" aria-hidden="true"
                className="cover-flower cover-flower--left" />
              <div className="cover-photo-arch">
                <img src="/photos/galeri5.JPG" alt="Foto Mempelai" />
              </div>
              <img src={coverRight} alt="" aria-hidden="true"
                className="cover-flower cover-flower--right" />
            </div>

            {/* ── BAWAH: tanggal, lokasi, tamu, tombol ── */}
            <div className="cover-bottom">
              <div className="cover-divider" />

              <p className="cover-date">{COVER_DATE}</p>
              <p className="cover-location">{WEDDING.lokasiSingkat}</p>

              <div className="cover-to-wrapper">
                <p className="cover-to-label">Kepada Yth.</p>
                <p className="cover-to-name">{guestName}</p>
              </div>

              <button className="btn-open" onClick={handleOpenInvite}>
                Buka Undangan
              </button>
            </div>
          </div>
        </div>
        <MusicPlayer triggerPlay={false} />
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════
     MAIN CONTENT
     ══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── TOP NAV ── */}
      <nav className="topbar">
        <button className="nav-icon-btn" onClick={() => scrollTo('cover')} aria-label="Beranda">
          <span className="material-symbols-outlined">favorite</span>
        </button>
        <span className="brand">{WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}</span>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => scrollTo(item.id)}>
              {item.label}
            </a>
          ))}
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((item) => (
            <a key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => scrollTo(item.id)}>
              <span>{item.icon}</span> {item.label}
            </a>
          ))}
        </div>
      )}

      {/* ══════════════ HERO ═════════════════════════════════ */}
      <section id="cover" style={{ textAlign: 'center' }}>
        <FlowerOrnaments preset="cover" />
        {WEDDING.lontara && <p className="cover-lontara">{WEDDING.lontara}</p>}
        <p className="cover-badge">The Wedding of</p>
        <div className="cover-monogram">
          {WEDDING.namasingkat1[0]}<span className="slash">&</span>{WEDDING.namasingkat2[0]}
        </div>
        <p className="cover-couple">{WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}</p>
        <div className="cover-divider" />
        <p className="cover-date">{COVER_DATE}</p>
        <p className="cover-location">{WEDDING.lokasiSingkat}</p>
        <img className="cover-balla" src={ballaLompoa} alt="" aria-hidden="true" />
        <div className="scroll-cue">
          <div className="scroll-dot" />
          <div className="scroll-dot" />
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── Divider floral — persis pola Stitch (h-24 w-full opacity-50) ── */}
      <div className="floral-divider-wrap">
        <img className="floral-divider-img" src={dividerRow} alt="" aria-hidden="true" />
      </div>

      {/* ══════════════ MEMPELAI ═════════════════════════════ */}
      <section id="mempelai">
        <FlowerOrnaments preset="a" />
        <Reveal anim="down">
          <p className="subtitle">Bismillahirrahmanirrahim</p>
        </Reveal>

        {/* Sambutan */}
        <Reveal anim="up" delay="350ms">
          <div style={{
            maxWidth: 480, textAlign: 'center', marginTop: 24,
            padding: '20px 20px', border: '0.5px solid rgba(134,78,90,0.3)',
            background: 'rgba(255,255,255,0.6)', borderRadius: 8,
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.3em', color: 'var(--rose)', marginBottom: 8 }}>
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p style={{ ...T2, fontSize: 13, lineHeight: 1.9, fontFamily: 'var(--font-body)' }}>
              Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara(i) untuk hadir dan mendoakan pernikahan kami.
            </p>
          </div>
        </Reveal>

        <Reveal anim="up" delay="100ms">
          <h2>Kedua Mempelai</h2>
        </Reveal>
        <Reveal anim="fade" delay="150ms">
          <p style={{
            ...T2, maxWidth: '440px', textAlign: 'center',
            fontSize: '13px', lineHeight: 1.9, margin: '12px 0 28px',
            fontFamily: 'var(--font-body)', fontStyle: 'italic',
          }}>
            "Dua Jiwa, Satu Kehormatan"
          </p>
        </Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 24px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        <Reveal anim="zoom" delay="250ms" style={{ width: '100%', alignItems: 'stretch' }}>
          <div className="bridegroom-flower-wrap">
            <BrideGroomSection mempelai={MEMPELAI} />
          </div>
        </Reveal>
      </section>

      {/* ══════════════ INFO ACARA ════════════════════════════ */}
      <section id="info">
        <FlowerOrnaments preset="b" />
        {/* Header floral statis — persis pola Detail Acara Stitch
            (<img class="w-full max-w-md object-contain mix-blend-multiply opacity-90">) */}
        <Reveal anim="fade">
          <img className="section-header-floral" src={bouquetDiagonal} alt="" aria-hidden="true" />
        </Reveal>
        <Reveal anim="down">
          <p className="subtitle">Insya Allah akan dilaksanakan</p>
        </Reveal>
        <Reveal anim="up" delay="100ms">
          <h2>Detail Acara</h2>
        </Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 28px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        {/* Hitung mundur */}
        <Reveal anim="zoom" delay="200ms" style={{ width: '100%', maxWidth: 500, marginBottom: 44 }}>
          <CountDown />
        </Reveal>

        {/* Kartu Khatam, Akad & Resepsi */}
        <Reveal anim="up" delay="250ms">
          <div className="event-cards">
            {/* KHATAM AL-QUR'AN */}
            <div className="event-card">
              <div className="event-card-type">Khatam Al-Qur'an</div>
              <div className="event-card-date">{HARI_KHATAM}</div>
              <div className="event-card-month">{BULAN_TAHUN_KHATAM}</div>
              <div className="event-card-time">{WEDDING.khatam.waktu}</div>
              <div className="event-card-location-mini">{WEDDING.khatam.lokasi}</div>
            </div>

            {/* AKAD */}
            <div className="event-card">
              <div className="event-card-type">Akad Nikah</div>
              <div className="event-card-date">{HARI_AKAD}</div>
              <div className="event-card-month">{BULAN_TAHUN_AKAD}</div>
              <div className="event-card-time">{WEDDING.akad.waktu}</div>
              <div className="event-card-location-mini">{WEDDING.akad.lokasi}</div>
            </div>

            {/* RESEPSI */}
            <div className="event-card event-card--groom">
              <div className="event-card-type">Resepsi</div>
              <div className="event-card-date">{HARI_AKAD}</div>
              <div className="event-card-month">{BULAN_TAHUN_AKAD}</div>
              <div className="event-card-time">{WEDDING.resepsi.waktu}</div>
              <div className="event-card-location-mini">{WEDDING.resepsi.lokasi}</div>
            </div>
          </div>
        </Reveal>

        {/* Lokasi Acara — dengan peta satelit */}
        <Reveal anim="up" delay="350ms" style={{ width: '100%' }}>
          <div className="location-card">
            <div className="location-map">
              <iframe
                src={WEDDING.mapsEmbed}
                title="Peta Lokasi Acara"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="location-name">{WEDDING.venue}</p>
            <p className="location-detail">{WEDDING.alamat}</p>
            <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 14 }}>
              <button className="btn-outline">Buka Peta ↗</button>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ KISAH CINTA ══════════════════════════ */}
      <section id="story">
        <FlowerOrnaments preset="a" />
        {/* Header floral mengambang — persis pola Kisah Kami Stitch
            (<img class="w-48 h-auto mx-auto mb-6 opacity-90 animate-float">) */}
        <Reveal anim="fade">
          <img className="section-header-floral--float" src={peonySingle} alt="" aria-hidden="true" />
        </Reveal>
        <Reveal anim="down"><p className="subtitle">Perjalanan Kami</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Kisah Cinta</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 28px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        <div style={{ width: '100%', maxWidth: 520 }}>
          {LOVE_STORY.map((item, i) => (
            <React.Fragment key={i}>
              <Reveal anim={i % 2 === 0 ? 'left' : 'right'} delay={`${i * 120}ms`}
                style={{ width: '100%' }}>
                <div className="story-item"
                  style={i === LOVE_STORY.length - 1 ? { borderBottom: 'none' } : {}}>
                  <div className="story-icon">{item.icon}</div>
                  <div>
                    <p className="story-year">{item.tahun}</p>
                    <p className="story-title">{item.judul}</p>
                    <p className="story-text">{item.cerita}</p>
                  </div>
                </div>
              </Reveal>
              {/* Aksen selingan — persis "Interstitial Floral" Stitch, antar milestone */}
              {i < LOVE_STORY.length - 1 && (
                <div className="story-interstitial" aria-hidden="true">
                  <img src={sprigDiagonal} alt="" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ══════════════ GALERI ════════════════════════════════ */}
      <section id="gallery">
        <FlowerOrnaments preset="b" />
        <Reveal anim="down"><p className="subtitle">Galeri Foto</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Momen Berharga</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 24px' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="zoom" delay="250ms" style={{ width: '100%' }}>
          <Gallery />
        </Reveal>
      </section>

      {/* ══════════════ RSVP ══════════════════════════════════ */}
      <section id="rsvp">
        <FlowerOrnaments preset="a" />
        <Reveal anim="down"><p className="subtitle">Konfirmasi Kehadiran</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>RSVP</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="up" delay="200ms">
          <p style={{ ...T2, maxWidth: '420px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'var(--font-body)' }}>
            Kehadiranmu adalah kebahagiaan terbesar kami. 🌸<br />
            Mohon konfirmasi paling lambat <strong style={TG}>{WEDDING.batasRsvp}</strong>.
          </p>
        </Reveal>
        <Reveal anim="zoom" delay="300ms" style={{ width: '100%' }}>
          <RSVPForm />
        </Reveal>
      </section>

      {/* ══════════════ AMPLOP DIGITAL ════════════════════════ */}
      <section id="amplop">
        <FlowerOrnaments preset="b" />
        <Reveal anim="down"><p className="subtitle">Amplop Digital</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Hadiah &amp; Doa</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="up" delay="200ms">
          <p style={{ ...T2, maxWidth: '440px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'var(--font-body)' }}>
            Jika kamu berniat memberikan hadiah, kami sangat berterima kasih.<br />
            Doamu pun sudah lebih dari cukup. 🙏
          </p>
        </Reveal>

        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {BANKS.map((b, i) => (
            <Reveal key={b.bank} anim="left" delay={`${i * 120}ms`} style={{ width: '100%' }}>
              <div className="bank-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ ...TG, fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700, fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                    {b.bank}
                  </span>
                  <span style={{
                    fontSize: 9, color: 'var(--white)',
                    background: 'linear-gradient(135deg,var(--gold),#B98A96)',
                    padding: '3px 12px', borderRadius: '30px', letterSpacing: '0.12em',
                    fontWeight: 600, fontFamily: 'var(--font-body)',
                  }}>Transfer</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px,5vw,26px)',
                  letterSpacing: '0.08em', color: 'var(--deep-rose)', marginBottom: 4,
                  fontWeight: 600,
                }}>{b.norek}</p>
                <p style={{ ...T2, fontSize: 12, marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                  a.n. {b.atas}
                </p>
                <button className="btn-outline" style={{ fontSize: 11 }}
                  onClick={() => copyNorek(b.norek)}>
                  {copiedBank === b.norek ? '✓ Tersalin!' : '📋 Salin Nomor'}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ BUKU TAMU ════════════════════════════ */}
      <section id="pesan">
        <FlowerOrnaments preset="a" />
        <Reveal anim="down"><p className="subtitle">Buku Tamu</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Ucapan &amp; Doa</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="up" delay="200ms">
          <p style={{ ...T2, maxWidth: '440px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'var(--font-body)' }}>
            Tinggalkan ucapan dan doa terbaikmu untuk kami. 💌<br />
            Setiap kata akan kami simpan sebagai kenangan indah.
          </p>
        </Reveal>
        <Reveal anim="zoom" delay="300ms" style={{ width: '100%' }}>
          <GuestBook />
        </Reveal>

        {/* Dekorasi floral footer — persis pola RSVP Stitch
            (<img class="w-full max-w-sm object-contain">) */}
        <Reveal anim="fade" delay="200ms">
          <img className="footer-floral-decoration" src={dividerRow} alt="" aria-hidden="true" />
        </Reveal>
      </section>

      {/* ══════════════ HORMAT KAMI ═══════════════════════════ */}
      <section id="hormat">
        <FlowerOrnaments preset="b" />
        <Reveal anim="down"><p className="subtitle">Hormat Kami Yang Mengundang</p></Reveal>
        <Reveal anim="fade" delay="150ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 24px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        <Reveal anim="up" delay="200ms">
          <p className="hormat-utama">{PENGUNDANG.utama}</p>
        </Reveal>

        <Reveal anim="zoom" delay="300ms" style={{ width: '100%' }}>
          <div className="turut-grid turut-grid--groom">
            {PENGUNDANG.turut.map((item, i) => (
              <div key={i} className="turut-item">
                <p className="turut-nama">{item.nama}</p>
                {item.keterangan && <p className="turut-ket">{item.keterangan}</p>}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal anim="up" delay="400ms">
          <div style={{ marginTop: 32, padding: '20px 0', borderTop: '0.5px solid rgba(134,78,90,0.3)', textAlign: 'center', maxWidth: 480, width: '100%' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.3em', color: 'var(--rose)', marginBottom: 8 }}>
              Wassalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p style={{ ...T2, fontSize: 12, fontStyle: 'italic', lineHeight: 1.9, fontFamily: 'var(--font-body)' }}>
              Atas kehadiran dan do'a restu Bapak/Ibu/Saudara(i),<br />
              kami ucapkan terima kasih
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ FOOTER ════════════════════════════════ */}
      <footer className="footer-section">
        <FlowerOrnaments preset="c" />
        <Reveal anim="zoom">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <span style={{ fontFamily: 'var(--font-script)', fontStyle: 'italic', fontWeight: 600, fontSize: 44, color: 'var(--gold)', lineHeight: 1 }}>&amp;</span>
          </div>
        </Reveal>

        <Reveal anim="up" delay="100ms">
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(14px,3vw,17px)',
            fontStyle: 'italic', color: 'var(--deep-rose)',
            lineHeight: 2, maxWidth: 500, margin: '0 auto 12px',
            textAlign: 'center', padding: '0 16px',
          }}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
            istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa
            tenteram kepadanya..."
          </p>
          <p style={{ fontSize: '10px', color: 'var(--rose)', letterSpacing: '0.2em', marginBottom: 28, textAlign: 'center', fontFamily: 'var(--font-body)' }}>
            QS. AR-RUM : 21
          </p>
        </Reveal>

        <div className="divider" style={{ marginBottom: 20 }} />

        <Reveal anim="up" delay="200ms">
          <p style={{
            fontFamily: 'var(--font-script)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 'clamp(30px,8vw,44px)',
            color: 'var(--deep-rose)',
            textAlign: 'center',
            lineHeight: 1.2,
          }}>
            {WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(134,78,90,0.6)', letterSpacing: '0.3em', marginTop: 10, textAlign: 'center', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            {FOOTER_DATE}
          </p>
        </Reveal>
      </footer>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="bottom-nav">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollTo(item.id)}
          >
            <span className="material-symbols-outlined"
              style={{ fontVariationSettings: activeSection === item.id ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="bn-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <MusicPlayer triggerPlay={playMusic} />
      {toast && <div className="toast show">{toast}</div>}
    </>
  );
}

export default App;