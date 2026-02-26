import React from "react";
import { Link } from "react-router-dom"; // 1. Added Link import
import {
  Facebook,
  Send,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white border-t-4 border-[#ffc107] font-['Roboto_Slab'] w-full">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Church Identity */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-[#ffc107] text-2xl font-bold tracking-tight">
              ደብረ ሰላም መድኃኔዓለም
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን በዴንቨር ኮሎራዶ። <br />
              መንፈሳዊ አገልግሎት፣ ፍቅርና ሰላም ለሁሉም የምናዳርስበት ቅዱስ ስፍራ።
            </p>
            {/* Social Icons (External links use <a>) */}
            <div className="flex justify-center md:justify-start space-x-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Send className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* 2. Quick Links (Updated to use <Link>) */}
          <div className="text-center md:text-left">
            <h4 className="text-[#ffc107] font-bold text-lg mb-6 uppercase tracking-widest">
              ፈጣን ሊንኮች
            </h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#ffc107] flex items-center justify-center md:justify-start group"
                >
                  <ChevronRight className="w-4 h-4 mr-1 text-[#ffc107] group-hover:translate-x-1 transition-transform" />
                  መነሻ ገጽ (Home)
                </Link>
              </li>
              <li>
                <Link
                  to="/sermons"
                  className="hover:text-[#ffc107] flex items-center justify-center md:justify-start group"
                >
                  <ChevronRight className="w-4 h-4 mr-1 text-[#ffc107] group-hover:translate-x-1 transition-transform" />
                  ትምህርቶች (Sermons)
                </Link>
              </li>
              <li>
                <Link
                  to="/announcements"
                  className="hover:text-[#ffc107] flex items-center justify-center md:justify-start group"
                >
                  <ChevronRight className="w-4 h-4 mr-1 text-[#ffc107] group-hover:translate-x-1 transition-transform" />
                  ማስታወቂያዎች (Announcements)
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#ffc107] flex items-center justify-center md:justify-start group"
                >
                  <ChevronRight className="w-4 h-4 mr-1 text-[#ffc107] group-hover:translate-x-1 transition-transform" />
                  ያግኙን (Contact)
                </Link>
                <Link to="/services/wedding" className="hover:text-amber-500">
                  Wedding
                </Link>
                <Link to="/services/baptism" className="hover:text-amber-500">
                  Baptism
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Services Summary (Updated routes) */}
          <div className="text-center md:text-left">
            <h4 className="text-[#ffc107] font-bold text-lg mb-6 uppercase tracking-widest">
              አገልግሎቶች
            </h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li>
                <Link to="/baptism" className="hover:text-white">
                  የክርስትና ጥምቀት (Baptism)
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="hover:text-white">
                  የተክሊል አገልግሎት (Wedding)
                </Link>
              </li>
              <li>
                <Link to="/sunday-school" className="hover:text-white">
                  ሰንበት ትምህርት ቤት (Sunday School)
                </Link>
              </li>
              <li>
                <Link to="/prayer-request" className="hover:text-white">
                  የጸሎት ጥያቄ / የንስሐ አባት
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div className="text-center md:text-left">
            <h4 className="text-[#ffc107] font-bold text-lg mb-6 uppercase tracking-widest">
              አድራሻ
            </h4>
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <MapPin className="w-5 h-5 text-[#ffc107] shrink-0" />
                <span>
                  5152 E 17th Ave Parkway <br /> Denver, CO 80220
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="w-5 h-5 text-[#ffc107] shrink-0" />
                <span>720-998-5335</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="w-5 h-5 text-[#ffc107] shrink-0" />
                <span>admin@dschurch.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} ደብረ ሰላም መድኃኔዓለም የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን።
            መብቱ በህግ የተጠበቀ ነው።
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
