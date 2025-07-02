import { BrowserRouter, Routes, Route } from "react-router-dom";

// ====== Public Pages ======
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

// ====== Admin Pages ======
import DashboardAdmin from "./pages/DashboardAdmin";
import KelolaPengguna from "./pages/KelolaPengguna";
import PengaturanAdmin from "./pages/PengaturanAdmin";

// ====== Guru Pages ======
import DashboardGuru from "./pages/DashboardGuru";
import MateriGuru from "./pages/MateriGuru";
import UjianGuru from "./pages/UjianGuru";
import DetailUjian from "./pages/DetailUjian";

// ====== Murid Pages ======
import DashboardMurid from "./pages/DashboardMurid";
import MateriMurid from './pages/MateriMurid';
import UjianMurid from './pages/UjianMurid';
import DetailUjianMurid from './pages/DetailUjianMurid';

// ====== Layouts & Guards ======
import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route element={<ProtectedRoute allowedRole={["admin"]} />}>
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="kelola-pengguna" element={<KelolaPengguna />} />
            <Route path="pengaturan" element={<PengaturanAdmin />} />
          </Route>
        </Route>

        {/* ==================== GURU ROUTES ==================== */}
        <Route element={<ProtectedRoute allowedRole={["guru"]} />}>
          <Route path="/guru" element={<DashboardLayout role="guru" />}>
            <Route index element={<DashboardGuru />} />
            <Route path="dashboard" element={<DashboardGuru />} />
            <Route path="materi" element={<MateriGuru />} />
            <Route path="ujian" element={<UjianGuru />} />
            <Route path="ujian/:ujianId" element={<DetailUjian />} />
          </Route>
        </Route>

        {/* ==================== MURID ROUTES ==================== */}
        <Route element={<ProtectedRoute allowedRole={["murid"]} />}>
          <Route path="/murid" element={<DashboardLayout role="murid" />}>
            <Route index element={<DashboardMurid />} />
            <Route path="dashboard" element={<DashboardMurid />} />
            <Route path="materi" element={<MateriMurid />} />
            <Route path="/murid/ujian" element={<UjianMurid />} />
            <Route path="/murid/ujian/:id" element={<DetailUjianMurid />} />
            {/* Tambahkan rute murid lainnya di sini */}
          </Route>
        </Route>

        {/* ==================== 404 NOT FOUND ==================== */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl font-semibold">
              404 - Halaman tidak ditemukan
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;