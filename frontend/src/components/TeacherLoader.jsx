import { motion } from "framer-motion";

const TeacherLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-600"
      />

      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-5 text-purple-600 font-medium tracking-wide"
      >
        Loading ...
      </motion.p>
    </div>
  );
};

export default TeacherLoader;
