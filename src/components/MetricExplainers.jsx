import React from 'react';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

const items = [
  {
    icon: BarChart3,
    title: 'Gross Margin',
    desc:
      'Measures how efficiently you deliver your product. Aim for 60%+ for software; lower for hardware or services-heavy businesses.',
  },
  {
    icon: LineChart,
    title: 'EBITDA',
    desc:
      'A proxy for operating profitability. Track month-over-month to understand true performance without non-cash items.',
  },
  {
    icon: PieChart,
    title: 'Break-even',
    desc:
      'How many units you need to sell to cover all fixed costs. Useful for pricing and go-to-market planning.',
  },
];

const MetricExplainers = () => {
  return (
    <section id="metrics" className="container mx-auto px-6 md:px-10 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-2">
              <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Icon size={18} />
              </div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricExplainers;
