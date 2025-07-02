// models/Nilai.js
const mongoose = require('mongoose');

const nilaiSchema = new mongoose.Schema({
  murid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ujian: { type: mongoose.Schema.Types.ObjectId, ref: 'Ujian', required: true },
  jawaban: mongoose.Schema.Types.Mixed,
  ragu: mongoose.Schema.Types.Mixed,
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nilai', nilaiSchema);
