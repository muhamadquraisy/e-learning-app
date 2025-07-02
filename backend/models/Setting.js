const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  namaApp: {
    type: String,
    required: true,
    default: 'E-Learning App',
  },
  pengumuman: {
    type: String,
    default: '',
  },
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);