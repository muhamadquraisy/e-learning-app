// src/pages/MateriGuru.jsx
import { useEffect, useState } from 'react';
import { getMateri, addMateri, deleteMateri } from '../services/guruAPI';

export default function MateriGuru() {
  const [materiList, setMateriList] = useState([]);
  const [form, setForm] = useState({
    judul: '',
    deskripsi: '',
    kelas: 7,
    file: null,
  });

  useEffect(() => {
    loadMateri();
  }, []);

  const loadMateri = async () => {
    try {
      const res = await getMateri();
      setMateriList(res.data.data);
    } catch (err) {
      console.error('Gagal memuat materi:', err);
      alert('Gagal memuat materi. Cek console untuk detail.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('judul', form.judul);
    fd.append('deskripsi', form.deskripsi);
    fd.append('kelas', form.kelas);
    if (form.file) fd.append('file', form.file);

    try {
      await addMateri(fd);
      setForm({ judul: '', deskripsi: '', kelas: 7, file: null });
      loadMateri();
    } catch (error) {
      console.error('Gagal menambahkan materi:', error);
      alert('Gagal menambahkan materi.');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus materi ini?')) {
      try {
        await deleteMateri(id);
        loadMateri();
      } catch (error) {
        console.error('Gagal menghapus materi:', error);
        alert('Gagal menghapus materi.');
      }
    }
  };

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">Materi Saya</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
        <input
          type="text"
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <select
          value={form.kelas}
          onChange={(e) => setForm({ ...form, kelas: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i + 7} value={i + 7}>Kelas {i + 7}</option>
          ))}
        </select>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          className="block"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Tambah Materi
        </button>
      </form>

      <div className="mt-6">
        {materiList.length === 0 ? (
          <p className="text-gray-500">Belum ada materi.</p>
        ) : (
          materiList.map((m) => (
            <div key={m._id} className="p-4 border rounded mb-3 shadow-sm">
              <h2 className="font-bold text-lg">
                {m.judul} <span className="text-sm text-gray-600">(Kelas {m.kelas})</span>
              </h2>
              <p className="mb-2">{m.deskripsi}</p>
              {m.file && (
                <a
                  href={`http://localhost:5000${m.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Lihat File
                </a>
              )}
              <button
                onClick={() => handleDelete(m._id)}
                className="text-red-600 ml-4 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}