import { Company, Contact, Lead, Deal, Invoice, Task, Project, CalendarEvent, ActivityLog, AiInsight, NotificationItem } from '../types/crm';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Apex Global Technologies',
    domain: 'apexglobal.io',
    industry: 'Enterprise Software & Cloud',
    revenue: 42500000,
    employeeCount: 1250,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    status: 'active',
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      role: 'Enterprise VP'
    },
    growthRate: 34.2,
    relationshipScore: 96,
    riskScore: 'Low',
    salesPrediction: {
      potentialValue: 850000,
      upsellOpportunity: 'Multi-Region Data Governance Add-on',
      winProbability: 92
    },
    address: '100 Montgomery St, San Francisco, CA 94104',
    phone: '+1 (415) 892-3011',
    email: 'contact@apexglobal.io',
    createdAt: '2023-01-15',
    tags: ['Strategic Tier 1', 'Annual Contract', 'High Growth'],
    notesCount: 24,
    dealsCount: 4,
    activeProjectsCount: 3
  },
  {
    id: 'comp-2',
    name: 'NovaTech Financial Systems',
    domain: 'novatechfin.com',
    industry: 'FinTech & Banking',
    revenue: 88000000,
    employeeCount: 3400,
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    status: 'active',
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'Strategic Account Director'
    },
    growthRate: 28.1,
    relationshipScore: 91,
    riskScore: 'Low',
    salesPrediction: {
      potentialValue: 1200000,
      upsellOpportunity: 'Real-time Fraud Detection Engine',
      winProbability: 88
    },
    address: '250 Vesey Street, New York, NY 10281',
    phone: '+1 (212) 402-9900',
    email: 'info@novatechfin.com',
    createdAt: '2022-11-10',
    tags: ['FinTech', 'Compliance Verified', 'Enterprise Plus'],
    notesCount: 42,
    dealsCount: 6,
    activeProjectsCount: 4
  },
  {
    id: 'comp-3',
    name: 'CyberSphere Defense Systems',
    domain: 'cybersphere.sec',
    industry: 'Cybersecurity',
    revenue: 64000000,
    employeeCount: 1800,
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    status: 'active',
    owner: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Principal Partner Manager'
    },
    growthRate: 48.9,
    relationshipScore: 88,
    riskScore: 'Medium',
    salesPrediction: {
      potentialValue: 620000,
      upsellOpportunity: 'Zero-Trust Endpoint Suite',
      winProbability: 79
    },
    address: '1600 Tysons Blvd, McLean, VA 22102',
    phone: '+1 (703) 982-1122',
    email: 'security@cybersphere.sec',
    createdAt: '2023-03-22',
    tags: ['CyberSec', 'Federal Partner', 'Expansion Potential'],
    notesCount: 18,
    dealsCount: 3,
    activeProjectsCount: 2
  },
  {
    id: 'comp-4',
    name: 'Hyperion BioPharma',
    domain: 'hyperionbio.com',
    industry: 'Healthcare & Life Sciences',
    revenue: 145000000,
    employeeCount: 4200,
    logo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80',
    status: 'churn_risk',
    owner: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Customer Success VP'
    },
    growthRate: 12.4,
    relationshipScore: 68,
    riskScore: 'High',
    salesPrediction: {
      potentialValue: 450000,
      upsellOpportunity: 'Clinical Trial Analytics Module',
      winProbability: 54
    },
    address: '500 Technology Square, Cambridge, MA 02139',
    phone: '+1 (617) 554-9000',
    email: 'info@hyperionbio.com',
    createdAt: '2021-08-14',
    tags: ['BioPharma', 'Executive Renewal Pending', 'High Touch'],
    notesCount: 65,
    dealsCount: 5,
    activeProjectsCount: 1
  },
  {
    id: 'comp-5',
    name: 'Starlight Media & Entertainment',
    domain: 'starlightmedia.com',
    industry: 'Media & Streaming',
    revenue: 32000000,
    employeeCount: 950,
    logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    status: 'prospect',
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      role: 'Enterprise VP'
    },
    growthRate: 22.0,
    relationshipScore: 82,
    riskScore: 'Low',
    salesPrediction: {
      potentialValue: 350000,
      upsellOpportunity: 'Content Delivery Optimization Platform',
      winProbability: 84
    },
    address: '100 Wilshire Blvd, Los Angeles, CA 90401',
    phone: '+1 (310) 998-4433',
    email: 'business@starlightmedia.com',
    createdAt: '2024-02-01',
    tags: ['Prospect', 'POC Active', 'RFP Finalist'],
    notesCount: 12,
    dealsCount: 2,
    activeProjectsCount: 1
  },
  {
    id: 'comp-6',
    name: 'Atlas Global Logistics',
    domain: 'atlaslogistics.co',
    industry: 'Supply Chain & Logistics',
    revenue: 110000000,
    employeeCount: 5100,
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80',
    status: 'active',
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'Strategic Account Director'
    },
    growthRate: 19.8,
    relationshipScore: 94,
    riskScore: 'Low',
    salesPrediction: {
      potentialValue: 1500000,
      upsellOpportunity: 'Autonomous Fleet Tracking Matrix',
      winProbability: 95
    },
    address: '700 Michigan Ave, Chicago, IL 60611',
    phone: '+1 (312) 774-8800',
    email: 'ops@atlaslogistics.co',
    createdAt: '2022-04-19',
    tags: ['Global Logistics', '3-Year Term', 'Key Account'],
    notesCount: 31,
    dealsCount: 7,
    activeProjectsCount: 5
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    name: 'Enterprise Cloud Migration Suite',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    amount: 650000,
    stage: 'contract',
    probability: 90,
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    priority: 'urgent',
    tags: ['Cloud', 'Q3 Target', 'Executive Sign-off'],
    closeDate: '2026-08-15',
    nextActivity: 'Legal Review & Compliance Sign-off today at 3:00 PM',
    aiScore: 94
  },
  {
    id: 'deal-2',
    name: 'Real-Time Fraud Analytics Platform',
    companyId: 'comp-2',
    companyName: 'NovaTech Financial Systems',
    amount: 1200000,
    stage: 'negotiation',
    probability: 80,
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    priority: 'urgent',
    tags: ['FinTech', 'Multi-Year', 'Custom Integration'],
    closeDate: '2026-09-01',
    nextActivity: 'Pricing & SLA Board Presentation',
    aiScore: 88
  },
  {
    id: 'deal-3',
    name: 'Zero-Trust Defense Infrastructure',
    companyId: 'comp-3',
    companyName: 'CyberSphere Defense Systems',
    amount: 480000,
    stage: 'proposal',
    probability: 65,
    owner: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    priority: 'high',
    tags: ['Security', 'RFP Response'],
    closeDate: '2026-09-20',
    nextActivity: 'Technical Sandbox Demo with CISO',
    aiScore: 78
  },
  {
    id: 'deal-4',
    name: 'Global Supply Chain AI Pipeline',
    companyId: 'comp-6',
    companyName: 'Atlas Global Logistics',
    amount: 890000,
    stage: 'closed_won',
    probability: 100,
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    priority: 'medium',
    tags: ['Logistics', 'Expansion', 'Signed'],
    closeDate: '2026-07-10',
    nextActivity: 'Kickoff Meeting with Operations Team',
    aiScore: 99
  },
  {
    id: 'deal-5',
    name: 'Content Acceleration & CDN Plus',
    companyId: 'comp-5',
    companyName: 'Starlight Media & Entertainment',
    amount: 320000,
    stage: 'qualification',
    probability: 40,
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    priority: 'medium',
    tags: ['Media', 'Inbound Lead'],
    closeDate: '2026-10-15',
    nextActivity: 'Discovery Call with CTO',
    aiScore: 62
  },
  {
    id: 'deal-6',
    name: 'Clinical Trial Analytics Module',
    companyId: 'comp-4',
    companyName: 'Hyperion BioPharma',
    amount: 450000,
    stage: 'proposal',
    probability: 50,
    owner: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    priority: 'high',
    tags: ['Healthcare', 'Renewal Upsell'],
    closeDate: '2026-09-30',
    nextActivity: 'Security & HIPAA Compliance Review',
    aiScore: 58
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'cnt-1',
    name: 'Dr. Evelyn Reed',
    email: 'e.reed@apexglobal.io',
    phone: '+1 (415) 555-0192',
    role: 'Chief Technology Officer',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    leadScore: 98,
    lastContacted: '2 hours ago',
    location: 'San Francisco, CA'
  },
  {
    id: 'cnt-2',
    name: 'Jonathan Sterling',
    email: 'j.sterling@novatechfin.com',
    phone: '+1 (212) 555-0144',
    role: 'Head of Global Infrastructure',
    companyId: 'comp-2',
    companyName: 'NovaTech Financial Systems',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    leadScore: 94,
    lastContacted: 'Yesterday',
    location: 'New York, NY'
  },
  {
    id: 'cnt-3',
    name: 'Samantha Chen',
    email: 'schen@cybersphere.sec',
    phone: '+1 (703) 555-0188',
    role: 'VP of Information Security',
    companyId: 'comp-3',
    companyName: 'CyberSphere Defense Systems',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    leadScore: 89,
    lastContacted: '3 days ago',
    location: 'McLean, VA'
  },
  {
    id: 'cnt-4',
    name: 'Robert Vance',
    email: 'rvance@atlaslogistics.co',
    phone: '+1 (312) 555-0177',
    role: 'Chief Operating Officer',
    companyId: 'comp-6',
    companyName: 'Atlas Global Logistics',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    leadScore: 96,
    lastContacted: '5 hours ago',
    location: 'Chicago, IL'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Alexander Wright',
    company: 'Quantum Dynamics Inc',
    email: 'awright@quantumdyn.io',
    phone: '+1 (650) 443-8822',
    title: 'VP of Data Architecture',
    value: 520000,
    status: 'qualified',
    source: 'linkedin',
    score: 91,
    assignedTo: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    stage: 'Discovery Completed',
    tags: ['AI Platform', 'Series D'],
    dateAdded: '2026-07-20'
  },
  {
    id: 'lead-2',
    name: 'Helena Thorne',
    company: 'Vortex Cloud Media',
    email: 'hthorne@vortexmedia.com',
    phone: '+1 (310) 887-1100',
    title: 'Chief Information Officer',
    value: 380000,
    status: 'contacted',
    source: 'website',
    score: 84,
    assignedTo: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    stage: 'Demo Scheduled',
    tags: ['Media Tech', 'Inbound'],
    dateAdded: '2026-07-22'
  },
  {
    id: 'lead-3',
    name: 'Michael Chang',
    company: 'Zenith Payments & Commerce',
    email: 'm.chang@zenithpay.com',
    phone: '+1 (415) 991-3344',
    title: 'Director of Platform Engineering',
    value: 750000,
    status: 'new',
    source: 'referral',
    score: 95,
    assignedTo: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    stage: 'Initial Inquiry',
    tags: ['FinTech', 'High Intent'],
    dateAdded: '2026-07-24'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-089',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    amount: 162500,
    status: 'paid',
    issueDate: '2026-07-01',
    dueDate: '2026-07-31',
    items: [
      { id: 'item-1', description: 'Enterprise Software Subscription - Q3 2026', quantity: 1, unitPrice: 150000, amount: 150000 },
      { id: 'item-2', description: 'Dedicated Solution Architect Support (50h)', quantity: 50, unitPrice: 250, amount: 12500 }
    ]
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-090',
    companyId: 'comp-2',
    companyName: 'NovaTech Financial Systems',
    amount: 300000,
    status: 'pending',
    issueDate: '2026-07-15',
    dueDate: '2026-08-15',
    items: [
      { id: 'item-3', description: 'Real-Time Fraud Analytics License - Milestone 1', quantity: 1, unitPrice: 300000, amount: 300000 }
    ]
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-085',
    companyId: 'comp-4',
    companyName: 'Hyperion BioPharma',
    amount: 112500,
    status: 'overdue',
    issueDate: '2026-06-01',
    dueDate: '2026-07-01',
    items: [
      { id: 'item-4', description: 'Annual Platform Support & Compliance Audit', quantity: 1, unitPrice: 112500, amount: 112500 }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Multi-Region Data Governance Deployment',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    status: 'in_progress',
    progress: 78,
    budget: 250000,
    spent: 195000,
    startDate: '2026-05-10',
    endDate: '2026-09-15',
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    tasksCount: 34
  },
  {
    id: 'proj-2',
    name: 'Autonomous Fleet Tracking Core Setup',
    companyId: 'comp-6',
    companyName: 'Atlas Global Logistics',
    status: 'in_progress',
    progress: 45,
    budget: 500000,
    spent: 220000,
    startDate: '2026-06-01',
    endDate: '2026-11-30',
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    tasksCount: 52
  }
];

export const INITIAL_CALENDAR: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Legal & Contract Sign-off — Apex Global',
    start: '2026-07-24T15:00:00.000Z',
    end: '2026-07-24T16:00:00.000Z',
    type: 'review',
    attendees: [
      { name: 'Dr. Evelyn Reed', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
      { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
    ],
    location: 'Google Meet / Zoom Room Alpha',
    meetingUrl: 'https://meet.google.com/vtx-crm-apex',
    summary: 'Final review of custom SLA terms and multi-region deployment schedule.'
  },
  {
    id: 'evt-2',
    title: 'CISO Technical Demo — CyberSphere',
    start: '2026-07-24T17:30:00.000Z',
    end: '2026-07-24T18:30:00.000Z',
    type: 'demo',
    attendees: [
      { name: 'Samantha Chen', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
      { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    location: 'Vertex Executive Briefing Room',
    meetingUrl: 'https://meet.google.com/vtx-crm-cyber',
    summary: 'Live sandbox demonstration of Zero-Trust endpoint policies.'
  },
  {
    id: 'evt-3',
    title: 'Quarterly Executive Revenue Review',
    start: '2026-07-25T10:00:00.000Z',
    end: '2026-07-25T11:30:00.000Z',
    type: 'internal',
    attendees: [
      { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }
    ],
    location: 'Boardroom 4B',
    summary: 'Reviewing Q3 pipeline velocity, ARR targets, and expansion accounts.'
  }
];

export const INITIAL_ACTIVITY: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '10 mins ago',
    type: 'deal',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    action: 'moved deal stage to Contract Sign-off',
    target: 'Apex Global — Enterprise Cloud Suite ($650,000)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'act-2',
    timestamp: '35 mins ago',
    type: 'email',
    user: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    action: 'sent custom AI-generated proposal draft',
    target: 'NovaTech Financial — Real-Time Fraud Analytics',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'act-3',
    timestamp: '2 hours ago',
    type: 'invoice',
    user: {
      name: 'Finance Bot',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80'
    },
    action: 'processed wire payment of $162,500',
    target: 'Invoice INV-2026-089 (Apex Global)',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

export const INITIAL_AI_INSIGHTS: AiInsight[] = [
  {
    id: 'ai-1',
    type: 'opportunity',
    title: 'High Expansion Potential Detected',
    summary: 'Apex Global Technologies has reached 94% platform utilization across 1,250 seats. Recommend initiating $200k seat expansion proposal.',
    confidence: 96,
    impact: 'high',
    category: 'Expansion Revenue',
    actionText: 'Generate Expansion Proposal'
  },
  {
    id: 'ai-2',
    type: 'risk',
    title: 'Churn Warning Signal',
    summary: 'Hyperion BioPharma executive engagement dropped 38% over the past 30 days. Renewal date is in 45 days.',
    confidence: 88,
    impact: 'high',
    category: 'Risk Mitigation',
    actionText: 'Schedule Executive Sync'
  },
  {
    id: 'ai-3',
    type: 'forecast',
    title: 'Q3 Target Achievement Forecast',
    summary: 'Based on current pipeline velocity and historical 84% win rate in negotiation stage, Vertex CRM projects $4.8M Q3 ARR (112% of goal).',
    confidence: 92,
    impact: 'medium',
    category: 'Revenue Analytics',
    actionText: 'View Executive Forecast'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Deal Moved to Contract',
    description: 'Apex Global Technologies contract ($650k) is pending final signature.',
    timestamp: '10m ago',
    read: false,
    category: 'deal'
  },
  {
    id: 'notif-2',
    title: 'AI Insights Alert',
    description: 'Hyperion BioPharma has been flagged with High Churn Risk score.',
    timestamp: '1h ago',
    read: false,
    category: 'ai'
  },
  {
    id: 'notif-3',
    title: 'Wire Payment Received',
    description: 'Invoice INV-2026-089 ($162,500) marked as Paid.',
    timestamp: '2h ago',
    read: true,
    category: 'billing'
  }
];
