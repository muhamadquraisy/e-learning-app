const Materi = require('../models/Materi');
const Nilai = require('../models/Nilai');
const Ujian = require('../models/Ujian');
const User = require('../models/User');

exports.getDashboardMurid = async (req, res) => {
  try {
    const murid = await User.findById(req.user.id);
    if (!murid || murid.role !== 'murid') {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    const jumlahMateri = await Materi.countDocuments({ kelas: murid.kelas });
    const jumlahUjian = await Ujian.countDocuments({ kelas: murid.kelas });
    const jumlahSelesai = await Nilai.countDocuments({ murid: req.user.id });

    res.json({
      nama: murid.nama,
      kelas: murid.kelas,
      jumlahMateri,
      jumlahUjian,
      jumlahSelesai,
    });
  } catch (err) {
    console.error("❌ Gagal ambil data dashboard murid:", err);
    res.status(500).json({ message: 'Gagal ambil data' });
  }
};