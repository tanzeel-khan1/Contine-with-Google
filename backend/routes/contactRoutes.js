const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/send/:userId", contactController.sendContactMessage);
router.get("/", contactController.getAllContacts);
router.get("/user/:userId", contactController.getContactsByUserId);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
