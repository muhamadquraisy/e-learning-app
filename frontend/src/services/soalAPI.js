// soalAPI.js
import api from './api'; // axios instance with baseURL & auth

// Ambil soal berdasarkan ujian
export const getSoalByUjian = (ujianId) => api.get(`/soal/${ujianId}`);

// Tambah soal baru
export const createSoal = (formData) =>
  api.post('/soal', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Hapus soal
export const deleteSoal = (id) => api.delete(`/soal/${id}`);

export default {
  getSoalByUjian,
  createSoal,
  deleteSoal,
};