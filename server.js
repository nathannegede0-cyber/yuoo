const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

// Import Route Files
const announcementRoutes = require("./routes/announcementRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

// --- 1. Middleware ---
app.use(
  cors({
    origin: "http://localhost:5173", // Your Vite Frontend URL
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }),
);
app.use(express.json());

// --- 2. Database Connection ---
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI.trim())
  .then(() => console.log("✅ MongoDB connected: DSC Database"))
  .catch((err) => console.error("❌ Database Error:", err.message));

// --- 3. Global Email Transporter ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 4. Routes Configuration ---

// All Announcement routes (News/Alerts)
app.use("/api/announcements", announcementRoutes);

// All Member routes (Login/Register/Profile)
app.use("/api/members", memberRoutes);

// Admin Login (Standalone route for security)
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    return res.json({
      ok: true,
      success: true,
      token: "admin-secure-session-2026",
    });
  }
  res.status(401).json({ ok: false, message: "Invalid Admin Credentials" });
});

// Service Request Logic (Hall Rental, etc.)
const Service = require("./models/Service");
app.post("/api/services", async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    // Optional: Add email notification here if needed
    res.status(201).json({ ok: true, message: "Service request received!" });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Health Check
app.get("/api/health", (req, res) =>
  res.json({ status: "Online", timestamp: new Date() }),
);

// --- 5. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
