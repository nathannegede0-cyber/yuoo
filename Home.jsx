import React, { useState, useEffect } from "react";
import {
  Clock,
  Calendar as CalIcon,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Send,
} from "lucide-react";
// IMPORTANT: Make sure this path matches where you saved the announcement card!
import HomeAnnouncements from "../components/HomeAnnouncement";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { url: "/image/massService2.jpg", title: "Sunday Divine Liturgy" },
    { url: "/image/ds_lgKids.jpg", title: "Our Youth Community" },
    { url: "/image/ds_mdKids.jpg", title: "Sunday School - Middle Group" },
    { url: "/image/ds_smKids.jpg", title: "Sunday School - Small Group" },
    { url: "/image/feast_candels.jpg", title: "Holiday Feast Celebration" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const regularServices = [
    {
      day: "ቅፋሜ(Saturday)",
      time: "6:00 AM – 9:00 AM",
      title: "ቅዳሴ (Divine Liturgy)",
    },
    {
      day: "እሁድ (Sunday)",
      time: "5:00 AM – 12:00 PM",
      title: "ቅዳሴ (Divine Liturgy)",
    },
    {
      day: "እሁድ (Sunday)",
      time: "(ከቅዳሴ በኋላ (After Liturgy)",
      title: "Sermon & Sunday School",
    },
  ];

  const upcomingFeasts = [
    {
      date: "Jan 19",
      title: "ጥምቀት በዓል (Epiphany)",
      type: "Outdoor Celebration",
      time: "3:00 AM – 2:00 PM",
    },
    {
      date: "Jan 07",
      title: "የልደት በዓል (Christmas)",
      type: "Holiday Service",
      time: "6:00 PM – 3:00 AM",
    },
    {
      date: "Aug 22",
      title: "Assumption of Mary",
      type: "Annual Feast",
      time: "Standard Hours",
    },
    {
      date: "Sep 28",
      title: "መስቀል በዓል (Founding of True Cross)",
      type: "Outdoor Celebration",
      time: "Annual",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-['Roboto_Slab']">
      {/* 1. HERO PHOTO CAROUSEL */}
      <section className="relative h-[400px] md:h-[700px] w-full overflow-hidden bg-[#0f172a]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.url}
              className="w-full h-full object-cover"
              alt={slide.title}
              style={{
                transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
                transition: "transform 4s ease",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-black/30" />
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full px-6">
              <p className="text-[#ffc107] font-black text-3xl md:text-6xl uppercase tracking-[0.2em] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                {slide.title}
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-8 bg-[#ffc107]" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/40 hover:bg-[#ffc107] hover:text-[#0f172a] text-white transition-all backdrop-blur-sm"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/40 hover:bg-[#ffc107] hover:text-[#0f172a] text-white transition-all backdrop-blur-sm"
        >
          <ChevronRight size={32} />
        </button>
      </section>

      {/* 2. URGENT ANNOUNCEMENT CARD - INSERTED HERE */}
      <HomeAnnouncements />

      {/* 3. WEEKLY SCHEDULE SECTION */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0f172a] rounded-[3rem] shadow-2xl overflow-hidden border border-slate-800">
            <div className="p-10 border-b border-slate-800 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-4">
                <Clock className="text-[#ffc107]" size={32} /> መደበኛ የቅዳሴ ሰዓታት
                (Weekly Schedule)
              </h2>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {regularServices.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 p-8 rounded-3xl border border-slate-700 hover:border-[#ffc107] transition-all group"
                >
                  <p className="text-[#ffc107] text-sm font-bold uppercase tracking-widest mb-2">
                    {service.day}
                  </p>
                  <p className="font-bold text-white text-2xl mb-4">
                    {service.title}
                  </p>
                  <span className="inline-block bg-[#ffc107] text-[#0f172a] px-4 py-2 rounded-xl text-md font-black italic">
                    {service.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAJOR FEASTS SECTION */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-10 bg-[#0f172a] text-center md:text-left">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-4">
                <Star className="text-[#ffc107]" size={32} /> ዓመታዊ በዓላት (Major
                Feasts)
              </h2>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {upcomingFeasts.map((feast, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 p-6 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  <div className="bg-[#0f172a] text-white w-fit px-4 py-1 rounded-lg text-sm font-bold border-b-4 border-[#ffc107]">
                    {feast.date}
                  </div>
                  <h4 className="font-bold text-2xl text-[#0f172a] leading-tight">
                    {feast.title}
                  </h4>
                  <p className="text-xs text-blue-600 font-black uppercase">
                    {feast.type}
                  </p>
                  <p className="text-sm text-gray-500 italic font-medium">
                    {feast.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT US SECTION */}
      <section
        id="contact"
        className="w-full bg-slate-50 py-24 px-6 mt-12 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black text-slate-900 mb-4 italic">
              ያግኙን
            </h2>
            <p className="text-xl text-gray-500 italic uppercase tracking-[0.3em]">
              Contact Us
            </p>
            <div className="w-32 h-2 bg-[#ffc107] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="flex items-center gap-8 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="bg-[#0f172a] p-5 rounded-2xl shadow-lg shadow-[#ffc107]/20">
                  <MapPin className="text-[#ffc107]" size={36} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    አድራሻ (Address)
                  </h4>
                  <p className="text-lg text-gray-600 italic">
                    5152 E. 17th Ave Parkway, Denver, CO 80220
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="bg-[#0f172a] p-5 rounded-2xl shadow-lg shadow-[#ffc107]/20">
                  <Phone className="text-[#ffc107]" size={36} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    ስልክ (Phone)
                  </h4>
                  <p className="text-lg text-gray-600 italic">(720) 998-5335</p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="bg-[#0f172a] p-5 rounded-2xl shadow-lg shadow-[#ffc107]/20">
                  <Mail className="text-[#ffc107]" size={36} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    ኢሜል (Email)
                  </h4>
                  <p className="text-lg text-gray-600 italic">
                    admin@dschurch.org
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="ስም"
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400 ml-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="ኢሜል"
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="መልዕክትዎን እዚህ ይጻፉ..."
                    className="w-full p-5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-4 focus:ring-[#ffc107]/50 transition-all"
                  ></textarea>
                </div>
                <button className="w-full bg-[#0f172a] text-[#ffc107] font-black text-xl py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-xl shadow-[#0f172a]/20">
                  መልዕክት ላክ (Send) <Send size={24} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
