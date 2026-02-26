const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: String,

    // --- UPDATED INCOME SECTION ---
    age: { type: String, required: true },
    annualIncome: String, // Stores "$30k - $70k" (What user picked)
    incomeCategory: String, // Stores "Middle" (What Dashboard needs)
    // ------------------------------

    confessionFather: String,
    educationLevel: String,
    professionalSkills: [String],

    isMarried: { type: Boolean, default: false },
    spouse: { fullName: String, baptismalName: String },

    // --- UPDATED CHILDREN SECTION ---
    // This allows saving multiple kids with details
    children: [
      {
        name: String,
        age: String,
        baptismalName: String,
      },
    ],
    // --------------------------------

    password: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Member", MemberSchema, "members");
