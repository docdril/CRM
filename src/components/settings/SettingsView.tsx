'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Building2, Sparkles, Key, CreditCard, Palette,
  Check, Copy, Eye, EyeOff, Save, Globe, Mail,
  MapPin, Hash, Cpu, Link2, ShieldCheck, Bot, Zap,
  Type, Layers, Monitor, Sidebar, Square, RefreshCw
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { BrandCustomization } from '../../types/crm';

type SettingsTab = 'org' | 'ai' | 'brand' | 'billing' | 'api';

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'org',     label: 'Organisation',     icon: Building2  },
  { id: 'ai',      label: 'AI Configuration', icon: Bot        },
  { id: 'brand',   label: 'Brand & Theme',    icon: Palette    },
  { id: 'billing', label: 'Billing & GST',    icon: CreditCard },
  { id: 'api',     label: 'API & Webhooks',   icon: Key        },
];

const AI_PROVIDERS = [
  { value: 'google',    label: 'Google Gemini',       models: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'] },
  { value: 'openai',    label: 'OpenAI',              models: ['gpt-4o', 'gpt-4o-mini', 'o1', 'o3-mini', 'gpt-4-turbo'] },
  { value: 'anthropic', label: 'Anthropic Claude',    models: ['claude-3-7-sonnet', 'claude-3-5-sonnet', 'claude-3-5-haiku', 'claude-3-opus'] },
  { value: 'groq',      label: 'Groq (Fast LLM)',     models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'] },
  { value: 'custom',    label: 'Custom / Self-Hosted', models: [] },
];

// Premium clean, neat & readable modern fonts
const FONTS: { key: BrandCustomization['fontFamily']; label: string; preview: string; tags: string[] }[] = [
  { key: 'instrument',   label: 'Instrument Sans',     preview: "The quick brown fox",  tags: ['Ultra Clean', 'Readable'] },
  { key: 'figtree',      label: 'Figtree',             preview: "The quick brown fox",  tags: ['Crisp & Neat', 'Light'] },
  { key: 'manrope',      label: 'Manrope',             preview: "The quick brown fox",  tags: ['Refined', 'Geometric'] },
  { key: 'urbanist',     label: 'Urbanist',            preview: "The quick brown fox",  tags: ['Minimal', 'Sleek'] },
  { key: 'albert',       label: 'Albert Sans',         preview: "The quick brown fox",  tags: ['High-Legibility'] },
  { key: 'public',       label: 'Public Sans',         preview: "The quick brown fox",  tags: ['Neutral', 'Precise'] },
  { key: 'geist',        label: 'Geist',               preview: "The quick brown fox",  tags: ['Trending', 'Tech'] },
  { key: 'dm-sans',      label: 'DM Sans',             preview: "The quick brown fox",  tags: ['Clean', 'Modern'] },
  { key: 'jakarta',      label: 'Plus Jakarta Sans',    preview: "The quick brown fox",  tags: ['Premium'] },
  { key: 'inter',        label: 'Inter',               preview: "The quick brown fox",  tags: ['UI Classic'] },
  { key: 'outfit',       label: 'Outfit',              preview: "The quick brown fox",  tags: ['Friendly'] },
  { key: 'bricolage',    label: 'Bricolage Grotesque',  preview: "The quick brown fox",  tags: ['Display', 'Bold'] },
  { key: 'sora',         label: 'Sora',                preview: "The quick brown fox",  tags: ['Futuristic'] },
  { key: 'grotesk',      label: 'Space Grotesk',       preview: "The quick brown fox",  tags: ['Geometric'] },
];

const FONT_FAMILY_MAP: Record<string, string> = {
  instrument:  "'Instrument Sans', sans-serif",
  figtree:     "'Figtree', sans-serif",
  manrope:     "'Manrope', sans-serif",
  urbanist:    "'Urbanist', sans-serif",
  albert:      "'Albert Sans', sans-serif",
  public:      "'Public Sans', sans-serif",
  geist:       "'Geist', 'Inter', sans-serif",
  bricolage:   "'Bricolage Grotesque', sans-serif",
  'dm-sans':   "'DM Sans', sans-serif",
  jakarta:     "'Plus Jakarta Sans', sans-serif",
  outfit:      "'Outfit', sans-serif",
  inter:       "'Inter', sans-serif",
  sora:        "'Sora', sans-serif",
  grotesk:     "'Space Grotesk', sans-serif",
};

const ACCENT_COLORS = [
  { key: 'blue',      label: 'Sapphire',   hex: '#0c8de9', cls: 'bg-blue-500' },
  { key: 'emerald',   label: 'Emerald',    hex: '#10b981', cls: 'bg-emerald-500' },
  { key: 'violet',    label: 'Violet',     hex: '#8b5cf6', cls: 'bg-violet-500' },
  { key: 'amber',     label: 'Amber',      hex: '#f59e0b', cls: 'bg-amber-500' },
  { key: 'rose',      label: 'Rose',       hex: '#f43f5e', cls: 'bg-rose-500' },
  { key: 'cyan',      label: 'Cyan',       hex: '#06b6d4', cls: 'bg-cyan-500' },
  { key: 'champagne', label: 'Champagne',  hex: '#c59b6c', cls: 'bg-[#c59b6c]' },
  { key: 'obsidian',  label: 'Obsidian',   hex: '#0f172a', cls: 'bg-slate-900' },
];

const CARD_RADIUS_OPTIONS = [
  { key: 'sm',  label: 'Sharp',   px: '6px' },
  { key: 'md',  label: 'Soft',    px: '10px' },
  { key: 'lg',  label: 'Rounded', px: '14px' },
  { key: 'xl',  label: 'Curvy',   px: '18px' },
  { key: '2xl', label: 'Pill',    px: '20px' },
  { key: '3xl', label: 'Bubble',  px: '28px' },
];

// Section preset schemes
const SECTION_SCHEMES: {
  key: string; label: string; emoji: string;
  pageBg: string; cardBg: string; sidebarBg: string; headerBg: string; cardBorderColor: string;
}[] = [
  { key: 'default',   label: 'Default',   emoji: '🎨', pageBg: '',        cardBg: '',        sidebarBg: '',      headerBg: '',             cardBorderColor: '' },
  { key: 'champagne', label: 'Champagne', emoji: '🍾', pageBg: 'linear-gradient(135deg, #f7f4ee 0%, #ede6d8 50%, #e2d6c3 100%)', cardBg: 'rgba(255,255,255,0.65)', sidebarBg: 'rgba(255,255,255,0.55)', headerBg: 'rgba(247,244,238,0.75)', cardBorderColor: 'rgba(255,255,255,0.8)' },
  { key: 'frosted',   label: 'Frosted',   emoji: '❄️',  pageBg: '#f0f4fa', cardBg: 'rgba(255,255,255,0.92)', sidebarBg: 'rgba(240,244,250,0.95)', headerBg: 'rgba(255,255,255,0.8)', cardBorderColor: 'rgba(200,215,240,0.6)' },
  { key: 'minimal',   label: 'Minimal',   emoji: '⬜',  pageBg: '#ffffff', cardBg: '#f9fafb', sidebarBg: '#f3f4f6',  headerBg: '#ffffff',       cardBorderColor: '#e5e7eb' },
  { key: 'midnight',  label: 'Midnight',  emoji: '🌑',  pageBg: '#07090f', cardBg: '#0f1117', sidebarBg: '#080a10',  headerBg: '#0d0f16',       cardBorderColor: 'rgba(255,255,255,0.08)' },
  { key: 'warm',      label: 'Warm',      emoji: '🌅',  pageBg: '#fdf8f0', cardBg: '#fffaf3', sidebarBg: '#fef6e8',  headerBg: 'rgba(255,250,243,0.9)', cardBorderColor: 'rgba(251,191,36,0.18)' },
  { key: 'neo',       label: 'Neo',       emoji: '⚡',  pageBg: '#f5f0ff', cardBg: '#faf7ff', sidebarBg: '#f0eaff',  headerBg: 'rgba(245,240,255,0.95)', cardBorderColor: 'rgba(139,92,246,0.18)' },
];

// ── Small colour swatch picker ──
const ColorPicker = ({ value, onChange, label, icon: Icon }: {
  value: string; onChange: (v: string) => void; label: string; icon?: React.ElementType;
}) => (
  <div>
    <label className="font-bold text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
      {Icon && <Icon className="w-3 h-3" />}{label}
    </label>
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-lg border-2 border-slate-200 shadow-inner cursor-pointer overflow-hidden relative"
        style={{ background: value || 'transparent' }}
      >
        <input
          type="color"
          value={value || '#ffffff'}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="e.g. #f8fafc or rgba()"
        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-mono focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-100"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="text-slate-400 hover:text-slate-600 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset to theme default"
        >✕</button>
      )}
    </div>
  </div>
);

export const SettingsView: React.FC = () => {
  const { brandCustomization, setBrandCustomization } = useCrmStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('org');
  const [saved, setSaved] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = 'vtx_live_99842109834190842019842';

  // ── ORG STATE ──
  const [orgName,    setOrgName]    = useState(brandCustomization?.orgName    || 'Vertex Enterprise Corp');
  const [orgDomain,  setOrgDomain]  = useState(brandCustomization?.orgDomain  || 'vertex-crm.io');
  const [orgEmail,   setOrgEmail]   = useState(brandCustomization?.orgSupportEmail || 'billing@vertex.io');
  const [orgAddress, setOrgAddress] = useState(brandCustomization?.registeredAddress || '100 Montgomery St, Tech District, San Francisco, CA');
  const [orgGst,     setOrgGst]     = useState(brandCustomization?.gstNumber  || '27AAAAA0000A1Z5');

  // ── AI STATE ──
  const [aiName,     setAiName]     = useState(brandCustomization?.aiName     || 'Vertex AI');
  const [aiProvider, setAiProvider] = useState(brandCustomization?.aiProvider || 'google');
  const [aiApiKey,   setAiApiKey]   = useState(brandCustomization?.aiApiKey   || '');
  const [aiModel,    setAiModel]    = useState(brandCustomization?.aiModel    || 'gemini-2.5-flash');
  const [aiBaseUrl,  setAiBaseUrl]  = useState(brandCustomization?.aiBaseUrl  || '');
  const [showAiKey,  setShowAiKey]  = useState(false);
  const [isCustomModel, setIsCustomModel] = useState(false);

  // ── BILLING STATE ──
  const [bankName,    setBankName]    = useState(brandCustomization?.bankName    || 'HDFC Bank Ltd');
  const [accountNum,  setAccountNum]  = useState(brandCustomization?.accountNumber || '50200012345678');
  const [ifscCode,    setIfscCode]    = useState(brandCustomization?.ifscCode    || 'HDFC0000123');
  const [upiId,       setUpiId]       = useState(brandCustomization?.upiId       || '');

  // ── BRAND STATE — all instant-apply ──
  const [appName,          setAppNameLocal]     = useState(brandCustomization?.appName      || 'Nova Intelligence');
  const [tagline,          setTaglineLocal]     = useState(brandCustomization?.tagline      || 'Enterprise Revenue OS');
  const [accentColor,      setAccentColorLocal] = useState(brandCustomization?.accentColor  || 'blue');
  const [themeMode,        setThemeModeLocal]   = useState(brandCustomization?.themeMode    || 'light');
  const [fontFamily,       setFontFamilyLocal]  = useState(brandCustomization?.fontFamily   || 'jakarta');

  // Section color state
  const [pageBg,           setPageBg]           = useState(brandCustomization?.pageBg           || '');
  const [cardBg,           setCardBg]           = useState(brandCustomization?.cardBg           || '');
  const [cardBorderColor,  setCardBorderColor]  = useState(brandCustomization?.cardBorderColor  || '');
  const [cardRadius,       setCardRadius]       = useState<BrandCustomization['cardRadius']>(brandCustomization?.cardRadius || '2xl');
  const [sidebarBg,        setSidebarBg]        = useState(brandCustomization?.sidebarBg        || '');
  const [headerBg,         setHeaderBg]         = useState(brandCustomization?.headerBg         || '');
  const [contentTextColor, setContentTextColor] = useState(brandCustomization?.contentTextColor || '');
  const [activeScheme,     setActiveScheme]     = useState(brandCustomization?.sectionScheme    || 'default');

  const flash = (key: string) => {
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  // ── Instant Apply for all brand/visual changes ──
  const applyInstant = useCallback((patch: Partial<BrandCustomization>) => {
    setBrandCustomization(patch);
  }, [setBrandCustomization]);

  const handleAccentColor = (c: string) => {
    setAccentColorLocal(c as BrandCustomization['accentColor']);
    applyInstant({ accentColor: c as BrandCustomization['accentColor'] });
  };

  const handleThemeMode = (m: string) => {
    setThemeModeLocal(m as BrandCustomization['themeMode']);
    applyInstant({ themeMode: m as BrandCustomization['themeMode'] });
  };

  const handleFontFamily = (f: string) => {
    setFontFamilyLocal(f as BrandCustomization['fontFamily']);
    applyInstant({ fontFamily: f as BrandCustomization['fontFamily'] });
  };

  const handlePageBg = (v: string) => { setPageBg(v); applyInstant({ pageBg: v }); };
  const handleCardBg = (v: string) => { setCardBg(v); applyInstant({ cardBg: v }); };
  const handleCardBorderColor = (v: string) => { setCardBorderColor(v); applyInstant({ cardBorderColor: v }); };
  const handleSidebarBg = (v: string) => { setSidebarBg(v); applyInstant({ sidebarBg: v }); };
  const handleHeaderBg = (v: string) => { setHeaderBg(v); applyInstant({ headerBg: v }); };
  const handleContentTextColor = (v: string) => { setContentTextColor(v); applyInstant({ contentTextColor: v }); };
  const handleCardRadius = (r: BrandCustomization['cardRadius']) => {
    setCardRadius(r);
    applyInstant({ cardRadius: r });
  };

  const handleSectionScheme = (scheme: typeof SECTION_SCHEMES[number]) => {
    setActiveScheme(scheme.key);
    setPageBg(scheme.pageBg);
    setCardBg(scheme.cardBg);
    setSidebarBg(scheme.sidebarBg);
    setHeaderBg(scheme.headerBg);
    setCardBorderColor(scheme.cardBorderColor);
    applyInstant({
      sectionScheme: scheme.key as BrandCustomization['sectionScheme'],
      pageBg: scheme.pageBg,
      cardBg: scheme.cardBg,
      sidebarBg: scheme.sidebarBg,
      headerBg: scheme.headerBg,
      cardBorderColor: scheme.cardBorderColor,
    });
  };

  const resetSectionColors = () => {
    handleSectionScheme(SECTION_SCHEMES[0]);
  };

  // App name / tagline update (still on save for text fields to avoid spam)
  const saveBrandText = () => {
    setBrandCustomization({ appName, tagline });
    flash('brand-text');
  };

  const saveOrg = () => {
    setBrandCustomization({ orgName, orgDomain, orgSupportEmail: orgEmail, registeredAddress: orgAddress, gstNumber: orgGst });
    flash('org');
  };

  const saveAi = () => {
    setBrandCustomization({ aiName, aiProvider: aiProvider as any, aiApiKey, aiModel, aiBaseUrl });
    flash('ai');
  };

  const saveBilling = () => {
    setBrandCustomization({ bankName, accountNumber: accountNum, ifscCode, upiId });
    flash('billing');
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const selectedProvider = AI_PROVIDERS.find(p => p.value === aiProvider);

  const SaveBtn = ({ section }: { section: string }) => (
    <button
      type="button"
      onClick={() => {
        if (section === 'org')        saveOrg();
        if (section === 'ai')         saveAi();
        if (section === 'brand-text') saveBrandText();
        if (section === 'billing')    saveBilling();
      }}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all btn-spring ${
        saved === section
          ? 'bg-emerald-600 text-white'
          : 'bg-brand-600 hover:bg-brand-700 text-white'
      }`}
    >
      {saved === section ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
      {saved === section ? 'Saved!' : 'Save Changes'}
    </button>
  );

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">Settings & Governance</h1>
        <p className="text-xs text-slate-500 mt-0.5">Organisation profile, AI configuration, brand, billing & API management</p>
      </div>

      <div className="flex gap-6">
        {/* Left: Tab Nav */}
        <div className="w-52 shrink-0 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Tab Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">

            {/* ── ORGANISATION ── */}
            {activeTab === 'org' && (
              <motion.div key="org" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2"><Building2 className="w-4 h-4 text-brand-600" />Organisation Profile</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Changes reflect in the Header workspace badge and invoice headers</p>
                  </div>
                  <SaveBtn section="org" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Building2 className="w-3 h-3" />Company / App Name</label>
                    <input value={orgName} onChange={e => setOrgName(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Globe className="w-3 h-3" />Primary Domain</label>
                    <input value={orgDomain} onChange={e => setOrgDomain(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Mail className="w-3 h-3" />Support / Billing Email</label>
                    <input type="email" value={orgEmail} onChange={e => setOrgEmail(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Hash className="w-3 h-3" />GST / Tax ID Number</label>
                    <input value={orgGst} onChange={e => setOrgGst(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                  </div>
                  <div className="col-span-2">
                    <label className="font-bold text-slate-700 flex items-center gap-1"><MapPin className="w-3 h-3" />Registered Business Address</label>
                    <textarea value={orgAddress} onChange={e => setOrgAddress(e.target.value)} rows={2}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── AI CONFIGURATION ── */}
            {activeTab === 'ai' && (
              <motion.div key="ai" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2"><Bot className="w-4 h-4 text-brand-600" />AI Configuration</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Connect your own AI provider — the AI name reflects throughout the app</p>
                  </div>
                  <SaveBtn section="ai" />
                </div>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand-600" />AI Name (used throughout the app)</label>
                    <input value={aiName} onChange={e => setAiName(e.target.value)}
                      placeholder="e.g. Vertex AI, My Assistant, Nova..."
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    <p className="text-[10px] text-slate-400 mt-1">This replaces &quot;Vertex AI&quot; everywhere it appears in the dashboard, insights, and buttons.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 flex items-center gap-1"><Cpu className="w-3 h-3" />AI Provider</label>
                      <select value={aiProvider} onChange={e => { setAiProvider(e.target.value as any); setAiModel(''); }}
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-brand-400">
                        {AI_PROVIDERS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-slate-700">Model</label>
                        <button
                          type="button"
                          onClick={() => setIsCustomModel(!isCustomModel)}
                          className="text-[10px] font-bold text-brand-600 hover:underline"
                        >
                          {isCustomModel ? '← Select Preset' : '+ Custom Model Name'}
                        </button>
                      </div>
                      {isCustomModel || (selectedProvider && selectedProvider.models.length === 0) ? (
                        <input
                          value={aiModel}
                          onChange={e => setAiModel(e.target.value)}
                          placeholder="e.g. gemini-2.5-pro, gemini-3.5-flash..."
                          className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        />
                      ) : (
                        <select
                          value={aiModel}
                          onChange={e => {
                            if (e.target.value === '__custom__') {
                              setIsCustomModel(true);
                              setAiModel('');
                            } else {
                              setAiModel(e.target.value);
                            }
                          }}
                          className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-brand-400"
                        >
                          {selectedProvider?.models.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                          <option value="__custom__">+ Enter custom model name...</option>
                        </select>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Key className="w-3 h-3" />API Key</label>
                    <div className="relative mt-1">
                      <input type={showAiKey ? 'text' : 'password'} value={aiApiKey} onChange={e => setAiApiKey(e.target.value)}
                        placeholder={`Enter your ${selectedProvider?.label || 'AI'} API key...`}
                        className="w-full p-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                      <button type="button" onClick={() => setShowAiKey(!showAiKey)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                        {showAiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Link2 className="w-3 h-3" />Base URL <span className="text-slate-400 font-normal">(optional — for proxy or self-hosted)</span></label>
                    <input value={aiBaseUrl} onChange={e => setAiBaseUrl(e.target.value)}
                      placeholder="https://api.openai.com/v1 or your custom endpoint"
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                  </div>
                  <div className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold ${aiApiKey ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    {aiApiKey ? `Connected: ${selectedProvider?.label} · ${aiModel || 'Model not set'}` : 'No API key saved yet — enter your key above and save to connect'}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── BRAND & THEME — FULLY INSTANT ── */}
            {activeTab === 'brand' && (
              <motion.div key="brand" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                className="space-y-4"
              >
                {/* App Identity Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                        <Palette className="w-4 h-4 text-brand-600" />App Identity
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Brand name & tagline shown in sidebar and header</p>
                    </div>
                    <SaveBtn section="brand-text" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700">App / Brand Name</label>
                      <input value={appName} onChange={e => setAppNameLocal(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Tagline</label>
                      <input value={tagline} onChange={e => setTaglineLocal(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    </div>
                  </div>
                </div>

                {/* Accent Color — Instant */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600" />Accent Colour
                    </h3>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Zap className="w-2.5 h-2.5" />Instant
                    </span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {ACCENT_COLORS.map(c => (
                      <button key={c.key}
                        onClick={() => handleAccentColor(c.key)}
                        title={c.label}
                        className={`group relative flex flex-col items-center gap-1`}
                      >
                        <div className={`w-9 h-9 rounded-xl border-2 transition-all btn-spring shadow-sm ${c.cls} ${
                          accentColor === c.key
                            ? 'scale-110 border-slate-800 shadow-lg ring-2 ring-offset-1 ring-slate-800'
                            : 'border-transparent hover:scale-105 hover:border-slate-300'
                        }`} />
                        <span className={`text-[9px] font-bold transition-colors ${accentColor === c.key ? 'text-slate-900' : 'text-slate-400'}`}>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Mode + Font — Instant */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-brand-600" />Theme Mode
                    </h3>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Zap className="w-2.5 h-2.5" />Instant
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 text-xs">
                    {[
                      { val: 'light',     emoji: '☀️',  label: 'Light' },
                      { val: 'dark',      emoji: '🌙',  label: 'Dark' },
                      { val: 'champagne', emoji: '🍾', label: 'Champagne' },
                      { val: 'glass',     emoji: '✨',  label: 'Glass' },
                      { val: 'cyber',     emoji: '⚡',  label: 'Cyber' },
                      { val: 'sunset',    emoji: '🌅', label: 'Sunset' },
                    ].map(m => (
                      <button key={m.val}
                        onClick={() => handleThemeMode(m.val)}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 font-bold transition-all btn-spring ${
                          themeMode === m.val
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <span className="text-xl">{m.emoji}</span>
                        <span className="text-[10px]">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Picker — Instant with live preview */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                      <Type className="w-4 h-4 text-brand-600" />Font Family
                    </h3>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Zap className="w-2.5 h-2.5" />Instant
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {FONTS.map(f => (
                      <button key={f.key}
                        onClick={() => handleFontFamily(f.key)}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all btn-spring group ${
                          fontFamily === f.key
                            ? 'border-brand-500 bg-brand-50'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div className="min-w-0">
                          <div
                            className={`text-sm font-semibold truncate ${fontFamily === f.key ? 'text-brand-700' : 'text-slate-800'}`}
                            style={{ fontFamily: FONT_FAMILY_MAP[f.key] }}
                          >
                            {f.label}
                          </div>
                          <div
                            className="text-[10px] text-slate-400 truncate mt-0.5"
                            style={{ fontFamily: FONT_FAMILY_MAP[f.key] }}
                          >
                            {f.preview}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end ml-2 shrink-0">
                          {f.tags.slice(0, 1).map(t => (
                            <span key={t}
                              className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap ${
                                fontFamily === f.key ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-500'
                              }`}
                            >{t}</span>
                          ))}
                          {fontFamily === f.key && <Check className="w-3 h-3 text-brand-600 mt-0.5" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section & Cards Customiser — Instant */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-600" />Page & Section Colours
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Zap className="w-2.5 h-2.5" />Instant
                      </span>
                      <button
                        onClick={resetSectionColors}
                        className="text-[10px] text-slate-500 font-bold flex items-center gap-1 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />Reset
                      </button>
                    </div>
                  </div>

                  {/* Preset Schemes */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Quick Schemes</label>
                    <div className="grid grid-cols-6 gap-2">
                      {SECTION_SCHEMES.map(s => (
                        <button key={s.key}
                          onClick={() => handleSectionScheme(s)}
                          className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border-2 font-bold text-[10px] transition-all btn-spring ${
                            activeScheme === s.key
                              ? 'border-brand-500 bg-brand-50 text-brand-700'
                              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <span className="text-lg">{s.emoji}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Radius */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1 block">
                      <Square className="w-3 h-3" />Card Border Radius
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {CARD_RADIUS_OPTIONS.map(r => (
                        <button key={r.key}
                          onClick={() => handleCardRadius(r.key as BrandCustomization['cardRadius'])}
                          className={`flex flex-col items-center gap-1 px-3 py-2 border-2 font-bold text-[10px] transition-all btn-spring ${
                            cardRadius === r.key
                              ? 'border-brand-500 bg-brand-50 text-brand-700'
                              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white'
                          }`}
                          style={{ borderRadius: r.px }}
                        >
                          <div
                            className={`w-6 h-4 border-2 ${cardRadius === r.key ? 'border-brand-400' : 'border-slate-300'}`}
                            style={{ borderRadius: r.px }}
                          />
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colour pickers grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <ColorPicker value={pageBg} onChange={handlePageBg} label="Page Background" icon={Monitor} />
                    <ColorPicker value={cardBg} onChange={handleCardBg} label="Card Background" icon={Layers} />
                    <ColorPicker value={cardBorderColor} onChange={handleCardBorderColor} label="Card Border Colour" icon={Square} />
                    <ColorPicker value={sidebarBg} onChange={handleSidebarBg} label="Sidebar Background" icon={Sidebar} />
                    <ColorPicker value={headerBg} onChange={handleHeaderBg} label="Header Background" icon={Settings} />
                    <ColorPicker value={contentTextColor} onChange={handleContentTextColor} label="Content Text Colour" icon={Type} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── BILLING & GST ── */}
            {activeTab === 'billing' && (
              <motion.div key="billing" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2"><CreditCard className="w-4 h-4 text-brand-600" />Billing & GST Details</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">These appear on generated GST Tax Invoices automatically</p>
                  </div>
                  <SaveBtn section="billing" />
                </div>
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">Bank Name</label>
                      <input value={bankName} onChange={e => setBankName(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">Account Number</label>
                      <input value={accountNum} onChange={e => setAccountNum(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">IFSC Code</label>
                      <input value={ifscCode} onChange={e => setIfscCode(e.target.value)}
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">UPI ID</label>
                      <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@bank"
                        className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── API & WEBHOOKS ── */}
            {activeTab === 'api' && (
              <motion.div key="api" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                className="space-y-4"
              >
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2"><Key className="w-4 h-4 text-brand-600" />Platform API Key & Webhooks</h3>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 font-mono text-xs text-slate-800">
                    <span className="truncate">{showApiKey ? apiKey : '•'.repeat(24)}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => setShowApiKey(!showApiKey)} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={handleCopyApiKey}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-sans text-xs font-bold transition-colors flex items-center gap-1">
                        {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedKey ? 'Copied!' : 'Copy Key'}
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">This key authenticates API requests to the Vertex CRM platform. Keep it private.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-950 text-white shadow-xl space-y-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-400/30">Active License</span>
                  <h3 className="text-2xl font-extrabold font-display">Enterprise Unlimited</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">Unlimited seats, AI decision copilot, real-time Recharts analytics, 99.99% SLA uptime guarantee.</p>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-bold text-white">
                    <span>Next Renewal: Jan 2027</span>
                    <span>$48,000 / Year</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
