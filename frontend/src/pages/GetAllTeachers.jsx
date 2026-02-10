import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useTeacher from "../Hooks/TeacherHook";
import TeacherLoader from "../components/TeacherLoader";

const getInitials = (name = "") => {
  const words = name.trim().split(" ");
  return words.length > 1
    ? `${words[0][0]}${words[1][0]}`
    : words[0]?.[0];
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const GetAllTeachers = () => {
  const { loading, error, teachers, getAllTeachers } = useTeacher();

  useEffect(() => {
    getAllTeachers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-purple-600 font-medium">
        <TeacherLoader/>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-purple-700 text-center mb-10"
      >
        Teacher's
      </motion.h2>

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500">No teachers found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ scale: 1.03 }}
              className="border border-purple-200 rounded-2xl p-5 shadow-sm bg-white"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold">
                  {getInitials(teacher.name)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-700">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {teacher.employmentType}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-purple-600">
                    Qualification:
                  </span>{" "}
                  {teacher.qualification}
                </p>

                <p>
                  <span className="font-medium text-purple-600">
                    Experience:
                  </span>{" "}
                  {teacher.experience} years
                </p>

                <p>
                  <span className="font-medium text-purple-600">
                    Class Teacher:
                  </span>{" "}
                  {teacher.isClassTeacher ? "Yes" : "No"}
                </p>

                <p>
                  <span className="font-medium text-purple-600">
                    Subjects:
                  </span>{" "}
                  {teacher.subjects?.length
                    ? teacher.subjects.join(", ")
                    : "N/A"}
                </p>

                <p>
                  <span className="font-medium text-purple-600">
                    Classes:
                  </span>{" "}
                  {teacher.classesAssigned?.length
                    ? teacher.classesAssigned.join(", ")
                    : "N/A"}
                </p>

                <p>
                  <span className="font-medium text-purple-600">Salary:</span>{" "}
                  {teacher.salary} PKR
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllTeachers;
