'use client';

import React, { useState } from 'react';
import { Search, Bell, Sparkles, Command, Settings2, RefreshCw, Palette, ChevronDown, LogOut, Eye } from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab,
    toggleCommandPalette, 
    toggleAiDrawer, 
    toggleNotificationDrawer, 
    toggleGeneratorModal,
    notifications,
    activeWorkspace,
    currencySymbol,
    brandCustomization,
    currentUser,
    isDemoMode,
    exitDemoMode
  } = useCrmStore();

  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'pipeline': return 'Deals & Pipeline';
      case 'clients': return 'Client Accounts';
      case 'client-detail': return 'Client Overview';
      case 'contacts': return 'Contacts & Leads';
      case 'invoices': return 'Invoices & Billing';
      case 'projects': return 'Projects & Tasks';
      case 'calendar': return 'Calendar Schedule';
      case 'analytics': return 'Analytics & BI';
      case 'team': return 'Team Governance & RBAC';
      case 'settings': return 'Settings';
      default: return brandCustomization.appName;
    }
  };

  return (
    <div className="flex flex-col z-20">
      {/* Demo Persona Exit Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-6 py-2 flex items-center justify-between shadow-md font-outfit text-xs">
          <div className="flex items-center gap-2 font-bold">
            <Eye className="w-4 h-4 animate-pulse text-slate-950" />
            <span>DEMO PERSONA MODE: Viewing CRM as <strong className="underline">{currentUser.name}</strong> ({currentUser.userRole.toUpperCase()})</span>
          </div>

          <button
            onClick={exitDemoMode}
            className="px-3 py-1 bg-slate-950 text-white font-extrabold rounded-lg hover:bg-slate-900 transition-all btn-spring flex items-center gap-1.5 font-display text-[11px]"
          >
            <LogOut className="w-3.5 h-3.5" /> Exit Demo & Return to Admin
          </button>
        </div>
      )}

      {/* Main Top Header */}
      <header className="h-16 px-6 glass-nav sticky top-0 z-20 flex items-center justify-between transition-all">
        {/* Breadcrumb Title & Workspace Indicator */}
        <div className="flex items-center gap-3">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
            {getBreadcrumbTitle()}
          </h2>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold font-outfit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {activeWorkspace} ({currencySymbol})
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search Command Trigger (No Cmd+K or shortcut badge) */}
          <button
            onClick={() => toggleCommandPalette(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100/70 border border-slate-200/80 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all text-xs font-medium w-36 md:w-48"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="flex-1 text-left truncate font-outfit">Search...</span>
          </button>

          {/* AI Copilot Quick Trigger */}
          <button
            onClick={() => toggleAiDrawer(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all btn-spring font-display shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span className="hidden md:inline">AI Studio</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => toggleNotificationDrawer(true)}
            className="relative p-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Consolidated Tools & Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-1"
              title="Customization & Demo Tools"
            >
              <Settings2 className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isToolsMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-30 font-outfit text-xs space-y-1">
                <button
                  onClick={() => {
                    setIsToolsMenuOpen(false);
                    setActiveTab('settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-bold transition-colors text-left"
                >
                  <Palette className="w-4 h-4 text-brand-600" />
                  <div>
                    <p className="font-bold">Customize Brand</p>
                    <p className="text-[10px] text-slate-400 font-normal">Change App Name & Colors</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsToolsMenuOpen(false);
                    toggleGeneratorModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-bold transition-colors text-left"
                >
                  <RefreshCw className="w-4 h-4 text-brand-600" />
                  <div>
                    <p className="font-bold">Demo Generator</p>
                    <p className="text-[10px] text-slate-400 font-normal">Switch Industry Demo Data</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
