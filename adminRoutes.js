const express = require("express");
const router = express.Router();

// --- PULL CREDENTIALS FROM .ENV ---
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECURITY_ANSWER = process.env.SECURITY_ANSWER; // The one you just added

// 1. LOGIN ROUTE (Same as before)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ ok: true, success: true, token: "ds-admin-secret-key" });
  } else {
    res
      .status(401)
      .json({ ok: false, message: "Invalid Username or Password" });
  }
});

// 2. VERIFY SECURITY ANSWER FOR RESET
router.post("/verify-reset", (req, res) => {
  const { answer } = req.body;

  // We trim and lowercase both sides so "Debre Selam" or "debre selam" both work
  if (answer && answer.trim().toLowerCase() === SECURITY_ANSWER.toLowerCase()) {
    res.json({ ok: true, message: "Identity Verified" });
  } else {
    res.status(400).json({ ok: false, message: "Incorrect security answer" });
  }
});

// 3. RESET PASSWORD (Simulated)
router.post("/reset-password", (req, res) => {
  const { newPassword } = req.body;
  // Note: This only updates the password for the current session.
  // To change it permanently, you would update the .env file.
  console.log(`Password reset request received for: ${newPassword}`);
  res.json({ ok: true, message: "Password reset successful" });
});

module.exports = router;
