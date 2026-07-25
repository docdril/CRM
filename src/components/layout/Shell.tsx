'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useCrmStore } from '../../store/useCrmStore';
import { DashboardView } from '../dashboard/DashboardView';
import { DealsKanban } from '../crm/DealsKanban';
import { ClientsTable } from '../crm/ClientsTable';
import { ClientDetail } from '../crm/ClientDetail';
import { ContactsView } from '../crm/ContactsView';
import { InvoicesView } from '../crm/InvoicesView';
import { ProjectsView } from '../crm/ProjectsView';
import { CalendarView } from '../crm/CalendarView';
import { ExecutiveBi } from '../analytics/ExecutiveBi';
import { TeamPermissionsView } from '../team/TeamPermissionsView';
import { SettingsView } from '../settings/SettingsView';
import { CommandPalette } from '../common/CommandPalette';
import { NotificationsToast } from '../common/NotificationsToast';
import { AiCopilotDrawer } from '../ai/AiCopilotDrawer';
import { WorkspaceGeneratorModal } from '../common/WorkspaceGeneratorModal';
import { UserProfileModal } from '../common/UserProfileModal';

export const Shell: React.FC = () => {
  const { 
    activeTab, 
    isGeneratorModalOpen, 
    toggleGeneratorModal, 
    currentUser,
    brandCustomization,
    setBrandCustomization
  } = useCrmStore();

  // Apply theme variables on first mount so font & colors are active immediately
  useEffect(() => {
    setBrandCustomization({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCurrentTabReadOnly = currentUser?.tabPermissions?.[activeTab] === 'read';

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'pipeline':
        return <DealsKanban />;
      case 'clients':
        return <ClientsTable />;
      case 'client-detail':
        return <ClientDetail />;
      case 'contacts':
        return <ContactsView />;
      case 'invoices':
        return <InvoicesView />;
      case 'projects':
        return <ProjectsView />;
      case 'calendar':
        return <CalendarView />;
      case 'analytics':
        return <ExecutiveBi />;
      case 'team':
        return <TeamPermissionsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 relative">
      {/* 3D Ambient Light Orbs for Frosted Glass Depth */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-70">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/50 via-amber-100/40 to-stone-200/30 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-amber-300/40 via-orange-100/30 to-stone-300/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-gradient-to-t from-stone-300/40 to-amber-100/30 blur-3xl" />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Workspace */}
        <main className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Interactive Overlays */}
      <CommandPalette />
      <NotificationsToast />
      <AiCopilotDrawer />
      <WorkspaceGeneratorModal isOpen={isGeneratorModalOpen} onClose={() => toggleGeneratorModal(false)} />
      <UserProfileModal />
    </div>
  );
};
