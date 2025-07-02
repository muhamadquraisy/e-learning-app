const Ujian = require('../models/Ujian');

// Tambah Ujian
exports.buatUjian = async (req, res) => {
  try {
    console.log("📝 BUAT UJIAN oleh:", req.user.id); // Tambahkan log
    const ujian = new Ujian({ ...req.body, dibuatOleh: req.user.id });
    await ujian.save();
    res.status(201).json(ujian);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUjianGuru = async (req, res) => {
  try {
    console.log("🔍 AMBIL UJIAN milik:", req.user.id); // Tambahkan log
    const ujian = await Ujian.find({ dibuatOleh: req.user.id });
    console.log("📦 HASIL QUERY:", ujian); // Tambahkan log
    res.json(ujian);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get 1 ujian by ID
exports.getUjianById = async (req, res) => {
  try {
    const ujian = await Ujian.findById(req.params.id);
    res.json(ujian);
  } catch (err) {
    res.status(404).json({ error: 'Ujian tidak ditemukan' });
  }
};

// Tambah soal ke ujian
exports.tambahSoal = async (req, res) => {
  try {
    const ujian = await Ujian.findById(req.params.id);
    ujian.soal.push(req.body);
    await ujian.save();
    res.json(ujian);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};