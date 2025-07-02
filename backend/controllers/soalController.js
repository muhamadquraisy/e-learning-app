const Soal = require('../models/Soal');
const fs = require('fs');
const path = require('path');

// ✅ GET semua soal untuk satu ujian
exports.getSoalByUjian = async (req, res) => {
  try {
    const soal = await Soal.find({ ujian: req.params.ujianId }).sort({ createdAt: 1 });
    res.status(200).json(soal);
  } catch (err) {
    console.error('❌ Gagal ambil soal:', err.message);
    res.status(500).json({ message: 'Gagal mengambil data soal' });
  }
};

// ✅ POST buat soal baru
exports.createSoal = async (req, res) => {
  try {
    const { ujian, tipe, pertanyaan, opsi, jawaban } = req.body;

    if (!ujian || !tipe || !pertanyaan || !jawaban) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    if (!['pg', 'essay'].includes(tipe)) {
      return res.status(400).json({ message: 'Tipe soal tidak valid' });
    }

    let opsiParsed = [];
    if (tipe === 'pg') {
      try {
        opsiParsed = typeof opsi === 'string' ? JSON.parse(opsi) : opsi;
        if (!Array.isArray(opsiParsed) || opsiParsed.length < 2) {
          return res.status(400).json({ message: 'Soal PG harus memiliki minimal 2 opsi' });
        }
      } catch (err) {
        return res.status(400).json({ message: 'Format opsi tidak valid' });
      }
    }

    const gambar = req.file?.filename
      ? `/uploads/soal/${req.file.filename}`
      : '';

    const soal = new Soal({
      ujian,
      tipe,
      pertanyaan,
      gambar,
      opsi: tipe === 'pg' ? opsiParsed : undefined,
      jawaban,
    });

    await soal.save();
    res.status(201).json(soal);
  } catch (err) {
    console.error('❌ Gagal buat soal:', err.message);
    res.status(400).json({ message: 'Gagal membuat soal' });
  }
};

// ✅ DELETE soal
exports.deleteSoal = async (req, res) => {
  try {
    const soal = await Soal.findById(req.params.id);
    if (!soal) {
      return res.status(404).json({ message: 'Soal tidak ditemukan' });
    }

    // Hapus file gambar jika ada
    if (soal.gambar) {
      const filePath = path.join(__dirname, '..', soal.gambar);
      fs.unlink(filePath, (err) => {
        if (err) console.warn('⚠️ Gagal hapus gambar:', err.message);
      });
    }

    await soal.deleteOne();
    res.status(200).json({ message: 'Soal berhasil dihapus' });
  } catch (err) {
    console.error('❌ Gagal hapus soal:', err.message);
    res.status(400).json({ message: 'Gagal menghapus soal' });
  }
};