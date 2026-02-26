import React, { useState } from "react";
import axios from "axios";
import {
  Heart,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Memorial = () => {
  // 1. Specific State for Memorial/Funeral Details
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    deceasedName: "",
    dateOfPassing: "",
    requestedDate: "",
    additionalNotes: "",
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

    // 2. Format the data for your Backend
    // We combine the extra details into the 'message' field so the backend saves it all.
    const payload = {
      fullName: formData.contactName,
      email: formData.contactEmail,
      serviceType: "Funeral Service", // <--- Sends this specific type to the database
      message: `
        === MEMORIAL / FUNERAL REQUEST ===
        Deceased Name: ${formData.deceasedName}
        Date of Passing: ${formData.dateOfPassing}
        Requested Service Date: ${formData.requestedDate}
        Contact Phone: ${formData.contactPhone}
        
        Additional Notes:
        ${formData.additionalNotes}
      `,
    };

    try {
      // 3. Send to your Service API
      const response = await axios.post(
        "http://localhost:5000/api/services",
        payload,
      );

      if (response.data.ok) {
        setStatus({
          type: "success",
          message: "Request received. The clergy will contact you shortly.",
        });

        // Clear Form
        setFormData({
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          deceasedName: "",
          dateOfPassing: "",
          requestedDate: "",
          additionalNotes: "",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Memorial Form Error:", err);
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Unable to send request. Please call the church directly.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Roboto_Slab']">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center">
        <Heart className="mx-auto mb-4 text-rose-400" size={60} />
        <h1 className="text-4xl font-black uppercase tracking-wider mb-4">
          Memorial Services
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg">
          "Blessed are those who mourn, for they will be comforted." (Matthew
          5:4)
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Left Column: Guidelines */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="text-amber-500" />
              Church Guidelines
            </h3>
            <ul className="space-y-4 text-slate-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="bg-amber-100 text-amber-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mt-1">
                  1
                </span>
                <span>
                  Services must be coordinated with the Head Priest at least 3
                  days in advance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="bg-amber-100 text-amber-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mt-1">
                  2
                </span>
                <span>
                  Please bring the death certificate and baptismal records (if
                  available).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="bg-amber-100 text-amber-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mt-1">
                  3
                </span>
                <span>
                  The church hall is available for the reception (Fitat) upon
                  request.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
            <h3 className="text-xl font-bold text-rose-900 mb-2">
              Need Immediate Assistance?
            </h3>
            <p className="text-rose-800 mb-4">
              For urgent pastoral care, please contact the church office
              directly.
            </p>
            <div className="flex items-center gap-3 text-rose-900 font-bold">
              <Phone size={20} /> (720) 998-5335
            </div>
          </div>
        </div>

        {/* Right Column: Request Form */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 relative">
          <h3 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">
            Arrange a Service
          </h3>

          {/* Success/Error Message Box */}
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Person Info */}
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">
                Your Contact Info
              </p>

              <div className="grid grid-cols-1 gap-4">
                <input
                  required
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Full Name"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Email"
                  />
                  <input
                    required
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Phone"
                  />
                </div>
              </div>
            </div>

            {/* Deceased Info */}
            <div className="space-y-4 pt-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">
                Service Details
              </p>

              <input
                required
                name="deceasedName"
                value={formData.deceasedName}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500"
                placeholder="Name of Deceased"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-2">
                    Date of Passing
                  </label>
                  <input
                    required
                    type="date"
                    name="dateOfPassing"
                    value={formData.dateOfPassing}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-2">
                    Requested Date
                  </label>
                  <input
                    type="date"
                    name="requestedDate"
                    value={formData.requestedDate}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-slate-500"
                  />
                </div>
              </div>

              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500"
                placeholder="Any special requests or questions?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 transition-all shadow-xl"
            >
              {loading ? "Sending Request..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Memorial;
