'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Search, Filter, Download, Plus, ChevronRight, 
  Sparkles, ShieldCheck, AlertTriangle, Trash2, Edit3, X 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency } from '../../lib/utils';
import { Company } from '../../types/crm';

export const ClientsTable: React.FC = () => {
  const { companies, selectCompany, createClient, deleteClient, currencySymbol } = useCrmStore();
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  
  // Create Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompDomain, setNewCompDomain] = useState('');
  const [newCompIndustry, setNewCompIndustry] = useState('Enterprise Software & Cloud');
  const [newCompRevenue, setNewCompRevenue] = useState('50000000');

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.domain.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || c.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName) return;

    createClient({
      name: newCompName,
      domain: newCompDomain || `${newCompName.toLowerCase().replace(/\s+/g, '')}.com`,
      industry: newCompIndustry,
      revenue: Number(newCompRevenue),
      employeeCount: 250,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      status: 'active',
      owner: { name: 'Alex Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', role: 'VP Sales' },
      growthRate: 28.5,
      relationshipScore: 88,
      riskScore: 'Low',
      salesPrediction: { potentialValue: 500000, upsellOpportunity: 'Tier-1 Platform Expansion', winProbability: 85 },
      address: 'Mumbai / San Francisco HQ',
      phone: '+1 (415) 555-0100',
      email: `contact@${newCompDomain || 'client.com'}`,
      createdAt: new Date().toISOString().split('T')[0],
      tags: ['New Client'],
      notesCount: 1,
      dealsCount: 1,
      activeProjectsCount: 1
    });

    setNewCompName('');
    setIsAddModalOpen(false);
  };

  const handleDeleteSelected = () => {
    selectedCompanyIds.forEach(id => deleteClient(id));
    setSelectedCompanyIds([]);
  };

  const exportCSV = () => {
    const headers = ['Company Name', 'Domain', 'Industry', 'Revenue', 'Employees', 'Relationship Score', 'Risk Score'];
    const rows = filteredCompanies.map(c => [
      `"${c.name}"`, c.domain, `"${c.industry}"`, c.revenue, c.employeeCount, c.relationshipScore, c.riskScore
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Vertex_CRM_Companies_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-[1700px] mx-auto">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Client Accounts Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Managing <span className="font-bold text-slate-900">{companies.length} Accounts</span> in Repository
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {selectedCompanyIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-3.5 py-2 bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete ({selectedCompanyIds.length})
            </button>
          )}
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all btn-spring shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Client Account
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search companies by name or domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">Filter:</span>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Accounts</option>
            {Array.from(new Set(companies.map(c => c.industry))).map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedCompanyIds.length === filteredCompanies.length && filteredCompanies.length > 0}
                    onChange={() => {
                      if (selectedCompanyIds.length === filteredCompanies.length) setSelectedCompanyIds([]);
                      else setSelectedCompanyIds(filteredCompanies.map(c => c.id));
                    }}
                    className="rounded border-slate-300 text-brand-600"
                  />
                </th>
                <th className="p-4">Company Account</th>
                <th className="p-4">Annual Volume</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Health Score</th>
                <th className="p-4">Risk Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredCompanies.map((comp) => {
                const isSelected = selectedCompanyIds.includes(comp.id);
                return (
                  <tr
                    key={comp.id}
                    onClick={() => selectCompany(comp.id)}
                    className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                      isSelected ? 'bg-brand-50/40' : ''
                    }`}
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          if (isSelected) setSelectedCompanyIds(selectedCompanyIds.filter(i => i !== comp.id));
                          else setSelectedCompanyIds([...selectedCompanyIds, comp.id]);
                        }}
                        className="rounded border-slate-300 text-brand-600"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={comp.logo}
                          alt={comp.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm hover:text-brand-600 transition-colors">
                            {comp.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{comp.industry} • {comp.domain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-900 text-sm">
                      {formatCurrency(comp.revenue, currencySymbol)}
                    </td>
                    <td className="p-4 font-semibold text-slate-600">
                      {comp.employeeCount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img src={comp.owner.avatar} alt={comp.owner.name} className="w-6 h-6 rounded-full border border-slate-200" />
                        <span className="font-semibold text-slate-800">{comp.owner.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                          <div
                            className="bg-gradient-to-r from-brand-500 to-emerald-500 h-full rounded-full"
                            style={{ width: `${comp.relationshipScore}%` }}
                          />
                        </div>
                        <span className="font-extrabold text-slate-900">{comp.relationshipScore}/100</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        comp.riskScore === 'Low' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        comp.riskScore === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {comp.riskScore} Risk
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => selectCompany(comp.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white font-bold text-xs transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => deleteClient(comp.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Client Account</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCompany} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Global Industries"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Domain Website</label>
                <input
                  type="text"
                  placeholder="e.g. acmeglobal.com"
                  value={newCompDomain}
                  onChange={(e) => setNewCompDomain(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Industry Segment</label>
                <input
                  type="text"
                  value={newCompIndustry}
                  onChange={(e) => setNewCompIndustry(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Annual Revenue Volume ({currencySymbol})</label>
                <input
                  type="number"
                  value={newCompRevenue}
                  onChange={(e) => setNewCompRevenue(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
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
                  className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
