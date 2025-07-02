const express = require('express');
const router = express.Router();
const ujianController = require('../controllers/ujianController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, ujianController.buatUjian);
router.get('/', protect, ujianController.getUjianGuru);
router.get('/:id', protect, ujianController.getUjianById);
router.post('/:id/soal', protect, ujianController.tambahSoal);

module.exports = router;