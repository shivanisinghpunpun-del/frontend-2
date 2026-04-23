const express = require("express");
const router = express.Router();
const Technician = require("../models/Technician");

router.post("/", async (req, res) => {
  try {
    console.log("[POST] /api/technicians body:", req.body);

    const { fullName, phone, email, service, experience, pincodes, address, skills } = req.body;

    if (!fullName || !phone || !email || !service || !experience || !pincodes || !address || !skills) {
      return res.status(400).json({ message: "All technician fields are required" });
    }

    const technician = new Technician({
      fullName: fullName.trim(),
      phone: String(phone).trim(),
      email: email.toLowerCase().trim(),
      service: service.trim(),
      experience: experience.trim(),
      pincodes: pincodes.trim(),
      address: address.trim(),
      skills: skills.trim()
    });

    const savedTechnician = await technician.save();
    console.log("[POST] /api/technicians saved id:", savedTechnician._id.toString());

    return res.status(201).json({
      message: "Technician saved successfully",
      technicianId: savedTechnician._id
    });
  } catch (err) {
    console.error("Technician save error:", err);
    return res.status(500).json({ message: "Failed to save technician", error: err.message });
  }
});

module.exports = router;
