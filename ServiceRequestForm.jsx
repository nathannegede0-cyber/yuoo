import React, { useState } from "react";
import axios from "axios";
import {
  Church,
  Mail,
  User,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    serviceType: "Hall Rental", // Defaulting to Hall Rental for now
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const services = [
    "Prayer Request",
    "Holy Water (Tsebel)",
    "House Blessing",
    "Baptism Inquiry",
    "Counseling",
    "Membership Document",
    "Hall Rental",
    "Funeral Service",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Direct URL to avoid proxy issues
      const response = await axios.post(
        "http://localhost:5000/api/services",
        formData,
      );

      if (response.data.ok) {
        setStatus({
          type: "success",
          message:
            "Request sent successfully! Check your email for confirmation.",
        });

        // Clear the form
        setFormData({
          fullName: "",
          email: "",
          serviceType: "Hall Rental",
          message: "",
        });

        // Scroll to top to see message
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Submission Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Server connection failed. Is the backend running?";

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
        <div className="bg-amber-500 p-8 text-center">
          <Church className="mx-auto text-white mb-2" size={40} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Service Request
          </h2>
          <p className="text-amber-100 font-bold text-[10px] uppercase tracking-widest">
            How can we serve you today?
          </p>
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`mx-8 mt-20 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle size={30} />
            ) : (
              <AlertCircle size={30} />
            )}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <input
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Email Address
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
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="yourname@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Needed Service
            </label>
            <div className="relative">
              <Church
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none appearance-none font-bold text-slate-700"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Additional Details
            </label>
            <div className="relative">
              <MessageSquare
                className="absolute left-4 top-4 text-slate-400"
                size={18}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="Briefly describe your request..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl shadow-xl font-black flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 ${
              loading
                ? "bg-slate-300 text-slate-500"
                : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100"
            }`}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                Submit Request <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestForm;
