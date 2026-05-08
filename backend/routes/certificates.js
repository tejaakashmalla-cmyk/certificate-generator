const express = require("express");
const Certificate = require("../models/Certificate");

const router = express.Router();

// CREATE CERTIFICATE
router.post("/", async (req, res) => {
  try {
    const { fullName, role, eventName, date } = req.body;

    const certificate = await Certificate.create({
      certificateId: "AMAN-" + Date.now(),
      fullName,
      role,
      eventName,
      date,
    });

    res.status(201).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET ALL CERTIFICATES
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET SINGLE CERTIFICATE
// GET SINGLE CERTIFICATE
router.get("/:id", async (req, res) => {
  try {
    let certificate;

    // FIRST TRY BY MONGODB _id
    if (req.params.id.length === 24) {
      certificate = await Certificate.findById(
        req.params.id
      );
    }

    // IF NOT FOUND, TRY BY certificateId
    if (!certificate) {
      certificate = await Certificate.findOne({
        certificateId: req.params.id,
      });
    }

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// DELETE CERTIFICATE
router.delete("/:id", async (req, res) => {
  try {
    const deletedCertificate =
      await Certificate.findByIdAndDelete(
        req.params.id
      );

    if (!deletedCertificate) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      message:
        "Certificate deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;