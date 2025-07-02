const mongoose = require('mongoose');

const ujianSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  kelas: { type: String, required: true },
  mapel: { type: String }, // tidak wajib lagi
  deskripsi: String,
  soal: [
    {
      tipe: { type: String, enum: ['pg', 'essay'], required: true },
      pertanyaan: String,
      gambar: String,
      pilihan: [String],
      jawaban: String
    }
  ],
  guru: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // rename jika kamu mau
  tanggal: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ujian', ujianSchema);