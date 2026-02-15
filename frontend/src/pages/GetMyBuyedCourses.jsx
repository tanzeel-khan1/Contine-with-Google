import React, { useEffect, useState } from "react";
import useCourse from "../Hooks/Courses";
import TeacherLoader from "../components/TeacherLoader";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800";

const MyPurchasedCourses = () => {
  const { getMyBuyerCourses, loading, error } = useCourse();
  const [myCourses, setMyCourses] = useState([]);
  const [openCourseId, setOpenCourseId] = useState(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) return;

      try {
        const courses = await getMyBuyerCourses(user._id);
        setMyCourses(courses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchMyCourses();
  }, [getMyBuyerCourses]);

  const toggleAccordion = (id) => {
    setOpenCourseId(openCourseId === id ? null : id);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-purple-600 text-lg font-semibold animate-pulse">
          <TeacherLoader />
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-10 text-center">
          🎓 My Purchased Courses
        </h2>

        {myCourses.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No courses purchased yet.
          </div>
        ) : (
          <div className="space-y-6">
            {myCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-purple-100 rounded-2xl shadow-md overflow-hidden transition-all"
              >
                {/* Header */}
                <div
                  onClick={() => toggleAccordion(course._id)}
                  className="cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-purple-50 transition"
                >
                  <img
                    src={course.image || DEFAULT_IMAGE}
                    alt={course.title}
                    onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                    className="w-full sm:w-40 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-purple-700">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.description}
                    </p>
                    <span className="inline-block mt-2 bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <div className="text-purple-600 text-xl font-bold">
                    {openCourseId === course._id ? "−" : "+"}
                  </div>
                </div>

                {/* Accordion Body */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openCourseId === course._id
                      ? "max-h-500 p-6 pt-0"
                      : "max-h-0"
                  }`}
                >
                  {/* Syllabus */}
                  {course.syllabus && (
                    <div className="mb-6">
                      <h4 className="text-purple-600 font-semibold mb-2">
                        📚 Syllabus
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {course.syllabus.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Lessons */}
                  {course.lessons && (
                    <div className="mb-6">
                      <h4 className="text-purple-600 font-semibold mb-2">
                        🎥 Lessons
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {course.lessons.map((lesson) => (
                          <div
                            key={lesson._id}
                            className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition"
                          >
                            <p className="font-medium text-purple-700">
                              {lesson.title}
                            </p>
                            <a
                              href={lesson.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-purple-500 underline"
                            >
                              Watch Video
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quizzes */}
                  {course.quizzes && (
                    <div className="mb-6">
                      <h4 className="text-purple-600 font-semibold mb-2">
                        📝 Quizzes
                      </h4>
                      <div className="space-y-3">
                        {course.quizzes.map((quiz) => (
                          <div
                            key={quiz._id}
                            className="bg-purple-50 p-4 rounded-xl"
                          >
                            <p className="font-medium text-gray-700 mb-1">
                              {quiz.question}
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {quiz.options.map((opt, i) => (
                                <li key={i}>{opt}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {course.notes && (
                    <div className="bg-purple-100 text-purple-700 p-4 rounded-xl text-sm">
                      📌 {course.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPurchasedCourses;
