import express from "express";
import {
  markAttendance,
  getUserAttendance,
  deleteAttendanceById,
  applyLeave,
  getPendingLeaves,
  leaveDecision,
  getAllAttendance,
  getUserAttendanceByUser,
} from "../controllers/attendanceController.js";

import { protect, } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", markAttendance);

router.get("/:userId", protect, getUserAttendance);
router.post("/apply-leave", applyLeave);
router.get("/pending-leaves", getPendingLeaves);
router.get("/", getAllAttendance);

router.delete(
  "/delete/:attendanceId",
  protect,
  deleteAttendanceById,
);
router.get("/user/:userId", getUserAttendanceByUser);
router.put("/decision/:attendanceId", protect, leaveDecision);

export default router;