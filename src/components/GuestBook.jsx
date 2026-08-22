import React, { useState, useEffect } from 'react';
import { GUESTBOOK_URL } from '../config';

const FALLBACK = [
  { id: 1, nama: 'Budi Santoso',    pesan: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah mawaddah warahmah 🤲', waktu: '2 jam lalu' },
  { id: 2, nama: 'Dewi Rahayu',     pesan: 'Barakallah untuk kalian berdua. Kalian pasangan yang sangat serasi! 💕',                  waktu: '5 jam lalu' },
  { id: 3, nama: 'Muhammad Farhan', pesan: 'Congrats! Semoga langgeng sampai kakek nenek ya. Doain kami nyusul 😄',                   waktu: '1 hari lalu' },
];

function GuestBook() {
  const [comments, setComments] = useState([]);
  const [form,     setForm]     = useState({ nama: '', pesan: '' });
  const [loading,  setLoading]  = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error,    setError]    = useState('');

  /* ── Ambil komentar dari Sheets saat mount ── */
  useEffect(() => {
    fetch(GUESTBOOK_URL)
      .then((r) => r.json())
      .then((json) => {
        if (json.status === 'ok' && json.data.length > 0) {
          setComments(json.data.map((c, i) => ({ ...c, id: i })));
        } else {
          setComments(FALLBACK);
        }
      })
      .catch(() => {
        // Jika gagal fetch, tampilkan fallback
        setComments(FALLBACK);
      })
      .finally(() => setFetching(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.nama.trim() || !form.pesan.trim()) {
      setError('Nama dan ucapan wajib diisi.');
      return;
    }
    setError('');
    setLoading(true);

    fetch(GUESTBOOK_URL, {
      method:  'POST',
      body:    JSON.stringify({ nama: form.nama.trim(), pesan: form.pesan.trim() }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.status === 'ok') {
          // Tambah komentar baru di bagian atas tanpa reload
          const newComment = {
            id:    Date.now(),
            nama:  form.nama.trim(),
            pesan: form.pesan.trim(),
            waktu: 'Baru saja',
          };
          setComments((prev) => [newComment, ...prev]);
          setForm({ nama: '', pesan: '' });
        }
      })
      .catch(() => setError('Gagal mengirim. Coba lagi ya 🙏'))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ width: '100%', maxWidth: '680px' }}>

      {/* ── Wish list ── */}
      <div style={{ maxHeight: '360px', overflowY: 'auto', marginBottom: '24px', paddingRight: '4px' }}>

        {fetching && (
          <p style={{ color: 'var(--on-surface-variant)', textAlign: 'center', padding: '24px 0', fontSize: '14px' }}>
            Memuat ucapan... 🌸
          </p>
        )}

        {!fetching && comments.length === 0 && (
          <p style={{ color: 'var(--on-surface-variant)', textAlign: 'center', padding: '24px 0', fontSize: '14px' }}>
            Belum ada ucapan. Jadilah yang pertama! 🌸
          </p>
        )}

        {!fetching && comments.map((c) => (
          <div key={c.id} className="comment-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--primary)', fontSize: '14px' }}>
                {c.nama}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--outline)', flexShrink: 0 }}>
                {c.waktu}
              </span>
            </div>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--on-surface-variant)', lineHeight: 1.75 }}>
              "{c.pesan}"
            </p>
          </div>
        ))}
      </div>

      {/* ── Form kirim ucapan ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <textarea
          name="pesan"
          placeholder="Tulis ucapan dan doa terbaikmu untuk mempelai..."
          value={form.pesan}
          onChange={handleChange}
          rows={3}
          style={{ resize: 'none' }}
        />
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '140px' }}>
            <input
              name="nama"
              placeholder="Nama kamu"
              value={form.nama}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn-outline"
            disabled={loading}
            onClick={handleSubmit}
            style={{ height: '44px', padding: '0 22px', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            {loading ? 'Mengirim...' : 'Kirim Ucapan 💌'}
          </button>
        </div>

        {error && (
          <p style={{ color: 'var(--secondary)', fontSize: '12px' }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default GuestBook;