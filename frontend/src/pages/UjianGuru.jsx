console.log("🔑 TOKEN YANG DIGUNAKAN:", localStorage.getItem("token"));

import { useEffect, useState } from "react";
import { getAllUjian, createUjian, deleteUjian } from "../services/ujianAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UjianGuru() {
  const [ujians, setUjians] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kelas, setKelas] = useState("7");
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().split("T")[0]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUjian();
  }, []);

  const loadUjian = async () => {
  try {
    const res = await getAllUjian();
    console.log("🟢 HASIL GET UJIAN:", res);

    const ujianList =
      Array.isArray(res) ? res :
      Array.isArray(res?.data) ? res.data :
      Array.isArray(res?.data?.data) ? res.data.data :
      [];

    setUjians(ujianList);
  } catch (err) {
    console.error("LOAD ERROR:", err);
    toast.error("Gagal memuat daftar ujian");
  }
};

  const resetForm = () => {
    setJudul("");
    setDeskripsi("");
    setKelas("7");
    setTanggal(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim() || !kelas || !tanggal) {
      return toast.warn("Semua field wajib diisi");
    }

    try {
      const res = await createUjian({ judul, deskripsi, kelas, tanggal });
      console.log("✅ CREATE RESPONSE:", res); // LOG POST
      toast.success("Ujian berhasil ditambahkan");
      resetForm();
      loadUjian();
    } catch (err) {
      console.error("CREATE ERROR:", err.response?.data || err.message);
      toast.error("Gagal menambahkan ujian");
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus ujian ini?")) return;
    try {
      await deleteUjian(id);
      toast.success("Ujian berhasil dihapus");
      loadUjian();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      toast.error("Gagal menghapus ujian");
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Ujian</h1>

      {/* ==== Form Tambah Ujian ==== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg border border-gray-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tambah Ujian Baru</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Judul ujian"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="7">Kelas 7</option>
            <option value="8">Kelas 8</option>
            <option value="9">Kelas 9</option>
          </select>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          disabled={!judul || !deskripsi}
        >
          Simpan Ujian
        </button>
      </form>

      {/* ==== Daftar Ujian ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ujians.map((ujian) => {
          const ujianDate = new Date(ujian.tanggal);
          const isFuture = ujianDate > new Date();
          const statusBadge = isFuture ? "🟢 Aktif" : "⚪ Selesai";

          return (
            <div
              key={ujian._id}
              onClick={() => navigate(`/guru/ujian/${ujian._id}`)}
              className="cursor-pointer bg-white shadow hover:shadow-md transition rounded-lg p-5 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-teal-700">{ujian.judul}</h2>
                  <p className="text-sm text-gray-600">{ujian.deskripsi}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Kelas: <span className="font-medium">{ujian.kelas}</span> <br />
                    Tanggal:{" "}
                    <span className="font-medium">
                      {ujian.tanggal
                        ? new Date(ujian.tanggal).toLocaleDateString("id-ID")
                        : "–"}
                    </span>
                  </p>
                  <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">
                    {statusBadge}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(ujian._id);
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}

        {ujians.length === 0 && (
          <p className="text-gray-500 col-span-full text-center mt-10">
            Belum ada ujian ditambahkan.
          </p>
        )}
      </div>
    </div>
  );
}