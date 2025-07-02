import { Home, Book, FileText, Users, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const menu = {
    admin: [
      { name: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
      { name: "Kelola Pengguna", icon: <Users />, path: "/admin/users" },
      { name: "Laporan", icon: <FileText />, path: "/admin/reports" },
      { name: "Pengaturan", icon: <Settings />, path: "/admin/settings" },
    ],
    guru: [
      { name: "Dashboard", icon: <Home />, path: "/guru/dashboard" },
      { name: "Materi", icon: <Book />, path: "/guru/materi" },
      { name: "Ujian", icon: <FileText />, path: "/guru/ujian" },
      { name: "Penilaian", icon: <Users />, path: "/guru/nilai" },
      { name: "Forum", icon: <Users />, path: "/guru/forum" },
    ],
    murid: [
      { name: "Dashboard", icon: <Home />, path: "/murid/dashboard" },
      { name: "Materi", icon: <Book />, path: "/murid/materi" },
      { name: "Ujian", icon: <FileText />, path: "/murid/ujian" },
      { name: "Nilai Saya", icon: <Users />, path: "/murid/nilai" },
      { name: "Forum", icon: <Users />, path: "/murid/forum" },
    ]
  };

  return (
    <div className="w-64 bg-teal-600 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">E-Learning</h2>
      <nav className="flex flex-col space-y-2">
        {menu[role].map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-2 rounded hover:bg-teal-700 transition ${
                isActive ? 'bg-teal-800' : ''
              }`
            }
          >
            <span className="mr-2">{item.icon}</span> {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;