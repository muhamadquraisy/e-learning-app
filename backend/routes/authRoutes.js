const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/register - hanya untuk admin (buat user baru)
router.post('/register', register);

// POST /api/login - semua role bisa login
router.post('/login', login);

module.exports = router;