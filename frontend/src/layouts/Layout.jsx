import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
      <main className="min-h-screen bg-white p-6 ml-0 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
