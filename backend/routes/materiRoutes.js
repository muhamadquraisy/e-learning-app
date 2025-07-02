const express = require('express');
const router = express.Router();
const { getMateri, addMateri, deleteMateri } = require('../controllers/materiController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// === SETUP MULTER UNTUK PENYIMPANAN FILE ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/materi/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s+/g, '-');
    cb(null, `${timestamp}-${sanitized}`);
  },
});

const upload = multer({ storage });

// === ROUTES ===
router.get('/', verifyToken, getMateri); // ✅ Sekarang pakai verifyToken agar req.user bisa dipakai
router.post('/', verifyToken, upload.single('file'), addMateri);
router.delete('/:id', verifyToken, deleteMateri);

module.exports = router;