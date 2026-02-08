
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Loginn from "./pages/Loginn";
// import Register from "./pages/Register";
// import AuthSuccess from "./pages/AuthSuccess";
// import { Toaster } from "sonner";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";
// import AdminLayout from "./layouts/Layout";
// import User from "./pages/User";
// const App = () => {
//   return (
//     <>
//       <Toaster richColors position="top-center" />
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         <Route path="/login" element={<Loginn />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/success" element={<AuthSuccess />} />
//           <Route path="/users" element={<User />} />

//         {/* ✅ Admin layout with sidebar */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import Loginn from "./pages/Loginn";
import Register from "./pages/Register";
import AuthSuccess from "./pages/AuthSuccess";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Form from "./pages/Form";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />

      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Loginn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<AuthSuccess />} />
         
        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >         

          <Route index element={<Dashboard />} />
          <Route path="users" element={<User />} />
        </Route>
                  <Route path="/form" element={<Form />} />

      </Routes>
    </>
  );
};

export default App;
