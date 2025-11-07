import React from 'react';
import HeroSplineCover from './components/HeroSplineCover';
import CalculatorCards from './components/CalculatorCards';
import MetricExplainers from './components/MetricExplainers';
import FooterCTA from './components/FooterCTA';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <HeroSplineCover />
      <CalculatorCards />
      <MetricExplainers />
      <FooterCTA />
    </div>
  );
};

export default App;
