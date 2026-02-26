const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Urgent", "Event", "General"],
      default: "General",
    },
    tag: { type: String, default: "Notice" },

    // Display Date (e.g. "Sunday, Jan 19")
    date: { type: String, required: true },

    // --- NEW: The Magic Auto-Delete Date ---
    expiresAt: {
      type: Date,
      required: true,
    },
    // ---------------------------------------

    location: { type: String, default: "Main Sanctuary" },
    content: { type: String, required: true },
    isUrgent: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "Announcement",
  AnnouncementSchema,
  "announcements",
);
