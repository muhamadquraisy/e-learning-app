import api from "./api";

export const fetchMuridDashboard = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/statistik/murid-dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};