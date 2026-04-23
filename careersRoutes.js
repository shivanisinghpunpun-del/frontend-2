const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

router.post("/", async (req, res) => {
  try {
    console.log("[POST] /api/careers body:", req.body);

    const { name, email, role, phone, message, resume } = req.body;

    if (!name || !email || !role || !phone) {
      return res.status(400).json({ message: "name, email, role, and phone are required" });
    }

    const career = new Career({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role.trim(),
      phone: String(phone).trim(),
      message: (message || "").trim(),
      resume: (resume || "").trim()
    });

    const savedCareer = await career.save();
    console.log("[POST] /api/careers saved id:", savedCareer._id.toString());

    return res.status(201).json({
      message: "Career saved successfully",
      careerId: savedCareer._id
    });
  } catch (err) {
    console.error("Career save error:", err);
    return res.status(500).json({ message: "Failed to save career", error: err.message });
  }
});

module.exports = router;
