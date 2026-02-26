const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// --- A. REGISTER NEW MEMBER ---
router.post("/register", async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res
      .status(201)
      .json({ ok: true, message: "Member registered successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ ok: false, message: "Email already exists in our system." });
    }
    res.status(500).json({ ok: false, message: err.message });
  }
});

// --- B. MEMBER LOGIN ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find member by email (case-insensitive)
    const member = await Member.findOne({ email: email.toLowerCase().trim() });

    if (!member) {
      return res
        .status(404)
        .json({ ok: false, message: "Member account not found." });
    }

    // Compare plain-text password (matches your current setup)
    if (member.password !== password) {
      return res
        .status(401)
        .json({ ok: false, message: "Incorrect password." });
    }

    // Success: Send back member data without the password
    const { password: _, ...memberData } = member._doc;
    res.json({ ok: true, success: true, member: memberData });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Server login error." });
  }
});

// --- C. GET ALL MEMBERS (For Admin Dashboard) ---
router.get("/", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members); // Admin dashboard expects the array directly
  } catch (err) {
    res.status(500).json({ message: "Error fetching member list." });
  }
});

// --- D. GET SINGLE PROFILE ---
router.get("/profile/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).select("-password");
    if (!member) return res.status(404).json({ message: "Profile not found." });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile." });
  }
});

// --- E. UPDATE PROFILE ---
router.put("/update/:id", async (req, res) => {
  try {
    // Recalculate Income Tier automatically based on their selection
    let calculatedTier = "Prefer not to say";
    const income = req.body.annualIncome;
    if (income === "$0 - $30k") calculatedTier = "Low";
    else if (income === "$30k - $70k") calculatedTier = "Middle";
    else if (income === "$70k - $120k" || income === "$120k+")
      calculatedTier = "High";

    const updatedData = { ...req.body, incomeCategory: calculatedTier };

    const member = await Member.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.json({ ok: true, success: true, member });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Update failed." });
  }
});

module.exports = router;
