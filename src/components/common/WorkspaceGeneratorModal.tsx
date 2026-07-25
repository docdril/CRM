'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Building2, Flame, CreditCard, Building, Activity, Truck, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INDUSTRY_OPTIONS, IndustryType } from '../../services/demoWorkspaceGenerator';
import { useCrmStore } from '../../store/useCrmStore';

export const WorkspaceGeneratorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { generateWorkspaceForIndustry } = useCrmStore();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('saas');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-amber-400" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-indigo-400" />;
      case 'Building': return <Building className="w-6 h-6 text-emerald-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-rose-400" />;
      case 'Truck': return <Truck className="w-6 h-6 text-blue-400" />;
      default: return <Building2 className="w-6 h-6 text-brand-400" />;
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generateWorkspaceForIndustry(selectedIndustry);
      setIsGenerating(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
        >
          {/* Top Banner Header */}
          <div className="p-8 bg-gradient-to-r from-slate-950 via-indigo-950 to-brand-950 border-b border-white/10 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-brand-500/20 border border-brand-400/30 text-brand-300 shadow-glow-brand">
                  <Sparkles className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight font-display">Vertex Industry Generator</h2>
                  <p className="text-xs text-brand-200 font-outfit uppercase tracking-widest font-bold">What industry are you in?</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-4 leading-relaxed font-outfit max-w-2xl">
              Vertex AI procedurally generates an interconnected business operating system tailored to your domain—in pure browser memory.
            </p>
          </div>

          {/* Industry Cards Grid */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[60vh] overflow-y-auto">
            {INDUSTRY_OPTIONS.map((ind) => {
              const isSelected = selectedIndustry === ind.id;
              return (
                <div
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500/10 shadow-glow-brand ring-2 ring-brand-500/30'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-white/10">{getIcon(ind.iconName)}</div>
                      {isSelected && <CheckCircle2 className="w-6 h-6 text-brand-400" />}
                    </div>
                    <h3 className="text-base font-extrabold text-white font-display">{ind.name}</h3>
                    <p className="text-xs text-slate-400 leading-snug mt-1 font-outfit">{ind.desc}</p>
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-300 bg-brand-500/20 border border-brand-500/30 px-2.5 py-1 rounded-lg self-start font-outfit">
                    {ind.sampleMetrics}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-slate-950/80 border-t border-white/10 flex items-center justify-between font-outfit">
            <span className="text-xs text-slate-400 font-semibold">100% In-Memory Architecture • Zero Persistence</span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-brand-500 to-indigo-600 hover:opacity-95 text-white font-black text-xs rounded-2xl shadow-xl shadow-brand-500/30 transition-all btn-spring flex items-center gap-2 font-display disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Generating Dataset...
                </>
              ) : (
                <>
                  Launch Workspace <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
