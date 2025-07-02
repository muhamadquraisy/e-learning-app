// muridAPI.js
import api from "./api";

// Helper untuk header Authorization
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 📊 Dashboard murid (statistik jumlah materi, ujian, dll)
export const fetchMuridDashboard = async () => {
  const res = await api.get("/statistik/murid-dashboard", authHeader());
  return res.data;
};

// 📚 Materi murid berdasarkan kelas (halaman materi murid)
export const fetchMateriMurid = async () => {
  const res = await api.get("/murid/materi", authHeader());
  return res.data;
};

export const fetchMuridUjian = async () => {
  const token = localStorage.getItem('token');
  const res = await api.get('/murid/ujian', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};