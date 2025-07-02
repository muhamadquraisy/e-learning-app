// soalRoutes.js
const express = require("express");
const router = express.Router();

const soalController = require("../controllers/soalController");
const { protect, isGuru } = require("../middleware/authMiddleware");
const uploadSoal = require("../middleware/uploadSoal");
const validateIdParam = require("../middleware/validateIdParam");

// GET semua soal untuk ujian tertentu
router.get(
  '/:ujianId', // ✅ disesuaikan agar cocok dengan frontend
  protect,
  isGuru,
  validateIdParam('ujianId'),
  soalController.getSoalByUjian
);

// POST buat soal baru (dengan gambar opsional)
router.post(
  '/',
  protect,
  isGuru,
  uploadSoal.single('gambar'),
  soalController.createSoal
);

// DELETE soal berdasarkan ID
router.delete(
  '/:id',
  protect,
  isGuru,
  validateIdParam('id'),
  soalController.deleteSoal
);

module.exports = router;