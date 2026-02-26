import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Heart,
  Eye,
  EyeOff,
} from "lucide-react";

const MemberLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email.toLowerCase().trim(),
          password: credentials.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // Save the ID so the Profile page knows who is logged in
        localStorage.setItem("memberId", data.member._id);
        navigate("/profile");
      } else {
        // 401 or 404 errors will show up here
        setError(data.message || "መግባት አልተቻለም (Login failed)");
      }
    } catch (err) {
      setError("ከአገልጋዩ ጋር መገናኘት አልተቻለም (Server connection error)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Roboto_Slab']">
      <div className="w-full max-w-md">
        {/* WELCOME HEADER */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-inner">
            <Heart size={40} className="fill-current" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Member Portal</h1>
          <p className="text-slate-500 mt-2 font-bold tracking-tight">
            ደብረ ሰላም መድኃኔዓለም - ዴንቨር
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-slate-300"
                  size={20}
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="yourname@email.com"
                  className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none ring-2 ring-transparent focus:ring-blue-100 font-bold transition-all"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* PASSWORD WITH TOGGLE */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-slate-300"
                  size={20}
                />
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none ring-2 ring-transparent focus:ring-blue-100 font-bold transition-all"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-xs font-bold border border-red-100 animate-pulse">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              disabled={loading}
              className="w-full py-5 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-900/10 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "SIGN IN"}
              {!loading && <ArrowRight />}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="mt-8 pt-6 border-t border-slate-50 text-center space-y-2">
            <p className="text-sm text-slate-400">
              Not a member yet?{" "}
              <Link
                to="/membership"
                className="text-blue-600 font-black hover:underline"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-8 text-xs font-bold">
          Protected & Secured • 2026
        </p>
      </div>
    </div>
  );
};

export default MemberLogin;
