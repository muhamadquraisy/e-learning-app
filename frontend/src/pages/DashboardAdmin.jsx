import { useEffect, useState } from 'react';

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ admin: 0, guru: 0, murid: 0 });
  const nama = localStorage.getItem('nama') || 'Admin';
  const token = localStorage.getItem('token'); // 🔑 Ambil token

  useEffect(() => {
    fetch('http://localhost:5000/api/statistik', {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Kirim token ke backend
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.error('Gagal fetch statistik:', err));
  }, []);

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">Selamat datang, {nama}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-white-700 font-semibold">Admin</p>
          <h3 className="text-3xl text-teal-700">{stats.admin}</h3>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-white-700 font-semibold">Guru</p>
          <h3 className="text-3xl text-teal-700">{stats.guru}</h3>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-white-700 font-semibold">Murid</p>
          <h3 className="text-3xl text-teal-700">{stats.murid}</h3>
        </div>
      </div>
    </div>
  );
}