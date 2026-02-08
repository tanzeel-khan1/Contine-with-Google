const express = require("express");
const {
  createAdmission,
  updateAdmissionStatus
} = require("../controllers/admissionController");

const router = express.Router();

router.post("/:userId", createAdmission);
router.patch("/:admissionId/status", updateAdmissionStatus);


module.exports = router;
