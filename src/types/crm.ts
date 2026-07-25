export type DealStage = 'qualification' | 'proposal' | 'negotiation' | 'contract' | 'closed_won' | 'closed_lost';

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';

export type LeadSource = 'website' | 'referral' | 'linkedin' | 'outbound' | 'event' | 'partner';

export type PermissionLevel = 'full' | 'read' | 'none';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
  userRole: 'admin' | 'manager' | 'member';
  tabPermissions: Record<string, PermissionLevel>;
}

export interface BrandCustomization {
  appName: string;
  tagline: string;
  logoUrl?: string;
  accentColor: 'blue' | 'emerald' | 'violet' | 'amber' | 'obsidian' | 'rose' | 'cyan' | 'champagne' | 'custom';
  customAccentHex?: string;
  themeMode: 'light' | 'dark' | 'glass' | 'cyber' | 'sunset' | 'champagne';
  fontFamily: 'jakarta' | 'outfit' | 'inter' | 'sora' | 'grotesk' | 'geist' | 'bricolage' | 'dm-sans' | 'cabinet' | 'satoshi' | 'general-sans' | 'clash' | 'instrument' | 'figtree' | 'manrope' | 'urbanist' | 'albert' | 'public';
  borderRadius: 'rounded-lg' | 'rounded-2xl' | 'rounded-3xl';
  gstNumber?: string;
  registeredAddress?: string;
  supportEmail?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
  // AI Configuration
  aiName?: string;
  aiProvider?: 'openai' | 'anthropic' | 'google' | 'groq' | 'custom';
  aiApiKey?: string;
  aiModel?: string;
  aiBaseUrl?: string;
  // Org Settings
  orgName?: string;
  orgDomain?: string;
  orgSupportEmail?: string;
  // Per-section color overrides
  pageBg?: string;
  cardBg?: string;
  cardBorderColor?: string;
  cardRadius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  sidebarBg?: string;
  headerBg?: string;
  sidebarTextColor?: string;
  contentTextColor?: string;
  sectionScheme?: 'default' | 'champagne' | 'frosted' | 'minimal' | 'midnight' | 'warm' | 'neo';
}

export interface AuthorizedRepresentative {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  revenue: number;
  employeeCount: number;
  logo: string;
  coverImage: string;
  status: 'active' | 'churn_risk' | 'prospect' | 'partner';
  gstin?: string;
  address: string;
  placeOfSupply?: string;
  phone: string;
  email: string;
  isGstApplicable?: boolean;
  gstTaxType?: 'cgst_sgst' | 'igst' | 'exempt';
  preferredCurrency?: string;
  authorizedRepresentative?: AuthorizedRepresentative;
  owner: {
    name: string;
    avatar: string;
    role: string;
  };
  growthRate: number;
  relationshipScore: number;
  riskScore: 'Low' | 'Medium' | 'High';
  salesPrediction: {
    potentialValue: number;
    upsellOpportunity: string;
    winProbability: number;
  };
  createdAt: string;
  tags: string[];
  notesCount: number;
  dealsCount: number;
  activeProjectsCount: number;
  about?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  companyId: string;
  companyName: string;
  avatar: string;
  status: 'active' | 'inactive';
  leadScore: number;
  lastContacted: string;
  location: string;
  linkedinUrl?: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  title: string;
  value: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
  source: LeadSource;
  score: number;
  assignedTo: {
    name: string;
    avatar: string;
  };
  stage: string;
  tags: string[];
  dateAdded: string;
}

export interface Deal {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  amount: number;
  stage: DealStage;
  probability: number;
  owner: {
    name: string;
    avatar: string;
  };
  priority: PriorityLevel;
  tags: string[];
  closeDate: string;
  nextActivity: string;
  aiScore: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  hsnCode?: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  companyId: string;
  companyName: string;
  customerGstin?: string;
  customerAddress?: string;
  customerPlaceOfSupply?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerRepresentative?: string;
  amount: number;
  cgstAmount?: number;
  sgstAmount?: number;
  igstAmount?: number;
  totalTaxableAmount?: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  customNotes?: string;
  thankYouMessage?: string;
  showBankDetails?: boolean;
  showUpiQr?: boolean;
  includeThankYou?: boolean;
  includeTerms?: boolean;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
  items: InvoiceItem[];
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: PriorityLevel;
  status: 'todo' | 'in_progress' | 'completed';
  assignedTo: {
    name: string;
    avatar: string;
  };
  category: string;
  relatedTo: string;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  status: 'in_progress' | 'completed' | 'on_hold' | 'planning';
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  owner: {
    name: string;
    avatar: string;
  };
  tasksCount: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'demo' | 'call' | 'internal' | 'review';
  attendees: { name: string; avatar: string }[];
  location: string;
  meetingUrl?: string;
  summary?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'deal' | 'invoice' | 'meeting' | 'email' | 'note' | 'contract';
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  badgeColor?: string;
}

export interface AiInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'forecast' | 'action';
  title: string;
  summary: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionText: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  category: 'deal' | 'ai' | 'meeting' | 'billing' | 'lead';
  link?: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'clients'
  | 'client-detail'
  | 'contacts'
  | 'leads'
  | 'pipeline'
  | 'invoices'
  | 'projects'
  | 'calendar'
  | 'analytics'
  | 'settings'
  | 'team'
  | 'ai-studio';
