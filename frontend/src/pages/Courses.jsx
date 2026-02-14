import React, { useEffect } from "react";
import useCourse from "../Hooks/Courses";

const Courses = () => {
  const { courses, loading, error, fetchCourses } = useCourse();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-extrabold text-purple-700 text-center mb-10 tracking-wide">
        All Courses
      </h2>

      {loading && <p className="text-purple-500 text-center text-lg">Loading courses...</p>}
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {courses.length === 0 && !loading && (
        <p className="text-gray-400 text-center text-lg">No courses available</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-6">{course.description}</p>
            </div>
            <button className="mt-auto bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
