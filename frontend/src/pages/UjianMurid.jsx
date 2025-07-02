import { useEffect, useState } from 'react';
import { fetchMuridUjian } from '../services/muridAPI';
import { ClipboardList, CalendarDays } from 'lucide-react';

const UjianMurid = () => {
  const [ujian, setUjian] = useState(null);

  useEffect(() => {
    fetchMuridUjian()
      .then(data => setUjian(data))
      .catch(console.error);
  }, []);

  if (!ujian) return <div className="p-6">Loading...</div>;
  if (ujian.length === 0) return <div className="p-6">Tidak ada ujian tersedia.</div>;

  const isExpired = (tanggalUjian) => {
    const hariIni = new Date();
    const tanggal = new Date(tanggalUjian);
    tanggal.setDate(tanggal.getDate() + 1); // toleransi 1 hari
    return tanggal < hariIni;
  };

  return (
    <div className="px-4 pt-6 pb-10 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ClipboardList className="text-teal-600" /> Ujian Kamu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ujian.map((u) => {
          const expired = isExpired(u.tanggal);
          return (
            <div
              key={u._id}
              className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${
                expired ? 'opacity-70' : ''
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{u.judul}</h2>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                {new Date(u.tanggal).toLocaleDateString()}
                <span className="ml-2">| Kelas: <strong>{u.kelas}</strong></span>
              </p>
              {/* Optional info if available */}
              {u.jumlahSoal && u.durasi && (
                <p className="text-sm text-gray-600 mt-1">
                  {u.jumlahSoal} soal • {u.durasi} menit
                </p>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  className={`px-4 py-2 text-sm rounded-xl transition font-medium ${
                    expired
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                  disabled={expired}
                  onClick={() => {
                    if (!expired) {
                      window.open(`/murid/ujian/${u._id}`, '_blank');
                    }
                  }}
                >
                  {expired ? 'Ujian Berakhir' : 'Mulai Ujian'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UjianMurid;