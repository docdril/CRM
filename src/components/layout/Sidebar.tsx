'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, Kanban, Building2, Users2, CreditCard, 
  FolderKanban, CalendarDays, PieChart, SlidersHorizontal, Sparkles, ChevronDown, 
  Flame, ShieldCheck, Edit3, Upload, Check, X 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { ActiveTab } from '../../types/crm';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isSidebarCollapsed, 
    activeWorkspace, 
    toggleSidebar,
    toggleUserProfileModal,
    brandCustomization,
    setBrandCustomization,
    currentUser
  } = useCrmStore();

  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);
  const [quickBrandName, setQuickBrandName] = useState(brandCustomization?.appName || 'Nova Intelligence');

  const allModules: { label: string; tab: ActiveTab; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { label: 'Dashboard', tab: 'dashboard', icon: LayoutGrid },
    { label: 'Deals & Pipeline', tab: 'pipeline', icon: Kanban, badge: 6 },
    { label: 'Client Accounts', tab: 'clients', icon: Building2 },
    { label: 'Contacts & Leads', tab: 'contacts', icon: Users2 },
    { label: 'Invoices & Billing', tab: 'invoices', icon: CreditCard },
    { label: 'Projects & Tasks', tab: 'projects', icon: FolderKanban },
    { label: 'Calendar Schedule', tab: 'calendar', icon: CalendarDays },
    { label: 'Analytics & Reports', tab: 'analytics', icon: PieChart },
    { label: 'Team & RBAC', tab: 'team', icon: ShieldCheck },
    { label: 'Settings', tab: 'settings', icon: SlidersHorizontal },
  ];

  // Safely filter visible modules based on currentUser permissions
  const visibleModules = allModules.filter(m => {
    if (!currentUser || !currentUser.tabPermissions) return true;
    const level = currentUser.tabPermissions[m.tab];
    return level !== 'none';
  });

  const userAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
  const userName = currentUser?.name || 'Alex Vance';
  const userRole = currentUser?.role || 'VP of Sales';
  const userRoleType = currentUser?.userRole || 'admin';
  const isAdmin = userRoleType === 'admin';

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandCustomization({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveQuickBrandName = () => {
    setBrandCustomization({ appName: quickBrandName });
    setIsQuickEditOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
          onClick={() => toggleSidebar()} 
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 h-screen bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 z-50 md:z-30 select-none ${
          isSidebarCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'
        }`}
      >
      {/* Brand Header — Logo & Name vertically centered, pen in bottom-right of box */}
      <div className="relative">
        <div className="relative px-4 py-3.5 flex items-center gap-3 border-b border-slate-100">
          {/* Logo */}
          {brandCustomization?.logoUrl ? (
            <img
              src={brandCustomization.logoUrl}
              alt="Brand Logo"
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold shrink-0 shadow-2xs font-display">
              <Flame className="w-5 h-5 text-white" />
            </div>
          )}

          {/* Brand Name — same row, vertically centered with logo */}
          {!isSidebarCollapsed && (
            <h1 className="flex-1 text-[15px] font-black text-slate-900 tracking-tight leading-snug truncate font-display">
              {brandCustomization?.appName || 'Nova Intelligence'}
            </h1>
          )}

          {/* Pen edit icon — absolute extreme bottom-right of the brand box */}
          {isAdmin && !isSidebarCollapsed && (
            <button
              onClick={() => {
                setQuickBrandName(brandCustomization?.appName || 'Nova Intelligence');
                setIsQuickEditOpen(!isQuickEditOpen);
              }}
              className="absolute bottom-1.5 right-1.5 p-1 text-slate-300 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors z-10"
              title="Quick-Edit Brand Name & Logo"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Direct Quick-Edit Popover for Brand Name & Logo */}
        <AnimatePresence>
          {isQuickEditOpen && !isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-18 left-3 right-3 z-50 p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 space-y-3 font-outfit text-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
                <Edit3 className="w-4 h-4 text-brand-600 dark:text-brand-300" />
                <button onClick={() => setIsQuickEditOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Brand Name Edit Input */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company Brand Name</label>
                <div className="flex gap-1.5 mt-1">
                  <input
                    type="text"
                    value={quickBrandName}
                    onChange={(e) => setQuickBrandName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveQuickBrandName()}
                    placeholder="Enter brand name..."
                    className="w-full p-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-400"
                  />
                  <button
                    onClick={handleSaveQuickBrandName}
                    className="px-3 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs shrink-0 flex items-center justify-center font-display transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Upload Logo File */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upload Company Logo</label>
                <label className="mt-1 w-full p-2 bg-slate-50 dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 border border-slate-200 dark:border-white/20 border-dashed rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <Upload className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" /> Upload
                  <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden" />
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items - Balanced & Sleek */}
        <nav className="px-2.5 py-2 space-y-1.5">
          {visibleModules.map((item) => {
            const isActive = activeTab === item.tab || (item.tab === 'clients' && activeTab === 'client-detail');
            return (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group font-display ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <item.icon className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                  }`} />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isSidebarCollapsed && item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Card with Explicit Role Tag Badge */}
      <div className="p-3 border-t border-slate-100">
        <div 
          onClick={() => toggleUserProfileModal(true)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
          title="Click to View Persona Details"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={userAvatar}
              alt={userName}
              className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0 group-hover:border-slate-900 transition-colors"
            />
            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900 truncate font-display group-hover:text-brand-600 transition-colors">
                    {userName}
                  </p>
                  <span className={`px-1.5 py-0.2 text-[9px] font-black rounded uppercase font-display ${
                    userRoleType === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                    userRoleType === 'manager' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {userRoleType}
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 truncate font-outfit">
                  {userRole}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  </>
);
};
