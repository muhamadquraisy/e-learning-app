import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FileText, Settings, LayoutDashboard, Menu, LogOut } from 'lucide-react';

export default function SidebarAdmin() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Kelola Pengguna', icon: Users, path: '/admin/kelola-pengguna' },
    { name: 'Pengaturan', icon: Settings, path: '/admin/pengaturan' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Redirect ke login
  };

  return (
    <div className={`bg-teal-600 text-white ${open ? 'w-64' : 'w-16'} h-screen fixed flex flex-col justify-between transition-all duration-300`}>
      <div>
        <div className="flex items-center justify-between p-4">
          {open && <h1 className="text-xl font-bold">Admin</h1>}
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