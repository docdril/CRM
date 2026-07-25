'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, DollarSign, Sparkles, Search, 
  ArrowLeft, ArrowRight, Trash2, X, Lock 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { DealStage, Deal } from '../../types/crm';
import { formatCurrency } from '../../lib/utils';

const STAGES: { id: DealStage; label: string; color: string }[] = [
  { id: 'qualification', label: 'Qualification', color: 'border-t-blue-500' },
  { id: 'proposal', label: 'Proposal Sent', color: 'border-t-purple-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'border-t-amber-500' },
  { id: 'contract', label: 'Contract Sign-off', color: 'border-t-indigo-500' },
  { id: 'closed_won', label: 'Closed Won', color: 'border-t-emerald-500' },
  { id: 'closed_lost', label: 'Closed Lost', color: 'border-t-rose-500' }
];

export const DealsKanban: React.FC = () => {
  const { deals, updateDealStage, createDeal, deleteDeal, selectCompany, currencySymbol, currentUser } = useCrmStore();
  const [filterQuery, setFilterQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Check strict RBAC Read-Only permission
  const isReadOnly = currentUser?.tabPermissions?.pipeline === 'read';

  // New Deal Form State
  const [newDealName, setNewDealName] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('Apex Global Technologies');
  const [newAmount, setNewAmount] = useState('450000');
  const [newStage, setNewStage] = useState<DealStage>('qualification');

  const filteredDeals = deals.filter(d => 
    d.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
    d.companyName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || !newDealName) return;

    createDeal({
      name: newDealName,
      companyId: 'comp-1',
      companyName: newCompanyName,
      amount: Number(newAmount),
      stage: newStage,
      probability: 75,
      owner: {
        name: currentUser?.name || 'Alex Vance',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      },
      priority: 'high',
      tags: ['New Deal', 'Q3 Pipeline'],
      closeDate: '2026-09-30',
      nextActivity: 'Initial Requirements Alignment',
      aiScore: 85
    });

    setNewDealName('');
    setIsAddModalOpen(false);
  };

  const getStageIndex = (stage: DealStage) => STAGES.findIndex(s => s.id === stage);

  const moveLeft = (deal: Deal) => {
    if (isReadOnly) return;
    const currentIndex = getStageIndex(deal.stage);
    if (currentIndex > 0) {
      updateDealStage(deal.id, STAGES[currentIndex - 1].id);
    }
  };

  const moveRight = (deal: Deal) => {
    if (isReadOnly) return;
    const currentIndex = getStageIndex(deal.stage);
    if (currentIndex < STAGES.length - 1) {
      updateDealStage(deal.id, STAGES[currentIndex + 1].id);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1700px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Read Only Governance Notice */}
      {isReadOnly && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-center gap-2 text-xs font-bold font-outfit">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Strict Read-Only Permission Enabled: You can view deals, but stage movement and deal editing are locked.</span>
        </div>
      )}

      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">Deals &amp; Opportunities Pipeline</h1>
          <p className="text-xs text-slate-500 font-outfit mt-0.5">
            Total Pipeline Value: <span className="font-bold text-slate-900">{formatCurrency(deals.reduce((a, b) => a + b.amount, 0), currencySymbol)}</span> across {deals.length} active opportunities
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-outfit">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter deals by name or client..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-500 w-full sm:w-64 shadow-2xs"
            />
          </div>
          {!isReadOnly && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all btn-spring shadow-sm flex items-center gap-1.5 font-display"
            >
              <Plus className="w-4 h-4" /> Add Opportunity
            </button>
          )}
        </div>
      </div>

      {/* Kanban Stages Grid */}
      <div className="flex-1 overflow-x-auto pb-4 pt-2">
        <div className="grid grid-cols-6 gap-4 min-w-[1400px] h-full">
          {STAGES.map((stage) => {
            const stageDeals = filteredDeals.filter(d => d.stage === stage.id);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);

            return (
              <div
                key={stage.id}
                className={`bg-slate-100/70 border-t-4 ${stage.color} rounded-2xl p-3.5 flex flex-col h-full border-x border-b border-slate-200/60`}
              >
                {/* Stage Column Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/70 shrink-0 font-outfit">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">{stage.label}</h3>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{formatCurrency(stageValue, currencySymbol)}</p>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-white text-slate-700 font-extrabold text-xs flex items-center justify-center border border-slate-200 shadow-2xs">
                    {stageDeals.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {stageDeals.map((deal) => {
                    const stageIdx = getStageIndex(deal.stage);
                    return (
                      <motion.div
                        key={deal.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all cursor-pointer group space-y-2.5 font-outfit"
                        onClick={() => selectCompany(deal.companyId)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2 py-0.5 rounded-md truncate max-w-[110px]">
                            {deal.companyName}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3 text-emerald-500" /> {deal.aiScore}%
                            </span>
                            {!isReadOnly && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteDeal(deal.id);
                                }}
                                className="p-1 text-slate-300 hover:text-rose-600 transition-colors"
                                title="Delete Opportunity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug font-display">
                          {deal.name}
                        </h4>

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 font-outfit">
                          <span className="font-extrabold text-slate-900 text-sm font-display">
                            {formatCurrency(deal.amount, currencySymbol)}
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold">Prob {deal.probability}%</span>
                        </div>

                        {/* Multi-Directional Stage Controls (Only if NOT read-only) */}
                        {!isReadOnly ? (
                          <div className="pt-2 flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              {stageIdx > 0 && (
                                <button
                                  onClick={() => moveLeft(deal)}
                                  className="p-1 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-md text-[10px] font-bold transition-colors"
                                  title="Move Left"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                              )}
                              {stageIdx < STAGES.length - 1 && (
                                <button
                                  onClick={() => moveRight(deal)}
                                  className="p-1 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-md text-[10px] font-bold transition-colors"
                                  title="Move Right"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>

                            <select
                              value={deal.stage}
                              onChange={(e) => updateDealStage(deal.id, e.target.value as DealStage)}
                              className="text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-700 rounded-md px-1.5 py-1 focus:outline-none cursor-pointer max-w-[110px]"
                            >
                              {STAGES.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="pt-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-outfit">
                            Stage: {STAGES.find(s => s.id === deal.stage)?.label}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Deal Modal */}
      {!isReadOnly && isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4 font-outfit">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">Add New Opportunity</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Opportunity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Cloud Platform"
                  value={newDealName}
                  onChange={(e) => setNewDealName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Company Account</label>
                <input
                  type="text"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Deal Volume ({currencySymbol})</label>
                <input
                  type="number"
                  required
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Initial Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as DealStage)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  {STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700 font-display"
                >
                  Create Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
