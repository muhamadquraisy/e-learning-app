// SidebarGuru.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FileText, CheckCircle, MessageCircle, LogOut, Menu,
} from 'lucide-react';

export default function SidebarGuru() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/guru/dashboard' },
    { name: 'Materi', icon: BookOpen, path: '/guru/materi' },
    { name: 'Ujian', icon: FileText, path: '/guru/ujian' },
    { name: 'Penilaian', icon: CheckCircle, path: '/guru/penilaian' },
    { name: 'Forum', icon: MessageCircle, path: '/guru/forum' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`bg-teal-600 text-white ${open ? 'w-64' : 'w-16'} h-screen fixed flex flex-col justify-between transition-all duration-300`}>
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between p-4">
          {open && <h1 className="text-xl font-bold">Guru</h1>}
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <Menu />
          </button>
        </div>

        {/* Menu List */}
        <nav className="mt-4 space-y-1">
          {menus.map(({ name, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  active ? 'bg-white text-teal-700 font-semibold' : 'hover:bg-teal-700'
                }`}
              >
                <Icon size={20} />
                {open && <span>{name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-teal-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}