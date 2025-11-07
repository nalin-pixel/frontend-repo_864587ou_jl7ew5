import React from 'react';
import Spline from '@splinetool/react-spline';
import { Calculator, TrendingUp } from 'lucide-react';

const HeroSplineCover = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-white text-xs">
            <TrendingUp size={14} />
            <span>Corporate Finance Toolkit</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            Plan, model, and forecast with confidence.
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 md:text-lg">
            Quick, accurate calculators for runway, margins, break-even, CAC/LTV, EBITDA, and more — all in your browser.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#calculators"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-4 py-2 font-medium shadow-sm hover:shadow transition"
            >
              <Calculator size={18} />
              Start Calculating
            </a>
            <a
              href="#metrics"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 text-white px-4 py-2 font-medium border border-white/20 hover:bg-white/20 transition"
            >
              Explore Metrics
            </a>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlays that don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-orange-900/20" />
    </section>
  );
};

export default HeroSplineCover;
