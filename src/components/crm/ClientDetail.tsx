'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Globe, Phone, Mail, MapPin, Users, DollarSign, 
  TrendingUp, Sparkles, AlertTriangle, ShieldCheck, Calendar, FileText, 
  Briefcase, Receipt, ArrowLeft, Plus, CheckCircle2, MessageSquare, Edit3, X, Upload, Lock, UserCheck, CreditCard 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency, formatFullCurrency } from '../../lib/utils';
import { Company } from '../../types/crm';

export const ClientDetail: React.FC = () => {
  const { selectedCompanyId, companies, deals, invoices, projects, updateClient, setActiveTab, toggleAiDrawer, currencySymbol, currentUser } = useCrmStore();
  const [activeTab, setDetailTab] = useState<'overview' | 'deals' | 'invoices' | 'projects' | 'notes'>('overview');
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState([
    { id: 1, author: 'Sarah Jenkins', text: 'Executive sync completed with CTO Dr. Evelyn Reed. Finalized multi-region SLA terms.', date: 'Yesterday' },
    { id: 2, author: 'Alex Vance', text: 'AI Risk Audit completed: Low churn risk. High expansion probability.', date: '3 days ago' }
  ]);

  const isReadOnly = currentUser?.tabPermissions?.clients === 'read';

  // Edit Client Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const company = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Form Fields
  const [editName, setEditName] = useState(company.name);
  const [editDomain, setEditDomain] = useState(company.domain);
  const [editIndustry, setEditIndustry] = useState(company.industry);
  const [editRevenue, setEditRevenue] = useState(String(company.revenue));
  const [editAddress, setEditAddress] = useState(company.address || '100 Montgomery St, Tech District, CA');
  const [editPlaceOfSupply, setEditPlaceOfSupply] = useState(company.placeOfSupply || '27-Maharashtra');
  const [editPhone, setEditPhone] = useState(company.phone || '+91 98765 43210');
  const [editEmail, setEditEmail] = useState(company.email || 'billing@apexglobal.io');
  const [editCover, setEditCover] = useState(company.coverImage);
  const [editLogo, setEditLogo] = useState(company.logo);
  const [editStatus, setEditStatus] = useState<Company['status']>(company.status);
  const [editGstin, setEditGstin] = useState(company.gstin || '27AAAAA0000A1Z5');
  const [editAbout, setEditAbout] = useState(company.about || '');
  
  // Tax & Currency Compliance Fields
  const [editIsGstApplicable, setEditIsGstApplicable] = useState(company.isGstApplicable ?? true);
  const [editGstTaxType, setEditGstTaxType] = useState<Company['gstTaxType']>(company.gstTaxType || 'cgst_sgst');
  const [editPreferredCurrency, setEditPreferredCurrency] = useState(company.preferredCurrency || '₹ INR');

  // Authorized Representative Fields
  const [repName, setRepName] = useState(company.authorizedRepresentative?.name || company.owner.name || 'Dr. Evelyn Reed');
  const [repRole, setRepRole] = useState(company.authorizedRepresentative?.role || company.owner.role || 'Chief Executive Officer');
  const [repEmail, setRepEmail] = useState(company.authorizedRepresentative?.email || 'evelyn.r@apexglobal.io');
  const [repPhone, setRepPhone] = useState(company.authorizedRepresentative?.phone || '+91 98765 12345');

  const companyDeals = deals.filter(d => d.companyId === company.id || d.companyName === company.name);
  const companyInvoices = invoices.filter(i => i.companyId === company.id || i.companyName === company.name);
  const companyProjects = projects.filter(p => p.companyId === company.id || p.companyName === company.name);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) setEditLogo(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) setEditCover(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenEditModal = () => {
    if (isReadOnly) return;
    setEditName(company.name);
    setEditDomain(company.domain);
    setEditIndustry(company.industry);
    setEditRevenue(String(company.revenue));
    setEditAddress(company.address || '100 Montgomery St, Tech District, CA');
    setEditPlaceOfSupply(company.placeOfSupply || '27-Maharashtra');
    setEditPhone(company.phone || '+91 98765 43210');
    setEditEmail(company.email || 'billing@apexglobal.io');
    setEditCover(company.coverImage);
    setEditLogo(company.logo);
    setEditStatus(company.status);
    setEditGstin(company.gstin || '27AAAAA0000A1Z5');
    setEditIsGstApplicable(company.isGstApplicable ?? true);
    setEditGstTaxType(company.gstTaxType || 'cgst_sgst');
    setEditPreferredCurrency(company.preferredCurrency || '₹ INR');
    setRepName(company.authorizedRepresentative?.name || company.owner.name || 'Dr. Evelyn Reed');
    setRepRole(company.authorizedRepresentative?.role || company.owner.role || 'Chief Executive Officer');
    setRepEmail(company.authorizedRepresentative?.email || 'evelyn.r@apexglobal.io');
    setRepPhone(company.authorizedRepresentative?.phone || '+91 98765 12345');
    setEditAbout(company.about || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    updateClient(company.id, {
      name: editName,
      domain: editDomain,
      industry: editIndustry,
      revenue: Number(editRevenue),
      address: editAddress,
      placeOfSupply: editPlaceOfSupply,
      phone: editPhone,
      email: editEmail,
      coverImage: editCover,
      logo: editLogo,
      status: editStatus,
      gstin: editGstin,
      isGstApplicable: editIsGstApplicable,
      gstTaxType: editGstTaxType,
      preferredCurrency: editPreferredCurrency,
      about: editAbout,
      authorizedRepresentative: {
        name: repName,
        role: repRole,
        email: repEmail,
        phone: repPhone
      }
    });
    setIsEditModalOpen(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || !noteText) return;
    setNotesList([{ id: Date.now(), author: currentUser?.name || 'Alex Vance', text: noteText, date: 'Just now' }, ...notesList]);
    setNoteText('');
  };

  const displayCurrency = company.preferredCurrency?.split(' ')[0] || currencySymbol;

  return (
    <div className="p-6 space-y-6 max-w-[1700px] mx-auto font-outfit">
      {/* Read Only Notice */}
      {isReadOnly && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-center gap-2 text-xs font-bold font-outfit">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Strict Read-Only Mode Enabled: You can view account details, but profile editing is locked.</span>
        </div>
      )}

      {/* Top Back Bar & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('clients')}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors font-outfit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Company Directory
        </button>

        {!isReadOnly && (
          <button
            onClick={handleOpenEditModal}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all btn-spring flex items-center gap-1.5 font-display"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Client Profile & Compliance
          </button>
        )}
      </div>

      {/* Hero Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Cover Banner */}
        <div className="h-44 w-full relative">
          <img src={company.coverImage} alt={company.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Profile Info Row — sits below the banner with logo overlapping */}
        <div className="px-6 pt-0 pb-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              {/* Logo overlaps banner by -mt-12 but is contained within white bg */}
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl bg-white shrink-0 -mt-10 relative z-10"
              />
              <div className="pt-3 space-y-1">
                <div className="flex items-center flex-wrap gap-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display leading-tight">{company.name}</h1>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border uppercase font-outfit ${
                    company.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    company.status === 'churn_risk' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    company.status === 'prospect' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-violet-50 text-violet-700 border-violet-200'
                  }`}>
                    {company.status.replace('_', ' ')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-brand-50 text-brand-700 border border-brand-200 font-display">
                    {company.preferredCurrency || '₹ INR'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1 font-outfit">
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {company.domain}</span>
                  <span className="text-slate-300">•</span>
                  <span>{company.industry}</span>
                  <span className="text-slate-300">•</span>
                  <span>GSTIN: <strong className="font-mono text-slate-800">{company.gstin || '—'}</strong></span>
                  <span className="text-slate-300">•</span>
                  <span>Place of Supply: <strong className="font-semibold text-slate-800">{company.placeOfSupply || '—'}</strong></span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-3">
              <button
                onClick={() => toggleAiDrawer(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:opacity-95 transition-all btn-spring flex items-center gap-1.5 font-display"
              >
                <Sparkles className="w-4 h-4 text-brand-200" />
                AI Account Audit
              </button>
            </div>
          </div>
        </div>

        {/* Financial & AI Intelligence Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50/70 border-t border-slate-100 font-outfit">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Annual Revenue</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5 font-display">{formatFullCurrency(company.revenue, displayCurrency)}</p>
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Relationship Score</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold text-slate-900 font-display">{company.relationshipScore}/100</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Excellent</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">AI Risk Assessment</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xl font-extrabold font-display ${company.riskScore === 'Low' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {company.riskScore} Risk
              </span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">AI Upsell Opportunity</span>
            <p className="text-xs font-bold text-slate-800 mt-1 truncate">{company.salesPrediction.upsellOpportunity}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 font-display">
        {[
          { id: 'overview', label: 'Overview & AI Insights', icon: Sparkles },
          { id: 'deals', label: `Deals (${companyDeals.length})`, icon: DollarSign },
          { id: 'invoices', label: `Invoices (${companyInvoices.length})`, icon: Receipt },
          { id: 'projects', label: `Projects (${companyProjects.length})`, icon: Briefcase },
          { id: 'notes', label: `Executive Notes (${notesList.length})`, icon: MessageSquare }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDetailTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-extrabold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About / Description Card — full width if present */}
          {company.about && (
            <div className="lg:col-span-3 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
              <div className="flex items-center gap-2.5 mb-2">
                <FileText className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">About this Client</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-outfit">{company.about}</p>
            </div>
          )}
          <div className="lg:col-span-2 space-y-6">
            {/* Authorized Representative & Business Representative Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-4 font-outfit">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-brand-600" />
                  <h3 className="text-base font-bold text-slate-900 font-display">Authorized Business Representative</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Primary Signatory</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Full Name</span>
                  <p className="font-bold text-slate-900 text-sm font-display mt-0.5">{company.authorizedRepresentative?.name || company.owner.name || 'Dr. Evelyn Reed'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Designation / Role</span>
                  <p className="font-bold text-slate-900 text-sm font-display mt-0.5">{company.authorizedRepresentative?.role || company.owner.role || 'Chief Executive Officer'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Direct Email</span>
                  <p className="font-bold text-brand-600 text-xs mt-0.5">{company.authorizedRepresentative?.email || company.email || 'evelyn.r@apexglobal.io'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Direct Phone</span>
                  <p className="font-bold text-slate-900 text-xs mt-0.5">{company.authorizedRepresentative?.phone || company.phone || '+91 98765 12345'}</p>
                </div>
              </div>
            </div>

            {/* AI Prediction Card */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4 font-outfit">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
                  <h3 className="text-base font-bold text-white font-display">Vertex AI Account Prediction</h3>
                </div>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  {company.salesPrediction.winProbability}% Win Probability
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                Based on <span className="font-bold text-white">{company.name}</span>&apos;s product consumption patterns, Vertex AI recommends pitching the <span className="text-brand-300 font-bold">{company.salesPrediction.upsellOpportunity}</span> (Estimated revenue uplift: <span className="text-emerald-400 font-bold">{formatCurrency(company.salesPrediction.potentialValue, displayCurrency)}</span>).
              </p>
            </div>
          </div>

          <div className="space-y-6 font-outfit">
            {/* Company Overview & Tax Compliance Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">GST Tax & Billing Compliance</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">GST Status</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {company.isGstApplicable !== false ? 'GST Applicable' : 'Exempt / SEZ'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Tax System Type</span>
                  <span className="font-bold text-slate-900 uppercase">
                    {company.gstTaxType === 'igst' ? 'IGST (18%)' : company.gstTaxType === 'exempt' ? 'Exempt' : 'CGST (9%) + SGST (9%)'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Place of Supply</span>
                  <span className="font-bold text-slate-900">{company.placeOfSupply || '27-Maharashtra'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">GSTIN / Tax ID</span>
                  <span className="font-bold font-mono text-slate-900">{company.gstin || '27AAAAA0000A1Z5'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Settlement Currency</span>
                  <span className="font-bold text-brand-600 font-display">{company.preferredCurrency || '₹ INR'}</span>
                </div>
                <div className="py-2">
                  <span className="text-slate-400 font-semibold block mb-1">Registered Address</span>
                  <span className="font-semibold text-slate-800 leading-relaxed block">{company.address || '100 Montgomery St, Tech District, CA'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deals Tab */}
      {activeTab === 'deals' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 font-outfit">
          <h3 className="text-base font-bold text-slate-900 font-display">Active Deals for {company.name}</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {companyDeals.map(d => (
              <div key={d.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm font-display">{d.name}</p>
                  <p className="text-slate-400">Stage: <span className="font-semibold uppercase text-slate-700">{d.stage}</span></p>
                </div>
                <span className="text-base font-black text-slate-900 font-display">{formatCurrency(d.amount, displayCurrency)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 font-outfit">
          <h3 className="text-base font-bold text-slate-900 font-display">Invoices & GST Billing for {company.name}</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {companyInvoices.map(i => (
              <div key={i.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm font-display">{i.invoiceNumber}</p>
                  <p className="text-slate-400">Status: <span className="font-semibold uppercase text-emerald-600">{i.status}</span></p>
                </div>
                <span className="text-base font-black text-slate-900 font-display">{formatFullCurrency(i.amount, displayCurrency)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Executive Notes Tab */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 font-outfit">
          <h3 className="text-base font-bold text-slate-900 font-display">Executive Notes</h3>
          {!isReadOnly && (
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Add an executive account note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              />
              <button type="submit" className="px-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl font-display">
                Add Note
              </button>
            </form>
          )}
          <div className="space-y-3 pt-2">
            {notesList.map(n => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900 font-display">{n.author}</span>
                  <span className="text-slate-400">{n.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expanded Edit Profile & Media Modal */}
      {!isReadOnly && isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-outfit overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">Edit Client Account, GST & Authorized Representative</h3>
                <p className="text-xs text-slate-500">Update corporate address, tax regime, place of supply, and trade currency</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Section 1: Basic Company & Media */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-display text-brand-600">
                  1. Company Identity & Media
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Company Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Domain Website</label>
                    <input
                      type="text"
                      required
                      value={editDomain}
                      onChange={(e) => setEditDomain(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 font-display">Upload Client Avatar Logo</p>
                      <p className="text-[10px] text-slate-400">Select PNG/JPG file from computer</p>
                    </div>
                    <label className="px-3 py-1.5 bg-slate-900 text-white font-bold text-[11px] rounded-lg cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Select File
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <div>
                      <p className="font-bold text-slate-900 font-display">Upload Cover Banner Photo</p>
                      <p className="text-[10px] text-slate-400">Select banner image from computer</p>
                    </div>
                    <label className="px-3 py-1.5 bg-slate-900 text-white font-bold text-[11px] rounded-lg cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Select File
                      <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 2: Address & Tax Jurisdiction */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-display text-brand-600">
                  2. Registered Address & Place of Supply
                </h4>
                <div>
                  <label className="text-xs font-bold text-slate-700">Registered Business Address</label>
                  <input
                    type="text"
                    required
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="e.g. 100 Montgomery St, Tech District, San Francisco, CA"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Place of Supply (State / Jurisdiction)</label>
                    <input
                      type="text"
                      required
                      value={editPlaceOfSupply}
                      onChange={(e) => setEditPlaceOfSupply(e.target.value)}
                      placeholder="e.g. 27-Maharashtra"
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">GSTIN / Tax ID Number</label>
                    <input
                      type="text"
                      required
                      value={editGstin}
                      onChange={(e) => setEditGstin(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: GST Tax Regime & Currency */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-display text-brand-600">
                  3. GST Tax Regime & Settlement Currency
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">GST Tax Status</label>
                    <select
                      value={editIsGstApplicable ? 'yes' : 'no'}
                      onChange={(e) => setEditIsGstApplicable(e.target.value === 'yes')}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      <option value="yes">GST Applicable</option>
                      <option value="no">Exempt / Zero Rated (SEZ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Tax Breakdown</label>
                    <select
                      value={editGstTaxType}
                      onChange={(e) => setEditGstTaxType(e.target.value as any)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      <option value="cgst_sgst">CGST (9%) + SGST (9%)</option>
                      <option value="igst">IGST (18%)</option>
                      <option value="exempt">Exempt (0%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Trade Currency</label>
                    <select
                      value={editPreferredCurrency}
                      onChange={(e) => setEditPreferredCurrency(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      <option value="₹ INR">₹ INR (Indian Rupee)</option>
                      <option value="$ USD">$ USD (US Dollar)</option>
                      <option value="€ EUR">€ EUR (Euro)</option>
                      <option value="£ GBP">£ GBP (Pound)</option>
                      <option value="¥ JPY">¥ JPY (Yen)</option>
                      <option value="A$ AUD">A$ AUD (Australian Dollar)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Authorized Representative / Business Owner */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-display text-brand-600">
                  4. Authorized Business Representative / Owner Details
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Representative Name</label>
                    <input
                      type="text"
                      required
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                      placeholder="e.g. Dr. Evelyn Reed"
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Designation / Role</label>
                    <input
                      type="text"
                      required
                      value={repRole}
                      onChange={(e) => setRepRole(e.target.value)}
                      placeholder="e.g. Chief Executive Officer"
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Representative Email</label>
                    <input
                      type="email"
                      required
                      value={repEmail}
                      onChange={(e) => setRepEmail(e.target.value)}
                      placeholder="e.g. evelyn.r@apexglobal.io"
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Representative Phone</label>
                    <input
                      type="text"
                      required
                      value={repPhone}
                      onChange={(e) => setRepPhone(e.target.value)}
                      placeholder="e.g. +91 98765 12345"
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: About / Client Description */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-display text-brand-600">
                  5. About This Client
                </h4>
                <div>
                  <label className="text-xs font-bold text-slate-700">Client Description / About Paragraph</label>
                  <textarea
                    value={editAbout}
                    onChange={(e) => setEditAbout(e.target.value)}
                    rows={5}
                    placeholder="Add a detailed description about this client — their business model, key products, partnership history, strategic importance, and any other relevant context..."
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 resize-vertical leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">This will appear on the client profile overview tab as a readable summary card.</p>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-600 text-white font-black text-xs rounded-xl hover:bg-brand-700 font-display shadow-md btn-spring"
                >
                  Save Account & Compliance Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
