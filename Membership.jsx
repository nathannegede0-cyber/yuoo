import React, { useState } from "react";
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
} from "lucide-react";

const Membership = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    annualIncome: "",
    confessionFather: "",
    educationLevel: "",
    professionalSkills: [],
    ministrySkills: [],
    isMarried: false,
    spouse: { fullName: "", baptismalName: "" },
    children: [],
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

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

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep((prev) => prev - 1);
  };

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

  const toggleSelection = (list, item, field) => {
    const updated = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setFormData({ ...formData, [field]: updated });
  };

  const validatePassword = (pass) => {
    if (
      !/[A-Z]/.test(pass) ||
      !/[0-9]/.test(pass) ||
      !/^[a-zA-Z0-9]+$/.test(pass)
    )
      return "Must have 1 Capital, 1 Number, and NO special characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let calculatedTier = "Prefer not to say";
    const income = formData.annualIncome;
    if (income === "$0 - $30k") calculatedTier = "Low";
    else if (income === "$30k - $70k") calculatedTier = "Middle";
    else if (income === "$70k - $120k" || income === "$120k+")
      calculatedTier = "High";

    const payload = { ...formData, incomeCategory: calculatedTier };

    try {
      const res = await fetch("http://localhost:5000/api/members/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert(data.message || "Submission failed.");
      }
    } catch (err) {
      alert("Server connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4 italic text-slate-900">
          Application Sent!
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
          Your membership application has been successfully submitted to Debre
          Selam.
        </p>
        <button
          className="bg-[#0f172a] text-[#ffc107] px-10 py-4 rounded-2xl font-black"
          onClick={() => (window.location.href = "/")}
        >
          RETURN HOME
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto font-['Roboto_Slab'] p-4">
      <div className="flex items-center justify-between mb-12 px-2 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black transition-all duration-500 ${step >= num ? "bg-blue-600 text-white shadow-xl scale-110" : "bg-white text-slate-300 border-2 border-slate-100"}`}
          >
            {num}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
      >
        {/* STEP 1: PERSONAL */}
        {step === 1 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-right-8">
            <div className="border-b pb-6">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                <UserPlus className="text-blue-600" /> Personal Identity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">
                  First Name
                </label>
                <input
                  required
                  placeholder="Ayele"
                  value={formData.firstName}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">
                  Last Name
                </label>
                <input
                  required
                  placeholder="Bekele"
                  value={formData.lastName}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    required
                    type="email"
                    placeholder="email@mail.com"
                    className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="(720) 000-0000"
                    className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">
                Age *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  required
                  type="number"
                  placeholder="Your Age"
                  className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">
                Address
              </label>
              <div className="relative">
                <Home
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  required
                  placeholder="Street, City, State"
                  className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <select
                required
                className="p-4 bg-slate-100 rounded-2xl font-bold border-none"
                value={formData.confessionFather}
                onChange={(e) =>
                  setFormData({ ...formData, confessionFather: e.target.value })
                }
              >
                <option value="">Select Confession Father...</option>
                {priests.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                className="p-4 bg-slate-100 rounded-2xl font-bold border-none"
                value={formData.annualIncome}
                onChange={(e) =>
                  setFormData({ ...formData, annualIncome: e.target.value })
                }
              >
                <option value="">Est. Annual Income...</option>
                <option>$0 - $30k</option>
                <option>$30k - $70k</option>
                <option>$70k - $120k</option>
                <option>$120k+</option>
              </select>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl flex justify-center items-center gap-3 mt-8 hover:bg-blue-600 hover:text-white transition-all"
            >
              Next: Family Structure <ArrowRight />
            </button>
          </div>
        )}

        {/* STEP 2: FAMILY */}
        {step === 2 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-right-8">
            <div className="border-b pb-6">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                <Users className="text-orange-500" /> Family Detail
              </h2>
            </div>
            <div className="flex items-center justify-between p-6 bg-orange-50/50 rounded-3xl border border-orange-100">
              <div>
                <h4 className="font-black text-slate-800 text-lg">
                  Marital Status
                </h4>
                <p className="text-sm text-slate-500 italic">
                  Are you currently married?
                </p>
              </div>
              <input
                type="checkbox"
                className="w-8 h-8 accent-orange-500"
                checked={formData.isMarried}
                onChange={(e) =>
                  setFormData({ ...formData, isMarried: e.target.checked })
                }
              />
            </div>
            {formData.isMarried && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border-2 border-dashed animate-in fade-in">
                <input
                  placeholder="Spouse Full Name"
                  className="p-4 bg-white border rounded-2xl font-bold"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      spouse: { ...formData.spouse, fullName: e.target.value },
                    })
                  }
                />
                <input
                  placeholder="Spouse Baptismal Name"
                  className="p-4 bg-white border rounded-2xl font-bold"
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
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h4 className="font-black text-xl text-slate-800">Children</h4>
                <button
                  type="button"
                  onClick={addChild}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Plus size={18} /> Add Child
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {formData.children.map((child, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-slate-50 rounded-2xl border"
                  >
                    <div className="md:col-span-6">
                      <input
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-xl"
                        value={child.name}
                        onChange={(e) => updateChild(i, "name", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <input
                        placeholder="Age"
                        className="w-full p-3 border rounded-xl"
                        value={child.age}
                        onChange={(e) => updateChild(i, "age", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input
                        placeholder="Baptismal"
                        className="w-full p-3 border rounded-xl"
                        value={child.baptismalName}
                        onChange={(e) =>
                          updateChild(i, "baptismalName", e.target.value)
                        }
                      />
                    </div>
                    <div className="md:col-span-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeChild(i)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold text-slate-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl"
              >
                Continue to Skills
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SKILLS */}
        {step === 3 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-right-8">
            <div className="border-b pb-6">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                <GraduationCap className="text-purple-600" /> Service &
                Professional
              </h2>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">
                Highest Education Level
              </label>
              <select
                className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold"
                value={formData.educationLevel}
                onChange={(e) =>
                  setFormData({ ...formData, educationLevel: e.target.value })
                }
              >
                <option value="">Select Level...</option>
                {educationOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 ml-2 flex items-center gap-2">
                <Briefcase size={16} /> Select your Skills (Multiple)
              </label>
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
                    className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${formData.professionalSkills.includes(skill) ? "bg-purple-600 text-white border-purple-600 shadow-lg scale-105" : "bg-white text-slate-400 border-slate-100 hover:border-purple-200"}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-10">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold text-slate-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl"
              >
                Next: Security
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PASSWORD */}
        {step === 4 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-right-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Secure Your Account
              </h2>
              <p className="text-slate-500 mt-2">
                Create a password to access your member dashboard later.
              </p>
            </div>
            <div className="space-y-4">
              <input
                required
                type="password"
                placeholder="Create Strong Password"
                className={`w-full p-6 bg-slate-50 border-2 rounded-3xl outline-none text-center text-2xl font-bold ${passwordError ? "border-red-300 ring-4 ring-red-50" : "border-transparent focus:ring-4 focus:ring-blue-50"}`}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setPasswordError(validatePassword(e.target.value));
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-sm font-bold text-center">
                  {passwordError}
                </p>
              )}
            </div>
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold text-slate-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!!passwordError || !formData.password}
                className="flex-1 py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl disabled:opacity-50"
              >
                Review Application
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW */}
        {step === 5 && (
          <div className="p-8 md:p-12 space-y-8 animate-in slide-in-from-bottom-8">
            <div className="text-center border-b pb-8">
              <h2 className="text-4xl font-black text-slate-900 italic">
                Review & Confirm
              </h2>
              <p className="text-slate-500">
                Please verify your details before final submission.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <h4 className="font-black text-blue-600 uppercase text-xs tracking-widest mb-4">
                  Contact Profile
                </h4>
                <p className="text-2xl font-bold text-slate-800">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-slate-600 font-medium">{formData.email}</p>
                <p className="text-slate-600 font-medium">{formData.phone}</p>
                <p className="text-slate-500 text-sm mt-4">
                  {formData.address}
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <h4 className="font-black text-purple-600 uppercase text-xs tracking-widest mb-4">
                  Professional & Church
                </h4>
                <p className="font-bold text-slate-700">
                  Father: {formData.confessionFather || "Not Selected"}
                </p>
                <p className="font-bold text-slate-700">
                  Edu: {formData.educationLevel}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.professionalSkills.map((s) => (
                    <span
                      key={s}
                      className="bg-white px-3 py-1 rounded-lg border text-xs font-bold text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {formData.children.length > 0 && (
              <div className="mt-6 p-6 bg-orange-50 rounded-3xl border border-orange-100">
                <h4 className="font-black text-orange-600 uppercase text-xs tracking-widest mb-2">
                  Children Added
                </h4>
                <ul className="list-disc pl-5 font-bold text-slate-700">
                  {formData.children.map((c, i) => (
                    <li key={i}>
                      {c.name} ({c.age} yrs)
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-4 pt-10">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-5 bg-slate-100 rounded-2xl font-bold text-slate-600"
              >
                Edit Info
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-5 bg-green-600 text-white rounded-2xl font-black text-2xl shadow-xl hover:bg-green-700 transition-all flex justify-center items-center gap-4"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Membership;
