import express from "express";
import {
  applyForCourse,
  updateEnrollmentStatus,
  getAllEnrollments,
  getCourseStudents,
  getMyEnrollments,
} from "../controllers/enrollmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyForCourse);

// 👑 Only Admin Can View Applications
router.get("/", protect, getAllEnrollments);

// 👑 Only Admin Can Approve / Reject
router.put("/:id", protect, updateEnrollmentStatus);
router.get("/my", protect, getMyEnrollments);

router.get("/:courseId/students", protect, getCourseStudents);

export default router;
