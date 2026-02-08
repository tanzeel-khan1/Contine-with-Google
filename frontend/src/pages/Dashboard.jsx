import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 md:px-10 py-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-purple-50 rounded-xl p-6 sm:p-8 md:p-12 mb-10 border border-purple-300"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 mb-4">
            Welcome to Bright Future School
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed mb-6">
            Bright Future School is committed to providing quality education in
            a disciplined, safe, and caring environment where students grow
            academically and morally.
          </p>

          <button
            onClick={() => navigate("/form")}
            className="w-full cursor-pointer sm:w-auto bg-purple-700 text-white px-7 py-3 rounded-md font-medium hover:bg-purple-800 transition"
          >
            Open Admission Form
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
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
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-purple-200 rounded-lg p-6 text-center hover:shadow-md transition"
            >
              <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-purple-300 max-w-5xl"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-purple-800 mb-4">
            Our Mission
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Our mission is to nurture confident learners with strong values,
            academic excellence, and social responsibility. We believe every
            child deserves a strong foundation for a successful future.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
