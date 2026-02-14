import express from "express";
import {
  applyForCourse,
  updateEnrollmentStatus,
  getAllEnrollments,
  getCourseStudents,
} from "../controllers/enrollmentController.js";

import { protect, } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🎓 Only Student Can Apply
router.post(
  "/apply",
  protect,
  applyForCourse
);

// 👑 Only Admin Can View Applications
router.get(
  "/",
  protect,
  getAllEnrollments
);

// 👑 Only Admin Can Approve / Reject
router.put(
  "/:id",
  protect,
  updateEnrollmentStatus
);
router.get("/:courseId/students", protect, getCourseStudents);

export default router;
