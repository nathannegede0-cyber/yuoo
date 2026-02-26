import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Megaphone,
  Calendar,
  MapPin,
  Info,
  Wallet,
  ArrowRight,
  Filter,
  Bell,
  Loader2,
} from "lucide-react";

const Announcements = () => {
  const [filter, setFilter] = useState("All");
  const [newsList, setNewsList] = useState([]); // Stores the real news
  const [loading, setLoading] = useState(true);

  // --- FETCH REAL DATA FROM BACKEND ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setNewsList(res.data);
      } catch (err) {
        console.error("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter Logic
  const filteredNews =
    filter === "All"
      ? newsList
      : newsList.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-['Roboto_Slab']">
      {/* Header Section */}
      <div className="bg-[#0f172a] pt-24 pb-20 px-6 text-center text-white border-b-8 border-[#ffc107] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-6 border border-slate-700">
            <Megaphone className="w-12 h-12 text-[#ffc107]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            ማስታወቂያዎች <span className="text-[#ffc107]">Announcements</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, events, and urgent calls from our
            parish.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-4xl mx-auto -mt-8 px-6 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-wrap justify-center gap-2 border border-slate-100">
          {["All", "Urgent", "Event", "General"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                filter === cat
                  ? "bg-[#0f172a] text-white shadow-lg"
                  : "bg-white text-slate-500 hover:bg-slate-100"
              }`}
            >
              {cat === "All" && <Filter size={16} />}
              {cat === "Urgent" && <Bell size={16} />}
              {cat === "Event" && <Calendar size={16} />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="max-w-4xl mx-auto mt-12 px-6 space-y-8">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="animate-spin mx-auto text-blue-600" size={48} />
            <p className="text-slate-500 mt-4 font-bold">Loading News...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Info className="mx-auto mb-4" size={48} />
            <p className="text-xl">No active announcements found.</p>
          </div>
        ) : (
          filteredNews.map((item) => (
            <div
              key={item._id}
              className={`relative overflow-hidden border rounded-3xl shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 ${
                item.isUrgent
                  ? "bg-[#0f172a] text-white border-[#ffc107]"
                  : "bg-white text-slate-800 border-slate-100"
              }`}
            >
              {/* Urgent Stripe */}
              {item.isUrgent && (
                <div className="absolute top-0 left-0 w-2 h-full bg-[#ffc107]"></div>
              )}

              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                {/* Content Side */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                        item.isUrgent
                          ? "bg-[#ffc107] text-[#0f172a]"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-sm opacity-60 font-bold flex items-center gap-1">
                      <Calendar size={14} /> {item.date}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black leading-tight">
                    {item.title}
                  </h2>

                  <p
                    className={`text-lg leading-relaxed ${item.isUrgent ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {item.content}
                  </p>

                  <div className="flex items-center gap-6 pt-2 text-sm font-bold opacity-80">
                    <span className="flex items-center gap-2">
                      <MapPin size={18} className="text-[#ffc107]" />{" "}
                      {item.location || "Main Sanctuary"}
                    </span>
                  </div>
                </div>

                {/* Action Side (Button) */}
                <div className="flex items-center justify-start md:justify-end">
                  {item.isUrgent ? (
                    <button className="bg-[#ffc107] text-[#0f172a] px-8 py-4 rounded-2xl font-black hover:bg-white hover:text-[#0f172a] transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20">
                      <Wallet size={20} />
                      Donate Now
                    </button>
                  ) : (
                    <button
                      className={`px-6 py-3 rounded-2xl font-bold border-2 transition-all flex items-center gap-2 ${
                        item.isUrgent
                          ? "border-slate-700 hover:bg-slate-800"
                          : "border-slate-200 hover:bg-slate-50 text-slate-500"
                      }`}
                    >
                      Details <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
