'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, DollarSign, Target, Sparkles, 
  ArrowUpRight, ArrowDownRight, Layers, Award, Clock, Activity, Briefcase 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency, formatFullCurrency } from '../../lib/utils';

const REVENUE_DATA = [
  { month: 'Jan', volume: 420000, target: 400000 },
  { month: 'Feb', volume: 560000, target: 480000 },
  { month: 'Mar', volume: 680000, target: 550000 },
  { month: 'Apr', volume: 840000, target: 700000 },
  { month: 'May', volume: 990000, target: 850000 },
  { month: 'Jun', volume: 1180000, target: 1000000 }
];

const SOURCE_DATA = [
  { name: 'Inbound Enterprise', value: 42, color: '#0c8de9' },
  { name: 'Partner Network', value: 28, color: '#10b981' },
  { name: 'Outbound SDR', value: 18, color: '#f59e0b' },
  { name: 'Events & Executive Sync', value: 12, color: '#0f172a' }
];

export const DashboardView: React.FC = () => {
  const { companies, deals, aiInsights, toggleAiDrawer, currencySymbol } = useCrmStore();

  const totalPipeline = deals.reduce((sum, d) => sum + d.amount, 0);
  const activeClientsCount = companies.filter(c => c.status === 'active').length;
  const avgHealthScore = Math.round(companies.reduce((sum, c) => sum + c.relationshipScore, 0) / (companies.length || 1));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1700px] mx-auto font-outfit">
      {/* Top Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-display">
            Overview
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Real-time sales velocity, AI predictions, and enterprise client metrics
          </p>
        </div>

        <button
          onClick={() => toggleAiDrawer(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all btn-spring flex items-center gap-2 font-display self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-brand-300 animate-pulse" />
          Generate Brief
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl theme-card border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total Active Pipeline</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-display">{formatFullCurrency(totalPipeline, currencySymbol)}</h3>
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.8% vs last month
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl theme-card border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Active Accounts</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-display">{activeClientsCount} Enterprise Clients</h3>
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100% Retention Rate
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl theme-card border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Average Client Health</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-display">{avgHealthScore}/100 Score</h3>
            <p className="text-xs font-bold text-purple-600 flex items-center gap-1 mt-1">
              <Sparkles className="w-3.5 h-3.5" /> Low Churn Risk Detected
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl theme-card border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Win Rate Probability</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-display">84.2% AI Win Rate</h3>
            <p className="text-xs font-bold text-amber-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +5.4% YoY Expansion
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Velocity Area Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl theme-card border shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Revenue Growth Velocity</h3>
              <p className="text-xs text-slate-400">Monthly contracted deal volume vs target</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">2026 YTD</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c8de9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0c8de9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
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
                  formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, 'Volume']}
                />
                <Area type="monotone" dataKey="volume" stroke="#0c8de9" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                <Area type="monotone" dataKey="target" stroke="#0f172a" strokeWidth={2} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Attribution Pie Chart */}
        <div className="p-6 rounded-2xl theme-card border shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Source Attribution</h3>
            <p className="text-xs text-slate-400">Distribution of deal volume</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SOURCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
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
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-outfit pt-2 border-t border-slate-100">
            {SOURCE_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-semibold truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
