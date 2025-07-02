// SidebarMurid.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, BarChart2, MessageCircle, LogOut, Menu } from 'lucide-react';

export default function SidebarMurid() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/murid/dashboard' },
    { name: 'Materi', icon: BookOpen, path: '/murid/materi' },
    { name: 'Ujian', icon: FileText, path: '/murid/ujian' },
    { name: 'Nilai Saya', icon: BarChart2, path: '/murid/nilai' },
    { name: 'Forum', icon: MessageCircle, path: '/murid/forum' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`bg-teal-600 text-white ${open ? 'w-64' : 'w-16'} h-screen fixed lg:static z-50 transition-all duration-300`}>
      <div>
        <div className="flex items-center justify-between p-4">
          {open && <h1 className="text-xl font-bold">Murid</h1>}
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <Menu />
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          {menus.map((menu, index) => {
            const Icon = menu.icon;
            const active = location.pathname === menu.path;
            return (
              <Link
                to={menu.path}
                key={index}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  active ? 'bg-white text-teal-700 font-semibold' : 'hover:bg-teal-700'
                }`}
              >
                <Icon size={20} />
                {open && <span>{menu.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

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