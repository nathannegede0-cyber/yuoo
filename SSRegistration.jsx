import React, { useState } from "react";
import {
  ClipboardCheck,
  User,
  Phone,
  Mail,
  Calendar,
  ShieldAlert,
  Heart,
  ArrowRight,
} from "lucide-react";

const SSRegistration = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-6 text-center min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-blue-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck size={40} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 italic">
            ምዝገባው ተጠናቋል!
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-medium italic">
            Thank you for registering your child. The Sunday School
            administration will contact you soon with the start date and supply
            list.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#0f172a] text-[#ffc107] px-10 py-4 rounded-2xl font-bold"
          >
            Register Another Child
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 font-['Roboto_Slab']">
      {/* Header */}
      <section className="bg-[#0f172a] pt-32 pb-20 px-6 text-center text-white border-b-8 border-blue-600">
        <h1 className="text-5xl md:text-6xl font-black italic mb-4 text-white">
          የተማሪዎች ምዝገባ
        </h1>
        <p className="text-xl md:text-2xl text-blue-400 uppercase tracking-widest font-light">
          Student Registration Form
        </p>
      </section>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PARENT INFORMATION */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-2xl font-black text-[#0f172a] mb-8 flex items-center gap-3 italic">
              <User className="text-blue-600" /> Parent / Guardian Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  Full Name / ሙሉ ስም
                </label>
                <input
                  required
                  type="text"
                  className="ss-input"
                  placeholder="Abebe Kebede"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  Phone / ስልክ
                </label>
                <input
                  required
                  type="tel"
                  className="ss-input"
                  placeholder="(303) 000-0000"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  Email / ኢሜል
                </label>
                <input
                  required
                  type="email"
                  className="ss-input"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* CHILD INFORMATION */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-2xl font-black text-[#0f172a] mb-8 flex items-center gap-3 italic">
              <Heart className="text-red-500" /> Child's Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  Child's Full Name / የልጁ ሙሉ ስም
                </label>
                <input required type="text" className="ss-input" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  Age / እድሜ
                </label>
                <input required type="number" className="ss-input" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  School Grade / የትምህርት ክፍል
                </label>
                <input required type="text" className="ss-input" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-2">
                  Program / ፕሮግራም
                </label>
                <select className="ss-input">
                  <option>Year-Long Program (Saturdays & Sundays)</option>
                  <option>Summer Intensive Camp</option>
                  <option>Both Programs</option>
                </select>
              </div>
            </div>
          </div>

          {/* MEDICAL & SAFETY */}
          <div className="bg-red-50 p-8 md:p-12 rounded-[2.5rem] border border-red-100">
            <h3 className="text-2xl font-black text-red-900 mb-6 flex items-center gap-3 italic">
              <ShieldAlert /> Health & Safety
            </h3>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-red-400 ml-2">
                Allergies or Medical Conditions (If any)
              </label>
              <textarea
                className="w-full p-5 bg-white rounded-2xl border-none ring-1 ring-red-200 outline-none focus:ring-2 focus:ring-red-500 h-32 italic"
                placeholder="Please list any food allergies or medications..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f172a] text-white font-black text-2xl py-8 rounded-[2rem] hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-4 group"
          >
            Complete Registration{" "}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ss-input {
          width: 100%;
          padding: 1.25rem;
          background-color: #f8fafc;
          border-radius: 1.25rem;
          border: 1px solid #e2e8f0;
          outline: none;
          transition: all 0.2s;
        }
        .ss-input:focus {
          background-color: white;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
      `,
        }}
      />
    </div>
  );
};

export default SSRegistration;
