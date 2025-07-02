import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMuridDashboard } from "../services/muridAPI";

const DashboardMurid = () => {
  const [stat, setStat] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem('id'); // Dapat ID dengan benar
  const nama = localStorage.getItem('nama');

  useEffect(() => {
    if (!userId) {
      // Redirect jika ID tidak ditemukan
      navigate('/login');
      return;
    }

    fetchMuridDashboard()
        .then(data => {
      console.log('Respon statistik:', data);

      if (data && typeof data === 'object') {
        setStat(data);
      } else {
        console.warn('Format data tidak sesuai:', data);
      }
    })
    .catch(err => {
      console.error('Gagal ambil statistik murid:', err);
    });
  }, [userId, navigate]);

  // Skeleton saat loading
  if (!stat) {
    return (
      <div className="ml-64 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-6 lg:px-8 transition-all duration-300 ${stat.sidebarOpen ? 'ml-64' : 'ml-16'} ml-0`}>
      <Header nama={nama} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
        <InfoCard title="📘 Materi Tersedia" count={stat.jumlahMateri} color="bg-gradient-to-r from-blue-100 to-blue-200" />
        <InfoCard title="📝 Ujian Aktif" count={stat.jumlahUjian} color="bg-gradient-to-r from-yellow-100 to-yellow-200" />
        <InfoCard title="✅ Ujian Selesai" count={stat.jumlahSelesai} color="bg-gradient-to-r from-green-100 to-green-200" />
      </div>

      <div className="mt-10 p-6 rounded-xl bg-white shadow border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          📚 Kelas Kamu: <span className="text-teal-700">{stat.kelas}</span>
        </h2>
        <p className="text-gray-600">Ayo terus belajar dan selesaikan semua materi dan ujian! 🚀</p>
      </div>
    </div>
  );
};

const Header = ({ nama }) => (
  <div className="mb-4">
    <h1 className="text-3xl font-bold text-gray-800">👋 Halo, {nama}!</h1>
    <p className="text-gray-600 italic mt-1">
      "Bila kamu tidak sanggup menahan lelahnya belajar, maka kamu harus sanggup menahan perihnya kebodohan."
    </p>
  </div>
);

const InfoCard = ({ title, count, color }) => (
  <div className={`rounded-xl p-6 shadow hover:shadow-lg transition duration-200 ${color}`}>
    <p className="text-sm font-medium text-gray-600">{title}</p>
    <h2 className="text-4xl font-bold text-gray-900 mt-1">{count}</h2>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-xl p-6 h-32 bg-gray-100 animate-pulse shadow" />
);

export default DashboardMurid;