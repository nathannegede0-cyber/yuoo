import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Music,
  Languages,
  Clock,
  Sun,
  Star,
  GraduationCap,
  CheckCircle,
  Phone,
  MapPin,
  ClipboardCheck,
  Calendar,
} from "lucide-react";

const SundaySchool = () => {
  const navigate = useNavigate();

  const levels = [
    {
      age: "Ages 5 - 7",
      title: "Foundations (መሠረት)",
      saturday: [
        "Amharic Language",
        "Spiritual Songs (Mezmure)",
        "Oral Lessons",
      ],
      sunday: ["Bible Stories", "Lessons on Obedience"],
      color: "border-l-[12px] border-blue-500 bg-blue-50/40",
    },
    {
      age: "Ages 8 - 12",
      title: "Intermediate (መካከለኛ)",
      saturday: [
        "Amharic Language",
        "Spiritual Songs",
        "Mid-level Oral Lessons",
      ],
      sunday: [
        "Temeherte Haymanot (Doctrine)",
        "Serate-Bietechristian (Church Order)",
      ],
      color: "border-l-[12px] border-[#ffc107] bg-yellow-50/40",
    },
    {
      age: "Ages 13 - 15",
      title: "Advanced (ከፍተኛ)",
      saturday: [
        "Amharic Language",
        "Spiritual Songs",
        "Advanced Oral Lessons",
      ],
      sunday: [
        "Temeherte Haymanot (Deep Study)",
        "Serate-Bietechristian (Leadership)",
      ],
      color: "border-l-[12px] border-[#0f172a] bg-slate-100",
    },
    {
      age: "Ages 16 - 17",
      title: "Advanced (ከፍተኛ)",
      saturday: [
        "Amharic Language",
        "Spiritual Songs",
        "Advanced Oral Lessons",
      ],
      sunday: [
        "Temeherte Haymanot (Deep Study)",
        "Serate-Bietechristian (Leadership)",
      ],
      color: "border-l-[12px] border-[#ffc107] bg-yellow-50/40",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white font-['Roboto_Slab'] overflow-x-hidden">
      {/* 1. HERO HEADER */}
      <section className="w-full bg-[#0f172a] py-28 px-6 md:px-20 text-center text-white border-b-8 border-[#ffc107]">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 italic text-[#ffc107]">
          ሰንበት ትምህርት ቤት
        </h1>
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.4em] uppercase">
          Sunday School & Youth Ministry
        </h2>
        <div className="w-40 h-1.5 bg-[#ffc107] mx-auto mt-10 mb-8 rounded-full"></div>
        <p className="text-xl md:text-3xl text-gray-300 max-w-6xl mx-auto italic leading-relaxed">
          Nurturing our 200 children and youth in the Orthodox faith and
          Ethiopian heritage.
        </p>
      </section>

      {/* 2. TOP ACTION CARDS */}
      <section className="w-full py-12 px-6 md:px-20 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-2xl p-10 rounded-[2rem] border-b-8 border-blue-600 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-blue-600 p-6 rounded-2xl text-white">
              <ClipboardCheck size={48} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#0f172a]">
                Year-Long Program
              </h4>
              <p className="text-gray-500 mb-4 font-medium italic">
                General Saturday & Sunday Lessons
              </p>
              <button
                onClick={() => navigate("/ss-registration")}
                className="bg-[#0f172a] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all uppercase tracking-widest text-sm"
              >
                Register for 2024-2025
              </button>
            </div>
          </div>

          <div className="bg-[#0f172a] shadow-2xl p-10 rounded-[2rem] border-b-8 border-[#ffc107] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <Star
              className="absolute right-0 top-0 text-[#ffc107] opacity-10"
              size={120}
            />
            <div className="bg-[#ffc107] p-6 rounded-2xl text-[#0f172a]">
              <Calendar size={48} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[#ffc107]">
                Special Intensive Summer Camp
              </h4>
              <p className="text-gray-300 mb-4 font-medium italic">
                Available: June 15 – July 20
              </p>
              <button
                onClick={() => navigate("/ss-registration")}
                className="bg-[#ffc107] text-[#0f172a] px-8 py-3 rounded-full font-bold hover:bg-white transition-all uppercase tracking-widest text-sm"
              >
                Register for Summer Camp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANNOUNCEMENT SECTION */}
      <section className="w-full py-12 px-6 md:px-20 bg-white">
        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-200">
          <h3 className="text-4xl md:text-5xl font-bold text-[#0f172a] italic mb-6">
            ማስታወቂያ (Announcement)
          </h3>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
            የደብረ ሰላም መድኃኔዓለም የህጻናት ክፍል በቅዳሜም ሆነ በእሁድ የህጻናት አገልግሎት ላይ እገዛ ይፈልጋል
            ስለዚህም ወላጆች እና አገልግሎቱን ለመርዳት የምትፈጉ ሁሉ የህጻንት ክፍል ድረስ በመምጣት ወይም በስልክ ለ
            ወ/ሮ ጡሩነሽ{" "}
            <span className="text-blue-600 font-bold">(720 212-9805)</span>{" "}
            በመደወል ጠቅላላ መረጃ ማግኘት እንደምትችሉ ህጻናት ክፍሉ ያስታውቃል፡፡
          </p>
        </div>
      </section>

      {/* 4. CURRICULUM SECTION */}
      <section className="w-full py-24 px-6 md:px-20 bg-white">
        <div className="mb-10">
          <h3 className="text-4xl md:text-5xl font-bold text-[#0f172a] italic mb-4">
            Curriculum & Sessions
          </h3>
          <p className="text-xl text-gray-500">
            Structured coaching for spiritual and academic success.
          </p>
        </div>

        <div className="space-y-10">
          {levels.map((item, idx) => (
            <div
              key={idx}
              className={`w-full p-10 md:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-16 items-start transition-all hover:shadow-xl border border-slate-100 ${item.color}`}
            >
              <div className="lg:w-1/4">
                <span className="text-xl font-black text-gray-400 uppercase tracking-widest">
                  {item.age}
                </span>
                <h4 className="text-4xl md:text-5xl font-bold text-[#0f172a] mt-2 italic leading-tight">
                  {item.title}
                </h4>
              </div>

              <div className="lg:w-1/3 flex-1">
                <div className="flex items-center gap-3 mb-8">
                  <Clock size={28} className="text-[#ffc107]" />
                  <p className="font-black text-lg text-slate-600 uppercase tracking-tighter">
                    Saturday (3:00 PM - 5:00 PM)
                  </p>
                </div>
                <ul className="space-y-4">
                  {item.saturday.map((lesson, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-2xl text-gray-700 font-medium italic"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#ffc107]" />{" "}
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/3 flex-1 lg:border-l lg:border-slate-300 lg:pl-16">
                <div className="flex items-center gap-3 mb-8">
                  <Sun size={28} className="text-blue-500" />
                  <p className="font-black text-lg text-blue-900 uppercase tracking-tighter">
                    Sunday (After Liturgy)
                  </p>
                </div>
                <ul className="space-y-4">
                  {item.sunday.map((lesson, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-2xl text-gray-700 font-medium italic"
                    >
                      <div className="w-3 h-3 rounded-full bg-blue-500" />{" "}
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER REGISTRATION INFO */}
      <footer className="w-full bg-[#0f172a] py-28 px-6 md:px-24 text-center text-white">
        <h3 className="text-4xl md:text-6xl font-bold mb-8 italic text-[#ffc107]">
          Enrollment Information
        </h3>
        <p className="text-2xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed italic">
          Parents are encouraged to register their children early. Registration
          forms are available at our 17th Avenue Parkway office.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <Phone size={48} className="text-[#ffc107]" />
            <span className="text-4xl font-black">(720) 938-3746 </span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <MapPin size={48} className="text-[#ffc107]" />
            <span className="text-2xl italic">
              5152 E. 17th Ave Parkway, Denver, CO 80220
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SundaySchool;
