const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = 'uploads/soal';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return cb(new Error('Hanya file gambar'));
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });