const mongoose = require("mongoose");

const Teacher = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    isClassTeacher: {
      type: Boolean,
      default: false,
    },
    salary: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time"],
      default: "full-time",
    },
    contact: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    classesAssigned: [
      {
        type: String,
      },
    ],
    subjects: [
      {
        type: String,
      },
    ],
    qualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", Teacher);
