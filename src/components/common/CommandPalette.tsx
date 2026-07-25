'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, User, DollarSign, Command, ArrowRight, Sparkles, X } from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { ActiveTab } from '../../types/crm';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, toggleCommandPalette, setActiveTab, selectCompany, companies, deals, contacts } = useCrmStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        toggleCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, toggleCommandPalette]);

  if (!isCommandPaletteOpen) return null;

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.industry.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredDeals = deals.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.companyName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredContacts = contacts.filter(cnt => 
    cnt.name.toLowerCase().includes(query.toLowerCase()) || 
    cnt.email.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const navigateToTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    toggleCommandPalette(false);
  };

  const handleSelectCompany = (companyId: string) => {
    selectCompany(companyId);
    toggleCommandPalette(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden"
        >
          {/* Header Input */}
          <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Search companies, deals, contacts, or jump to module... (Cmd+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
            />
            <div className="flex items-center gap-1.5 ml-2">
              <span className="px-2 py-0.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded-md border border-slate-200">
                ESC
              </span>
              <button 
                onClick={() => toggleCommandPalette(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {/* Quick Navigation Commands */}
            {!query && (
              <div>
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Navigation</p>
                <div className="space-y-1">
                  {[
                    { label: 'Executive Dashboard', tab: 'dashboard' as ActiveTab, icon: Sparkles },
                    { label: 'Deals & Pipeline Kanban', tab: 'pipeline' as ActiveTab, icon: DollarSign },
                    { label: 'Companies Directory', tab: 'clients' as ActiveTab, icon: Building2 },
                    { label: 'Contacts & Leads', tab: 'contacts' as ActiveTab, icon: User },
                    { label: 'Analytics & BI', tab: 'analytics' as ActiveTab, icon: Command }
                  ].map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => navigateToTab(item.tab)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Companies Results */}
            {filteredCompanies.length > 0 && (
              <div>
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Companies</p>
                <div className="space-y-1">
                  {filteredCompanies.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCompany(c.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={c.logo} alt={c.name} className="w-7 h-7 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.industry}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Score {c.relationshipScore}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Deals Results */}
            {filteredDeals.length > 0 && (
              <div>
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deals</p>
                <div className="space-y-1">
                  {filteredDeals.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => navigateToTab('pipeline')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{d.name}</p>
                        <p className="text-xs text-slate-400">{d.companyName}</p>
                      </div>
                      <span className="text-sm font-bold text-slate-900">${(d.amount / 1000).toFixed(0)}k</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Command className="w-3.5 h-3.5" /> Quick Command Bar Powered by Vertex AI
            </span>
            <span>Use ↑ ↓ to navigate</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
