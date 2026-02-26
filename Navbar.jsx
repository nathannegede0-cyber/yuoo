import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  User,
  Shield,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false); // New: Portal dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false); // New: Mobile portal toggle

  const mainLinks = [
    { name: "መቅደም", path: "/" },
    { name: "ታሪክ", path: "/history" },
    { name: "ትምህርት", path: "/sermon" },
    { name: "ሰንበት ት/ቤት", path: "/sunday-school" },
  ];

  const serviceLinks = [
    { name: "ተክሊል", path: "/services/marriage" },
    { name: "ጥምቀት", path: "/services/baptism" },
    { name: "ፍትሃት", path: "/services/funeral" },
    { name: "የአባልነት ጥያቄ", path: "/services/membership" }, // Pointing to your membership.jsx
    { name: "አዳራሽ ኪራይ", path: "/services/hall-rent" },
  ];

  // Portals Section
  const portalLinks = [
    {
      name: "Member Portal (መግቢያ)",
      path: "/member-login",
      icon: <User size={14} />,
    },
    {
      name: "Admin Dashboard",
      path: "/admin-login",
      icon: <Shield size={14} />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-[#0f172a] text-white sticky top-0 z-[100] border-b-2 border-slate-800">
      <div className="w-full px-4 md:px-10 flex justify-between items-center h-24">
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src="/image/meskel.png"
            alt="Logo"
            className="h-16 w-auto transition-transform group-hover:scale-110"
          />
          <div className="flex flex-col">
            <h1 className="text-[#ffc107] text-lg md:text-xl font-bold italic leading-tight">
              ደብረ ሰላም መድኃኔዓለም
            </h1>
            <span className="text-xs font-semibold uppercase opacity-90">
              ኦርቶዶክስ ተዋህዶ ቤ/ክ ዴንቨር
            </span>
          </div>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-6 h-full">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-1 text-[16px] font-medium hover:text-[#ffc107] ${isActive(link.path) ? "text-[#ffc107]" : "text-gray-300"}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Desktop Services Dropdown */}
          <div
            className="relative h-full flex items-center group/services"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-[16px] font-medium text-gray-300 group-hover/services:text-[#ffc107]">
              አገልግሎቶች{" "}
              <ChevronDown
                size={14}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 w-56 pt-2 animate-in fade-in slide-in-from-top-2">
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-2 shadow-2xl flex flex-col">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-sm text-gray-300 hover:text-[#ffc107] hover:bg-white/5 p-3 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP PORTAL DROPDOWN (Login/Admin) */}
          <div
            className="relative h-full flex items-center group/portal"
            onMouseEnter={() => setPortalDropdownOpen(true)}
            onMouseLeave={() => setPortalDropdownOpen(false)}
          >
            <button className="flex items-center gap-2 border border-slate-700 px-5 py-2 rounded-full font-bold text-sm text-gray-300 hover:border-[#ffc107] hover:text-[#ffc107] transition-all">
              <User size={16} /> መግቢያ (Portals) <ChevronDown size={14} />
            </button>
            {portalDropdownOpen && (
              <div className="absolute top-full right-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2">
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-2 shadow-2xl flex flex-col">
                  {portalLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#ffc107] hover:bg-white/5 p-4 rounded-lg font-bold"
                    >
                      {link.icon} {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/donate")}
            className="bg-[#ffc107] text-[#0f172a] px-6 py-2 rounded-full font-black flex items-center gap-2 hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-amber-500/10"
          >
            <Heart size={16} className="fill-current" /> ይርዱ
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-[#ffc107] p-2 hover:bg-white/5 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* --- MOBILE MENU (Accordion Style) --- */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f172a] p-6 flex flex-col gap-4 border-t border-slate-800 max-h-[calc(100vh-6rem)] overflow-y-auto animate-in slide-in-from-right">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-bold ${isActive(link.path) ? "text-[#ffc107]" : "text-white"}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Services Accordion */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="text-xl font-bold flex items-center justify-between text-white"
            >
              አገልግሎቶች (Services){" "}
              <ChevronDown
                size={20}
                className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-3 pl-4 mt-2 border-l-2 border-slate-800">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-gray-400 font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Portals Accordion (New) */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
              className="text-xl font-bold flex items-center justify-between text-[#ffc107]"
            >
              መግቢያ (Access Portal){" "}
              <ChevronDown
                size={20}
                className={`transition-transform ${mobilePortalOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobilePortalOpen && (
              <div className="flex flex-col gap-3 pl-4 mt-2 border-l-2 border-[#ffc107]/20">
                {portalLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-gray-300 font-bold flex items-center gap-3"
                  >
                    {link.icon} {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <hr className="border-slate-800 my-4" />

          <button
            onClick={() => {
              navigate("/donate");
              setIsOpen(false);
            }}
            className="w-full bg-[#ffc107] text-[#0f172a] py-5 rounded-2xl font-black text-xl shadow-xl"
          >
            ይርዱ (Donate)
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
