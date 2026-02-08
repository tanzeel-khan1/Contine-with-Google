const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  classApplying: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  phoneEmail: { type: String, required: true },
  address: { type: String, required: true },
  previousSchool: { type: String },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  userId: { type: String, required: true } // 👈 Add userId
}, { timestamps: true });

module.exports = mongoose.model("Admission", admissionSchema);
