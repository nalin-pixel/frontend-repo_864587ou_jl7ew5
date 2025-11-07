import React, { useMemo, useState } from 'react';
import { Wallet, Percent, TrendingUp, Landmark } from 'lucide-react';

// Utility formatters
const currency = (v) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(isNaN(v) ? 0 : v);
const percent = (v) => `${(isNaN(v) ? 0 : v).toFixed(1)}%`;

const Input = ({ label, value, onChange, prefix, suffix, step = 'any' }) => (
  <label className="flex flex-col gap-1">
    <span className="text-sm text-slate-500">{label}</span>
    <div className="flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/30">
      {prefix && <span className="mr-2 text-slate-400">{prefix}</span>}
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full outline-none"
      />
      {suffix && <span className="ml-2 text-slate-400">{suffix}</span>}
    </div>
  </label>
);

const Card = ({ title, icon: Icon, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

const CalculatorCards = () => {
  // States for the calculators
  const [revenue, setRevenue] = useState(200000);
  const [cogs, setCogs] = useState(80000);
  const [opex, setOpex] = useState(60000);

  const [fixedCosts, setFixedCosts] = useState(100000);
  const [price, setPrice] = useState(500);
  const [variableCost, setVariableCost] = useState(250);

  const [cash, setCash] = useState(1200000);
  const [burn, setBurn] = useState(120000);

  // Calculations
  const grossMargin = useMemo(() => {
    const gm = ((revenue - cogs) / Math.max(revenue, 1)) * 100;
    return Math.max(Math.min(gm, 100), -100);
  }, [revenue, cogs]);

  const ebitda = useMemo(() => revenue - cogs - opex, [revenue, cogs, opex]);
  const ebitdaMargin = useMemo(() => (ebitda / Math.max(revenue, 1)) * 100, [ebitda, revenue]);

  const contributionMargin = useMemo(() => price - variableCost, [price, variableCost]);
  const breakEvenUnits = useMemo(() => Math.ceil(Math.max(fixedCosts / Math.max(contributionMargin, 1e-6), 0)), [fixedCosts, contributionMargin]);

  const runwayMonths = useMemo(() => Math.max(Math.floor(cash / Math.max(burn, 1)), 0), [cash, burn]);

  return (
    <section id="calculators" className="container mx-auto px-6 md:px-10 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profitability */}
        <Card title="Profitability" icon={Wallet}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Revenue" value={revenue} onChange={setRevenue} prefix="$" />
            <Input label="COGS" value={cogs} onChange={setCogs} prefix="$" />
            <Input label="OpEx" value={opex} onChange={setOpex} prefix="$" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Stat label="Gross Margin" value={percent(grossMargin)} trend={grossMargin >= 50 ? 'up' : 'down'} />
            <Stat label="EBITDA" value={currency(ebitda)} trend={ebitda >= 0 ? 'up' : 'down'} />
            <div className="col-span-2">
              <Progress value={Math.max(Math.min(ebitdaMargin, 100), 0)} label={`EBITDA Margin ${percent(ebitdaMargin)}`} />
            </div>
          </div>
        </Card>

        {/* Break-even */}
        <Card title="Break-even" icon={Percent}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Fixed costs" value={fixedCosts} onChange={setFixedCosts} prefix="$" />
            <Input label="Unit price" value={price} onChange={setPrice} prefix="$" />
            <Input label="Variable cost" value={variableCost} onChange={setVariableCost} prefix="$" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Stat label="Contribution/Unit" value={currency(contributionMargin)} trend={contributionMargin >= 0 ? 'up' : 'down'} />
            <Stat label="Break-even Units" value={breakEvenUnits.toLocaleString()} trend={breakEvenUnits > 0 ? 'up' : 'down'} />
          </div>
        </Card>

        {/* Runway */}
        <Card title="Cash Runway" icon={Landmark}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Cash on hand" value={cash} onChange={setCash} prefix="$" />
            <Input label="Monthly burn" value={burn} onChange={setBurn} prefix="$" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Stat label="Runway" value={`${runwayMonths} months`} trend={runwayMonths >= 18 ? 'up' : 'down'} />
            <div className="col-span-2">
              <Progress value={Math.min((runwayMonths / 36) * 100, 100)} label="Target: 18-24 months" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

const Stat = ({ label, value, trend }) => (
  <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="mt-1 flex items-center gap-2">
      <span className="text-lg font-semibold">{value}</span>
      {trend === 'up' ? (
        <TrendingUp size={16} className="text-emerald-600" />
      ) : (
        <TrendingUp size={16} className="rotate-180 text-rose-600" />
      )}
    </div>
  </div>
);

const Progress = ({ value, label }) => (
  <div>
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>{label}</span>
      <span>{value.toFixed(0)}%</span>
    </div>
    <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${Math.max(Math.min(value, 100), 0)}%` }} />
    </div>
  </div>
);

export default CalculatorCards;
