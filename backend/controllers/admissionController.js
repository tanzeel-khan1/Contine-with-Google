const Admission = require("../models/Admission");

const createAdmission = async (req, res) => {
  try {
    const { userId } = req.params; 
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required in params" });
    }

    const admissionData = { ...req.body, userId };
    const admission = await Admission.create(admissionData);

    res.status(201).json({
      success: true,
      message: "Admission form submitted",
      data: admission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Update Admission Status
// PATCH /api/admission/:admissionId/status
const updateAdmissionStatus = async (req, res) => {
  try {
    const { admissionId } = req.params;
    const { status } = req.body; // expected: "Approved" or "Rejected"

    if (!status || !["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'Pending', 'Approved', or 'Rejected'"
      });
    }

    const admission = await Admission.findById(admissionId);
    if (!admission) {
      return res.status(404).json({ success: false, message: "Admission not found" });
    }

    admission.status = status;
    await admission.save();

    res.status(200).json({
      success: true,
      message: `Admission status updated to ${status}`,
      data: admission
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAdmission,
  updateAdmissionStatus
};
