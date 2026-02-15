import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/enrollments";

const getToken = () => {
  return localStorage.getItem("token");
};

const useEnrollment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);

  // ✅ Student Apply For Course
  const applyForCourse = async (courseId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/apply`,
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.data?.success) {
        setError("Failed to apply for course");
        return null;
      }

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Admin Get All Enrollments
  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setEnrollments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch enrollments");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Admin Approve / Reject
  const updateEnrollmentStatus = async (id, status) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!res.data?.success) {
        setError("Failed to update status");
        return null;
      }

      // Update state
      setEnrollments((prev) =>
        prev.map((enrollment) =>
          enrollment._id === id ? res.data.enrollment : enrollment
        )
      );

      return res.data.enrollment;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
      return null;
    } finally {
      setLoading(false);
    }
  };
 const fetchMyEnrollments = async () => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.get(`${API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.data?.success) {
      setEnrollments(res.data.enrollments); // ✅ yeh important hai
    }

  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch enrollments");
  } finally {
    setLoading(false);
  }
};


  // ✅ Get Students of Specific Course
  const getCourseStudents = async (courseId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setStudents(res.data.students);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch students");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    enrollments,
    students,
    applyForCourse,
    fetchEnrollments,
    updateEnrollmentStatus,
    getCourseStudents,
    fetchMyEnrollments
  };
};

export default useEnrollment;
