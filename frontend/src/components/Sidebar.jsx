// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   X,
//   Menu,
//   Home,
//   CloudRain,
//   Book,
//   Contact,
//   InfoIcon,
// } from "lucide-react";
// import Logout from "../pages/Logout";

// const menuItems = [
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//     icon: Home,
//   },

//   {
//     name: "Teachers",
//     path: "/dashboard/teachers",
//     icon: Users,
//   },
//   {
//     name: "Courses",
//     path: "/dashboard/courses",
//     icon: Book,
//   },
//   {
//     name: "Contact Us",
//     path: "/dashboard/contact",
//     icon: Contact,
//   },
//   {
//     name: "About Us",
//     path: "/dashboard/about",
//     icon: InfoIcon,
//   },
// ];

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 cursor-pointer text-white p-2 rounded-lg"
//         onClick={() => setOpen(true)}
//       >
//         <Menu size={22} />
//       </button>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-white text-purple-700
//         transform ${open ? "translate-x-0" : "-translate-x-full"}
//         md:translate-x-0 transition-transform duration-300 z-50 shadow-lg`}
//       >
//         <div className="flex items-center justify-between p-6">
//           <Link
//             to="/dashboard"
//             className="text-xl font-bold text-purple-700  cursor-pointer hover:shadow-black"
//           >
//             <img src="logos.png" alt="" />
//           </Link>
//           <button
//             className="md:hidden text-purple-600 cursor-pointer"
//             onClick={() => setOpen(false)}
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="p-4 space-y-2">
          
//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 end={item.path === "/dashboard"}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-lg transition
//         ${
//           isActive
//             ? "bg-purple-100 text-purple-700 shadow-md"
//             : "hover:bg-purple-50"
//         }`
//                 }
//               >
//                 <Icon size={20} />
//                 <span className="font-medium">{item.name}</span>
//               </NavLink>
//             );
//           })}

//           <div className="pt-4 border-t">
//             <Logout />
//           </div>
//         </nav>
//       </aside>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Users,
  X,
  Menu,
  Home,
  Book,
  Contact,
  InfoIcon,
  LogIn,
  LogOut,
} from "lucide-react";
import Logout from "../pages/Logout";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Teachers",
    path: "/dashboard/teachers",
    icon: Users,
  },
  {
    name: "Courses",
    path: "/dashboard/courses",
    icon: Book,
  },
  {
    name: "Contact Us",
    path: "/dashboard/contact",
    icon: Contact,
  },
  {
    name: "About Us",
    path: "/dashboard/about",
    icon: InfoIcon,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login"; // redirect
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 cursor-pointer text-white p-2 rounded-lg"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-purple-700
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 z-50 shadow-lg`}
      >
        <div className="flex items-center justify-between p-6">
          <Link to="/dashboard" className="text-xl font-bold">
            <img src="logos.png" alt="" />
          </Link>
          <button
            className="md:hidden text-purple-600"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
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

          {/* ✅ Login / Logout Button */}
          <div className="pt-4 border-t">
            {isLoggedIn ? (
              <Logout />
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 text-green-600"
              >
                <LogIn size={20} />
                Login
              </Link>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}