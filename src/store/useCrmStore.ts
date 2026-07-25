import { create } from 'zustand';
import { 
  ActiveTab, Company, Contact, Lead, Deal, Invoice, Project, Task, CalendarEvent, 
  ActivityLog, AiInsight, NotificationItem, DealStage, InvoiceStatus, BrandCustomization, UserProfile, PermissionLevel 
} from '../types/crm';
import { crmRepository } from '../services/MemoryCrmRepository';
import { generateIndustryWorkspace, IndustryType } from '../services/demoWorkspaceGenerator';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New ₹45.5 Lakh Enterprise Deal',
    description: 'Apex Global Technologies expanded scope for Cloud Migration Suite.',
    timestamp: '5 mins ago',
    read: false,
    category: 'deal'
  },
  {
    id: 'notif-2',
    title: 'GST Tax Invoice INV-2026-089 Paid',
    description: 'Received ₹1,62,500 INR via NEFT / RTGS with 18% GST.',
    timestamp: '25 mins ago',
    read: false,
    category: 'billing'
  },
  {
    id: 'notif-3',
    title: 'Vertex AI Expansion Alert',
    description: '94% Win Probability detected for Multi-Region Data Governance upsell.',
    timestamp: '1 hour ago',
    read: false,
    category: 'ai'
  },
  {
    id: 'notif-4',
    title: 'Executive Sync Scheduled',
    description: 'Meeting with CTO Dr. Evelyn Reed at 4:00 PM IST.',
    timestamp: '2 hours ago',
    read: false,
    category: 'meeting'
  },
  {
    id: 'notif-5',
    title: 'High-Intent Inbound Lead',
    description: 'Starlight BioLabs requested customized sandbox credentials.',
    timestamp: '3 hours ago',
    read: true,
    category: 'lead'
  },
  {
    id: 'notif-6',
    title: 'RBAC Permission Updated',
    description: 'Admin updated module access for Marcus Chen.',
    timestamp: 'Yesterday',
    read: true,
    category: 'ai'
  }
];

const INITIAL_TEAM: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Alex Vance',
    role: 'VP of Sales',
    email: 'alex.vance@vertex.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    department: 'Revenue & Operations',
    userRole: 'admin',
    tabPermissions: {
      dashboard: 'full',
      pipeline: 'full',
      clients: 'full',
      contacts: 'full',
      invoices: 'full',
      projects: 'full',
      calendar: 'full',
      analytics: 'full',
      settings: 'full',
      team: 'full'
    }
  },
  {
    id: 'user-2',
    name: 'Sarah Jenkins',
    role: 'Enterprise Account Executive',
    email: 'sarah.j@vertex.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    department: 'Enterprise Sales',
    userRole: 'manager',
    tabPermissions: {
      dashboard: 'full',
      pipeline: 'full',
      clients: 'full',
      contacts: 'full',
      invoices: 'read',
      projects: 'full',
      calendar: 'full',
      analytics: 'read',
      settings: 'none',
      team: 'read'
    }
  },
  {
    id: 'user-3',
    name: 'Marcus Chen',
    role: 'Customer Success Specialist',
    email: 'marcus.c@vertex.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    department: 'Client Success',
    userRole: 'member',
    tabPermissions: {
      dashboard: 'full',
      pipeline: 'read',
      clients: 'full',
      contacts: 'full',
      invoices: 'none',
      projects: 'full',
      calendar: 'full',
      analytics: 'none',
      settings: 'none',
      team: 'none'
    }
  }
];

interface CrmState {
  // Navigation & UI State
  activeTab: ActiveTab;
  selectedCompanyId: string | null;
  searchQuery: string;
  isCommandPaletteOpen: boolean;
  isAiDrawerOpen: boolean;
  isNotificationDrawerOpen: boolean;
  isGeneratorModalOpen: boolean;
  isCustomizerOpen: boolean;
  isUserProfileModalOpen: boolean;
  isSidebarCollapsed: boolean;
  activeWorkspace: string;
  currencySymbol: string;
  theme: 'light' | 'dark';

  // Currency Action
  setCurrencySymbol: (currency: string) => void;

  // Demo Mode State & Exit Action
  isDemoMode: boolean;
  exitDemoMode: () => void;

  // User & Team RBAC State
  currentUser: UserProfile;
  teamMembers: UserProfile[];
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  updateTeamMemberPermissions: (memberId: string, tab: string, level: PermissionLevel) => void;
  switchActiveUser: (memberId: string) => void;
  toggleUserProfileModal: (open?: boolean) => void;
  addTeamMember: (newMember: Omit<UserProfile, 'id'>) => void;

  // Brand Customization State
  brandCustomization: BrandCustomization;
  setBrandCustomization: (customization: Partial<BrandCustomization>) => void;

  // Data Collections
  companies: Company[];
  deals: Deal[];
  contacts: Contact[];
  leads: Lead[];
  invoices: Invoice[];
  projects: Project[];
  tasks: Task[];
  calendarEvents: CalendarEvent[];
  activityLogs: ActivityLog[];
  aiInsights: AiInsight[];
  notifications: NotificationItem[];

  // Navigation & UI Actions
  setActiveTab: (tab: ActiveTab) => void;
  selectCompany: (companyId: string) => void;
  setSearchQuery: (query: string) => void;
  toggleCommandPalette: (open?: boolean) => void;
  toggleAiDrawer: (open?: boolean) => void;
  toggleNotificationDrawer: (open?: boolean) => void;
  toggleGeneratorModal: (open?: boolean) => void;
  toggleCustomizerDrawer: (open?: boolean) => void;
  toggleSidebar: () => void;
  setActiveWorkspace: (workspace: string) => void;
  toggleTheme: () => void;

  // Workspace Generator & CRUD Repository Operations
  generateWorkspaceForIndustry: (industry: IndustryType) => void;
  createClient: (clientData: Omit<Company, 'id'>) => Company;
  updateClient: (id: string, updates: Partial<Company>) => void;
  deleteClient: (id: string) => void;

  createDeal: (dealData: Omit<Deal, 'id'>) => void;
  updateDealStage: (id: string, newStage: DealStage) => void;
  deleteDeal: (id: string) => void;

  createProject: (projectData: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  createInvoice: (invoiceData: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  updateInvoiceStatus: (id: string, newStatus: InvoiceStatus) => void;
  deleteInvoice: (id: string) => void;

  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const FONT_MAP: Record<string, string> = {
  'jakarta':      "'Plus Jakarta Sans', sans-serif",
  'outfit':       "'Outfit', sans-serif",
  'inter':        "'Inter', sans-serif",
  'sora':         "'Sora', sans-serif",
  'grotesk':      "'Space Grotesk', sans-serif",
  'geist':        "'Geist', 'Inter', sans-serif",
  'bricolage':    "'Bricolage Grotesque', sans-serif",
  'dm-sans':      "'DM Sans', sans-serif",
  'cabinet':      "'Cabinet Grotesk', sans-serif",
  'satoshi':      "'Satoshi', sans-serif",
  'general-sans': "'General Sans', sans-serif",
  'clash':        "'Clash Display', sans-serif",
  'instrument':   "'Instrument Sans', sans-serif",
  'figtree':      "'Figtree', sans-serif",
  'manrope':      "'Manrope', sans-serif",
  'urbanist':     "'Urbanist', sans-serif",
  'albert':       "'Albert Sans', sans-serif",
  'public':       "'Public Sans', sans-serif",
};

const GOOGLE_FONT_URLS: Record<string, string> = {
  'bricolage':  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap',
  'dm-sans':    'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap',
  'geist':      'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap',
  'instrument': 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap',
  'figtree':    'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap',
  'manrope':    'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap',
  'urbanist':   'https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap',
  'albert':     'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&display=swap',
  'public':     'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap',
};

const injectGoogleFont = (fontKey: string) => {
  if (typeof document === 'undefined') return;
  const url = GOOGLE_FONT_URLS[fontKey];
  if (!url) return;
  const id = `gf-${fontKey}`;
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
};

const applyThemeVariables = (customization: BrandCustomization) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  const hexMap: Record<string, { primary: string; hover: string; bg: string; border: string }> = {
    blue:     { primary: '#0c8de9', hover: '#026fc7', bg: '#f0f7ff',  border: '#bae0fd' },
    emerald:  { primary: '#10b981', hover: '#059669', bg: '#ecfdf5',  border: '#a7f3d0' },
    violet:   { primary: '#8b5cf6', hover: '#7c3aed', bg: '#f5f3ff',  border: '#ddd6fe' },
    amber:    { primary: '#f59e0b', hover: '#d97706', bg: '#fffbeb',  border: '#fde68a' },
    obsidian: { primary: '#0f172a', hover: '#1e293b', bg: '#f8fafc',  border: '#e2e8f0' },
    rose:      { primary: '#f43f5e', hover: '#e11d48', bg: '#fff1f2',  border: '#fecdd3' },
    cyan:      { primary: '#06b6d4', hover: '#0891b2', bg: '#ecfeff',  border: '#a5f3fc' },
    champagne: { primary: '#c59b6c', hover: '#b08658', bg: '#fdfbf7',  border: '#e8d9c5' },
    custom:   {
      primary: customization.customAccentHex || '#0c8de9',
      hover:   customization.customAccentHex || '#026fc7',
      bg:      '#f0f7ff',
      border:  '#bae0fd',
    },
  };

  const theme = hexMap[customization.accentColor] || hexMap.blue;
  root.style.setProperty('--brand-primary', theme.primary);
  root.style.setProperty('--brand-primary-hover', theme.hover);
  root.style.setProperty('--brand-primary-bg', theme.bg);
  root.style.setProperty('--brand-primary-border', theme.border);

  // Apply font
  const fontKey = customization.fontFamily || 'jakarta';
  injectGoogleFont(fontKey);
  const fontFamily = FONT_MAP[fontKey] || FONT_MAP['jakarta'];
  root.style.setProperty('--font-body', fontFamily);
  body.style.fontFamily = fontFamily;

  // Per-section color overrides
  if (customization.pageBg)         root.style.setProperty('--bg-canvas-custom', customization.pageBg);
  else                               root.style.removeProperty('--bg-canvas-custom');
  if (customization.cardBg)         root.style.setProperty('--bg-card-custom', customization.cardBg);
  else                               root.style.removeProperty('--bg-card-custom');
  if (customization.cardBorderColor) root.style.setProperty('--border-card-custom', customization.cardBorderColor);
  else                               root.style.removeProperty('--border-card-custom');
  if (customization.sidebarBg)      root.style.setProperty('--sidebar-bg-custom', customization.sidebarBg);
  else                               root.style.removeProperty('--sidebar-bg-custom');
  if (customization.headerBg)       root.style.setProperty('--header-bg-custom', customization.headerBg);
  else                               root.style.removeProperty('--header-bg-custom');
  if (customization.contentTextColor) root.style.setProperty('--text-primary-custom', customization.contentTextColor);
  else                                root.style.removeProperty('--text-primary-custom');

  // Card radius custom property
  const radMap: Record<string, string> = {
    sm: '6px', md: '10px', lg: '14px', xl: '18px', '2xl': '20px', '3xl': '28px',
  };
  if (customization.cardRadius) {
    root.style.setProperty('--card-radius', radMap[customization.cardRadius] || '20px');
  }

  // Body Theme Mode Class Transformation
  body.className = `h-full antialiased select-none theme-${customization.themeMode || 'light'}`;
};

export const useCrmStore = create<CrmState>((set, get) => {
  const syncRepositoryData = () => {
    const ws = crmRepository.getWorkspaceData();
    set({
      companies: [...ws.companies],
      deals: [...ws.deals],
      contacts: [...ws.contacts],
      leads: [...ws.leads],
      invoices: [...ws.invoices],
      projects: [...ws.projects],
      tasks: [...ws.tasks],
      calendarEvents: [...ws.calendarEvents],
      activityLogs: [...ws.activityLogs],
      aiInsights: [...ws.aiInsights],
      activeWorkspace: ws.industryName,
      selectedCompanyId: ws.companies[0]?.id || null
    });
  };

  crmRepository.subscribe(() => {
    syncRepositoryData();
  });

  const initialWs = crmRepository.getWorkspaceData();

  return {
    // Default UI state
    activeTab: 'dashboard',
    selectedCompanyId: initialWs.companies[0]?.id || null,
    searchQuery: '',
    isCommandPaletteOpen: false,
    isAiDrawerOpen: false,
    isNotificationDrawerOpen: false,
    isGeneratorModalOpen: false,
    isCustomizerOpen: false,
    isUserProfileModalOpen: false,
    isSidebarCollapsed: false,
    activeWorkspace: initialWs.industryName,
    currencySymbol: '₹',
    theme: 'light',

    setCurrencySymbol: (symbol) => set({ currencySymbol: symbol }),

    // Demo Mode & Reset Action
    isDemoMode: false,
    exitDemoMode: () => set({
      currentUser: INITIAL_TEAM[0],
      isDemoMode: false,
      activeTab: 'dashboard'
    }),

    // User & Team RBAC State
    currentUser: INITIAL_TEAM[0],
    teamMembers: INITIAL_TEAM,

    updateCurrentUser: (updates) => set((state) => {
      const updatedUser = { ...state.currentUser, ...updates };
      const updatedMembers = state.teamMembers.map(m => m.id === updatedUser.id ? updatedUser : m);
      return { currentUser: updatedUser, teamMembers: updatedMembers };
    }),

    updateTeamMemberPermissions: (memberId, tab, level) => set((state) => {
      const updatedMembers = state.teamMembers.map(m => {
        if (m.id === memberId) {
          return {
            ...m,
            tabPermissions: { ...m.tabPermissions, [tab]: level }
          };
        }
        return m;
      });
      const updatedCurrent = state.currentUser.id === memberId 
        ? updatedMembers.find(m => m.id === memberId)! 
        : state.currentUser;
      return { teamMembers: updatedMembers, currentUser: updatedCurrent };
    }),

    switchActiveUser: (memberId) => set((state) => {
      const target = state.teamMembers.find(m => m.id === memberId);
      if (target) {
        return {
          currentUser: target,
          isDemoMode: target.id !== INITIAL_TEAM[0].id
        };
      }
      return {};
    }),

    toggleUserProfileModal: (open) => set((state) => ({ isUserProfileModalOpen: open ?? !state.isUserProfileModalOpen })),

    addTeamMember: (newMember) => set((state) => {
      const created: UserProfile = {
        id: `user-${Date.now()}`,
        ...newMember
      };
      return { teamMembers: [...state.teamMembers, created] };
    }),

    // Brand Customization Default with GST
    brandCustomization: {
      appName: 'Nova Intelligence',
      tagline: 'Enterprise Revenue Operating System',
      logoUrl: '',
      accentColor: 'blue',
      themeMode: 'light',
      fontFamily: 'jakarta',
      borderRadius: 'rounded-2xl',
      cardRadius: '2xl',
      gstNumber: '27AAAAA0000A1Z5',
      registeredAddress: '100 Montgomery St, Tech District, San Francisco, CA',
      supportEmail: 'billing@vertex.io',
      bankName: 'HDFC Bank Ltd',
      accountNumber: '50200012345678',
      ifscCode: 'HDFC0000123'
    },

    setBrandCustomization: (customization) => set((state) => {
      const updated = { ...state.brandCustomization, ...customization };
      applyThemeVariables(updated);
      return { brandCustomization: updated };
    }),

    // Data Collections
    companies: initialWs.companies,
    deals: initialWs.deals,
    contacts: initialWs.contacts,
    leads: initialWs.leads,
    invoices: initialWs.invoices,
    projects: initialWs.projects,
    tasks: initialWs.tasks,
    calendarEvents: initialWs.calendarEvents,
    activityLogs: initialWs.activityLogs,
    aiInsights: initialWs.aiInsights,
    notifications: INITIAL_NOTIFICATIONS,

    // UI Actions
    setActiveTab: (tab) => set({ activeTab: tab }),
    selectCompany: (companyId) => set({ selectedCompanyId: companyId, activeTab: 'client-detail' }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    toggleCommandPalette: (open) => set((state) => ({ isCommandPaletteOpen: open ?? !state.isCommandPaletteOpen })),
    toggleAiDrawer: (open) => set((state) => ({ isAiDrawerOpen: open ?? !state.isAiDrawerOpen })),
    toggleNotificationDrawer: (open) => set((state) => ({ isNotificationDrawerOpen: open ?? !state.isNotificationDrawerOpen })),
    toggleGeneratorModal: (open) => set((state) => ({ isGeneratorModalOpen: open ?? !state.isGeneratorModalOpen })),
    toggleCustomizerDrawer: (open) => set((state) => ({ isCustomizerOpen: open ?? !state.isCustomizerOpen })),
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

    // Generator & Repository Delegation
    generateWorkspaceForIndustry: (industry) => {
      const newData = generateIndustryWorkspace(industry);
      crmRepository.loadWorkspaceData(newData);
    },

    createClient: (clientData) => {
      return crmRepository.createClient(clientData);
    },

    updateClient: (id, updates) => {
      crmRepository.updateClient(id, updates);
    },

    deleteClient: (id) => {
      crmRepository.deleteClient(id);
    },

    createDeal: (dealData) => {
      crmRepository.createDeal(dealData);
    },

    updateDealStage: (id, newStage) => {
      crmRepository.updateDealStage(id, newStage);
    },

    deleteDeal: (id) => {
      crmRepository.deleteDeal(id);
    },

    createProject: (projectData) => {
      crmRepository.createProject(projectData);
    },

    updateProject: (id, updates) => {
      crmRepository.updateProject(id, updates);
    },

    deleteProject: (id) => {
      crmRepository.deleteProject(id);
    },

    createInvoice: (invoiceData) => {
      crmRepository.createInvoice(invoiceData);
    },

    updateInvoice: (id, updates) => {
      crmRepository.updateInvoice(id, updates);
    },

    updateInvoiceStatus: (id, newStatus) => {
      crmRepository.updateInvoice(id, { status: newStatus });
    },

    deleteInvoice: (id) => {
      crmRepository.deleteInvoice(id);
    },

    markNotificationRead: (id) => {
      crmRepository.markNotificationRead(id);
    },

    clearAllNotifications: () => {
      crmRepository.clearNotifications();
    }
  };
});
