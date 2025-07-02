const mongoose = require('mongoose');

const soalSchema = new mongoose.Schema(
  {
    ujian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ujian',
      required: true,
    },
    tipe: {
      type: String,
      enum: ['pg', 'essay'],
      required: true,
    },
    pertanyaan: {
      type: String,
      required: true,
      trim: true,
    },
    gambar: {
      type: String, // simpan path lokal atau URL
      default: '',
    },
    opsi: {
      type: [String],
      validate: {
        validator: function (arr) {
          return this.tipe !== 'pg' || (Array.isArray(arr) && arr.length >= 2);
        },
        message: 'Soal pilihan ganda harus memiliki minimal 2 opsi',
      },
      default: undefined, // agar tidak tersimpan di soal essay
    },
    jawaban: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Opsi: validasi tambahan (opsional, jika ingin hindari gambar pada essay)
soalSchema.pre('save', function (next) {
  if (this.tipe === 'essay') {
    this.opsi = undefined; // hapus opsi jika essay
  }
  next();
});

module.exports = mongoose.model('Soal', soalSchema);