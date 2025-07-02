const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');

// [Opsional] Tambahkan autentikasi jika diperlukan nanti:
// const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
// router.use(verifyToken); 
// router.use(isAdmin); 

// Rute untuk ambil dan update pengaturan
router.get('/', getSettings);
router.put('/', updateSettings);

module.exports = router;