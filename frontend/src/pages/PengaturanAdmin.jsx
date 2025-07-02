import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PengaturanAdmin() {
  const [settings, setSettings] = useState({
    namaApp: '',
    pengumuman: '',
    maintenanceMode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');
        setSettings(res.data);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat pengaturan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await axios.put('/api/settings', settings);
      alert('✅ Pengaturan berhasil disimpan');
    } catch (err) {
      console.error(err);
      setError('❌ Gagal menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Memuat pengaturan...</div>;

  return (
    <div className="ml-64 p-6 space-y-6">
      <h1 className="text-xl font-bold">Pengaturan Sistem</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Aplikasi / Sekolah</label>
          <input
            name="namaApp"
            value={settings.namaApp}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Masukkan nama aplikasi"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pengumuman Global</label>
          <textarea
            name="pengumuman"
            value={settings.pengumuman}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Masukkan pengumuman global"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Aktifkan Maintenance Mode</label>
        </div>

        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          disabled={saving}
        >
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>
    </div>
  );
}