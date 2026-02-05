import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")); // already logged in
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); // token from Google redirect

  // Agar token URL mai hai aur localStorage mai nahi hai, store karo
  if (token && !user) {
    const userData = { token }; // simple example, agar backend aur info chahiye to expand karo
    localStorage.setItem("user", JSON.stringify(userData));
    return children; // allow access
  }

  // Agar user already localStorage mai hai, allow access
  if (user) {
    return children;
  }

  // Nahi to login page bhej do
  return <Navigate to="/login" replace />;
};


export default ProtectedRoute;
