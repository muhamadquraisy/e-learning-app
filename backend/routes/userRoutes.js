const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// [GET] Semua user
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('[API] Gagal ambil data user:', err);
    res.status(500).json({ message: 'Gagal ambil data user' });
  }
});

// [POST] Tambah user
router.post('/', async (req, res) => {
  try {
    const { nama, email, role, password, kelas } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password di sini

    const newUser = new User({ nama, email, role, password: hashedPassword, kelas });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error('[API] Gagal tambah user:', err);
    res.status(500).json({ message: 'Gagal tambah user' });
  }
});

// [PUT] Edit user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, role, password, kelas } = req.body;

    let updateData = { nama, email, role, kelas };

    // Jika password ada, hash dulu sebelum update
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updated = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json(updated);
  } catch (err) {
    console.error('[API] Gagal update user:', err);
    res.status(500).json({ message: 'Gagal update user' });
  }
});

// [DELETE] Hapus user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json({ message: 'User dihapus' });
  } catch (err) {
    console.error('[API] Gagal hapus user:', err);
    res.status(500).json({ message: 'Gagal hapus user' });
  }
});

module.exports = router;