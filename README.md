# 💍 Undangan Pernikahan Digital — React

Template undangan pernikahan digital siap pakai dengan fitur lengkap.

---

## ✨ Fitur

- 🎵 **Background Music** — tombol play/pause floating + progress bar
- ⏳ **Countdown Timer** — hitung mundur otomatis ke hari H
- 📋 **RSVP Form** — dengan opsi integrasi Google Forms (gratis)
- 🖼️ **Galeri Foto** — grid 6 foto + lightbox popup
- 💰 **Amplop Digital** — info rekening + tombol salin nomor
- 📍 **Google Maps** — tombol buka maps lokasi
- 💌 **Buku Tamu** — ucapan & komentar dari tamu undangan

---

## 🚀 Cara Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org) versi 16 ke atas
- npm (sudah termasuk saat install Node.js)

### Langkah-langkah

```bash
# 1. Masuk ke folder project
cd undangan-nikah

# 2. Install dependencies
npm install

# 3. Jalankan di browser (development)
npm start
# → Otomatis buka http://localhost:3000
```

---

## ✏️ Kustomisasi

### 1. Edit Data Pernikahan

Buka file **`src/config.js`** — semua data ada di sini:

```js
export const WEDDING = {
  mempelai1: "Nama Pria",    // ← ganti
  mempelai2: "Nama Wanita",  // ← ganti
  tanggal:   "2025-08-17",   // ← ganti format YYYY-MM-DD
  venue:     "Nama Gedung",  // ← ganti
  alamat:    "Alamat lengkap",// ← ganti
  mapsUrl:   "https://maps.google.com/?q=LAT,LNG", // ← ganti
  // dst...
};
```

### 2. Tambah Rekening Bank

Di `src/config.js`, edit bagian `BANKS`:

```js
export const BANKS = [
  { bank: "BCA", norek: "1234567890", atas: "Nama Penerima", logo: "🏦" },
  // tambah baris baru jika ada rekening lain
];
```

### 3. Edit Kisah Cinta

Di `src/config.js`, edit bagian `LOVE_STORY`:

```js
export const LOVE_STORY = [
  { tahun: "2020", judul: "Judul", cerita: "Cerita...", emoji: "✨" },
  // tambah lebih banyak tahapan
];
```

### 4. Tambah Foto Galeri

```bash
# Simpan foto ke folder ini:
public/photos/foto1.jpg
public/photos/foto2.jpg
# ... dst sampai foto6.jpg
```

Di `src/config.js`, pastikan path sesuai:

```js
export const PHOTOS = [
  "/photos/foto1.jpg",
  "/photos/foto2.jpg",
  // dst...
];
```

### 5. Tambah Musik Background

```bash
# Simpan file MP3 ke:
public/music/background.mp3
```

Lalu di `src/config.js`, aktifkan:

```js
export const MUSIC = {
  src:     "/music/background.mp3",
  enabled: true,  // ← ubah dari false ke true
};
```

### 6. Setup RSVP ke Google Forms (Gratis)

Ikuti langkah berikut:

1. Buka [Google Forms](https://forms.google.com)
2. Buat form baru dengan field:
   - **Nama** (Short answer)
   - **No. WhatsApp** (Short answer)
   - **Kehadiran** (Multiple choice: ya/tidak/mungkin)
   - **Jumlah Tamu** (Short answer)
   - **Pesan** (Paragraph)
3. Klik **Preview** (ikon mata)
4. Di halaman preview, klik kanan → **Inspect**
5. Cari tag `<form>` → salin nilai atribut `action` → paste ke `actionUrl`
6. Untuk setiap field input, cari atribut `name="entry.XXXXXXX"` → salin ke `fields`

```js
export const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/d/e/XXXXX/formResponse",
  fields: {
    nama:       "entry.111111111",
    telepon:    "entry.222222222",
    kehadiran:  "entry.333333333",
    jumlahTamu: "entry.444444444",
    pesan:      "entry.555555555",
  },
  enabled: true,  // ← ubah ke true setelah setup
};
```

Data RSVP akan tersimpan otomatis ke Google Spreadsheet yang terhubung dengan form.

---

## 🌐 Deploy (Upload ke Internet) — GRATIS

### Opsi A: Vercel (Paling Mudah)

```bash
# 1. Build project
npm run build

# 2. Install Vercel CLI
npm install -g vercel

# 3. Login Vercel (butuh akun vercel.com)
vercel login

# 4. Deploy!
vercel --prod
```

Setelah selesai, kamu dapat URL seperti:
`https://undangan-rizky-siti.vercel.app`

### Opsi B: Netlify

```bash
npm run build
# Drag & drop folder "build" ke app.netlify.com/drop
```

### Opsi C: GitHub Pages

```bash
npm install --save-dev gh-pages

# Tambahkan di package.json:
# "homepage": "https://USERNAME.github.io/undangan-nikah"
# "predeploy": "npm run build"
# "deploy": "gh-pages -d build"

npm run deploy
```

---

## 📁 Struktur File

```
undangan-nikah/
├── public/
│   ├── index.html          ← template HTML
│   ├── photos/             ← ← taruh foto galeri di sini
│   │   ├── foto1.jpg
│   │   └── ...
│   └── music/
│       └── background.mp3  ← ← taruh musik di sini
│
├── src/
│   ├── config.js           ← ✏️ EDIT INI — semua data pernikahan
│   ├── index.js            ← entry point
│   ├── index.css           ← global styles
│   ├── App.jsx             ← halaman utama (semua section)
│   └── components/
│       ├── CountDown.jsx   ← hitung mundur
│       ├── MusicPlayer.jsx ← pemutar musik
│       ├── RSVPForm.jsx    ← form konfirmasi
│       ├── Gallery.jsx     ← galeri foto + lightbox
│       └── GuestBook.jsx   ← buku tamu / ucapan
│
└── package.json
```

---

## 🎨 Kustomisasi Warna

Buka `src/index.css`, edit bagian `:root`:

```css
:root {
  --gold:   #c9a96e;  /* warna emas/aksen utama */
  --cream:  #f5ede0;  /* warna teks utama */
  --dark:   #0d0b08;  /* warna background */
  --rose:   #d4846a;  /* warna tombol ucapan */
  --border: rgba(201, 169, 110, 0.2);
}
```

---

## 🆘 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `npm install` error | Pastikan Node.js versi 16+ |
| Foto tidak muncul | Cek path di config.js, pastikan nama file sama persis |
| Musik tidak bunyi | Browser blokir autoplay — klik tombol play dulu |
| RSVP tidak tersimpan | Cek actionUrl dan entry ID di Google Form |
| Deploy error Vercel | Pastikan `npm run build` sukses dulu |

---

Dibuat dengan ❤️ menggunakan React.js
