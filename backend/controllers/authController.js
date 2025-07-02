const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER - hanya admin yang boleh akses ini (dari UI atau Postman)
const register = async (req, res) => {
  const { nama, email, password, role, kelas } = req.body;

  try {
    if (!nama || !email || !password || !role) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      nama,
      email,
      password: hash,
      role,
      kelas: role === 'murid' ? kelas : null,
    });

    // Hindari kirim password ke client
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({ message: 'User berhasil didaftarkan', user: userData });
  } catch (err) {
    res.status(500).json({ message: 'Register gagal', error: err.message });
  }
};

// LOGIN - semua role (admin/guru/murid)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, nama: user.nama, kelas: user.kelas },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        nama: user.nama,
        email: user.email,
        role: user.role,
        kelas: user.kelas,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login gagal', error: err.message });
  }
};

module.exports = { register, login };