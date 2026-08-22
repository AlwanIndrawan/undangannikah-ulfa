# Rencana: Gambar Balla Lompoa di Bawah Lokasi Beranda

## Status
- [x] Import gambar sudah ditambahkan di `src\App.jsx` (baris setelah coverRight):
      `import ballaLompoa     from './assets/balla-lompoa.png';`
- [ ] Sisanya belum diterapkan (edit diblokir mode plan)

## Aset
- File: `src\assets\balla-lompoa.png` (450×600 px, portrait)

## Langkah tersisa

### 1. src\App.jsx — sisipkan elemen gambar
Setelah `<p className="cover-location">`, sebelum `<div className="scroll-cue">`:

```jsx
<p className="cover-location">{WEDDING.lokasiSingkat}</p>
<img className="cover-balla" src={ballaLompoa} alt="" aria-hidden="true" />
<div className="scroll-cue">
```

### 2. src\index.css — tambah class setelah rule `.cover-location`

```css
.cover-balla {
  display: block;
  width: clamp(140px, 38vw, 200px);
  height: auto;
  opacity: 0.45;
  margin: -6px auto 8px;
  pointer-events: none;
}
```

### 3. Verifikasi
- `npm run build`
- Cek visual: opacity 0.45 samar; sesuaikan (0.3–0.6) bila perlu
