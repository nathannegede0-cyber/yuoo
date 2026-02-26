import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // For Excel Export
import { useNavigate } from "react-router-dom";
import {
  Users,
  Megaphone,
  Search,
  Plus,
  Trash2,
  X,
  CheckCircle,
  Eye,
  Briefcase,
  Heart,
  Baby,
  Bell,
  Calendar,
  Clock,
  Download,
  LogOut,
  ShieldCheck,
} from "lucide-react";

// --- MAIN COMPONENT ---
const AdminDashboard = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // Announcement Form State
  const [newNews, setNewNews] = useState({
    title: "",
    displayDate: "",
    expiresAt: "",
    category: "General",
    content: "",
    isUrgent: false,
  });

  // --- 1. SECURITY CHECK & DATA FETCH ---
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("isAdmin"); // Or "adminToken" depending on what you used in Login

    // NOTE: If you used "isAdmin" in your Login page, keep this.
    // If you used "adminToken", change it here.
    if (!token) {
      navigate("/admin-login");
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [membersRes, newsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/members"),
        axios.get("http://localhost:5000/api/announcements"),
      ]);

      // Handle different response structures
      const memberData = Array.isArray(membersRes.data)
        ? membersRes.data
        : membersRes.data.members || [];
      setMembers(memberData);

      const newsData = Array.isArray(newsRes.data) ? newsRes.data : [];
      setAnnouncements(newsData);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setMembers([]); // Prevent crash
      setLoading(false);
    }
  };

  // --- 2. LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  // --- 3. EXCEL EXPORT LOGIC ---
  const exportToExcel = () => {
    const excelData = members.map((m) => ({
      "First Name": m.firstName,
      "Last Name": m.lastName,
      Email: m.email,
      Phone: m.phone,
      Address: m.address,
      Age: m.age,
      "Confession Father": m.confessionFather || "N/A",
      "Income Tier": m.incomeCategory,
      "Marital Status": m.isMarried ? "Married" : "Single",
      Spouse: m.spouse?.fullName || "N/A",
      "Children Count": m.children?.length || 0,
      // Create a nice string list of kids: "Samuel (8), Selam (5)"
      "Children List":
        m.children?.map((c) => `${c.name} (${c.age})`).join(", ") || "None",
      Skills: m.professionalSkills?.join(", ") || "None",
      "Joined Date": new Date(m.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
    XLSX.writeFile(workbook, "Debre_Selam_Roster_2026.xlsx");
  };

  // --- 4. ANNOUNCEMENT ACTIONS ---
  const handlePostNews = async (e) => {
    e.preventDefault();
    try {
      // Backend expects 'date' field, so we map 'displayDate' to it
      const payload = { ...newNews, date: newNews.displayDate };

      await axios.post("http://localhost:5000/api/announcements", payload);
      alert("Announcement Published!");

      // Reset Form
      setNewNews({
        title: "",
        displayDate: "",
        expiresAt: "",
        category: "General",
        content: "",
        isUrgent: false,
      });
      fetchData(); // Refresh list
    } catch (err) {
      alert("Error posting news");
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm("Delete this announcement?")) {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      fetchData();
    }
  };

  // --- 5. CALCULATIONS & FILTERING ---
  const safeMembers = Array.isArray(members) ? members : [];

  const filteredMembers = safeMembers.filter((m) =>
    `${m.firstName} ${m.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const totalHouseholds = safeMembers.length;
  const totalChildren = safeMembers.reduce(
    (acc, curr) => acc + (curr.children?.length || 0),
    0,
  );
  const totalSouls = totalHouseholds + totalChildren;

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Roboto_Slab']">
      {/* A. NAVIGATION BAR */}
      <nav className="bg-[#0f172a] text-white p-5 sticky top-0 z-50 shadow-2xl border-b-4 border-[#ffc107]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#ffc107] p-2 rounded-lg text-[#0f172a]">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter">
              Debre Selam <span className="text-[#ffc107]">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-2 bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("members")}
                className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "members" ? "bg-[#ffc107] text-slate-900 shadow-lg" : "text-slate-400"}`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "announcements" ? "bg-[#ffc107] text-slate-900 shadow-lg" : "text-slate-400"}`}
              >
                Announcements
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-white font-black text-sm transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* B. STATISTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users />}
            label="Total Souls"
            value={totalSouls}
            color="blue"
          />
          <StatCard
            icon={<Briefcase />}
            label="Households"
            value={totalHouseholds}
            color="purple"
          />
          <StatCard
            icon={<Baby />}
            label="Children"
            value={totalChildren}
            color="orange"
          />
        </div>

        {/* C. CONTENT TABS */}
        {activeTab === "members" ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Search & Export Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-3">
                <Search className="text-slate-400" />
                <input
                  placeholder="Search members..."
                  className="w-full outline-none font-bold text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-8 py-4 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
              >
                <Download size={20} /> Download Excel
              </button>
            </div>

            {/* Member Table */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 text-xs font-black uppercase text-slate-400">
                      Name
                    </th>
                    <th className="p-6 text-xs font-black uppercase text-slate-400">
                      Income Tier
                    </th>
                    <th className="p-6 text-xs font-black uppercase text-slate-400">
                      Phone
                    </th>
                    <th className="p-6 text-center text-xs font-black uppercase text-slate-400">
                      Profile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredMembers.map((m) => (
                    <tr
                      key={m._id}
                      className="hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="p-6 font-bold text-slate-800">
                        {m.firstName} {m.lastName}
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${m.incomeCategory === "High" ? "bg-green-100 text-green-700" : m.incomeCategory === "Middle" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {m.incomeCategory}
                        </span>
                      </td>
                      <td className="p-6 text-slate-500 font-medium">
                        {m.phone}
                      </td>
                      <td className="p-6 text-center">
                        <button
                          onClick={() => setSelectedMember(m)}
                          className="p-3 bg-slate-100 text-slate-600 rounded-2xl group-hover:bg-[#0f172a] group-hover:text-white transition-all"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ANNOUNCEMENTS TAB */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right duration-500">
            {/* News Form */}
            <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200 h-fit space-y-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <Plus className="text-[#ffc107]" /> New Announcement
              </h3>
              <form onSubmit={handlePostNews} className="space-y-4">
                <input
                  required
                  placeholder="News Title"
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold focus:ring-2 focus:ring-[#ffc107]"
                  value={newNews.title}
                  onChange={(e) =>
                    setNewNews({ ...newNews, title: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                      Display Date
                    </label>
                    <input
                      required
                      placeholder="e.g. Sunday @ 9am"
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold"
                      value={newNews.displayDate}
                      onChange={(e) =>
                        setNewNews({ ...newNews, displayDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-red-400 uppercase ml-2">
                      Expire Date
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full p-3 bg-red-50 text-red-900 rounded-xl border border-red-100 font-bold"
                      value={newNews.expiresAt}
                      onChange={(e) =>
                        setNewNews({ ...newNews, expiresAt: e.target.value })
                      }
                    />
                  </div>
                </div>

                <select
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold"
                  value={newNews.category}
                  onChange={(e) =>
                    setNewNews({ ...newNews, category: e.target.value })
                  }
                >
                  <option>General</option>
                  <option>Event</option>
                  <option>Urgent</option>
                </select>

                <textarea
                  required
                  rows="4"
                  placeholder="Detailed message..."
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold"
                  value={newNews.content}
                  onChange={(e) =>
                    setNewNews({ ...newNews, content: e.target.value })
                  }
                />

                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-red-600"
                    checked={newNews.isUrgent}
                    onChange={(e) =>
                      setNewNews({ ...newNews, isUrgent: e.target.checked })
                    }
                  />
                  <span className="font-bold text-sm text-slate-700">
                    Mark as Priority Alert
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black shadow-lg"
                >
                  PUBLISH ANNOUNCEMENT
                </button>
              </form>
            </div>

            {/* News List */}
            <div className="lg:col-span-2 space-y-4">
              {announcements.map((news) => (
                <div
                  key={news._id}
                  className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex justify-between items-center"
                >
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase mb-2 inline-block ${news.category === "Urgent" ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"}`}
                    >
                      {news.category}
                    </span>
                    <h4 className="text-lg font-black text-slate-800">
                      {news.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-bold">
                      {news.date} (Expires:{" "}
                      {new Date(news.expiresAt).toLocaleDateString()})
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNews(news._id)}
                    className="p-3 text-slate-300 hover:text-red-600 transition-colors"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* D. MEMBER DETAIL MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#0f172a] p-10 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#ffc107] rounded-3xl flex items-center justify-center text-[#0f172a] font-black text-2xl">
                  {selectedMember.firstName ? selectedMember.firstName[0] : "?"}
                  {selectedMember.lastName ? selectedMember.lastName[0] : "?"}
                </div>
                <div>
                  <h2 className="text-3xl font-black">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h2>
                  <p className="text-[#ffc107] font-bold">
                    Member ID: {selectedMember._id.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-10 max-h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProfileItem
                label="Spiritual Father"
                value={selectedMember.confessionFather || "No Selection"}
                icon={<Megaphone size={16} />}
              />
              <ProfileItem
                label="Income Category"
                value={selectedMember.incomeCategory}
                icon={<Calendar size={16} />}
              />

              <div className="col-span-2 border-t pt-6">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Heart className="text-red-500" size={18} /> Family Unit
                </h4>
                <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                  <p className="font-bold text-slate-700">
                    Spouse:{" "}
                    <span className="text-slate-500">
                      {selectedMember.isMarried
                        ? selectedMember.spouse?.fullName
                        : "N/A"}
                    </span>
                  </p>
                  <p className="font-bold text-slate-700">
                    Children:{" "}
                    <span className="text-slate-500">
                      {selectedMember.children?.length || 0} registered
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.children?.map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                      >
                        {c.name} ({c.age})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase className="text-purple-500" size={18} /> Expertise
                  & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.professionalSkills?.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl font-bold text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS (Required to prevent blank screen) ---

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };
  // Fallback to blue if color not found
  const selectedColor = colors[color] || colors.blue;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center gap-6">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${selectedColor}`}
      >
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-3xl font-black text-slate-800">{value}</h3>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value, icon }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </p>
    <p className="text-lg font-bold text-slate-800">{value}</p>
  </div>
);

export default AdminDashboard;
