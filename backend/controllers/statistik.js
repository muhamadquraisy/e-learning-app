const User = require("../models/User");
const Materi = require("../models/Materi");
const Ujian = require("../models/Ujian");
const Nilai = require("../models/Nilai"); // atau Jawaban jika kamu pakai itu

exports.getStatistikMurid = async (req, res) => {
  try {
    const murid = await User.findById(req.params.id);
    if (!murid || murid.role !== "murid") {
      return res.status(404).json({ message: "Murid tidak ditemukan" });
    }

    const kelas = murid.kelas;

    const jumlahMateri = await Materi.countDocuments({ kelas });
    const jumlahUjian = await Ujian.countDocuments({ kelas });
    const jumlahSelesai = await Nilai.countDocuments({ murid: murid._id });

    res.json({
      nama: murid.nama,
      kelas,
      jumlahMateri,
      jumlahUjian,
      jumlahSelesai,
    });
  } catch (err) {
    console.error("❌ Statistik murid error:", err.message);
    res.status(500).json({ message: "Gagal mengambil statistik murid" });
  }
};