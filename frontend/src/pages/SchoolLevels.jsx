import React from "react";
import { motion } from "framer-motion";

const levels = [
  {
    title: "Nursery – Year II",
    button: "Early Years",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
    buttonColor: "bg-yellow-400 text-black",
  },
  {
    title: "Year III – Year VI",
    button: "Learn More",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    buttonColor: "bg-black text-white",
  },
  {
    title: "Year VII - Year IX",
    button: "Middle",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    buttonColor: "bg-orange-600 text-white",
  },
  {
    title: "O Level & A Level",
    button: "College",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    buttonColor: "bg-purple-800 text-white",
  },
];

// Container Animation (Stagger Effect)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Individual Card Animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const SchoolLevels = () => {
  return (
    <div className="py-16 px-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {levels.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center"
          >
            {/* Image */}
            <motion.div
              className="w-64 h-64 rounded-full overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* Title */}
            <motion.h3
              className="mt-6 text-lg font-semibold text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {item.title}
            </motion.h3>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`mt-4 px-8 py-3 rounded-full font-medium cursor-not-allowed shadow-md ${item.buttonColor}`}
            >
              {item.button}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SchoolLevels;
