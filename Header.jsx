import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Facebook,
  Send,
  Instagram,
  Youtube,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigation = [
    { name: "መነሻ", href: "/" },
    { name: "ታሪክ", href: "/history" },
    { name: "ሰንበት ት/ቤት", href: "/services/sunday-school" },
    { name: "ማስታወቂያ", href: "/announcement" },
  ];

  const services = [
    { name: "የክርስትና ጥምቀት", href: "/services/baptism" },
    { name: "የተክሊል አገልግሎት", href: "/services/marriage" },
    { name: "የንስሐ አባት", href: "/services/confession" },
    { name: "ምክርና ጸሎት", href: "/services/counseling" },
    { name: "ፍትሐት", href: "/services/funeral" },
  ];

  return (
    <>
      <nav className="bg-[#0f172a] border-b-4 border-[#ffc107] fixed w-full z-50 top-0 start-0 shadow-xl font-['Roboto_Slab']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <a href="/" className="flex flex-col">
                <span className="text-white text-xl font-bold tracking-tight group-hover:text-[#ffc107] transition-colors">
                  ደብረ ሰላም የኢትዮጵያ ኦርቶዶክስ
                </span>
                <span className="text-[#ffc107] text-m font-semibold uppercase tracking-widest">
                  ተዋህዶ ቤተ ክርስቲያን
                </span>
                <span className="text-[#ffc107] text-xs font-semibold uppercase tracking-widest">
                  ዴንቨር ኮሎራዶ
                </span>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#ffc107] px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center text-white hover:text-[#ffc107] px-3 py-2 text-sm font-medium transition-colors"
                >
                  አገልግሎቶች <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {/* Dropdown Box */}
                <div
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className={`absolute right-0 w-48 mt-0 bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 border-t-4 border-[#ffc107] transition-all duration-200 ${
                    isDropdownOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="py-1">
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-3 text-sm text-[#0f172a] hover:bg-gray-100 hover:text-red-700 transition-colors"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <a
                href="/donate"
                className="bg-[#ffc107] text-[#0f172a] font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transform transition hover:scale-105 shadow-md text-sm"
              >
                መዋጮ
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div
          className={`md:hidden bg-[#0f172a] border-t border-slate-800 transition-all duration-300 ${
            isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-[#ffc107] text-base font-medium border-b border-slate-800"
              >
                {item.name}
              </a>
            ))}
            {/* Mobile Services List */}
            <div className="bg-slate-900 px-3 py-2 rounded-lg mt-2">
              <p className="text-[#ffc107] text-xs font-bold uppercase mb-2">
                አገልግሎቶች
              </p>
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="block py-2 text-gray-300 hover:text-white text-sm"
                >
                  {service.name}
                </a>
              ))}
            </div>
            <a
              href="/donate"
              className="block w-full text-center mt-4 bg-[#ffc107] text-[#0f172a] font-bold py-3 px-6 rounded-lg shadow-lg"
            >
              ይርዱ
            </a>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content overlap */}
      <div className="h-20 md:h-20"></div>
    </>
  );
};

export default Header;
