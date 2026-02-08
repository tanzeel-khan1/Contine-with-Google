import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-custom-gradient text-white p-6">

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold bg-black bg-clip-text text-transparent">
           Dashboard
        </h1>
       
      </motion.div>

     

    </div>
  );
};

export default Dashboard;