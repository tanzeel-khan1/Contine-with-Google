import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/teachers";

// token helper
const getToken = () => {
  return localStorage.getItem("token");
};

const useTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]);

  // 🔹 Create Teacher
  const createTeacher = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Teacher create failed");
        return null;
      }

      setTeachers((prev) => [...prev, res.data.data]);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Teacher create failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get All Teachers
//   const getAllTeachers = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get(API_URL,"/all", {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });

//       if (!res.data?.success) {
//         setError("Failed to fetch teachers");
//         return [];
//       }

//       setTeachers(res.data.data);
//       return res.data.data;
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch teachers");
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };
const getAllTeachers = async () => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.data?.success) {
      setError("Failed to fetch teachers");
      return [];
    }

    setTeachers(res.data.data);
    return res.data.data;
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch teachers");
    return [];
  } finally {
    setLoading(false);
  }
};

  // 🔹 Get Teacher By ID
  const getTeacherById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError("Teacher not found");
        return null;
      }

      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Teacher not found");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update Teacher
  const updateTeacher = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError("Teacher update failed");
        return null;
      }

      setTeachers((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );

      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Teacher update failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Teacher
  const deleteTeacher = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.data?.success) {
        setError("Teacher delete failed");
        return false;
      }

      setTeachers((prev) => prev.filter((t) => t._id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Teacher delete failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    teachers,
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
  };
};

export default useTeacher;
