import React, { useEffect } from "react";
import useCourse from "../Hooks/Courses";
import useEnrollment from "../Hooks/enrollment";
import { toast } from "sonner";
import TeacherLoader from "../components/TeacherLoader";

const Courses = () => {
  const { courses, loading, error, fetchCourses } = useCourse();
  const {
    applyForCourse,
    enrollments,
    fetchMyEnrollments,
    loading: enrollLoading,
  } = useEnrollment();

  useEffect(() => {
    fetchCourses();
    fetchMyEnrollments();
  }, []);

  const handleApply = async (courseId) => {
    const res = await applyForCourse(courseId);

    if (res?.success) {
      toast.success("Application submitted. Waiting for admin approval ");
      fetchMyEnrollments();
    } else {
      toast.error("Failed to apply for course ❌");
    }
  };

  const isApplied = (courseId) => {
    if (!Array.isArray(enrollments)) return null;

    return enrollments.find((enrollment) => enrollment.course._id === courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-extrabold text-purple-700 text-center mb-6 tracking-wide">
        All Courses
      </h2>
      <p className="text-center mb-3">Only For the School Student</p>

      {loading && (
        <p className="text-center">
          <TeacherLoader />
          <span>Courses</span>
        </p>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => {
          const applied = isApplied(course._id);

          return (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-purple-700 mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
              </div>

              <button
                onClick={() => handleApply(course._id)}
                disabled={applied || enrollLoading}
                className={`mt-auto py-3 rounded-xl text-white font-semibold transition  cursor-pointer
                  ${
                    applied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-gradient  hover:scale-105"
                  }
                `}
              >
                {applied
                  ? `Already ${applied.status}`
                  : enrollLoading
                    ? "Applying..."
                    : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
