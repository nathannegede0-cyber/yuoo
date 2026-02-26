import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const ServicesLayout = () => {
  const location = useLocation();

  // Links for the top navigation bar (instead of a sidebar)
  const navLinks = [
    { name: "Marriage", path: "/services/marriage" },
    { name: "Baptism", path: "/services/baptism" },
    { name: "Funeral", path: "/services/funeral" },
    { name: "Membership", path: "/services/membership" },
    { name: "Hall Rental", path: "/services/hall-rent" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. TOP SERVICE NAVIGATION (Horizontal instead of Aside) */}
      <div className="bg-white border-b sticky top-24 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar py-4 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`whitespace-nowrap pb-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
                  location.pathname === link.path
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Centered and Roomy) */}
      <main className="max-w-5xl mx-auto py-12 px-6">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* This renders the specific service page (Membership.jsx, etc.) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ServicesLayout;
