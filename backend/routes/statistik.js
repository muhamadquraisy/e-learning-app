const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Materi = require('../models/Materi');
const Ujian = require('../models/Ujian');
const Nilai = require('../models/Nilai');
const statistikController = require("../controllers/statistikController");

// Statistik Umum - untuk admin
router.get('/', protect, async (req, res) => {
  try {
    const admin = await User.countDocuments({ role: 'admin' });
    const guru = await User.countDocuments({ role: 'guru' });
    const murid = await User.countDocuments({ role: 'murid' });

    res.json({ admin, guru, murid });
  } catch (err) {
    console.error('Gagal ambil data statistik:', err);
    res.status(500).json({ error: 'Gagal ambil data statistik' });
  }
});

// ➕ Tambahkan route murid dashboard
console.log("📊 Statistik routes loaded");
router.get("/murid-dashboard", protect, statistikController.getDashboardMurid);

// Statistik Murid - untuk dashboard murid
router.get('/murid/:id', protect, async (req, res) => {
  try {
    const murid = await User.findById(req.params.id);
    if (!murid || murid.role !== 'murid') {
      return res.status(404).json({ message: 'Murid tidak ditemukan' });
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
});

module.exports = router;