import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; 

const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📝 Register
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  
const login = async (email, password) => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    console.log("LOGIN RESPONSE 👉", res.data);

    if (res.data.success) {
      // 🔑 token find karo
      const token =
        res.data.token ||
        res.data.data?.token;

      // 👤 user find karo
      const user =
        res.data.data?.user ||
        res.data.data;

      if (!token) {
        console.error("Token missing from response ❌");
      }

      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }

    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || "Invalid credentials");
    return null;
  } finally {
    setLoading(false);
  }
};

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
