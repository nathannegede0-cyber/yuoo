const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// 1. GET ALL ACTIVE ANNOUNCEMENTS (Auto-Hide Expired)
router.get("/", async (req, res) => {
  try {
    const today = new Date();

    // FILTER: Only show items where 'expiresAt' is GREATER than 'today'
    const news = await Announcement.find({ expiresAt: { $gte: today } }).sort({
      createdAt: -1,
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. CREATE NEW ANNOUNCEMENT
router.post("/", async (req, res) => {
  // We now expect 'expiresAt' from the frontend
  const { title, category, tag, date, expiresAt, location, content, isUrgent } =
    req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      category,
      tag,
      date,
      expiresAt, // <--- Save the expiration date
      location,
      content,
      isUrgent,
    });

    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE (Same as before)
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
