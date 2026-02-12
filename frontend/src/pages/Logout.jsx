import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const modalRoot = document.getElementById("modal-root") || document.body;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.8 },
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 w-full flex items-center gap-2 px-4 py-3
                   rounded-lg text-purple-600 hover:bg-purple-50 
                   transition-colors font-medium cursor-pointer"
      >
        <LogOut size={18} /> Logout
      </button>

      {/* Modal */}
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-11/12 max-w-sm rounded-2xl p-6 shadow-2xl"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <h3 className="text-xl font-semibold text-purple-700 text-center">
                  Confirm Logout
                </h3>

                <p className="mt-3 text-sm text-purple-500 text-center">
                  Kya aap waqai logout karna chahte ho?
                </p>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-lg border border-purple-300
                               px-4 py-2 text-purple-600 font-medium cursor-pointer
                               hover:bg-purple-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex-1 rounded-lg bg-purple-600 px-4 py-2 cursor-pointer
                               text-white font-medium hover:bg-purple-700 
                               transition"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        modalRoot
      )}
    </>
  );
};

export default Logout;
