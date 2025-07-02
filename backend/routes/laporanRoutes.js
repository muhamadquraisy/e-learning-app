// routes/laporanRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/tab-out', protect, async (req, res) => {
  const { ujianId, waktu } = req.body;
  // disini simpan log misal: user ID, ujianId, timestamp ke DB
  res.json({ success: true });
});

module.exports = router;