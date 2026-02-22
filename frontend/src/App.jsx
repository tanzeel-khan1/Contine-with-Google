// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { Toaster } from "sonner";

// import Loginn from "./pages/Loginn";
// import Register from "./pages/Register";
// import AuthSuccess from "./pages/AuthSuccess";

// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminLayout from "./layouts/Layout";

// import Dashboard from "./pages/Dashboard";
// import User from "./pages/User";
// import Form from "./pages/Form";
// import GetAllTeachers from "./pages/GetAllTeachers";
// import AdminDashboard from "./admin/AdminDashboard";
// import TeacherDashboard from "./teachers/TeacherDashboard";

// const App = () => {
//   return (
//     <>
//       <Toaster richColors position="top-center" />

//       <Routes>
//         {/* Redirect */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public Routes */}
//         <Route path="/login" element={<Loginn />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/success" element={<AuthSuccess />} />

//         {/* Protected Admin Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
//           <Route path="users" element={<User />} />
//           <Route path="teachers" element={<GetAllTeachers />} />
//         </Route>
//         <Route path="/form" element={<Form />} />
//                 <Route path="/admin" element={<AdminDashboard />} />
//                 <Route path="/teacher" element={<TeacherDashboard />} />

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
import GetAllTeachers from "./pages/GetAllTeachers";

import AdminDashboard from "./admin/AdminDashboard";
import TeacherDashboard from "./teachers/TeacherDashboard";
import Courses from "./pages/Courses";
import GetMyBuyedCourses from "./pages/GetMyBuyedCourses";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Create from "./teachers/Create";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />

      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Loginn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<AuthSuccess />} />

        {/* ================= ADMIN ================= */}
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
          <Route path="teachers" element={<GetAllTeachers />} />
          <Route path="courses" element={<Courses />} />
          <Route path="mycourses" element={<GetMyBuyedCourses />} />
          <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />


        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= TEACHER ================= */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

 <Route
          path="/create"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Create/>
            </ProtectedRoute>
          }
        />
        {/* ================= USER ================= */}
        <Route
          path="/form"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Form />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
