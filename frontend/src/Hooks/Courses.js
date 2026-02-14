import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

const getToken = () => {
  return localStorage.getItem("token");
};

const useCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  // ✅ Get All Courses (Public)
  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL);

      if (!res.data?.success) {
        setError("Failed to fetch courses");
        return;
      }

      setCourses(res.data.courses);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get Single Course
  const getSingleCourse = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch course");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create Course (Admin)
  const createCourse = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError("Failed to create course");
        return null;
      }

      setCourses((prev) => [...prev, res.data.course]);
      return res.data.course;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Course (Admin)
  const updateCourse = async (id, formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError("Failed to update course");
        return null;
      }

      setCourses((prev) =>
        prev.map((course) =>
          course._id === id ? res.data.course : course
        )
      );

      return res.data.course;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Course (Admin)
  const deleteCourse = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError("Failed to delete course");
        return false;
      }

      setCourses((prev) =>
        prev.filter((course) => course._id !== id)
      );

      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete course");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    courses,
    fetchCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

export default useCourse;
