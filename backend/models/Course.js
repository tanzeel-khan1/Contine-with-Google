import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Course description is required"],
    },

    category: {
      type: String,
      enum: ["Primary", "Secondary", "Higher Secondary", "Diploma", "Other"],
      required: true,
    },

    syllabus: {
      type: [String], // List of topics/modules
      required: true,
    },

    lessons: {
      type: [
        {
          title: { type: String, required: true },
          content: { type: String }, // Video URL, PDF link, text, etc.
          resources: [String], // Additional files, links
        }
      ],
      required: true,
    },

    quizzes: {
      type: [
        {
          question: { type: String, required: true },
          options: [String],
          answer: { type: String, required: true },
        }
      ],
      default: [],
    },

    notes: {
      type: String,
      trim: true,
    },

    image: {
      type: String, // Cover image
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // ✅ New field: track who bought the course
    studentsEnrolled: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String },
        email: { type: String },
        purchaseDate: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
