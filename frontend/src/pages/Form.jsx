import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAdmission from "../Hooks/AdmissionHook";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AdmissionForm = () => {
  const { createAdmission, loading, error } = useAdmission();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    classApplying: "",
    gender: "Male",
    phoneEmail: "",
    address: "",
    previousSchool: "",
  });

  const [success, setSuccess] = useState(false);
  const [classError, setClassError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setClassError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Safety check (extra protection)
    if (
      formData.classApplying.includes("Class") &&
      parseInt(formData.classApplying.replace(/\D/g, "")) > 10
    ) {
      setClassError("Admissions are allowed only up to Class 10");
      return;
    }

    const result = await createAdmission(formData);

    if (result) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/"); // ✅ Auto redirect to home
      }, 2200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen purple-gradient flex items-center justify-center p-4"
    >
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
      >
        {/* Exit Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 cursor-pointer right-4 w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center hover:bg-purple-200"
        >
          ✕
        </motion.button>

        <motion.h2
          variants={fieldVariants}
          className="text-2xl font-bold text-center text-purple-800 mb-6"
        >
          Admission Form
        </motion.h2>

        {/* Inputs */}
        {[
          { name: "studentName", placeholder: "Student Name" },
          { name: "fatherName", placeholder: "Father Name" },
          { name: "phoneEmail", placeholder: "Phone or Email" },
          { name: "address", placeholder: "Address" },
          { name: "previousSchool", placeholder: "Previous School (optional)", optional: true },
        ].map((field) => (
          <motion.input
            key={field.name}
            variants={fieldVariants}
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={!field.optional}
            className="w-full p-3 mb-4 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        ))}

        {/* Class Applying (UP TO CLASS 10 ONLY) */}
        <motion.select
          variants={fieldVariants}
          name="classApplying"
          value={formData.classApplying}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select Class</option>
          <option value="Playgroup">Playgroup</option>
          <option value="Nursery">Nursery</option>
          <option value="KG">KG</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={`Class ${i + 1}`}>
              Class {i + 1}
            </option>
          ))}
        </motion.select>

        {classError && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {classError}
          </p>
        )}

        {/* Gender */}
        <motion.select
          variants={fieldVariants}
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 mb-5 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </motion.select>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-purple-700 cursor-pointer text-white font-semibold py-3 rounded-lg shadow-md hover:bg-purple-800 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Admission"}
        </motion.button>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}
      </motion.form>

      {/* Success Toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 right-6  bg-purple-600 text-white px-6 py-3 rounded-xl shadow-xl"
          >
            Admission Successfull
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdmissionForm;
