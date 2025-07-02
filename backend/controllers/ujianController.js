const Ujian = require('../models/Ujian');
const Soal = require("../models/Soal");
const Nilai = require('../models/Nilai');

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
    if (!ujian) return res.status(404).json({ error: "Ujian tidak ditemukan" });

    const soals = await Soal.find({ ujian: req.params.id });

    res.json({
      ...ujian.toObject(),
      soals
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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

exports.submitUjian = async (req, res) => {
  try {
    const ujian = await Ujian.findById(req.params.id);
    if (!ujian) return res.status(404).json({ error: 'Ujian tidak ditemukan' });

    const { jawaban, ragu } = req.body;

    let skor = 0;
    ujian.soal.forEach((s, i) => {
      if (jawaban[i] === s.jawaban) skor++;
    });

    const nilai = new Nilai({
      murid: req.user.id,
      ujian: req.params.id,
      jawaban,
      ragu,
      score: skor,
      total: ujian.soal.length,
    });

    await nilai.save();

    res.status(200).json({ message: 'Jawaban berhasil disubmit', score: skor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}