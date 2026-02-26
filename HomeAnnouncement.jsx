import React, { useState, useEffect } from "react";
import axios from "axios";
import { Megaphone, Calendar, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeAnnouncement = () => {
  const [news, setNews] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // Fetch all active news (Backend already sorts them by Newest)
        const res = await axios.get("http://localhost:5000/api/announcements");

        if (res.data && res.data.length > 0) {
          // Take the VERY FIRST one (The Newest)
          setNews(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch home news", err);
      }
    };

    fetchLatestNews();
  }, []);

  // 1. If no news exists, OR user closed it -> Hide the section
  if (!news || !isVisible) return null;

  return (
    <div className="w-full px-4 md:px-0 -mt-10 relative z-20 font-['Roboto_Slab']">
      <div
        className={`max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch transition-all transform hover:-translate-y-1 ${
          news.category === "Urgent" || news.isUrgent
            ? "bg-[#0f172a] text-white border-4 border-[#ffc107]"
            : "bg-white text-slate-800 border-4 border-blue-100"
        }`}
      >
        {/* LEFT: ICON STRIP */}
        <div
          className={`p-6 flex items-center justify-center md:w-32 ${
            news.category === "Urgent" || news.isUrgent
              ? "bg-[#ffc107]"
              : "bg-blue-50"
          }`}
        >
          <Megaphone
            size={40}
            className={
              news.category === "Urgent" || news.isUrgent
                ? "text-[#0f172a]"
                : "text-blue-600"
            }
          />
        </div>

        {/* MIDDLE: CONTENT */}
        <div className="p-8 flex-1 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                news.category === "Urgent" || news.isUrgent
                  ? "bg-[#ffc107] text-[#0f172a]"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {news.category || "Update"}
            </span>
            <span
              className={`text-xs font-bold flex items-center gap-1 ${news.category === "Urgent" || news.isUrgent ? "text-slate-400" : "text-slate-400"}`}
            >
              <Calendar size={12} /> {news.date}
            </span>
          </div>

          <h3 className="text-2xl font-black leading-tight">{news.title}</h3>

          <p
            className={`text-sm md:text-base line-clamp-2 ${news.category === "Urgent" || news.isUrgent ? "text-slate-400" : "text-slate-600"}`}
          >
            {news.content}
          </p>
        </div>

        {/* RIGHT: ACTION */}
        <div
          className={`p-6 md:w-48 flex flex-col justify-center gap-3 ${news.category === "Urgent" || news.isUrgent ? "bg-slate-800" : "bg-slate-50"}`}
        >
          <button
            onClick={() => navigate("/announcements")}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              news.category === "Urgent" || news.isUrgent
                ? "bg-[#ffc107] text-[#0f172a] hover:bg-white"
                : "bg-[#0f172a] text-white hover:bg-blue-600"
            }`}
          >
            Read More <ArrowRight size={16} />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center justify-center gap-1"
          >
            <X size={12} /> Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeAnnouncement;
