import React, { useState } from "react";
import {
  Play,
  Search,
  Share2,
  Download,
  Youtube,
  Facebook,
} from "lucide-react";

const Sermons = () => {
  const categories = [
    "ሁሉንም (All)",
    "ትምህርተ ሃይማኖት",
    "የመጽሐፍ ቅዱስ ጥናት",
    "ምክርና ተግሣጽ",
    "መዝሙር",
    "ዘጋቢ",
  ];

  // FIXED: Clean array of objects (No more map function inside the array)
  const sermonList = [
    {
      title: "አውደ ስብከት ",
      speaker: "መላከ ሰላም ቀሲስ ደጀኔ",
      date: "May 15, 2022",
      duration: "25",
      // Using a high-quality YouTube thumbnail automatically
      thumbnail: "https://img.youtube.com/vi/N4zOdtux-mQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/N4zOdtux-mQE?autoplay=1",
      category: "ትምህርተ ሃይማኖት",
    },
    {
      title: "ትምክህተ ዘመድነ ",
      speaker: "ማህበር ቅዱሳን መዘምራን",
      date: "Jan 15, 2026",
      duration: "5:20",
      // Using a high-quality YouTube thumbnail automatically
      thumbnail: "https://img.youtube.com/vi/8RJkpHtMrR8/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/8RJkpHtMrR8?autoplay=1",
      category: "መዝሙር",
    },
    {
      title: "ዓመትን በጽናት የኖረ ታሪክ",
      speaker: "ማህበር ቅዱሳን ቴሌቪዥን",
      date: "Jan 15, 2026",
      duration: "5:20",
      // Using a high-quality YouTube thumbnail automatically
      thumbnail: "https://img.youtube.com/vi/ASk3wLiZQ6U/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/ASk3wLiZQ6U?autoplay=1",
      category: "ዘጋቢ",
    },
    {
      title: "ጥቅም የሌለው ጩሀት ",
      speaker: "መምህር ብርሃኑ አድማስው",
      date: "Jan 15, 2026",
      duration: "45:20",
      // Using a high-quality YouTube thumbnail automatically
      thumbnail: "https://img.youtube.com/vi/Z6tEqpzNk9E/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/Z6tEqpzNk9E?autoplay=1",
      category: "ትምህርተ ሃይማኖት",
    },
    {
      title: "የመቃብሩን ድንጋይ ",
      speaker: "ዘማሪ ትዕግስት ስለሺ",
      date: "Jan 15, 2026",
      duration: "7:5",
      // Using a high-quality YouTube thumbnail automatically
      thumbnail: "https://img.youtube.com/vi/l2QEQMznrQY/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/l2QEQMznrQY?autoplay=1",
      category: "መዝሙር",
    },
    {
      title: "ዓመትን በጽናት የኖረ ታሪክ",
      speaker: "ማህበር ቅዱሳን ቴሌቪዥን",
      date: "Jan 15, 2026",
      duration: "5:20",
      // Using a high-quality YouTube thumbnail automatically
      thumbnail: "https://img.youtube.com/vi/ASk3wLiZQ6U/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/ASk3wLiZQ6U?autoplay=1",
      category: "ዘጋቢ",
    },
  ];

  // State to handle which video is currently playing
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-['Roboto_Slab']">
      {/* 1. HEADER SECTION (Same as yours) */}
      <section className="w-full bg-[#0f172a] pt-32 pb-20 px-6 md:px-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-black text-[#ffc107] italic mb-4">
            ትምህርት
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 uppercase tracking-[0.4em] font-light">
            Sermons & Teachings
          </p>
          <div className="max-w-2xl mx-auto mt-12 relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={24}
            />
            <input
              type="text"
              placeholder="ትምህርቶችን እዚህ ይፈልጉ..."
              className="w-full py-5 pl-14 pr-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#ffc107] transition-all"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-6 py-2 rounded-full font-bold transition-all ${i === 0 ? "bg-[#ffc107] text-[#0f172a]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. RECENT TEACHINGS GRID */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sermonList.map((sermon, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group"
              >
                {/* VIDEO CONTAINER */}
                <div className="relative h-56 overflow-hidden bg-black">
                  {activeVideo === idx ? (
                    <iframe
                      className="w-full h-full"
                      src={sermon.videoUrl}
                      title={sermon.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <>
                      <img
                        src={sermon.thumbnail}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        alt="thumb"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => setActiveVideo(idx)}
                          className="bg-[#ffc107] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
                        >
                          <Play
                            size={30}
                            className="text-[#0f172a] fill-current"
                          />
                        </button>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        {sermon.duration}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-8">
                  <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-black uppercase mb-3 tracking-widest">
                    {sermon.category}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 h-14 line-clamp-2 leading-snug">
                    {sermon.title}
                  </h4>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                    <div className="text-slate-500 text-sm">
                      <p className="font-bold text-slate-700">
                        {sermon.speaker}
                      </p>
                      <p className="italic text-xs">{sermon.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-[#ffc107] hover:text-[#0f172a] transition-all">
                        <Download size={18} />
                      </button>
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-[#ffc107] hover:text-[#0f172a] transition-all">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sermons;
