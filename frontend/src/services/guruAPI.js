import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor untuk menyisipkan token secara otomatis
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ========== MATERI ==========
export const getMateri = () => API.get('/materi');
export const addMateri = (formData) =>
  API.post('/materi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const deleteMateri = (id) => API.delete(`/materi/${id}`);

// ========== UJIAN ==========
export const getUjianGuru = () => API.get('/ujian');
export const createUjianGuru = (data) => API.post('/ujian', data);
export const deleteUjianGuru = (id) => API.delete(`/ujian/${id}`);