import { Outlet } from "react-router-dom";

import SidebarAdmin from "../components/SidebarAdmin";
import SidebarGuru from "../components/SidebarGuru";
import SidebarMurid from "../components/SidebarMurid";

const DashboardLayout = ({ role }) => {
  let SidebarComponent = null;

  if (role === "admin") SidebarComponent = SidebarAdmin;
  else if (role === "guru") SidebarComponent = SidebarGuru;
  else if (role === "murid") SidebarComponent = SidebarMurid;

  return (
    <div className="flex h-screen overflow-hidden">
      {SidebarComponent && <SidebarComponent />}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;