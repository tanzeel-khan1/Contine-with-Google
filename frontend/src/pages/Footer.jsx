import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email ");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address ");
      return;
    }

    // Yahan tum API call laga sakte ho
    toast.success("Subscribed Successfully 🎉");

    setEmail("");
  };

  return (
    <footer className="relative mt-24">
      <div className="absolute inset-0 btn-gradient opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-14 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-10 text-white">

        <div>
          <h2 className="text-2xl font-bold tracking-wide">
            ABC Public School
          </h2>
          <p className="mt-4 text-sm text-white/80 leading-relaxed">
            Empowering young minds with innovation, discipline and
            world-class education for a brighter tomorrow.
          </p>

          <div className="flex gap-4 mt-6">
            <a className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-purple-700 transition duration-300">
              <FaFacebookF />
            </a>
            <a className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-purple-700 transition duration-300">
              <FaInstagram />
            </a>
            <a className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-purple-700 transition duration-300">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">About</li>
            <li className="hover:text-white cursor-pointer transition">Courses</li>
            <li className="hover:text-white cursor-pointer transition">Admissions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>📍 Lahore, Pakistan</li>
            <li>📞 +92 300 1234567</li>
            <li>✉ info@abcschool.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">📧 Newsletter</h3>
          <p className="text-sm text-white/80 mb-4">
            Stay updated with latest announcements.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-purple-700 py-2 rounded-lg font-semibold hover:scale-105 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="relative text-center text-white/80 text-sm py-6">
        © {new Date().getFullYear()} ABC Public School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
