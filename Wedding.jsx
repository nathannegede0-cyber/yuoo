import React, { useState } from "react";
import { Heart, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

// 1. Success Message Component (Must be defined to avoid ReferenceErrors)
const SuccessMessage = ({ title }) => (
  <div className="text-center py-20 animate-in zoom-in duration-500 bg-white rounded-[3rem] shadow-xl border border-slate-100">
    <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle size={48} />
    </div>
    <h2 className="text-4xl font-black mb-4 italic text-slate-900">{title}!</h2>
    <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
      Your wedding application has been submitted. Our clergy will contact you
      to schedule pre-marital counseling.
    </p>
    <button
      className="bg-[#0f172a] text-[#ffc107] px-10 py-4 rounded-2xl font-black"
      onClick={() => (window.location.href = "/")}
    >
      RETURN TO HOME
    </button>
  </div>
);

// 2. Main Wedding Component
const Wedding = () => {
  // Renamed from Marriage to Wedding to match export
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    isHolyCommunion: false,
    bestMan: "",
    maidOfHonor: "",
    contactPhone: "",
  });

  if (submitted) return <SuccessMessage title="Wedding Request Sent" />;

  return (
    <div className="w-full max-w-5xl mx-auto font-['Roboto_Slab']">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        {step === 1 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-right-8">
            <div className="border-b pb-6">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                <Heart className="text-red-500" /> Groom & Bride Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 bg-blue-50/30 rounded-3xl">
                <h4 className="font-black text-blue-900 uppercase text-xs">
                  Groom (ሙሽራው)
                </h4>
                <input
                  placeholder="Groom's Full Name"
                  className="w-full p-4 bg-white rounded-xl border shadow-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, groomName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-4 p-6 bg-pink-50/30 rounded-3xl">
                <h4 className="font-black text-pink-900 uppercase text-xs">
                  Bride (ሙሽራይቱ)
                </h4>
                <input
                  placeholder="Bride's Full Name"
                  className="w-full p-4 bg-white rounded-xl border shadow-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, brideName: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl"
            >
              Next: Wedding Logistics <ArrowRight className="inline ml-2" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-right-8">
            <div className="border-b pb-6 text-center">
              <h2 className="text-3xl font-black text-slate-900">
                Ceremony Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-slate-600">Wedding Date</label>
                <input
                  type="date"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, weddingDate: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mt-8">
                <span className="font-bold text-slate-700">
                  Holy Communion (በቁርባን)?
                </span>
                <input
                  type="checkbox"
                  className="w-6 h-6 accent-blue-600"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isHolyCommunion: e.target.checked,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <input
                placeholder="Best Man (ሚዜ)"
                className="p-4 bg-slate-50 rounded-2xl font-bold"
                onChange={(e) =>
                  setFormData({ ...formData, bestMan: e.target.value })
                }
              />
              <input
                placeholder="Maid of Honor"
                className="p-4 bg-slate-50 rounded-2xl font-bold"
                onChange={(e) =>
                  setFormData({ ...formData, maidOfHonor: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-xl"
              >
                Submit Marriage Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wedding; // Matches the function name above
