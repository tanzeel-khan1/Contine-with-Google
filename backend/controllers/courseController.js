import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";


export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBuyerCourses = async (req, res) => {
  try {
    // 🔹 Get user ID from request params
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required in params.",
      });
    }

    // 🔹 Find approved enrollments for this user
    const enrollments = await Enrollment.find({
      student: userId,
      status: "approved",
    }).populate("course");

    // 🔹 Extract only course data
    const courses = enrollments.map((enrollment) => enrollment.course);

    res.status(200).json({
      success: true,
      totalCourses: courses.length,
      courses,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
