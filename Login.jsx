import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for authentication will go here
    console.log("Logging in with:", email);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Roboto_Slab']">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header Decor */}
        <div className="bg-[#0f172a] p-10 text-center">
          <div className="w-20 h-20 bg-[#ffc107] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock size={40} className="text-[#0f172a]" />
          </div>
          <h2 className="text-2xl font-black text-[#ffc107] italic">
            የአባላት መግቢያ
          </h2>
          <p className="text-slate-400 text-sm uppercase tracking-widest mt-1">
            Member Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#ffc107]/20 transition-all"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#ffc107]/20 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f172a] text-[#ffc107] py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 hover:text-white transition-all shadow-xl"
          >
            LOGIN <LogIn size={24} />
          </button>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">Not a member yet?</p>
            <Link
              to="/services/membership"
              className="text-[#0f172a] font-black italic hover:text-blue-600 transition-colors"
            >
              Request Membership Here →
            </Link>
          </div>
        </form>

        <div className="bg-slate-50 p-4 flex items-center justify-center gap-2 border-t border-slate-100">
          <ShieldCheck size={16} className="text-green-600" />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            Secure Orthodox Member Portal
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
