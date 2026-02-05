
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/Auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Registration successful ");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-purple-100 hover:shadow-2xl transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-1">
          Create Account 
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-5 py-3 bg-gray-100 text-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition ${
                errors.name ? "border-red-500" : "border-purple-200"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-5 py-3 bg-gray-100 text-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition ${
                errors.email ? "border-red-500" : "border-purple-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-5 py-3 bg-gray-100 text-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition ${
                errors.password ? "border-red-500" : "border-purple-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 cursor-pointer btn-gradient text-white rounded-2xl font-semibold text-lg shadow-md hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account {" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:text-purple-500  transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
