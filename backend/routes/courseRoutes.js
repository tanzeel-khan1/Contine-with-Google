import express from "express";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getMyBuyerCourses
} from "../controllers/courseController.js";

import { protect, } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📘 Public
router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);

// 👑 Admin Only
router.post("/", protect,  createCourse);
router.put("/:id", protect,  updateCourse);
router.delete("/:id", protect, deleteCourse);
router.get("/:id/my", protect, getMyBuyerCourses);

export default router;
