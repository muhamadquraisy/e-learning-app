// middleware/uploadSoal.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const soalPath = path.join(__dirname, '..', 'uploads', 'soal');
if (!fs.existsSync(soalPath)) fs.mkdirSync(soalPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, soalPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `soal_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;