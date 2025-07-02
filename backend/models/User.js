const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'guru', 'murid'], required: true },
  kelas: { type: String }, // untuk murid, misal "7A", "8B", dll
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);