import Logout from './Logout'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
            <nav className="w-full  btn-gradient border-b border-amber-500/30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Title */}
          <h1 className="text-xl font-bold text-white">My Dashboard</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate("/create")}
              className="px-4 py-2 rounded-lg  cursor-pointer bg-amber-500 text-black font-medium hover:bg-amber-400 transition"
            >
              Attendance
            </button>

            <button
              onClick={() => navigate("/waiter/leave")}
              className="px-4 py-2 rounded-lg cursor-pointer bg-blue-500 text-white font-medium hover:bg-blue-400 transition"
            >
              Leave
            </button>
<Logout  className="w-full"/>

           
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white  cursor-pointer focus:outline-none"
            >
              {menuOpen ? "✖️" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate("/waiter/attendance");
                setMenuOpen(false);
              }}
              className="w-full cursor-pointer px-4 py-2 rounded-lg bg-amber-500 text-black font-medium hover:bg-amber-400 transition"
            >
              Attendance
            </button>

            <button
              onClick={() => {
                navigate("/waiter/leave");
                setMenuOpen(false);
              }}
              className="w-full cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-400 transition"
            >
              Leave
            </button>
<Logout  className="w-full"/>
           
          </div>
        )}
      </nav>
    </div>
  )
}

export default TeacherDashboard
