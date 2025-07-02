// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware verifikasi token dan lampirkan user ke req
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau salah format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa' });
  }
};

// Middleware role: guru
const isGuru = (req, res, next) => {
  if (req.user?.role === 'guru') return next();
  return res.status(403).json({ message: 'Akses ditolak: hanya untuk guru' });
};

// Ekspor dua nama agar backward compatible
module.exports = { verifyToken, protect: verifyToken, isGuru };