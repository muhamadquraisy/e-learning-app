const express = require('express');
const router = express.Router();
const ujianController = require('../controllers/ujianController');
const { protect } = require('../middleware/authMiddleware');
const { submitUjian } = require('../controllers/ujianController'); // pastikan ini ada

router.post('/', protect, ujianController.buatUjian);
router.get('/', protect, ujianController.getUjianGuru);
router.get('/:id', protect, ujianController.getUjianById);
router.post('/:id/soal', protect, ujianController.tambahSoal);
router.post('/:id/submit', protect, submitUjian);

module.exports = router;