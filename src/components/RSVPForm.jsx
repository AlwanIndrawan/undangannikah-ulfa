import React, { useState } from 'react';
import { WEDDING, GOOGLE_FORM } from '../config';

const initialForm = {
  nama:       '',
  telepon:    '',
  kehadiran:  'Ya',
  jumlahTamu: '1',
  pesan:      '',
};

function RSVPForm() {
  const [form,      setForm]      = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submitToGoogleForms = async () => {
  const params = new URLSearchParams({
    [GOOGLE_FORM.fields.nama]:       form.nama,
    [GOOGLE_FORM.fields.telepon]:    form.telepon,
    [GOOGLE_FORM.fields.kehadiran]:  form.kehadiran,
    [GOOGLE_FORM.fields.jumlahTamu]: form.jumlahTamu,
    [GOOGLE_FORM.fields.pesan]:      form.pesan,
  });

  return new Promise((resolve) => {
    // Buat iframe tersembunyi sebagai target submit
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Buat form HTML sementara
    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = GOOGLE_FORM.actionUrl;
    tempForm.target = 'hidden-iframe'; // ← submit ke iframe, bukan ke tab baru

    // Isi field-field
    params.forEach((value, key) => {
      const input = document.createElement('input');
      input.type  = 'hidden';
      input.name  = key;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);

    // Submit dan cleanup
    iframe.onload = () => {
      document.body.removeChild(tempForm);
      document.body.removeChild(iframe);
      resolve();
    };

    tempForm.submit();

    // Fallback kalau onload tidak terpanggil
    setTimeout(resolve, 2000);
  });
};

  const handleSubmit = async () => {
    if (!form.nama.trim()) { setError('Nama wajib diisi.'); return; }
    setError('');
    setLoading(true);

    try {
      if (GOOGLE_FORM.enabled) {
        await submitToGoogleForms();
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
      setSubmitted(true);
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Sukses ── */
  if (submitted) {
    return (
      <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s ease', padding: '40px 20px' }}>
        <div style={{ fontSize: '52px', marginBottom: '16px', animation: 'floatY 2s ease infinite' }}>
          🌸
        </div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-display)', color: 'var(--primary)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(20px, 4vw, 26px)' }}>
          Terima kasih, {form.nama}!
        </h3>
        <div style={{ width: '40px', height: '1px', background: 'var(--outline-variant)', margin: '12px auto' }} />
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px', lineHeight: 1.9, marginTop: '12px' }}>
          {form.kehadiran === 'Ya'
            ? `Kami sangat senang kamu akan hadir bersama ${form.jumlahTamu} tamu.`
            : 'Kami sangat menghargai doamu dari jauh.'}
          <br />
          Sampai jumpa di hari bahagia kami. 💍
        </p>
        <button
          className="btn-outline"
          style={{ marginTop: '24px' }}
          onClick={() => setSubmitted(false)}
        >
          Ubah Konfirmasi
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        name="nama"
        placeholder="Nama Lengkap *"
        value={form.nama}
        onChange={handleChange}
      />

      <input
        name="telepon"
        type="tel"
        placeholder="No. WhatsApp (opsional)"
        value={form.telepon}
        onChange={handleChange}
      />

      {/* Toggle kehadiran — gaya pill Stitch */}
      <div>
        <label style={{
          display: 'block', fontFamily: 'var(--font-body)', fontSize: 10,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-surface-variant)',
          marginBottom: 8, fontWeight: 500,
        }}>
          Konfirmasi Kehadiran
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { value: 'Ya',     label: 'Insya Allah Hadir' },
            { value: 'Tidak',  label: 'Berhalangan Hadir' },
          ].map((opt) => {
            const active = form.kehadiran === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm({ ...form, kehadiran: opt.value })}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '12px 10px',
                  borderRadius: 999,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${active ? 'var(--primary)' : 'var(--outline-variant)'}`,
                  background: active ? 'rgba(134,78,90,0.12)' : 'rgba(255,255,255,0.5)',
                  color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setForm({ ...form, kehadiran: 'Mungkin' })}
          style={{
            marginTop: 8,
            width: '100%',
            textAlign: 'center',
            padding: '8px',
            borderRadius: 999,
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            color: form.kehadiran === 'Mungkin' ? 'var(--primary)' : 'var(--on-surface-variant)',
            fontWeight: form.kehadiran === 'Mungkin' ? 600 : 400,
            textDecoration: form.kehadiran === 'Mungkin' ? 'underline' : 'none',
          }}
        >
          🤔 Belum bisa pastikan
        </button>
      </div>

      {form.kehadiran === 'Ya' && (
        <select name="jumlahTamu" value={form.jumlahTamu} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={String(n)}>
              {n} tamu
            </option>
          ))}
        </select>
      )}

      <textarea
        name="pesan"
        placeholder="Ucapan & doa untuk mempelai (opsional)..."
        value={form.pesan}
        onChange={handleChange}
        rows={4}
        style={{ resize: 'none' }}
      />

      {error && (
        <p style={{ color: 'var(--secondary)', fontSize: '13px' }}>{error}</p>
      )}

      {!GOOGLE_FORM.enabled && (
        <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', letterSpacing: '0.05em', lineHeight: 1.7 }}>
          * Setup Google Forms di{' '}
          <code style={{ color: 'var(--secondary)', background: 'var(--surface-container)', padding: '1px 5px', borderRadius: '4px' }}>
            src/config.js
          </code>{' '}
          untuk menyimpan data RSVP ke spreadsheet.
        </p>
      )}

      <button
        className="btn-filled"
        disabled={loading}
        onClick={handleSubmit}
        style={{ alignSelf: 'center', marginTop: '4px' }}
      >
        {loading ? 'Mengirim...' : 'Kirim Konfirmasi ✉️'}
      </button>
    </div>
  );
}

export default RSVPForm;