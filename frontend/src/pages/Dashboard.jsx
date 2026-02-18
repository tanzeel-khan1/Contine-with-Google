// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import SchoolLevels from "./SchoolLevels";
// import Navbar from "./Navbar";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//     <Navbar/>
//     <div className="bg-white min-h-screen px-4 sm:px-6 md:px-10 py-6">
//       <div className="max-w-7xl mx-auto">
//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-purple-50 rounded-xl p-6 sm:p-8 mt-10 md:p-12 mb-10 border border-purple-300"
//         >
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 mb-4">
//             Welcome to Bright Future School
//           </h1>

//           <p className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed mb-6">
//             Bright Future School is committed to providing quality education in
//             a disciplined, safe, and caring environment where students grow
//             academically and morally.
//           </p>

//           <button
//             onClick={() => navigate("/form")}
//             className="w-full cursor-pointer sm:w-auto bg-purple-700 text-white px-7 py-3 rounded-md font-medium hover:bg-purple-800 transition"
//           >
//             Open Admission Form
//           </button>
//         </motion.div> */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
//           {[
//             {
//               title: "Qualified Teachers",
//               desc: "Experienced and trained faculty focused on student success.",
//             },
//             {
//               title: "Safe Environment",
//               desc: "Secure campus with discipline and student care.",
//             },
//             {
//               title: "Quality Education",
//               desc: "Structured curriculum with modern teaching methods.",
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 15 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-white border border-purple-200 rounded-lg p-6 text-center hover:shadow-md transition"
//             >
//               <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {item.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//     <SchoolLevels />

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-purple-300 max-w-5xl"
//         >
//           <h2 className="text-lg sm:text-xl font-semibold text-purple-800 mb-4">
//             Our Mission
//           </h2>

//           <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//             Our mission is to nurture confident learners with strong values,
//             academic excellence, and social responsibility. We believe every
//             child deserves a strong foundation for a successful future.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Dashboard;
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import SchoolLevels from "./SchoolLevels";
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white px-4 sm:px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-purple-200 border border-purple-100 p-8 sm:p-12"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-40"></div>

            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
           Welcome to Bright Future — Let’s Build Your Bright Tomorrow
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
              Bright Future School is committed to providing quality education
              in a disciplined, safe, and caring environment where students grow
              academically and morally.
            </p>

            <button
              onClick={() => navigate("/form")}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-purple-300 hover:scale-105 hover:shadow-purple-400 transition-all duration-300"
            >
              Open Admission Form
            </button>
          </motion.div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualified Teachers",
                desc: "Experienced and trained faculty focused on student success.",
              },
              {
                title: "Safe Environment",
                desc: "Secure campus with discipline and student care.",
              },
              {
                title: "Quality Education",
                desc: "Structured curriculum with modern teaching methods.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-lg bg-white/70 border border-purple-100 rounded-2xl p-8 text-center shadow-lg shadow-purple-100 hover:shadow-purple-300 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-purple-700 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* School Levels Section */}
          <SchoolLevels />

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-purple-200 border border-purple-100 max-w-5xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-50"></div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our mission is to nurture confident learners with strong values,
              academic excellence, and social responsibility. We believe every
              child deserves a strong foundation for a successful future.
            </p>
          </motion.div>

        </div>
      </div>

    </>
  );
};

export default Dashboard;
