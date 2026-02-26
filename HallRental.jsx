import React, { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  Users,
  Info,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

const HallRental = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="border-b-4 border-[#ffc107] pb-6">
        <h2 className="text-4xl font-black text-slate-900 italic flex items-center gap-3">
          <Building2 className="text-blue-600" size={40} /> የአዳራሽ ኪራይ መጠየቂያ
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">
          Responsible Party & Event Agreement
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT COLUMN: THE FORM */}
        <div className="flex-[1.6] space-y-10">
          {/* SECTION 1: RESPONSIBLE PERSON (THE CONTRACTEE) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-l-4 border-blue-600 pl-4">
              <User className="text-blue-600" />
              <h3 className="font-black text-xl text-slate-800 italic">
                Responsible Person (ተጠያቂው አካል)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2">
                Full Residential Address
              </label>
              <div className="relative">
                <Home
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  required
                  type="text"
                  className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500"
                  placeholder="Street, City, State, Zip"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    required
                    type="email"
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    required
                    type="tel"
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500"
                    placeholder="(303) 000-0000"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: EVENT LOGISTICS */}
          <section className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 border-l-4 border-orange-500 pl-4">
              <Calendar className="text-orange-500" />
              <h3 className="font-black text-xl text-slate-800 italic">
                Event Details (የዝግጅቱ መረጃ)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">
                  Event Type
                </label>
                <input
                  placeholder="e.g. Wedding Reception"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-orange-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">
                  Guests (Max 300)
                </label>
                <div className="relative">
                  <Users
                    className="absolute left-4 top-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="number"
                    className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none"
                    placeholder="150"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: LEGAL ACKNOWLEDGEMENT */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem] border-4 border-blue-600/20 space-y-6">
            <h4 className="font-black text-[#ffc107] flex items-center gap-3 text-xl italic">
              <ShieldCheck size={28} /> Legal Agreement
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                "I certify that the information provided above is true and I am the legally responsible party.",
                "I understand that a refundable $500 security deposit is required to confirm the date.",
                "I agree to adhere to the Church's standards of conduct and modesty.",
                "I accept full financial liability for any damage caused to the facility.",
              ].map((text, i) => (
                <label
                  key={i}
                  className="flex gap-4 items-start cursor-pointer group p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 accent-[#ffc107]"
                  />
                  <p className="text-sm text-slate-300 font-medium leading-relaxed group-hover:text-white">
                    {text}
                  </p>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDE NOTES & PRICING */}
        <div className="flex-1">
          <div className="bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] shadow-2xl sticky top-28 space-y-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 italic flex items-center gap-2">
                <Info className="text-blue-600" /> Rental Policy
              </h3>
              <ul className="space-y-5 text-sm font-medium text-slate-600">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-black">01.</span>
                  <span>
                    The Hall must be booked at least <strong>4 weeks</strong> in
                    advance.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-black">02.</span>
                  <span>
                    No <strong>alcohol</strong> or <strong>smoking</strong> is
                    permitted anywhere on Church grounds.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-black">03.</span>
                  <span>
                    The event must conclude and cleaning must be finished by{" "}
                    <strong>Midnight</strong>.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                Fee Overview
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                  <span className="font-bold text-slate-700">
                    Base Hall Rate
                  </span>
                  <span className="font-black text-blue-600">$800</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                  <span className="font-bold text-slate-700">
                    Security Deposit
                  </span>
                  <span className="font-black text-blue-600">$500</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 italic leading-tight">
                *Additional fees apply for kitchen use, sound system, or
                extended hours.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl hover:bg-blue-700 hover:text-white transition-all shadow-xl active:scale-95"
            >
              SUBMIT REQUEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallRental;
