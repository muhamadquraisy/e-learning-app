// routes/muridRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Materi = require('../models/Materi');
const Ujian = require('../models/Ujian');
const Nilai = require('../models/Nilai');
const User = require('../models/User');
const muridController = require('../controllers/muridController');

// Endpoint materi murid berdasarkan kelas login
router.get('/materi', protect, muridController.getMateriByKelas);

// ✅ Tes koneksi routing (opsional untuk debugging)
router.get('/', (req, res) => {
  res.send('✅ Endpoint murid aktif');
});

// 📊 GET /api/murid/statistik/:id
router.get('/statistik/:id', async (req, res) => {
  const { id } = req.params;

  // 🔒 Validasi ID MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID murid tidak valid' });
  }

  try {
    const murid = await User.findById(id).lean();

    if (!murid) {
      return res.status(404).json({ error: 'Murid tidak ditemukan' });
    }

    if (murid.role !== 'murid') {
      return res.status(403).json({ error: 'Akses ditolak. Hanya untuk murid.' });
    }

    // 🔄 Ambil data statistik paralel
    const [jumlahMateri, jumlahUjian, jumlahSelesai] = await Promise.all([
      Materi.countDocuments({ kelas: murid.kelas }),
      Ujian.countDocuments({ kelas: murid.kelas }),
      Nilai.countDocuments({ murid: murid._id }),
    ]);

    res.json({
      success: true,
      nama: murid.nama,
      kelas: murid.kelas,
      jumlahMateri,
      jumlahUjian,
      jumlahSelesai,
    });
  } catch (err) {
    console.error('❌ Gagal ambil statistik murid:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data statistik' });
  }
});

module.exports = router;