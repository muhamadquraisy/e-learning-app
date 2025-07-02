// models/Nilai.js
const mongoose = require('mongoose');

const nilaiSchema = new mongoose.Schema({
  murid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ujian: { type: mongoose.Schema.Types.ObjectId, ref: 'Ujian', required: true },
  nilai: { type: Number, required: true },
  tanggal: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Nilai', nilaiSchema);