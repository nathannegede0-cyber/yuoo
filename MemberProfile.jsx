import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas"; // For ID Card Download
import {
  UserPlus,
  Users,
  Lock,
  CheckCircle,
  Plus,
  Trash2,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Phone,
  Mail,
  Home,
  Briefcase,
  Calendar,
  LogOut,
  Settings,
  Download,
  ShieldCheck,
} from "lucide-react";

const MemberProfile = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Initial data load
  const [isUpdating, setIsUpdating] = useState(false); // Submit button state
  const [formData, setFormData] = useState(null);

  // --- CONFIGURATION CONSTANTS (Matching Membership.jsx) ---
  const priests = ["መላከ ሰላም ቄሲስ ደጀኔ", "መሪጌታ ተቋም", "ቀሲስ ዘውዱ", "ቀሲስ አበበ"];
  const educationOptions = [
    "Doctorate",
    "Master's Degree",
    "Bachelor's Degree",
    "Associate Degree",
    "High School",
    "Other",
  ];
  const skillOptions = [
    "Electrician",
    "Plumber",
    "AC Technician",
    "Mechanic",
    "Web Design",
    "Marketing",
    "Nurse",
    "Accounting",
  ];

  // --- 1. INITIAL DATA FETCH ---
  useEffect(() => {
    const memberId = localStorage.getItem("memberId");

    if (!memberId) {
      navigate("/member-login");
      return;
    }

    const fetchMemberData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/members/profile/${memberId}`,
        );
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else {
          navigate("/member-login");
        }
      } catch (err) {
        console.error("Error fetching member:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberData();
  }, [navigate]);

  // --- 2. FORM HELPERS (Logic flow) ---
  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep((prev) => prev - 1);
  };

  // Handle Children List updates
  const addChild = () =>
    setFormData({
      ...formData,
      children: [
        ...formData.children,
        { name: "", age: "", baptismalName: "" },
      ],
    });
  const removeChild = (index) =>
    setFormData({
      ...formData,
      children: formData.children.filter((_, i) => i !== index),
    });
  const updateChild = (index, field, value) => {
    const updated = [...formData.children];
    updated[index][field] = value;
    setFormData({ ...formData, children: updated });
  };

  // Handle Skills Multi-select
  const toggleSelection = (list, item, field) => {
    const updated = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setFormData({ ...formData, [field]: updated });
  };

  // --- 3. SUBMIT UPDATE TO DATABASE ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const memberId = localStorage.getItem("memberId");

    try {
      const res = await fetch(
        `http://localhost:5000/api/members/update/${memberId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        alert("የአባልነት መረጃዎ በትክክል ተሻሽሏል! (Profile Updated!)");
        setStep(1); // Return to first step
      }
    } catch (err) {
      alert("Update failed. Check connection.");
    } finally {
      setIsUpdating(false);
    }
  };

  // --- 4. DIGITAL ID CARD GENERATOR ---
  const downloadIDCard = () => {
    const card = document.getElementById("membership-card");
    html2canvas(card, { scale: 3, backgroundColor: null }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${formData.firstName}_DebreSelam_ID.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  // --- 5. LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("memberId");
    navigate("/member-login");
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black">
        Loading Profile...
      </div>
    );
  if (!formData) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-['Roboto_Slab'] p-4 pb-20">
      {/* PROFILE HEADER */}
      <header className="max-w-5xl mx-auto mb-8 bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-2xl flex justify-between items-center border-b-4 border-[#ffc107]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#ffc107] text-[#0f172a] rounded-2xl flex items-center justify-center text-2xl font-black">
            {formData.firstName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-black">
              Welcome, {formData.firstName}!
            </h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              Active Member Portal
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={24} />
        </button>
      </header>

      {/* PROGRESS STEPPER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-12 px-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-black transition-all duration-500 ${step >= num ? "bg-blue-600 text-white shadow-lg scale-110" : "bg-white text-slate-300 border-2"}`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* MULTI-STEP UPDATE FORM */}
      <form
        onSubmit={handleUpdate}
        className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* STEP 1: PERSONAL IDENTITY */}
        {step === 1 && (
          <div className="p-10 space-y-8 animate-in slide-in-from-right-8">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 border-b pb-4">
              <UserPlus className="text-blue-600" /> Personal Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputBlock
                label="First Name"
                value={formData.firstName}
                onChange={(val) => setFormData({ ...formData, firstName: val })}
              />
              <InputBlock
                label="Last Name"
                value={formData.lastName}
                onChange={(val) => setFormData({ ...formData, lastName: val })}
              />
              <InputBlock
                label="Phone"
                value={formData.phone}
                icon={<Phone size={18} />}
                onChange={(val) => setFormData({ ...formData, phone: val })}
              />
              <InputBlock
                label="Age"
                type="number"
                value={formData.age}
                icon={<Calendar size={18} />}
                onChange={(val) => setFormData({ ...formData, age: val })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectBlock
                label="Confession Father"
                value={formData.confessionFather}
                options={priests}
                onChange={(val) =>
                  setFormData({ ...formData, confessionFather: val })
                }
              />
              <SelectBlock
                label="Income Bracket"
                value={formData.annualIncome}
                options={["$0 - $30k", "$30k - $70k", "$70k - $120k", "$120k+"]}
                onChange={(val) =>
                  setFormData({ ...formData, annualIncome: val })
                }
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl flex justify-center items-center gap-3"
            >
              Continue: Family <ArrowRight />
            </button>
          </div>
        )}

        {/* STEP 2: FAMILY UNIT */}
        {step === 2 && (
          <div className="p-10 space-y-8 animate-in slide-in-from-right-8">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 border-b pb-4">
              <Users className="text-orange-500" /> Family Unit
            </h2>
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border">
              <h4 className="font-black text-slate-800">Married?</h4>
              <input
                type="checkbox"
                className="w-8 h-8 accent-blue-600"
                checked={formData.isMarried}
                onChange={(e) =>
                  setFormData({ ...formData, isMarried: e.target.checked })
                }
              />
            </div>
            {formData.isMarried && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-blue-50/30 rounded-3xl border-2 border-dashed border-blue-100">
                <input
                  placeholder="Spouse Full Name"
                  className="p-4 rounded-xl border font-bold"
                  value={formData.spouse.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      spouse: { ...formData.spouse, fullName: e.target.value },
                    })
                  }
                />
                <input
                  placeholder="Spouse Baptismal Name"
                  className="p-4 rounded-xl border font-bold"
                  value={formData.spouse.baptismalName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      spouse: {
                        ...formData.spouse,
                        baptismalName: e.target.value,
                      },
                    })
                  }
                />
              </div>
            )}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-xl">Children</h4>
                <button
                  type="button"
                  onClick={addChild}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                >
                  <Plus size={18} /> Add Child
                </button>
              </div>
              {formData.children.map((child, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border"
                >
                  <input
                    placeholder="Name"
                    className="flex-1 p-3 border rounded-xl"
                    value={child.name}
                    onChange={(e) => updateChild(i, "name", e.target.value)}
                  />
                  <input
                    placeholder="Age"
                    className="w-24 p-3 border rounded-xl"
                    value={child.age}
                    onChange={(e) => updateChild(i, "age", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeChild(i)}
                    className="text-red-400"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl"
              >
                Continue: Skills
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SKILLS (Selection Logic) */}
        {step === 3 && (
          <div className="p-10 space-y-8 animate-in slide-in-from-right-8">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 border-b pb-4">
              <GraduationCap className="text-purple-600" /> Skills & Service
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() =>
                    toggleSelection(
                      formData.professionalSkills,
                      skill,
                      "professionalSkills",
                    )
                  }
                  className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${formData.professionalSkills.includes(skill) ? "bg-purple-600 text-white border-purple-600 shadow-lg" : "bg-white text-slate-400 hover:border-purple-200"}`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-10">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl"
              >
                Review Changes
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DIGITAL ID CARD GENERATOR */}
        {step === 4 && (
          <div className="p-10 space-y-8 animate-in slide-in-from-right-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900">
                Your Membership Card
              </h2>
              <p className="text-slate-500">
                Download your verified digital ID.
              </p>
            </div>

            <div
              id="membership-card"
              className="relative w-full max-w-sm mx-auto h-56 bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl p-8 text-white border-[4px] border-[#ffc107]"
            >
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[#ffc107]">
                      Debre Selam
                    </h4>
                    <p className="text-[7px] text-slate-400 italic">
                      E.O.C.T Parish Member
                    </p>
                  </div>
                  <CheckCircle className="text-[#ffc107]" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold">
                    MEMBER SINCE {new Date(formData.createdAt).getFullYear()}
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[7px] font-bold text-slate-500">
                      ID NUMBER
                    </p>
                    <p className="text-xs font-mono font-bold text-[#ffc107]">
                      #DS-{formData._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <div className="bg-[#ffc107] text-[#0f172a] text-[8px] px-3 py-1 rounded-full font-black">
                    ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={downloadIDCard}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-[#0f172a] transition-all"
              >
                <Download size={20} /> Download Card (.PNG)
              </button>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl"
              >
                Final Review
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: FINAL SAVE */}
        {step === 5 && (
          <div className="p-10 space-y-8 animate-in slide-in-from-bottom-8">
            <div className="text-center border-b pb-8">
              <h2 className="text-4xl font-black text-slate-900 italic">
                Final Confirmation
              </h2>
              <p className="text-slate-500 font-bold">
                Confirm your details before updating the church records.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <h4 className="text-xs font-black text-blue-600 uppercase mb-2">
                  Profile Info
                </h4>
                <p className="text-xl font-bold">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-slate-500">{formData.email}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <h4 className="text-xs font-black text-purple-600 uppercase mb-2">
                  Service
                </h4>
                <p className="font-bold">
                  {formData.professionalSkills.length} Skills Listed
                </p>
                <p className="text-slate-500">{formData.confessionFather}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-10">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold"
              >
                Edit More
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 py-5 bg-green-600 text-white rounded-2xl font-black text-2xl shadow-xl flex justify-center items-center gap-4"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Profile Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// --- SUB-COMPONENTS FOR CLEANER CODE ---
const InputBlock = ({ label, value, onChange, icon, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-2">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-4 text-slate-400">{icon}</div>
      )}
      <input
        type={type}
        className={`w-full p-4 ${icon ? "pl-12" : ""} bg-slate-50 border-none rounded-2xl font-bold`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

const SelectBlock = ({ label, value, options, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-2">{label}</label>
    <select
      className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default MemberProfile;
