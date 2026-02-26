import React, { useState } from "react";
// ... (Your main Baptism code here)

// 1. YOUR MAIN COMPONENT
const Baptism = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <SuccessMessage title="Baptism Request Sent" />;
  }

  return <div>{/* Your Form Code */}</div>;
};

// 2. THE SUCCESS COMPONENT (Place it right here!)
const SuccessMessage = ({ title }) => (
  <div className="text-center py-20 animate-in zoom-in duration-500 bg-white rounded-[3rem] shadow-xl border">
    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle size={48} />
    </div>
    <h2 className="text-4xl font-black mb-4 italic text-slate-900">{title}!</h2>
    <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
      Your request has been received. A priest or administrator will contact you
      shortly.
    </p>
    <button
      className="bg-[#0f172a] text-[#ffc107] px-10 py-4 rounded-2xl font-black"
      onClick={() => (window.location.href = "/")}
    >
      RETURN TO HOME
    </button>
  </div>
);

export default Baptism;
