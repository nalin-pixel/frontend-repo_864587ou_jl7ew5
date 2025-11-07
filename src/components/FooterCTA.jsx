import React from 'react';
import { Rocket } from 'lucide-react';

const FooterCTA = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur">
      <div className="container mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold">Level up your finance ops</h3>
          <p className="text-slate-600 mt-1 text-sm">
            Save scenarios and share results with your team. More calculators coming soon.
          </p>
        </div>
        <a
          href="#calculators"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 font-medium shadow-sm hover:bg-blue-700 transition"
        >
          <Rocket size={18} />
          Get Started
        </a>
      </div>
    </footer>
  );
};

export default FooterCTA;
