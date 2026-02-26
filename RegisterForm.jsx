import React, { useState } from "react";
import axios from "axios";
import {
  UserPlus,
  Mail,
  Phone,
  User,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Age: "", // Capitalized to match your Backend Model
    incomeCategory: "Prefer not to say",
    address: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      console.log("🚀 Sending Registration Data:", formData);

      // Direct URL to backend
      const response = await axios.post(
        "http://localhost:5000/api/members/register",
        formData,
      );

      if (response.data.ok) {
        setStatus({
          type: "success",
          message: "Welcome! Registration successful.",
        });
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          Age: "",
          incomeCategory: "Prefer not to say",
          address: "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("❌ Registration Error:", err);
      const errorMsg =
        err.response?.data?.message || "Registration failed. Server error.";

      setStatus({
        type: "error",
        message: errorMsg,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Roboto_Slab']">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center">
          <UserPlus className="mx-auto text-white mb-2" size={40} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            New Member Registration
          </h2>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mx-8 mt-6 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm border-2 ${
              status.type === "success"
                ? "bg-green-100 text-green-800 border-green-500"
                : "bg-red-100 text-red-800 border-red-500"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {status.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                First Name
              </label>
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
                placeholder="First Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                Last Name
              </label>
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Phone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <input
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
                placeholder="Street Address"
              />
            </div>
          </div>

          {/* --- AGE AND INCOME ROW --- */}
          <div className="grid grid-cols-2 gap-4">
            {/* 1. AGE INPUT */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                Age *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-3.5 text-slate-400"
                  size={18}
                />
                <input
                  required
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:outline-none"
                  placeholder="Age"
                />
              </div>
            </div>

            {/* 2. INCOME GROUP */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                Income Group
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-3.5 text-slate-400"
                  size={18}
                />
                <select
                  name="incomeCategory"
                  value={formData.incomeCategory}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl appearance-none border-2 border-transparent focus:border-blue-500 focus:outline-none"
                >
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Low">Low</option>
                  <option value="Middle">Middle</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
          {/* --- END ROW --- */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            {loading ? "Registering..." : "Become a Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
