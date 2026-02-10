const express = require("express");

const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

// CREATE Teacher
router.post("/", createTeacher);


// GET all Teachers
router.get("/all", getAllTeachers);

// GET Teacher by ID
router.get("/:id", getTeacherById);

// UPDATE Teacher
router.put("/:id", updateTeacher);

// DELETE Teacher
router.delete("/:id", deleteTeacher);

module.exports = router;
