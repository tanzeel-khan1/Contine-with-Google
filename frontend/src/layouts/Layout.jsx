// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div className="min-h-screen bg-custom-gradient flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Page Content */}
//       <main className="flex-1 w-full bg-gray-100 ">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
      <main className="min-h-screen bg-gray-100 p-6 ml-0 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
