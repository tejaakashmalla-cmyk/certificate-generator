const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Allow any email and password
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET || "secret123",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      admin: {
        username: "Demo Admin",
        email: email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;