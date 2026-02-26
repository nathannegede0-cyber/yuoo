import React, { useState } from "react";
import { Send, MapPin, Phone, User, Cross } from "lucide-react";

const PrayerRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    prayerType: "Confession",
    confessionFather: "General / No Preference",
    address: "",
    message: "",
  });

  const prayerTypes = [
    "Confession (ንስሐ)",
    "Sickness (ለሕሙማን)",
    "Home Visit / Holy Water (ጸበል እርጩልኝ)",
    "Comfort (መጽናናት)",
    "Family (ለቤተሰብ)",
    "Financial Needs (ለበረከት)",
    "Other (ሌላ)",
  ];

  const confessionFathers = [
    "General / No Preference",
    "Melake Selam Kesis Degenie",
    "kesis zewdu",
    "Kesis Abebe",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: If Home Visit is selected, address MUST be filled
    if (
      formData.prayerType === "Home Visit / Holy Water (ጸበል እርጩልኝ)" &&
      !formData.address
    ) {
      alert(
        "እባክዎ የቤት አድራሻዎን ያስገቡ። (Please provide your home address for the visit.)",
      );
      return;
    }

    console.log(
      "Sending Request to admin@dschurch.org and 720-998-5335:",
      formData,
    );

    // Simulate API call
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            ተልኳል! (Sent!)
          </h2>
          <p className="text-gray-600 mb-8">
            የጸሎት ጥያቄዎ ለቤተክርስቲያኑ አባቶች ደርሷል። እግዚአብሔር ጸሎታችሁን ይስማ።
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-[#0f172a] text-[#ffc107] py-4 rounded-2xl font-bold"
          >
            ሌላ ጥያቄ ላክ (Send Another)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-[#0f172a] p-10 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-2 italic">
            የጸሎት ጥያቄ
          </h2>
          <p className="text-[#ffc107] uppercase tracking-widest text-sm font-bold">
            Prayer Request & Home Visit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-2">
                Full Name (ስም)
              </label>
              <input
                type="text"
                required
                placeholder="ሙሉ ስም ያስገቡ"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-2">
                Phone (ስልክ)
              </label>
              <input
                type="tel"
                required
                placeholder="720-000-0000"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-2">
              Service Type (የአገልግሎት ዓይነት)
            </label>
            <select
              className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50 font-bold"
              value={formData.prayerType}
              onChange={(e) =>
                setFormData({ ...formData, prayerType: e.target.value })
              }
            >
              {prayerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* ADDRESS FIELD - Required for Home Visit */}
          {formData.prayerType === "Home Visit / Holy Water (ጸበል እርጩልኝ)" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-xs font-black uppercase text-red-500 ml-2">
                Home Address (ቤት አድራሻ) *Required
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  required
                  placeholder="Street, City, Zip Code"
                  className="w-full p-4 pl-12 bg-blue-50/50 rounded-2xl border-none ring-2 ring-blue-200 outline-none focus:ring-4 focus:ring-[#ffc107]"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-2">
              Confession Father (የንስሐ አባት)
            </label>
            <select
              className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50"
              onChange={(e) =>
                setFormData({ ...formData, confessionFather: e.target.value })
              }
            >
              {confessionFathers.map((father) => (
                <option key={father} value={father}>
                  {father}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-2">
              Message (ዝርዝር መረጃ)
            </label>
            <textarea
              rows="4"
              placeholder="ተጨማሪ መረጃ ካለዎት እዚህ ይጻፉ..."
              className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
          </div>

          <button className="w-full bg-[#0f172a] text-[#ffc107] font-black text-xl py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-xl shadow-[#0f172a]/20 active:scale-95">
            ጥያቄውን ላክ (Send Request) <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrayerRequest;
