'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, Search, Filter, Plus, Mail, Phone, MapPin, Sparkles, Star 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency } from '../../lib/utils';

export const ContactsView: React.FC = () => {
  const { contacts, leads, selectCompany } = useCrmStore();
  const [activeSubTab, setActiveSubTab] = useState<'contacts' | 'leads'>('contacts');
  const [search, setSearch] = useState('');

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1700px] mx-auto">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contacts & Lead Intelligence</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Key enterprise decision makers and high-intent sales leads
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => setActiveSubTab('contacts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'contacts' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Contacts ({contacts.length})
            </button>
            <button
              onClick={() => setActiveSubTab('leads')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'leads' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sales Leads ({leads.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search contacts or leads by name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Grid List */}
      {activeSubTab === 'contacts' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredContacts.map((cnt) => (
            <motion.div
              key={cnt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Lead Score {cnt.leadScore}/100
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Last: {cnt.lastContacted}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={cnt.avatar} alt={cnt.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cnt.name}</h4>
                    <p className="text-xs font-semibold text-brand-600">{cnt.role}</p>
                    <p className="text-[11px] text-slate-400">{cnt.companyName}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{cnt.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cnt.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cnt.location}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => selectCompany(cnt.companyId)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-900 hover:text-white font-bold text-xs rounded-xl transition-colors"
              >
                View Account Profile
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md">
                  {lead.stage}
                </span>
                <span className="text-sm font-extrabold text-slate-900">{formatCurrency(lead.value)}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{lead.name}</h4>
                <p className="text-xs font-semibold text-slate-500">{lead.title} at <span className="text-slate-900">{lead.company}</span></p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Source: {lead.source.toUpperCase()}</span>
                <span>Owner: {lead.assignedTo.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
