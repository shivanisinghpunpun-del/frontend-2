const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/", async (req, res) => {
  try {
    console.log("[POST] /api/applications body:", req.body);

    const { name, email, role, phone, message, resume } = req.body;

    if (!name || !email || !role || !phone) {
      return res.status(400).json({ message: "name, email, role, and phone are required" });
    }

    const application = new Application({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role.trim(),
      phone: String(phone).trim(),
      message: (message || "").trim(),
      resume: (resume || "").trim()
    });

    const savedApplication = await application.save();
    console.log("[POST] /api/applications saved id:", savedApplication._id.toString());

    return res.status(201).json({
      message: "Application saved successfully",
      applicationId: savedApplication._id
    });
  } catch (err) {
    console.error("Application save error:", err);
    return res.status(500).json({ message: "Failed to save application", error: err.message });
  }
});

module.exports = router;
