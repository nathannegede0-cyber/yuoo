import React from "react";
import { Users, Utensils, Calendar, MapPin, Phone, Info } from "lucide-react";

const HallRental = () => {
  return (
    <div className="w-full min-h-screen bg-white font-['Roboto_Slab'] overflow-x-hidden">
      {/* Hero */}
      <section className="w-full bg-[#0f172a] py-28 px-10 md:px-24 text-center text-white border-b-8 border-[#ffc107]">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 italic text-[#ffc107]">
          አዳራሽ ኪራይ
        </h1>
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.4em] uppercase">
          Hall Rental
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mt-8 max-w-4xl mx-auto italic">
          Our facility is available for weddings, memorial services, and
          community gatherings.
        </p>
      </section>

      {/* Main Content */}
      <section className="w-full py-20 px-10 md:px-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          {/* Details */}
          <div className="space-y-10">
            <h3 className="text-4xl font-bold text-[#0f172a]">
              Facility Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                <Users className="text-[#ffc107]" size={32} />
                <div>
                  <h4 className="font-bold text-xl">Large Capacity</h4>
                  <p className="text-gray-600 italic text-lg">
                    Accommodates up to 400+ guests for major events.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                <Utensils className="text-[#ffc107]" size={32} />
                <div>
                  <h4 className="font-bold text-xl">Kitchen Access</h4>
                  <p className="text-gray-600 italic text-lg">
                    Full kitchen facilities available for catering and food
                    prep.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] text-white p-10 rounded-[3rem] shadow-xl">
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Info className="text-[#ffc107]" /> Rental Policy
              </h4>
              <ul className="space-y-4 text-gray-300 italic text-lg">
                <li>• Priority is given to active church members.</li>
                <li>
                  • Clean-up and security deposit required for all bookings.
                </li>
                <li>• Alcohol is strictly prohibited on church premises.</li>
              </ul>
            </div>
          </div>

          {/* Booking Request Form */}
          <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-200 shadow-inner">
            <h3 className="text-3xl font-bold text-[#0f172a] mb-8">
              Inquire About a Date
            </h3>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-5 rounded-2xl bg-white border-none focus:ring-4 focus:ring-[#ffc107]/50 text-lg shadow-sm"
              />
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="p-5 rounded-2xl bg-white border-none focus:ring-4 focus:ring-[#ffc107]/50 text-lg shadow-sm"
                />
                <input
                  type="date"
                  className="p-5 rounded-2xl bg-white border-none focus:ring-4 focus:ring-[#ffc107]/50 text-lg shadow-sm text-gray-400"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Event Type (Wedding, Memorial, etc.)"
                className="w-full p-5 rounded-2xl bg-white border-none focus:ring-4 focus:ring-[#ffc107]/50 text-lg shadow-sm"
              ></textarea>
              <button className="w-full bg-[#0f172a] text-white font-bold py-6 rounded-2xl hover:bg-[#ffc107] hover:text-[#0f172a] transition-all text-xl shadow-lg uppercase tracking-widest">
                Check Availability
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Rental Footer */}
      <footer className="w-full bg-[#0f172a] py-20 px-10 md:px-24 text-center border-t-8 border-[#ffc107]">
        <h3 className="text-3xl font-bold text-[#ffc107] mb-6">
          Contact the Hall Manager
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-white">
          <div className="flex items-center gap-3">
            <Phone size={32} className="text-[#ffc107]" />
            <span className="text-3xl font-black">(303) 000-0000</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={32} className="text-[#ffc107]" />
            <span className="text-xl">5152 E. 17th Ave Parkway, Denver</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HallRental;
