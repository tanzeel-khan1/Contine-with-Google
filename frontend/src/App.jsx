import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loginn from "./pages/Loginn";
import Register from "./pages/Register";
import AuthSuccess from "./pages/AuthSuccess";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Loginn />} />
        <Route path="/register" element={<Register />} />

        <Route path="/success" element={<AuthSuccess />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
