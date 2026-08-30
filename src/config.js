// ============================================================
//  KONFIGURASI PERNIKAHAN — Sul & Emi (Versi Pengantin Lelaki)
//  Edit semua data di bawah sesuai pernikahan kamu
// ============================================================

export const WEDDING = {
  mempelai1: "Nurul Fadilah",
  mempelai2: "Muh .Fadly Maulud",

  namasingkat1: "Fadilah",
  namasingkat2: "Fadly",

  gelar1: "S.Ip",
  gelar2: "S.Tr.Pt",

  // Tulisan aksara Lontara di paling atas beranda (isi karakter Unicode
  // Lontara; biarkan kosong "" jika tidak ingin ditampilkan)
  lontara: "ᨄᨘᨈ ᨑᨗᨈ",

  ayah1: "Mansur Masang. Dg. Naro",
  ibu1:  "Marwiah",

  ayah2: "Nur Alamsyah, S.T. Dg. Situju",
  ibu2:  "Andi Norma. Dg. Bau",

  // Akad & Resepsi — satu hari, di kediaman mempelai wanita
  tanggal: "2026-09-18",

  // Khatam Al-Qur'an — malam sebelum hari H, lokasi sama
  khatam: {
    tanggal: "2026-09-17",
    waktu:   "20:00 WITA – selesai",
    lokasi:  "Dusun Mampua, Desa Datara",
  },

  akad: {
    tanggal: "Jumat, 18 September 2026",
    waktu:   "10:00 WITA – selesai",
    lokasi:  "Dusun Mampua, Desa Datara",
  },

  resepsi: {
    tanggal: "Jumat, 18 September 2026",
    waktu:   "11:00 WITA – selesai",
    lokasi:  "Dusun Mampua, Desa Datara",
  },

  // Lokasi acara
  venue:  "Kediaman Mempelai Wanita",
  lokasiSingkat: "Dusun Mampua, Desa Datara",
  alamat: "Datara, Kec. Tompobulu, Kabupaten Gowa, Sulawesi Selatan",

  mapsUrl: "https://maps.app.goo.gl/7h9JFSFpyPHz3pKB7",

  // Embed peta untuk card lokasi (t=k = mode satelit)
  mapsEmbed: "https://maps.google.com/maps?q=-5.4520328,119.8035529(Dusun%20Mampua%2C%20Desa%20Datara)&hl=id&z=16&t=k&output=embed",

  // Resepsi kedua — Villa AJAKS (kediaman mempelai pria)
  resepsi2: {
    tanggal: "Minggu, 20 September 2026",
    waktu:   "10:00 WITA – selesai",
    venue:   "Villa AJAKS, Gallang Rapa",
    alamat:  "Kel. Gantarang, Kec. Tinggimoncong, Kab. Gowa, Sulawesi Selatan",
  },
  mapsUrl2:   "https://maps.app.goo.gl/7Ak8NoU8CLwLE15RA",
  mapsEmbed2: "https://maps.google.com/maps?q=-5.2248502,119.8713817(Villa%20AJAKS)&hl=id&z=16&t=k&output=embed",

  batasRsvp: "17 September 2026",

  namaUndangan: "Bapak/Ibu/Saudara(i)",
};

// ============================================================
//  DATA MEMPELAI
//  Urutan: mempelai lelaki (Sul) di [0], wanita (Emi) di [1]
// ============================================================

export const MEMPELAI = [
  {
    nama:      "Nurul Fadilah, S.Ip",
    namasingkat: "Fadilah",
    gelar:     "The Bride",
    ayah:      "Mansur Masang. Dg. Naro",
    ibu:       "Marwiah",
    urutan:    "Putri kedua",
    foto:      "/photos/mempelai1.JPG",
    instagram: "@nrlfdlh3011",
    igUrl:     "https://www.instagram.com/nrlfdlh3011?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
  },
  {
    nama:      "Muh .Fadly Maulud, S.Tr.Pt",
    namasingkat: "Fadly",
    gelar:     "The Groom",
    ayah:      "Nur Alamsyah, S.T. Dg. Situju",
    ibu:       "Andi Norma. Dg. Bau",
    urutan:    "Putra Pertama",
    foto:      "/photos/mempelai2.JPG",
    instagram: "@muh_fadlym",
    igUrl:     "https://www.instagram.com/muh_fadlym?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
  },
];

// ============================================================
//  YANG MENGUNDANG
// ============================================================

export const PENGUNDANG = {
  utama: "Mansur Masang. Dg. Naro & Marwiah",
  turut: [{ nama: "Keluarga besar Alm. H. Masang & Alm. Samsiah", keterangan: "" },
    { nama: "Keluarga Besar Abd. salam & Manti", keterangan: "" },
    { nama: "Kedua Mempelai", keterangan: "" },
  ],
};

// ============================================================
//  REKENING BANK (AMPLOP DIGITAL)
// ============================================================

export const BANKS = [
  {
    bank:  "Mandiri",
    norek: "1740010508927",
    atas:  "NURUL FADILAH",
  },
    {
    bank:  "Gopay",
    norek: "085213047721",
    atas:  "Nurul fadilah",
  },
];

// ============================================================
//  KISAH CINTA
// ============================================================

export const LOVE_STORY = [
  {
    tahun:  "Awal Pertemuan",
    judul:  "Takdir yang Indah",
    cerita: "Dua hati yang berbeda jalan, dipertemukan oleh Yang Maha Kuasa dalam waktu yang tepat.",
    icon:   "✨",
  },
  {
    tahun:  "Mengenal Lebih Dekat",
    judul:  "Tumbuh Bersama",
    cerita: "Seiring waktu, kedekatan kami semakin terasa. Setiap percakapan membawa kami lebih memahami satu sama lain.",
    icon:   "💌",
  },
  {
    tahun:  "Lamaran",
    judul:  "Satu Langkah Lebih Dekat",
    cerita: "Di hadapan keluarga, dengan penuh kesungguhan dan ketulusan, ia hadir melamar dengan cara yang paling bermartabat.",
    icon:   "💍",
  },
  {
    tahun:  "18 September 2026",
    judul:  "Ikatan Abadi",
    cerita: "Insya Allah, di hari yang penuh berkah ini, kami akan mengikat janji suci di hadapan Allah dan para saksi.",
    icon:   "🕊️",
  },
];

// ============================================================
//  FOTO GALERI
// ============================================================

export const PHOTOS = [
  "/photos/galeri1.JPG",
  "/photos/galeri2.JPG",
  "/photos/galeri3.JPG",
  "/photos/galeri4.JPG",
  "/photos/galeri5.JPG",
  "/photos/galeri6.JPG",
];

export const PHOTO_PLACEHOLDERS = ["📸", "🌸", "💍", "🌿", "🕊️", "🌹"];

// ============================================================
//  GOOGLE FORMS RSVP
// ============================================================

export const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdIDK66BVP5aLEfVl4eGs50KpCiaGCwmCLHx2u8LIKJeCo7rg/formResponse",
  fields: {
    nama:       "entry.34614750",
    telepon:    "entry.483468591",
    kehadiran:  "entry.1978178535",
    jumlahTamu: "entry.2127729527",
    pesan:      "entry.1661952454",
  },
  enabled: true,
};

// BUKU TAMU
export const GUESTBOOK_URL = "https://script.google.com/macros/s/AKfycbz-fIm1sRUMzjmsnvzCeaqOWOt_hdTsWI9Faezav2DWnMPt1Pv9vVBFcTmhwwi3ArIfXw/exec";

// ============================================================
//  MUSIK BACKGROUND
// ============================================================

export const MUSIC = {
  src:     "/music/backsound.mp3",
  enabled: true,
};