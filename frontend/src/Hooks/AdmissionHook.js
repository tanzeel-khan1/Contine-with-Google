import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admission";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const useAdmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admissions, setAdmissions] = useState([]);

  const user = getStoredUser();
  const userId = user?._id;

  const createAdmission = async (formData) => {
    if (!userId) {
      setError("User not logged in");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.data?.success) {
        setError("Failed to submit admission");
        return null;
      }

      setAdmissions((prev) => [...prev, res.data.data]);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit admission");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAdmissionStatus = async (admissionId, status) => {
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      setError("Invalid status value");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.patch(
        `${API_URL}/${admissionId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.data?.success) {
        setError("Failed to update status");
        return null;
      }

      setAdmissions((prev) =>
        prev.map((adm) =>
          adm._id === admissionId ? res.data.data : adm
        )
      );

      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    admissions,
    createAdmission,
    updateAdmissionStatus,
  };
};

export default useAdmission;
