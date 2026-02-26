import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  User,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import axios from "axios";

const AdminLogin = () => {
  const [view, setView] = useState("login"); // 'login', 'forgot', 'reset'
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [resetAnswer, setResetAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials,
      );
      if (res.data.ok) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      }
    } catch (err) {
      setError("Incorrect username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAnswer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/verify-reset",
        { answer: resetAnswer },
      );
      if (res.data.ok) setView("reset");
    } catch (err) {
      setError("Incorrect Answer");
    }
  };

  const handleFinalReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/reset-password", {
        newPassword,
      });
      alert("Password Updated! Please login.");
      setView("login");
    } catch (err) {
      setError("Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-['Roboto_Slab']">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-block p-5 rounded-3xl bg-[#ffc107] text-[#0f172a] mb-4 shadow-xl">
            {view === "login" ? (
              <ShieldCheck size={40} />
            ) : (
              <HelpCircle size={40} />
            )}
          </div>
          <h1 className="text-3xl font-black text-white uppercase">
            Admin{" "}
            <span className="text-[#ffc107]">
              {view === "login" ? "Login" : "Recovery"}
            </span>
          </h1>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#ffc107]"></div>

          {/* VIEW: LOGIN */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                required
                name="username"
                placeholder="Username"
                className="w-full p-4 bg-slate-50 rounded-2xl border font-bold"
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <input
                required
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-slate-50 rounded-2xl border font-bold"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              {error && (
                <p className="text-red-500 text-xs font-bold">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-4 bg-[#0f172a] text-[#ffc107] rounded-2xl font-black text-lg"
              >
                ACCESS DASHBOARD
              </button>
              <button
                type="button"
                onClick={() => setView("forgot")}
                className="w-full text-slate-400 text-sm font-bold hover:text-blue-500"
              >
                Forgot Password?
              </button>
            </form>
          )}

          {/* VIEW: FORGOT (Security Question) */}
          {view === "forgot" && (
            <form onSubmit={handleVerifyAnswer} className="space-y-6">
              <p className="text-slate-600 font-bold text-center">
                Security Question: <br />{" "}
                <span className="text-blue-600 italic">
                  "What is the name of our church?"
                </span>
              </p>
              <input
                required
                placeholder="Your Answer"
                className="w-full p-4 bg-slate-50 rounded-2xl border font-bold text-center"
                value={resetAnswer}
                onChange={(e) => setResetAnswer(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-xs font-bold text-center">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black"
              >
                VERIFY ANSWER
              </button>
              <button
                type="button"
                onClick={() => setView("login")}
                className="w-full text-slate-400 text-sm font-bold"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* VIEW: RESET (New Password) */}
          {view === "reset" && (
            <form onSubmit={handleFinalReset} className="space-y-6">
              <p className="text-green-600 font-bold text-center">
                Identity Verified! <br /> Set your new password below.
              </p>
              <input
                required
                type="password"
                placeholder="New Password"
                className="w-full p-4 bg-slate-50 rounded-2xl border font-bold text-center"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-black"
              >
                UPDATE PASSWORD
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
