// DetailUjian.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSoalByUjian, createSoal, deleteSoal } from "../services/soalAPI";
import { toast } from "react-toastify";

export default function DetailUjian() {
  const { ujianId } = useParams();
  const [soals, setSoals] = useState([]);
  const [form, setForm] = useState(initialFormState());
  const [preview, setPreview] = useState(null);

  function initialFormState() {
    return {
      pertanyaan: "",
      tipe: "pg",
      opsiA: "",
      opsiB: "",
      opsiC: "",
      opsiD: "",
      jawabanBenar: "",
      gambar: null,
    };
  }

  useEffect(() => {
    if (ujianId) loadSoal();
  }, [ujianId]);

  const loadSoal = async () => {
    try {
      const res = await getSoalByUjian(ujianId);
      setSoals(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat soal");
    }
  };

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.pertanyaan.trim()) return toast.warn("Pertanyaan wajib diisi");

    if (form.tipe === "pg") {
      const opsi = [form.opsiA, form.opsiB, form.opsiC, form.opsiD];
      if (opsi.some((opt) => !opt.trim())) return toast.warn("Semua opsi harus diisi");
      if (!["A", "B", "C", "D"].includes(form.jawabanBenar))
        return toast.warn("Jawaban benar harus A, B, C, atau D");
    }

    const formData = new FormData();
    formData.append("ujian", ujianId);
    formData.append("pertanyaan", form.pertanyaan);
    formData.append("tipe", form.tipe);
    formData.append("jawaban", form.jawabanBenar);

    if (form.tipe === "pg") {
      formData.append("opsi", JSON.stringify([
        form.opsiA,
        form.opsiB,
        form.opsiC,
        form.opsiD,
      ]));
    }

    if (form.gambar) formData.append("gambar", form.gambar);

    try {
      await createSoal(formData);
      toast.success("Soal berhasil ditambahkan");
      setForm(initialFormState());
      setPreview(null);
      loadSoal();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan soal");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Yakin ingin menghapus soal ini?");
    if (!confirmed) return;

    try {
      await deleteSoal(id);
      toast.success("Soal berhasil dihapus");
      loadSoal();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus soal");
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Kelola Soal Ujian</h1>

      {/* Form Tambah Soal */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4 max-w-3xl"
      >
        {/* Tipe Soal */}
        <div>
          <label className="block font-semibold mb-1">Tipe Soal</label>
          <select
            value={form.tipe}
            onChange={(e) => handleFormChange("tipe", e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="pg">Pilihan Ganda</option>
            <option value="essay">Essay</option>
          </select>
        </div>

        {/* Pertanyaan */}
        <div>
          <label className="block font-semibold mb-1">Pertanyaan</label>
          <textarea
            value={form.pertanyaan}
            onChange={(e) => handleFormChange("pertanyaan", e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        {/* Pilihan Ganda */}
        {form.tipe === "pg" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((label) => (
                <input
                  key={label}
                  type="text"
                  placeholder={`Opsi ${label}`}
                  value={form[`opsi${label}`]}
                  onChange={(e) =>
                    handleFormChange(`opsi${label}`, e.target.value)
                  }
                  className="border rounded px-3 py-2"
                  required
                />
              ))}
            </div>
            <div>
              <label className="block font-semibold mb-1 mt-2">Jawaban Benar</label>
              <select
                value={form.jawabanBenar}
                onChange={(e) => handleFormChange("jawabanBenar", e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Pilih jawaban</option>
                {["A", "B", "C", "D"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Essay */}
        {form.tipe === "essay" && (
          <div>
            <label className="block font-semibold mb-1">Jawaban Essay</label>
            <textarea
              value={form.jawabanBenar}
              onChange={(e) => handleFormChange("jawabanBenar", e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        )}

        {/* Gambar */}
        <div>
          <label className="block font-semibold mb-1">Gambar (opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              handleFormChange("gambar", file);
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 max-w-sm rounded border" />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Tambah Soal
        </button>
      </form>

      {/* Daftar Soal */}
      <h2 className="text-xl font-semibold mb-4">Daftar Soal</h2>
      <div className="grid gap-4">
        {soals.length > 0 ? (
          soals.map((soal, index) => (
            <div
              key={soal._id}
              className="bg-white p-4 rounded shadow border space-y-2"
            >
              <div className="flex justify-between items-start">
                <p className="font-semibold">
                  #{index + 1}. {soal.pertanyaan}
                </p>
                <button
                  onClick={() => handleDelete(soal._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>

              {soal.gambar && (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${soal.gambar}`}
                  alt="Gambar soal"
                  className="mt-1 max-w-sm rounded border"
                />
              )}

              {soal.tipe === "pg" && soal.opsi?.length >= 4 && (
                <ul className="text-sm text-gray-700 space-y-1">
                  {soal.opsi.map((opsi, i) => (
                    <li key={i}>
                      {String.fromCharCode(65 + i)}. {opsi}
                    </li>
                  ))}
                  <li className="text-green-600 font-medium">
                    ✅ Jawaban: {soal.jawaban}
                  </li>
                </ul>
              )}

              {soal.tipe === "essay" && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-green-600">Jawaban:</span> {soal.jawaban}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Belum ada soal ditambahkan.</p>
        )}
      </div>
    </div>
  );
}