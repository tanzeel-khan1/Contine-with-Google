import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, X, Menu, Home, CloudRain, Book } from "lucide-react";
import Logout from "../pages/Logout";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
 
   {
    name: "Teacher's",
    path: "/dashboard/teachers",
    icon: Users,
  },
  {
    name: "Coures",
    path: "/dashboard/courses",
    icon: Book,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Open Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 cursor-pointer text-white p-2 rounded-lg"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-purple-700
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 z-50 shadow-lg`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h1 className="text-xl font-bold text-purple-700">
            Bright Future School
          </h1>

          {/* Mobile Close */}
          <button
            className="md:hidden text-purple-600 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"} // 🔥 IMPORTANT
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          isActive
            ? "bg-purple-100 text-purple-700 shadow-md"
            : "hover:bg-purple-50"
        }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 border-t">
            <Logout />
          </div>
        </nav>
      </aside>
    </>
  );
}
