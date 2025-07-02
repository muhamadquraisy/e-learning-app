import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Ambil token dari localStorage, digunakan oleh semua request
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// GET semua ujian
export const getAllUjian = async () => {
  const response = await axios.get(`${API_URL}/ujian`, authHeader());
  return response.data;
};

// CREATE ujian baru
export const createUjian = async (data) => {
  const response = await axios.post(`${API_URL}/ujian`, data, authHeader());
  return response.data;
};

// DELETE ujian berdasarkan ID
export const deleteUjian = async (id) => {
  const response = await axios.delete(`${API_URL}/ujian/${id}`, authHeader());
  return response.data;
};

console.log("📤 AUTH HEADER:", authHeader());