const Materi = require('../models/Materi')

exports.getMateriByKelas = async (req, res) => {
  try {
    const murid = req.user
    if (murid.role !== 'murid') {
      return res.status(403).json({ message: 'Akses ditolak' })
    }
    const materi = await Materi.find({ kelas: murid.kelas }).sort({ createdAt: -1 })
    res.json(materi)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Gagal ambil materi' })
  }
}