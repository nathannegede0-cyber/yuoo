import React from "react";
import { Clock, Calendar as CalIcon, MapPin, Users } from "lucide-react";

const ChurchCalendar = () => {
  // Data derived from the church biography document
  const regularServices = [
    { day: "Saturday", time: "6:00 AM – 9:00 AM", title: "Divine Liturgy" }, // [cite: 18]
    { day: "Sunday", time: "5:00 AM – 12:00 PM", title: "Divine Liturgy" }, // [cite: 19]
    { day: "Sunday", time: "After Liturgy", title: "Sermon & Sunday School" }, // [cite: 20, 21]
  ];

  const upcomingFeasts = [
    {
      date: "Jan 19",
      title: "Epiphany (Timkat)",
      type: "Outdoor Celebration",
      time: "3:00 AM – 2:00 PM",
    }, // [cite: 37, 25]
    {
      date: "May 2026",
      title: "Easter (Pascha)",
      type: "Holiday Service",
      time: "6:00 PM – 3:00 AM",
    }, // [cite: 24]
    {
      date: "Aug 22",
      title: "Assumption of Mary",
      type: "Fast Conclusion",
      time: "Annual",
    }, // [cite: 36]
    {
      date: "Sep 28",
      title: "Founding of True Cross",
      type: "Outdoor Celebration",
      time: "Annual",
    }, // [cite: 37]
  ];

  return (
    <section className="py-12 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden font-['Roboto_Slab']">
      <div className="px-8 mb-10">
        <h2 className="text-3xl font-bold text-[#0f172a] flex items-center gap-3">
          <CalIcon className="text-[#ffc107]" /> የታወቁ በዓላት (Schedule & Feasts)
        </h2>
        <p className="text-gray-500 mt-2 italic">
          "We welcome all members and visitors to join us in worship." [cite:
          41]
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200">
        {/* Regular Weekly Schedule */}
        <div className="bg-white p-8">
          <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
            <Clock size={20} className="text-[#ffc107]" /> መደበኛ የቅዳሴ ሰዓታት
            (Weekly)
          </h3>
          <div className="space-y-4">
            {regularServices.map((service, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border-l-4 border-[#0f172a]"
              >
                <div>
                  <p className="font-bold text-slate-800">{service.title}</p>
                  <p className="text-sm text-slate-500">{service.day}</p>
                </div>
                <div className="text-right">
                  <span className="bg-[#0f172a] text-white px-3 py-1 rounded-lg text-sm font-bold">
                    {service.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400 italic">
            * Note: Great Lent weekday prayers are conducted morning and evening
            until Easter. [cite: 38]
          </p>
        </div>

        {/* Holiday / Feast Calendar */}
        <div className="bg-slate-50 p-8">
          <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
            <Users size={20} className="text-[#ffc107]" /> ዓመታዊ በዓላት (Major
            Feasts)
          </h3>
          <div className="space-y-4">
            {upcomingFeasts.map((feast, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-white p-2 rounded-lg shadow-sm text-center min-w-[60px] border-t-4 border-[#ffc107]">
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    {feast.date.split(" ")[0]}
                  </p>
                  <p className="text-lg font-black text-[#0f172a]">
                    {feast.date.split(" ")[1] || ""}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{feast.title}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                    {feast.type}
                  </p>
                  <p className="text-sm text-gray-500">{feast.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Footer for Schedule */}
      <div className="bg-[#0f172a] p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-[#ffc107]" />
          <span className="text-sm">
            5152 E.17th Avenue Parkway, Denver, CO 80220{" "}
          </span>
        </div>
        <p className="text-xs opacity-70 italic">
          Attendance peaks at 400-500 during major holidays. [cite: 40]
        </p>
      </div>
    </section>
  );
};

export default ChurchCalendar;
