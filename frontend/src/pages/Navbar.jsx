import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50  rounded-md">
        <button
          onClick={() => setOpen(!open)}
          className={`text-purple-600 text-3xl border-none transition-transform duration-300 cursor-pointer ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </button>
      </div>

      <nav className="hidden md:flex bg-white shadow-[0_4px_20px_rgba(147,51,234,0.4)] fixed w-250 top-0 z-40 border-none rounded-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          <h1 className="text-xl font-bold text-purple-600">
            {" "}
            Bright Future School
          </h1>

          <div className="flex gap-6">
            <Link
              to="/dashboard/about"
              className="px-5 py-2 rounded-full text-white font-medium 
              btn-gradient
              hover:scale-105 transition-all duration-300"
            >
        
              About
            </Link>

            <Link
              to="/dashboard/contact"
              className="px-5 py-2 rounded-full text-white font-medium 
             btn-gradient
              hover:scale-105 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 z-40 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-xl text-center mt-14 font-bold text-purple-600">
          {" "}
          Bright Future School
        </h1>

        <div className="flex flex-col mt-5 items-center gap-6">
          <Link
            to="/dashboard/about"
            onClick={() => setOpen(false)}
            className="px-5 py-2 rounded-full text-white font-medium 
           btn-gradient w-40 text-center"
          >
            About
          </Link>

          <Link
            to="/dashboard/contact"
            onClick={() => setOpen(false)}
            className="px-5 py-2 rounded-full text-white font-medium 
           btn-gradient w-40 text-center"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
