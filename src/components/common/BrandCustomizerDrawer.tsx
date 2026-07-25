'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Sparkles, Image, Type, Moon, Sun, Layers, Flame, Upload, CheckCircle2, Shield } from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';

const PRESET_LOGOS = [
  { id: 'apex', name: 'Apex Flame', url: '' },
  { id: 'apple', name: 'Minimal Tech', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80' },
  { id: 'stripe', name: 'Stripe Blue', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80' },
  { id: 'linear', name: 'Linear Dark', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80' },
  { id: 'vercel', name: 'Vercel Modern', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80' }
];

export const BrandCustomizerDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { brandCustomization, setBrandCustomization } = useCrmStore();
  const [appNameInput, setAppNameInput] = useState(brandCustomization.appName);
  const [taglineInput, setTaglineInput] = useState(brandCustomization.tagline);
  const [customLogoUrl, setCustomLogoUrl] = useState(brandCustomization.logoUrl || '');
  const [selectedAccent, setSelectedAccent] = useState(brandCustomization.accentColor);
  const [selectedTheme, setSelectedTheme] = useState(brandCustomization.themeMode || 'light');

  if (!isOpen) return null;

  const handleSelectAccent = (accent: 'blue' | 'emerald' | 'violet' | 'amber' | 'obsidian') => {
    setSelectedAccent(accent);
    // Instant live preview update
    setBrandCustomization({ accentColor: accent });
  };

  const handleSelectTheme = (theme: 'light' | 'dark' | 'glass' | 'cyber' | 'sunset') => {
    setSelectedTheme(theme);
    // Instant live preview update
    setBrandCustomization({ themeMode: theme });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        setCustomLogoUrl(dataUrl);
        setBrandCustomization({ logoUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const accentOptions: { id: 'blue' | 'emerald' | 'violet' | 'amber' | 'obsidian'; name: string; bg: string }[] = [
    { id: 'blue', name: 'Electric Blue', bg: 'bg-blue-500' },
    { id: 'emerald', name: 'Emerald Wealth', bg: 'bg-emerald-500' },
    { id: 'violet', name: 'Neon Violet', bg: 'bg-purple-500' },
    { id: 'amber', name: 'Sunset Amber', bg: 'bg-amber-500' },
    { id: 'obsidian', name: 'Obsidian Black', bg: 'bg-slate-900' },
  ];

  const themeOptions = [
    { id: 'light', name: 'Pristine Light', icon: Sun, desc: 'Crisp bright canvas with soft slate borders' },
    { id: 'dark', name: 'Midnight Obsidian', icon: Moon, desc: 'Deep dark executive canvas with high contrast' },
    { id: 'glass', name: 'Frosted Glass', icon: Sparkles, desc: 'Translucent blurred backdrop & ambient Orbs' },
    { id: 'cyber', name: 'Cyber Matrix', icon: Shield, desc: 'Terminal dark green canvas with emerald glow' },
    { id: 'sunset', name: 'Sunset Coral', icon: Flame, desc: 'Warm cream canvas with rich coral highlights' }
  ];

  const presetNames = ['Atlas CRM', 'Pulse OS', 'Nova Intelligence', 'Orbit Enterprise', 'Acer CRM', 'Apex Operating System'];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setBrandCustomization({
      appName: appNameInput || 'Nova Intelligence',
      tagline: taglineInput || 'Enterprise Revenue OS',
      logoUrl: customLogoUrl,
      accentColor: selectedAccent,
      themeMode: selectedTheme as any
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg h-full bg-slate-950 text-white shadow-2xl border-l border-white/10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-500/20 text-brand-300 border border-brand-400/30">
                <Palette className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight font-display text-white">Brand & Dynamic Themes Studio</h3>
                <p className="text-xs text-brand-200 font-outfit uppercase tracking-widest font-bold">Personalize Canvas Themes & Styling</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-outfit">
            {/* Dynamic Page Background Themes */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                <Layers className="w-4 h-4 text-brand-400" /> Canvas Page Theme Styles
              </label>

              <div className="space-y-2">
                {themeOptions.map((th) => {
                  const isSelected = selectedTheme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => handleSelectTheme(th.id as any)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected ? 'border-brand-500 bg-brand-500/20 ring-2 ring-brand-500/30 text-white' : 'border-white/10 bg-white/5 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand-500 text-white' : 'bg-white/10 text-slate-300'}`}>
                          <th.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-extrabold text-xs font-display">{th.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{th.desc}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Palette */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                <Palette className="w-4 h-4 text-brand-400" /> Accent Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {accentOptions.map((acc) => {
                  const isSelected = selectedAccent === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleSelectAccent(acc.id)}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                        isSelected ? 'border-brand-500 bg-brand-500/20' : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full ${acc.bg} shrink-0 shadow-2xs`} />
                      <span className="font-bold text-white text-xs truncate">{acc.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-400 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform / Company Name */}
            <div className="space-y-2.5">
              <label className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                <Type className="w-4 h-4 text-brand-400" /> Platform / Company Name (Preserves Exact Admin Casing)
              </label>
              <input
                type="text"
                value={appNameInput}
                onChange={(e) => {
                  setAppNameInput(e.target.value);
                  setBrandCustomization({ appName: e.target.value });
                }}
                placeholder="e.g. Nova Intelligence"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-brand-500"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {presetNames.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setAppNameInput(name);
                      setBrandCustomization({ appName: name });
                    }}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold text-slate-300 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Company Logo */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-display">
                <Image className="w-4 h-4 text-brand-400" /> Upload Company Logo Image
              </label>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-sm font-display">
                  <Upload className="w-4 h-4" /> Upload Local Image File
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                {customLogoUrl && (
                  <img src={customLogoUrl} alt="Custom Logo" className="w-9 h-9 rounded-xl object-cover border-2 border-brand-400 shrink-0" />
                )}
              </div>

              {/* Presets */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {PRESET_LOGOS.map((logo) => {
                  const isSelected = customLogoUrl === logo.url;
                  return (
                    <button
                      key={logo.id}
                      type="button"
                      onClick={() => {
                        setCustomLogoUrl(logo.url);
                        setBrandCustomization({ logoUrl: logo.url });
                      }}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        isSelected ? 'border-brand-500 bg-brand-500/20 ring-2 ring-brand-500/30' : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      {logo.url ? (
                        <img src={logo.url} alt={logo.name} className="w-6 h-6 rounded-lg object-cover" />
                      ) : (
                        <Flame className="w-6 h-6 text-amber-400" />
                      )}
                      <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">{logo.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/10 bg-slate-950 flex items-center justify-between font-outfit">
            <button onClick={onClose} className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white font-display">
              Close
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-black text-xs rounded-2xl shadow-xl transition-all btn-spring font-display flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Brand Customization
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
