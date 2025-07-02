const mongoose = require('mongoose');

const materiSchema = new mongoose.Schema({
  kelas: {
    type: Number,
    required: true,
    min: 7,
    max: 12,
  },
  judul: {
    type: String,
    required: true,
    trim: true,
  },
  deskripsi: {
    type: String,
    default: '',
    trim: true,
  },
  file: {
    type: String,
    default: '',
  },
  guru: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Materi', materiSchema);