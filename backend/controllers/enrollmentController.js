import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";


// ✅ Student Apply for Course
export const applyForCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // 🔹 Check courseId provided
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // 🔹 Validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Course ID",
      });
    }

    // 🔹 Check course exists & active
    const course = await Course.findOne({
      _id: courseId,
      isActive: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or inactive",
      });
    }

    // 🔹 Check if already applied
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: `You have already ${existingEnrollment.status} this course`,
      });
    }

    // 🔹 Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
      status: "pending", // default
    });

    res.status(201).json({
      success: true,
      message: "Application submitted. Waiting for admin approval.",
      data: enrollment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ Admin Approve / Reject
export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.status = status;
    await enrollment.save();

    res.json({
      success: true,
      message: `Enrollment ${status}`,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Admin Get All Applications
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email")
      .populate("course", "title");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    const students = await Enrollment.find({
      course: courseId,
      status: "approved"
    })
    .populate("student", "name email")
    .populate("course", "title");

    res.json({
      totalStudents: students.length,
      students
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Student - Get My Enrollments
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
      .populate("course", "title description")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
