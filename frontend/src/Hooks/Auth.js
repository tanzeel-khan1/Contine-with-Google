import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

/* ================================
   🛡️ Safe localStorage reader
================================ */
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const useAuth = () => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================================
     📝 REGISTER
     Backend response expected:
     {
       success: true,
       data: { _id, name, email, token }
     }
  ================================ */
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      if (!res.data?.success) {
        setError("Registration failed");
        return null;
      }

      const userData = res.data.data;

      // save token + user
      if (userData?.token) {
        localStorage.setItem("token", userData.token);
      }

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     🔐 LOGIN
  ================================ */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE 👉", res.data);

      if (!res.data?.success) {
        setError("Login failed");
        return null;
      }

      const userData = res.data.data;

      if (!userData?.token) {
        setError("Token missing");
        return null;
      }

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     🚪 LOGOUT
  ================================ */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };
};

export default useAuth;
