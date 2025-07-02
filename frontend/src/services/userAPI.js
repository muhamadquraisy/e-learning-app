import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// 🔐 Setup axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🛡️ Tambahkan token auth secara otomatis jika ada
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

/* ========================= USER MANAGEMENT ========================= */

// ✅ Ambil semua pengguna
export const getUsers = async () => {
  try {
    const res = await axiosInstance.get('/users');
    console.log('[API] getUsers:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] Error getUsers:', err);
    return [];
  }
};

// ✅ Tambah pengguna baru
export const createUser = async (data) => {
  try {
    const res = await axiosInstance.post('/users', data);
    console.log('[API] createUser success');
    return res.data;
  } catch (err) {
    console.error('[API] Error createUser:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ Update pengguna
export const updateUser = async (id, data) => {
  try {
    const res = await axiosInstance.put(`/users/${id}`, data);
    console.log('[API] updateUser success');
    return res.data;
  } catch (err) {
    console.error('[API] Error updateUser:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ Hapus pengguna
export const deleteUser = async (id) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    console.log('[API] deleteUser success');
    return res.data;
  } catch (err) {
    console.error('[API] Error deleteUser:', err.response?.data || err.message);
    throw err;
  }
};

/* ========================= SETTINGS / PENGATURAN ========================= */

// ✅ Ambil pengaturan sistem
export const getSettings = async () => {
  try {
    const res = await axiosInstance.get('/settings');
    return res.data;
  } catch (err) {
    console.error('[API] Error getSettings:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ Update pengaturan sistem
export const updateSettings = async (settingsData) => {
  try {
    const res = await axiosInstance.put('/settings', settingsData);
    return res.data;
  } catch (err) {
    console.error('[API] Error updateSettings:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ Ekspor instance kalau perlu digunakan langsung
export default axiosInstance;