import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthSucess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  // Save token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token saved to localStorage:", token);
    }
  }, [token]);
  

  return <div>Login Successful! Token saved to localStorage ✅</div>;
};

export default AuthSucess;