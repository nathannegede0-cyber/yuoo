import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MoveRight,
  Sun,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-white font-['Roboto_Slab'] overflow-x-hidden">
      {/* 1. HERO HEADER - FULL WIDTH */}
      <section className="w-full bg-[#0f172a] py-28 px-6 md:px-20 text-center text-white border-b-8 border-[#ffc107]">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 italic text-[#ffc107]">
          አድራሻችን
        </h1>
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.4em] uppercase">
          Contact Us
        </h2>
        <div className="w-40 h-1.5 bg-[#ffc107] mx-auto mt-10 mb-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto italic leading-relaxed">
          Reach out to us for spiritual counseling, services, or to learn more
          about our community.
        </p>
      </section>

      {/* 2. CONTACT INFO CARDS - STRETCHED LAYOUT */}
      <section className="w-full py-20 px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Current Location */}
          <div className="bg-slate-50 p-12 rounded-[3rem] border-b-8 border-[#0f172a] shadow-sm">
            <div className="bg-[#0f172a] w-16 h-16 rounded-2xl flex items-center justify-center text-[#ffc107] mb-8">
              <MapPin size={32} />
            </div>
            <h4 className="text-2xl font-bold text-[#0f172a] mb-4">
              Current Location
            </h4>
            <p className="text-xl text-gray-600 leading-relaxed italic">
              5152 E. 17th Avenue Parkway
              <br />
              Denver, CO 80220
            </p>
          </div>

          {/* Phone & Counseling */}
          <div className="bg-slate-50 p-12 rounded-[3rem] border-b-8 border-[#ffc107] shadow-sm">
            <div className="bg-[#ffc107] w-16 h-16 rounded-2xl flex items-center justify-center text-[#0f172a] mb-8">
              <Phone size={32} />
            </div>
            <h4 className="text-2xl font-bold text-[#0f172a] mb-4">
              Spiritual Counseling
            </h4>
            <p className="text-gray-500 mb-4 font-medium italic">
              Available any day for support
            </p>
            <a
              href="tel:+13030000000"
              className="text-3xl font-black text-[#0f172a] hover:text-blue-700"
            >
              (303) 000-0000
            </a>
          </div>

          {/* Email/Office Hours */}
          <div className="bg-slate-50 p-12 rounded-[3rem] border-b-8 border-blue-600 shadow-sm">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8">
              <Clock size={32} />
            </div>
            <h4 className="text-2xl font-bold text-[#0f172a] mb-4">
              Service Hours
            </h4>
            <p className="text-xl text-gray-600 leading-relaxed italic">
              Sat: 6:00 AM – 9:00 AM
              <br />
              Sun: 5:00 AM – 12:00 PM
            </p>
          </div>
        </div>
      </section>

      {/* 3. FUTURE PROJECT & MESSAGE FORM - WIDE ROW */}
      <section className="w-full py-20 px-6 md:px-20 bg-slate-900 text-white">
        <div className="flex flex-col xl:flex-row gap-20 items-stretch">
          {/* Future Project Details */}
          <div className="xl:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <MoveRight className="text-[#ffc107]" size={40} />
              <h3 className="text-4xl md:text-5xl font-bold italic text-[#ffc107]">
                Our Vision: Aurora
              </h3>
            </div>
            <p className="text-2xl text-gray-300 leading-relaxed mb-8 italic">
              Because 99.9% of our congregation resides in the City of Aurora,
              we are building a new church home at{" "}
              <strong>6th Ave & Ventura Street</strong>.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              This new facility will allow us to expand our services, especially
              for our growing youth community and children's programs.
            </p>
          </div>

          {/* Modern Message Form */}
          <div className="xl:w-1/2 bg-white p-12 rounded-[3rem] text-[#0f172a] shadow-2xl">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="text-blue-600" /> Send a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-5 rounded-2xl bg-slate-100 border-none focus:ring-4 focus:ring-[#ffc107]/50 outline-none text-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-5 rounded-2xl bg-slate-100 border-none focus:ring-4 focus:ring-[#ffc107]/50 outline-none text-lg"
                />
              </div>
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full p-5 rounded-2xl bg-slate-100 border-none focus:ring-4 focus:ring-[#ffc107]/50 outline-none text-lg"
              ></textarea>
              <button className="w-full bg-[#0f172a] text-white font-bold py-6 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-xl shadow-lg">
                Send Message <Send size={24} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. FULL WIDTH MAP PLACEHOLDER */}
      <section className="w-full h-[500px] bg-slate-200 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="relative z-20 text-center">
          <MapPin size={60} className="mx-auto text-[#0f172a] mb-4" />
          <h4 className="text-2xl font-bold text-[#0f172a]">
            5152 E. 17th Avenue Parkway
          </h4>
          <p className="text-gray-600 font-bold">Denver, CO 80220</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
