// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const morgan = require('morgan');

dotenv.config();
const app = express();

// ====== VALIDASI ENV WAJIB ======
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ ENV tidak lengkap. Harap isi MONGO_URI & JWT_SECRET di .env');
  process.exit(1);
}

// ====== KONFIGURASI MONGOOSE ======
mongoose.set('strictQuery', true);

// ====== MIDDLEWARE GLOBAL ======
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging HTTP

// ====== STATIC FILES ======
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

// ====== ROUTES IMPORTS ======
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const statistikRoutes = require('./routes/statistik');
const settingsRoutes = require('./routes/settingsRoutes');
const materiRoutes = require('./routes/materiRoutes');
const ujianRoutes = require('./routes/ujianRoutes');
const soalRoutes = require('./routes/soalRoutes');
const muridRoutes = require('./routes/muridRoutes');

// ====== API ROUTING ======
app.use('/api/auth', authRoutes);         // Login, register, JWT
app.use('/api/users', userRoutes);        // CRUD user (admin)
app.use('/api/statistik', statistikRoutes); // Dashboard statistik (baru admin)
app.use('/api/settings', settingsRoutes); // Pengaturan aplikasi
app.use('/api/materi', materiRoutes);     // CRUD materi belajar
app.use('/api/ujian', ujianRoutes);       // CRUD ujian
app.use('/api/soal', soalRoutes);         // CRUD soal ujian
app.use('/api/murid', muridRoutes);       // Dashboard murid & fitur murid lainnya

// ====== ROOT TEST ENDPOINT ======
app.get('/', (req, res) => {
  res.send('✅ API E-Learning aktif dan berjalan!');
});

// ====== 404 HANDLER ======
app.use((req, res) => {
  res.status(404).json({ message: '❌ Endpoint tidak ditemukan' });
});

// ====== GLOBAL ERROR HANDLER ======
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

// ====== KONEKSI DATABASE DAN JALANKAN SERVER ======
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Terhubung ke MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Gagal koneksi MongoDB:', err.message);
  process.exit(1);
});