const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");


exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { userId } = req.params;

    const newMessage = await Contact.create({
      userId,
      name,
      email,
      message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully ✅",
      data: newMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message ❌",
      error: error.message,
    });
  }
};




exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("userId", "name email") 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: contacts.length,
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts ❌",
      error: error.message,
    });
  }
};



exports.getContactsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const contacts = await Contact.find({ userId })
      .sort({ createdAt: -1 });

    if (!contacts.length) {
      return res.status(404).json({
        success: false,
        message: "No messages found for this user ❌",
      });
    }

    res.status(200).json({
      success: true,
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user messages ❌",
      error: error.message,
    });
  }
};



exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found ❌",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully 🗑️",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed ❌",
      error: error.message,
    });
  }
};
