// Contoh data dummy (seharusnya dari database / file konfigurasi)
let settings = {
  namaApp: 'E-Learning App',
  pengumuman: 'Selamat datang!',
  maintenanceMode: false,
};

const getSettings = (req, res) => {
  res.json(settings);
};

const updateSettings = (req, res) => {
  const { namaApp, pengumuman, maintenanceMode } = req.body;

  // Validasi sederhana
  if (typeof namaApp !== 'string' || typeof pengumuman !== 'string' || typeof maintenanceMode !== 'boolean') {
    return res.status(400).json({ message: 'Data tidak valid' });
  }

  settings = { namaApp, pengumuman, maintenanceMode };
  res.json({ message: 'Pengaturan diperbarui', settings });
};

module.exports = { getSettings, updateSettings };