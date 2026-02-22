import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const useAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);

  const user = getStoredUser();
  const userId = user?._id;
  const token = localStorage.getItem("token");

  // MARK ATTENDANCE
  const markAttendance = async () => {
    if (!userId) {
      setError("User not logged in");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/mark`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to mark attendance");
        return null;
      }

      setAttendance((prev) => [...prev, res.data.attendance]);
      return res.data.attendance;
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // GET USER ATTENDANCE
  const getUserAttendance = async () => {
    if (!userId) {
      setError("User not logged in");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to fetch attendance");
        return null;
      }

      setAttendance(res.data.attendance);
      return res.data.attendance;
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // APPLY LEAVE
  const applyLeave = async (startDate, endDate, reason) => {
    if (!userId) {
      setError("User not logged in");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/leave`,
        { userId, startDate, endDate, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to apply leave");
        return null;
      }

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // GET PENDING LEAVES (ADMIN)
  const getPendingLeaves = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/pending-leaves`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to fetch leaves");
        return null;
      }

      setPendingLeaves(res.data.leaves);
      return res.data.leaves;
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // APPROVE/REJECT LEAVE (ADMIN)
  const leaveDecision = async (attendanceId, decision) => {
    if (!["approved", "rejected"].includes(decision)) {
      setError("Invalid decision value");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.patch(
        `${API_URL}/leave/${attendanceId}`,
        { decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to update leave decision");
        return null;
      }

      // Update pending leaves state
      setPendingLeaves((prev) =>
        prev.filter((leave) => leave._id !== attendanceId)
      );

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    attendance,
    pendingLeaves,
    markAttendance,
    getUserAttendance,
    applyLeave,
    getPendingLeaves,
    leaveDecision,
  };
};

export default useAttendance;