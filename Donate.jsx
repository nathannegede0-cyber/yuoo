import React, { useState } from "react";
import {
  Heart,
  Send,
  CheckCircle2,
  Users,
  DollarSign,
  MapPin,
} from "lucide-react";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    hasSpouse: false,
    spouseName: "",
    spouseLastName: "",
    spousePhone: "",
  });

  const presetAmounts = [100, 500, 1000];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this is where you'd trigger Stripe/PayPal
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-6 text-center min-h-screen bg-white">
        <div className="max-w-3xl mx-auto">
          <CheckCircle2
            size={100}
            className="text-green-500 mx-auto mb-8 animate-bounce"
          />
          <h2 className="text-5xl font-black text-slate-900 mb-6 italic">
            እናመሰግናለን! (Thank You!)
          </h2>
          <p className="text-2xl text-gray-600 mb-4 font-medium italic">
            Dear {formData.fullName}, your generous gift of $
            {amount || customAmount} has been received.
          </p>
          <p className="text-lg text-slate-500 mb-10">
            A confirmation and "Thank You" receipt has been sent to{" "}
            <strong>{formData.email}</strong>. May God bless you and your family
            for supporting our new church project.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-[#0f172a] text-[#ffc107] px-12 py-5 rounded-full font-bold text-xl"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 font-['Roboto_Slab']">
      {/* 1. VIDEO HERO SECTION */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
        {/* Replace the src with your actual YouTube or MP4 link */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-construction-site-of-a-new-building-40032-large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white italic mb-6">
            የአዲስ ቤተክርስቲያን ግንባታ
          </h1>
          <p className="text-2xl md:text-3xl text-[#ffc107] font-bold uppercase tracking-widest drop-shadow-lg">
            New Church Building Project
          </p>
        </div>
      </section>

      {/* 2. DONATION FORM */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* LEFT: Donor Info */}
          <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100 space-y-10">
            <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic">
              <Users className="text-[#ffc107]" size={36} /> የግል መረጃ (Donor
              Information)
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  required
                  placeholder="ሙሉ ስም (Full Name)"
                  className="don-input"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <input
                  required
                  type="email"
                  placeholder="ኢሜል (Email)"
                  className="don-input"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <input
                required
                placeholder="አድራሻ (Full Address)"
                className="don-input"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <input
                required
                type="tel"
                placeholder="ስልክ (Phone Number)"
                className="don-input"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* Spouse Section Toggle */}
            <div className="pt-6 border-t border-slate-100">
              <label className="flex items-center gap-4 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  className="w-6 h-6 accent-[#0f172a]"
                  onChange={(e) =>
                    setFormData({ ...formData, hasSpouse: e.target.checked })
                  }
                />
                <span className="font-bold text-slate-700 italic">
                  ከባለቤትዎ ጋር መለገስ ይፈልጋሉ? (Add Spouse Information?)
                </span>
              </label>

              {formData.hasSpouse && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top duration-300">
                  <input
                    placeholder="የባለቤት ስም (Spouse First Name)"
                    className="don-input"
                    onChange={(e) =>
                      setFormData({ ...formData, spouseName: e.target.value })
                    }
                  />
                  <input
                    placeholder="የባለቤት የአባት ስም (Spouse Last Name)"
                    className="don-input"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spouseLastName: e.target.value,
                      })
                    }
                  />
                  <input
                    placeholder="የባለቤት ስልክ (Spouse Phone)"
                    className="don-input md:col-span-2"
                    onChange={(e) =>
                      setFormData({ ...formData, spousePhone: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Payment Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3rem] shadow-2xl text-white">
              <h3 className="text-2xl font-black mb-8 italic flex items-center gap-3">
                <DollarSign className="text-[#ffc107]" /> የልገሳ መጠን (Select
                Amount)
              </h3>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-5 rounded-2xl text-2xl font-black transition-all border-2 
                      ${amount === amt ? "bg-[#ffc107] text-[#0f172a] border-[#ffc107]" : "bg-slate-800 border-slate-700 hover:border-[#ffc107]"}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="relative">
                <label className="text-xs uppercase font-black text-slate-400 ml-2">
                  ያልተጠቀሰ መጠን (Other Amount)
                </label>
                <div className="flex items-center mt-2">
                  <span className="absolute left-5 text-2xl font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="w-full bg-slate-800 p-5 pl-12 rounded-2xl border-2 border-slate-700 focus:border-[#ffc107] outline-none text-2xl font-black"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount("");
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-12 bg-[#ffc107] text-[#0f172a] font-black text-2xl py-6 rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-4"
              >
                ይለግሱ (Donate Now) <Heart className="fill-current" />
              </button>
            </div>

            {/* Security Note */}
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4">
              <div className="text-blue-600">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-xs text-blue-800 font-medium">
                Your donation is secure. A tax-deductible receipt will be
                automatically sent to your email address upon submission.
              </p>
            </div>
          </div>
        </form>
      </section>

      {/* Tailwind Custom Input Style - typically put in index.css, but for this demo: */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .don-input {
          width: 100%;
          padding: 1.25rem;
          background-color: #f8fafc;
          border-radius: 1rem;
          border: none;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
          outline: none;
          font-family: 'Roboto Slab';
          font-weight: 500;
        }
        .don-input:focus {
          ring: 2px;
          ring-color: #ffc107;
          background-color: white;
          box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.2);
        }
      `,
        }}
      />
    </div>
  );
};

export default Donate;
