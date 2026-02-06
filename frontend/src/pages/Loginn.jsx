import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoginWithGoogle from "./Login";

const Loginn = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Agar already login hai → redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await login(email, password);

  if (res?.success) {
    toast.success("Login successful ");
    navigate("/dashboard", { replace: true });
  } else {
    toast.error("Login failed ");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-purple-100 hover:shadow-2xl transition-transform transform hover:scale-105">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-1">
          Welcome Back 
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 text-gray-800 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition"
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-gray-100 text-gray-800 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition"
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 cursor-pointer btn-gradient text-white rounded-2xl font-semibold text-lg shadow-md transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-purple-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-purple-200"></div>
        </div>

        {/* Google Login */}
        <LoginWithGoogle />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}

        {/* Register */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Create Your Account{" "}
          <Link
            to="/register"
            className="text-purple-600 font-semibold hover:text-purple-500 transition"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Loginn;
