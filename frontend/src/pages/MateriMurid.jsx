// src/pages/murid/MateriMurid.jsx
import React, { useEffect, useState } from "react";
import { fetchMateriMurid } from "../services/muridAPI";
import { BookOpenIcon, DownloadIcon } from "lucide-react";

const MateriMurid = () => {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMateri = async () => {
      try {
        const data = await fetchMateriMurid();
        setMateri(data);
      } catch (err) {
        console.error("❌ Gagal ambil materi:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMateri();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">📚 Materi Kelas Saya</h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500" />
        </div>
      ) : materi.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada materi tersedia untuk kelas Anda.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {materi.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <BookOpenIcon className="text-indigo-600 w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-800">{item.judul}</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.deskripsi}</p>

              {item.file ? (
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition"
                >
                  <DownloadIcon size={16} />
                  Lihat Materi
                </a>
              ) : (
                <span className="text-sm text-red-400 italic">File tidak tersedia</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MateriMurid;