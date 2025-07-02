import { useEffect, useState } from 'react';

const DashboardGuru = () => {
  const [nama, setNama] = useState('Guru');

  useEffect(() => {
    const storedNama = localStorage.getItem('nama') || 'Guru';
    setNama(storedNama);
  }, []);

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-2">Selamat Datang, {nama}!</h1>
      <p className="text-gray-700 mb-6">Siap menginspirasi hari ini?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 font-semibold">Jumlah Materi</p>
          <h2 className="text-2xl text-teal-700 font-bold">12</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 font-semibold">Ujian Aktif</p>
          <h2 className="text-2xl text-teal-700 font-bold">5</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 font-semibold">Penilaian Masuk</p>
          <h2 className="text-2xl text-teal-700 font-bold">18</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardGuru;
