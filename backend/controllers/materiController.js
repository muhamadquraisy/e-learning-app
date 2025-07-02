const Materi = require('../models/Materi');
const path = require('path');
const fs = require('fs');

// Ambil semua materi milik guru yang login
exports.getMateri = async (req, res) => {
  try {
    const materi = await Materi.find({ guru: req.user.id });
    res.json({ success: true, data: materi });
  } catch (error) {
    console.error('Gagal mengambil data materi:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tambah materi baru
exports.addMateri = async (req, res) => {
  try {
    const { judul, deskripsi, kelas } = req.body;
    const fileUrl = req.file ? `/uploads/materi/${req.file.filename}` : null;

    const newMateri = new Materi({
      judul,
      deskripsi,
      kelas,
      file: fileUrl,
      guru: req.user.id,
    });

    await newMateri.save();
    res.status(201).json({ success: true, data: newMateri });
  } catch (error) {
    console.error('❌ Error saat menambahkan materi:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Hapus materi
exports.deleteMateri = async (req, res) => {
  try {
    const { id } = req.params;
    const materi = await Materi.findById(id);

    if (!materi) {
      return res.status(404).json({ message: 'Materi tidak ditemukan' });
    }

    if (materi.guru.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Tidak diizinkan menghapus materi ini' });
    }

    if (materi.file) {
      const filePath = path.join(__dirname, '..', materi.file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Materi.findByIdAndDelete(id);
    res.json({ message: 'Materi berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus materi' });
  }
};