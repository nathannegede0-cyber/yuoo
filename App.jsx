import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. Layout & Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ServicesLayout from "./components/ServicesLayout";
import RegisterForm from "./components/RegisterForm";
import ServiceRequestForm from "./components/ServiceRequestForm";
import AdminDashboard from "./components/AdminDashboard"; // Unified dashboard component
// Add these at the top of App.jsx
import MemberLogin from "./pages/MemberLogin";
import MemberProfile from "./pages/MemberProfile";
// 2. Main Top-Level Pages (Full Width)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sermons from "./pages/Sermons";
import AdminLogin from "./pages/AdminLogin";

import SundaySchool from "./pages/SundaySchool";
import History from "./pages/History";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import PrayerRequest from "./pages/PrayerRequest";
import Announcements from "./pages/Announcements";
import SSRegistration from "./pages/SSRegistration";

// 3. Service Pages (Inside ServicesLayout)
import Membership from "./pages/Membership";
import Wedding from "./pages/Wedding";
import Baptism from "./pages/Baptism";
import Memorial from "./pages/Memorial";
import HallRental from "./pages/HallRental";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow w-full">
          <Routes>
            {/* --- PUBLIC FULL-WIDTH ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sermon" element={<Sermons />} />
            <Route path="/announcement" element={<Announcements />} />
            <Route path="/history" element={<History />} />
            <Route path="/sunday-school" element={<SundaySchool />} />
            <Route path="/ss-registration" element={<SSRegistration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/prayer-request" element={<PrayerRequest />} />

            {/* New Member & Service Forms */}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/request" element={<ServiceRequestForm />} />
            {/* MEMBER ROUTES */}
            <Route path="/member-login" element={<MemberLogin />} />
            <Route path="/profile" element={<MemberProfile />} />
            {/* ADMIN PORTAL */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* ADMIN ROUTES */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* --- NESTED SERVICE ROUTES (WITH SIDEBAR) --- */}
            <Route path="/services" element={<ServicesLayout />}>
              <Route path="membership" element={<Membership />} />
              <Route path="marriage" element={<Wedding />} />
              <Route path="baptism" element={<Baptism />} />
              <Route path="funeral" element={<Memorial />} />
              <Route path="hall-rent" element={<HallRental />} />
            </Route>

            {/* Catch-all: Redirect to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
