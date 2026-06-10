import React, { useEffect } from "react";
import useExam from "../Hooks/Exams";
import { motion } from "framer-motion";
import { CalendarDays, FileText, Clock3, BookOpen } from "lucide-react";

const Exams = () => {
  const { exams, loading, error, getAllExams } = useExam();

  useEffect(() => {
    getAllExams();
  }, [getAllExams]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl shadow-md">
          {error}
        </div>
      </div>
    );
  }
  

  const totalExams = exams.length;

  const upcomingExams = exams.filter((exam) => exam.status === "upcoming").length;

  return (
    <div className="min-h-screen p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 p-8 md:p-10 mb-10 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Examination Portal
            </h1>
            <p className="text-purple-100 mt-3 text-lg">
              Track your upcoming exams, schedules, and important dates.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        {/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  <motion.div whileHover={{ y: -6 }} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">Total Exams</p>
        <h2 className="text-4xl font-bold text-gray-800 mt-2">{totalExams}</h2>
      </div>
      <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center">
        <FileText size={28} className="text-violet-600" />
      </div>
    </div>
  </motion.div>

  <motion.div whileHover={{ y: -6 }} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">Upcoming Exams</p>
        <h2 className="text-4xl font-bold text-blue-600 mt-2">{upcomingExams}</h2>
      </div>
      <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
        <Clock3 size={28} className="text-blue-600" />
      </div>
    </div>
  </motion.div>
</div>
        {/* Exams List */}
        {exams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[32px] shadow-lg p-12 text-center"
          >
            <BookOpen size={60} className="mx-auto text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-700 mt-5">No Exams Scheduled</h3>
            <p className="text-gray-500 mt-2">
              Your upcoming exams will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {exams.map((exam, index) => {
              const daysLeft = Math.ceil((new Date(exam.startDate) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Status Bar */}
                  <div className={`h-2 ${exam.status === "completed" ? "bg-green-500" : exam.status === "ongoing" ? "bg-yellow-500" : "bg-blue-500"}`} />

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{exam.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${exam.status === "completed" ? "bg-green-100 text-green-700" : exam.status === "ongoing" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                        {exam.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {exam.description || "No description available"}
                    </p>

                    <div className="mt-6 border-t pt-5 space-y-4">
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                          <CalendarDays size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Start Date</p>
                          <p className="font-medium">{new Date(exam.startDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                          <CalendarDays size={18} className="text-red-600" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">End Date</p>
                          <p className="font-medium">{new Date(exam.endDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;