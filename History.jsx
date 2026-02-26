import React from "react";
import {
  BookOpen,
  Milestone,
  Users,
  Home,
  Cross,
  Calendar,
} from "lucide-react";

const History = () => {
  const milestones = [
    {
      year: "2005",
      title: "The Foundation",
      desc: "Denver Debreselam Medhanealem Ethiopian Orthodox Tewahedo Church was established on March 1, 2005, and registered in Colorado as a non-profit religious institution.",
    },
    {
      year: "2005 - Present",
      title: "The Tradition",
      desc: "As part of the Oriental Orthodox tradition, we follow the doctrine of Jesus Christ and the teachings of His Apostles, alongside our sister churches: Coptic, Armenian, Syrian, Malankara, and Eritrean.",
    },
    {
      year: "Current Growth",
      title: "A Vibrant Community",
      desc: "Our congregation is unique—70% of our members are between 25-55 years old. This active group is the backbone of our church, supported by 4 priests and 15 deacons.",
    },
    {
      year: "Next Chapter",
      title: "Building the Future",
      desc: "With 99.9% of our congregation living in Aurora, we are building a new church at 6th Ave & Ventura Street to better serve our 200 children and future generations.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-['Roboto_Slab'] pb-20">
      {/* Hero Section */}
      <section className="bg-[#0f172a] py-24 px-6 text-center text-white border-b-8 border-[#ffc107]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 italic">
          የቤተክርስቲያናችን ታሪክ
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-gray-300">
          Denver Debreselam Medhanealem EOTC
        </h2>
      </section>

      {/* Full Narrative Section */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="flex items-center gap-4 mb-10">
          <BookOpen className="text-[#ffc107]" size={36} />
          <h2 className="text-3xl font-bold text-[#0f172a]">Our Story</h2>
        </div>

        <div className="prose prose-lg text-gray-700 leading-relaxed space-y-8">
          <p className="italic border-l-4 border-[#ffc107] pl-6 text-xl text-slate-800">
            "One thing that makes our church unique and vibrant is that about 70
            percent of the congregation is in the 25-55 age range. This group
            has been the backbone of the church, responding generously and
            promptly to the church’s call."
          </p>

          <p>
            Established on March 1, 2005, our church serves as a spiritual
            lighthouse for the Ethiopian Orthodox community in Colorado.
            Currently located at 17th Avenue Parkway, we have grown to a
            membership of 300, including 270 active members who are dedicated to
            the faith of our fathers.
          </p>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-[#0f172a] text-xl mb-2 flex items-center gap-2">
                <Users className="text-blue-600" /> The Next Generation
              </h3>
              <p className="text-sm">
                With over 200 children ages 4-18, our mission is to coach them
                toward academic success and spiritual strength, ensuring they
                become productive citizens and faithful servants.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Timeline */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-[#0f172a] mb-12 flex items-center gap-3">
            <Milestone className="text-[#ffc107]" /> Our Journey (Timeline)
          </h3>

          <div className="space-y-16 border-l-4 border-gray-100 ml-4 pl-12 relative">
            {milestones.map((m, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[60px] top-0 w-10 h-10 bg-white rounded-full border-4 border-[#0f172a] flex items-center justify-center shadow-lg transition-colors group-hover:border-[#ffc107]">
                  <Cross
                    size={16}
                    className="text-[#0f172a] group-hover:text-[#ffc107]"
                  />
                </div>

                <span className="text-lg font-black text-[#ffc107] uppercase tracking-widest">
                  {m.year}
                </span>
                <h4 className="text-2xl font-bold text-[#0f172a] mt-2">
                  {m.title}
                </h4>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <Users className="mx-auto mb-4 text-[#0f172a]" size={32} />
            <h5 className="font-bold text-3xl">300+</h5>
            <p className="text-gray-500">Members</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <Calendar className="mx-auto mb-4 text-[#0f172a]" size={32} />
            <h5 className="font-bold text-3xl">200+</h5>
            <p className="text-gray-500">Children in SS</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border-b-4 border-[#ffc107]">
            <Home className="mx-auto mb-4 text-[#0f172a]" size={32} />
            <h5 className="font-bold text-xl uppercase">New Location</h5>
            <p className="text-gray-500 text-sm">6th Ave & Ventura St</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
