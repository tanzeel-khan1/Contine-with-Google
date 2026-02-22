import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAttendance from "../Hooks/AttendanceHook";
import moment from "moment-timezone";
import React, { useState, useEffect } from "react";

const Create = () => {
  const {
    loading,
    error,
    markAttendance,
    getUserAttendance,
    attendance = [],
  } = useAttendance();

  const navigate = useNavigate();

  const [buttonDisabled, setButtonDisabled] = useState(true); // 👈 START disabled
  const [checking, setChecking] = useState(true); // 👈 NEW STATE

  useEffect(() => {
    const init = async () => {
      await getUserAttendance();
      setChecking(false); // 👈 attendance aa chuki
    };
    init();
  }, []);

 useEffect(() => {
  if (!attendance || attendance.length === 0) {
    setButtonDisabled(false);
    return;
  }

  const todayPK = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Karachi",
  });
  // en-CA → YYYY-MM-DD

  const alreadyMarked = attendance.some(att => {
    const attDatePK = new Date(att.createdAt).toLocaleDateString("en-CA", {
      timeZone: "Asia/Karachi",
    });

    return attDatePK === todayPK;
  });

  setButtonDisabled(alreadyMarked);
}, [attendance]);
 const handleMarkAttendance = async () => {
  if (buttonDisabled) return;

  const result = await markAttendance();

  if (result) {
    toast.success("Attendance marked successfully!");

    // 🔥 IMPORTANT: refetch attendance
    await getUserAttendance();

    setButtonDisabled(true);

    setTimeout(() => {
      navigate("/teacher");
    }, 1000);
  } else if (error) {
    toast.error(error);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>

        <button
          onClick={handleMarkAttendance}
          disabled={loading || checking || buttonDisabled}
          className="btn-gradient cursor-pointer px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checking
            ? "Checking Attendance..."
            : loading
            ? "Processing..."
            : buttonDisabled
            ? "Already Marked"
            : "Mark Present"}
        </button>
      </div>
    </div>
  );
};

export default Create;