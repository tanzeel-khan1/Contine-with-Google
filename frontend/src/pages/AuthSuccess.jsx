import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      console.log("Auth saved ✅");

      // redirect after login
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
};

export default AuthSuccess;
