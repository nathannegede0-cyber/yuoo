import React from "react";
import { Droplets, Calendar, BookOpen, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Baptism = () => {
  return (
    <div className="min-h-screen bg-white font-['Roboto_Slab']">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 text-center">
        <Droplets className="mx-auto text-blue-400 mb-4" size={48} />
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
          Holy Baptism
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4 font-bold">
          "For as many of you as were baptized into Christ have put on Christ."
          — Galatians 3:27
        </p>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800 italic">
              Divine Rebirth
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Baptism is the first of the seven sacraments of the Ethiopian
              Orthodox Tewahedo Church. It is the door through which one enters
              the Kingdom of God and becomes a member of the Body of Christ.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Info size={20} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">Infant Baptism</p>
                  <p className="text-sm text-slate-500 text-sm">
                    40 days for boys, 80 days for girls.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="font-black text-sm uppercase">Scheduling</p>
                  <p className="text-sm text-slate-500 text-sm">
                    Please notify the church office at least 2 weeks in advance.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/request"
              className="inline-block bg-[#ffc107] text-slate-900 px-8 py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-amber-500 transition-colors"
            >
              Request Baptism
            </Link>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <h3 className="font-black text-slate-900 mb-4 uppercase flex items-center gap-2">
              <BookOpen size={20} /> Requirements
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-bold">
              <li className="flex gap-2">✓ Christian Godparents</li>
              <li className="flex gap-2">✓ Birth Certificate of the child</li>
              <li className="flex gap-2">✓ Parents' Membership Record</li>
              <li className="flex gap-2">✓ White baptismal garment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baptism;
