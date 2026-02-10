import Teacher from "../models/TeacherProfile.js";

// CREATE Teacher
// export const createTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Teacher created successfully",
//       data: teacher,
//     });
//     const existingTeacher = await Teacher.findOne({ name: req.body.name });
// if (existingTeacher) {
//   return res.status(400).json({
//     message: "Is name ka teacher pehle se mojood hai"
//   });
// }

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const createTeacher = async (req, res) => {
  try {
    // 1️⃣ Pehle check
    const existingTeacher = await Teacher.findOne({ name: req.body.name });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Is name ka teacher pehle se mojood hai"
      });
    }

    // 2️⃣ Create new teacher
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all Teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Teacher
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
