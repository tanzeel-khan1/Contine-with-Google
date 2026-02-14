import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const user = JSON.parse(storedUser);

  // 🔒 Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // role ke hisaab se redirect
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "teacher") return <Navigate to="/teacher" replace />;
        if (user.role === "user") return <Navigate to="/dashboard" replace />;

    return <Navigate to="/form" replace />;
  }

  return children;
};

export default ProtectedRoute;
