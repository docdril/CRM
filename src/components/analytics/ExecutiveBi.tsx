'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Sparkles, PieChart as PieIcon, 
  ArrowUpRight, Target, DollarSign, Layers, ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency, formatFullCurrency } from '../../lib/utils';

const QUARTERLY_PERFORMANCE = [
  { quarter: 'Q1 2025', revenue: 1450000, target: 1200000, margin: 78 },
  { quarter: 'Q2 2025', revenue: 1820000, target: 1500000, margin: 82 },
  { quarter: 'Q3 2025', revenue: 2150000, target: 1800000, margin: 84 },
  { quarter: 'Q4 2025', revenue: 2680000, target: 2200000, margin: 86 },
  { quarter: 'Q1 2026', revenue: 3100000, target: 2700000, margin: 89 }
];

export const ExecutiveBi: React.FC = () => {
  const { deals, companies, currencySymbol, toggleAiDrawer } = useCrmStore();

  const totalContractedValue = deals.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1700px] mx-auto font-outfit">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-display">
            Executive Analytics & BI Studio
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Enterprise forecasting, margin metrics, and AI predictive model outputs
          </p>
        </div>

        <button
          onClick={() => toggleAiDrawer(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all btn-spring flex items-center gap-2 font-display self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-brand-300 animate-pulse" />
          Run Monte Carlo Simulation
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl theme-card border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Gross Contract Value</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-display">{formatFullCurrency(totalContractedValue, currencySymbol)}</p>
          </div>
          <div className="p-3 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl theme-card border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Gross Profit Margin</span>
            <p className="text-2xl font-black text-emerald-600 mt-1 font-display">89.4%</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl theme-card border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">AI Forecast Accuracy</span>
            <p className="text-2xl font-black text-purple-600 mt-1 font-display">96.2%</p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quarterly Performance Chart */}
      <div className="p-6 rounded-2xl theme-card border shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Quarterly Revenue vs Target Run-Rate</h3>
            <p className="text-xs text-slate-400">Quarterly growth trajectory with gross margin overlay</p>
          </div>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold font-display">
            Multi-Year BI
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={QUARTERLY_PERFORMANCE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${(val / 100000).toFixed(1)}L`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  padding: '10px 14px'
                }}
                itemStyle={{ color: '#ffffff', fontWeight: '700', fontSize: '12px' }}
                labelStyle={{ color: '#cbd5e1', fontWeight: '700', fontSize: '11px', marginBottom: '4px' }}
                formatter={(val: any) => [`${currencySymbol}${Number(val).toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#0c8de9" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#0f172a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
