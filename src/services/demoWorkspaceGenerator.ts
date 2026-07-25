import { WorkspaceData } from './ICrmRepository';
import { Company, Contact, Lead, Deal, Invoice, Project, Task, CalendarEvent, ActivityLog, AiInsight, NotificationItem } from '../types/crm';

export type IndustryType = 'saas' | 'agency' | 'fintech' | 'construction' | 'biotech' | 'logistics';

export const INDUSTRY_OPTIONS: { id: IndustryType; name: string; iconName: string; desc: string; sampleMetrics: string }[] = [
  {
    id: 'saas',
    name: 'Enterprise Cloud SaaS',
    iconName: 'Cloud',
    desc: 'B2B Software, Annual Recurring Revenue (ARR), seat expansions, and SLA governance.',
    sampleMetrics: '$14.2M ARR • 42 Enterprise Accounts'
  },
  {
    id: 'agency',
    name: 'Marketing & Creative Agency',
    iconName: 'Flame',
    desc: '360° Brand Campaigns, Media Retainers, IPL Sponsorships, and Content Production.',
    sampleMetrics: '₹12.4 Cr Retainers • 38 Brand Clients'
  },
  {
    id: 'fintech',
    name: 'FinTech & Core Banking',
    iconName: 'CreditCard',
    desc: 'Fraud detection engines, transaction processing pipelines, and regulatory compliance.',
    sampleMetrics: '$88M Managed Vol • 24 Banking Partners'
  },
  {
    id: 'construction',
    name: 'Construction & Real Estate',
    iconName: 'Building',
    desc: 'Urban towers, metro infrastructure, contractor purchase orders, and site milestones.',
    sampleMetrics: '₹45 Cr Site Budget • 14 Active Projects'
  },
  {
    id: 'biotech',
    name: 'BioPharma & Healthcare',
    iconName: 'Activity',
    desc: 'Clinical trial analytics, FDA regulatory tracking, lab equipment licenses.',
    sampleMetrics: '$145M R&D Vol • 18 Clinical Labs'
  },
  {
    id: 'logistics',
    name: 'Supply Chain & Logistics',
    iconName: 'Truck',
    desc: 'Autonomous fleet tracking, cross-border freight routes, and warehouse robotics.',
    sampleMetrics: '$110M Freight Vol • 52 Route Hubs'
  }
];

export function generateIndustryWorkspace(industry: IndustryType): WorkspaceData {
  switch (industry) {
    case 'agency':
      return generateAgencyWorkspace();
    case 'construction':
      return generateConstructionWorkspace();
    case 'fintech':
      return generateFintechWorkspace();
    case 'biotech':
      return generateBiotechWorkspace();
    case 'logistics':
      return generateLogisticsWorkspace();
    case 'saas':
    default:
      return generateSaasWorkspace();
  }
}

// -------------------------------------------------------------
// 1. MARKETING AGENCY WORKSPACE (INR Currency)
// -------------------------------------------------------------
function generateAgencyWorkspace(): WorkspaceData {
  const symbol = '₹';

  const companies: Company[] = [
    {
      id: 'comp-ag-1',
      name: 'Nike Global South Asia',
      domain: 'nike.in',
      industry: 'Sports & Retail Marketing',
      revenue: 85000000,
      employeeCount: 450,
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
      status: 'active',
      owner: { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', role: 'Group Creative Director' },
      growthRate: 42.5,
      relationshipScore: 98,
      riskScore: 'Low',
      salesPrediction: { potentialValue: 12000000, upsellOpportunity: 'IPL 2027 Digital Takeover', winProbability: 95 },
      address: 'Bandra Kurla Complex, Mumbai, MH 400051',
      phone: '+91 22 6789 0011',
      email: 'brand@nike.in',
      createdAt: '2024-01-10',
      tags: ['Tier 1 Retainer', 'Global Brand', 'IPL Media'],
      notesCount: 18,
      dealsCount: 4,
      activeProjectsCount: 3
    },
    {
      id: 'comp-ag-2',
      name: 'Zomato Live & Media',
      domain: 'zomato.com',
      industry: 'FoodTech & Experiential Events',
      revenue: 120000000,
      employeeCount: 2200,
      logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
      status: 'active',
      owner: { name: 'Rahul Kapoor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', role: 'Brand Strategy Head' },
      growthRate: 38.0,
      relationshipScore: 92,
      riskScore: 'Low',
      salesPrediction: { potentialValue: 8500000, upsellOpportunity: 'Zomaland Season 5 National Tour', winProbability: 90 },
      address: 'DLF Cyber City, Gurugram, HR 122002',
      phone: '+91 124 455 9900',
      email: 'marketing@zomato.com',
      createdAt: '2023-11-05',
      tags: ['Experiential', 'High Growth', 'Quarterly Campaign'],
      notesCount: 29,
      dealsCount: 5,
      activeProjectsCount: 4
    }
  ];

  const deals: Deal[] = [
    {
      id: 'deal-ag-1',
      name: 'IPL 2027 360° Digital & OOH Campaign',
      companyId: 'comp-ag-1',
      companyName: 'Nike Global South Asia',
      amount: 15000000,
      stage: 'contract',
      probability: 90,
      owner: { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
      priority: 'urgent',
      tags: ['IPL 2027', 'OOH', 'Social Takeover'],
      closeDate: '2026-08-30',
      nextActivity: 'Celebrity Athlete Shoot Script Approval',
      aiScore: 96
    },
    {
      id: 'deal-ag-2',
      name: 'Zomaland Fest Experiential Stalls & Influencer Hub',
      companyId: 'comp-ag-2',
      companyName: 'Zomato Live & Media',
      amount: 8500000,
      stage: 'negotiation',
      probability: 80,
      owner: { name: 'Rahul Kapoor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
      priority: 'high',
      tags: ['Experiential', 'Influencers'],
      closeDate: '2026-09-15',
      nextActivity: 'Budget & Stage Design Review',
      aiScore: 89
    }
  ];

  const projects: Project[] = [
    {
      id: 'proj-ag-1',
      name: 'Nike Monsoon Marathon Commercial & CGI Video',
      companyId: 'comp-ag-1',
      companyName: 'Nike Global South Asia',
      status: 'in_progress',
      progress: 65,
      budget: 4500000,
      spent: 3100000,
      startDate: '2026-06-01',
      endDate: '2026-08-20',
      owner: { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
      tasksCount: 28
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'inv-ag-1',
      invoiceNumber: 'INV-MKT-001',
      companyId: 'comp-ag-1',
      companyName: 'Nike Global South Asia',
      amount: 2500000,
      status: 'paid',
      issueDate: '2026-07-01',
      dueDate: '2026-07-31',
      items: [{ id: 'item-1', description: 'Monsoon Campaign Pre-Production Retainer', quantity: 1, unitPrice: 2500000, amount: 2500000 }]
    }
  ];

  return buildWorkspaceData('agency', 'Marketing & Creative Agency', symbol, companies, deals, projects, invoices);
}

// -------------------------------------------------------------
// 2. CONSTRUCTION WORKSPACE
// -------------------------------------------------------------
function generateConstructionWorkspace(): WorkspaceData {
  const symbol = '₹';
  const companies: Company[] = [
    {
      id: 'comp-cn-1',
      name: 'DLF Cyber City Developers',
      domain: 'dlf.in',
      industry: 'Urban Commercial Real Estate',
      revenue: 450000000,
      employeeCount: 6500,
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=1200&auto=format&fit=crop&q=80',
      status: 'active',
      owner: { name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', role: 'Chief Project Officer' },
      growthRate: 22.4,
      relationshipScore: 94,
      riskScore: 'Low',
      salesPrediction: { potentialValue: 50000000, upsellOpportunity: 'Phase 5 Steel & Glass Facade Contract', winProbability: 92 },
      address: 'DLF Gateway Tower, Gurugram, HR 122002',
      phone: '+91 124 235 6000',
      email: 'projects@dlf.in',
      createdAt: '2023-04-12',
      tags: ['Mega Tower', 'Steel Structural', 'Government Approved'],
      notesCount: 34,
      dealsCount: 6,
      activeProjectsCount: 5
    }
  ];

  const deals: Deal[] = [
    {
      id: 'deal-cn-1',
      name: 'Cyber Park Tower 4 Structural Steel & Foundation',
      companyId: 'comp-cn-1',
      companyName: 'DLF Cyber City Developers',
      amount: 45000000,
      stage: 'proposal',
      probability: 75,
      owner: { name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
      priority: 'urgent',
      tags: ['Foundation', 'Heavy Steel'],
      closeDate: '2026-09-30',
      nextActivity: 'Architectural Blueprint Structural Review',
      aiScore: 88
    }
  ];

  const projects: Project[] = [
    {
      id: 'proj-cn-1',
      name: 'Gurugram Metro Phase 4 Elevated Viaduct',
      companyId: 'comp-cn-1',
      companyName: 'DLF Cyber City Developers',
      status: 'in_progress',
      progress: 52,
      budget: 120000000,
      spent: 62000000,
      startDate: '2026-01-15',
      endDate: '2027-06-30',
      owner: { name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
      tasksCount: 142
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'inv-cn-1',
      invoiceNumber: 'INV-CON-882',
      companyId: 'comp-cn-1',
      companyName: 'DLF Cyber City Developers',
      amount: 15000000,
      status: 'pending',
      issueDate: '2026-07-10',
      dueDate: '2026-08-10',
      items: [{ id: 'item-1', description: 'Concrete & Steel Piling Milestone 2', quantity: 1, unitPrice: 15000000, amount: 15000000 }]
    }
  ];

  return buildWorkspaceData('construction', 'Construction & Real Estate', symbol, companies, deals, projects, invoices);
}

// -------------------------------------------------------------
// 3. FINTECH WORKSPACE
// -------------------------------------------------------------
function generateFintechWorkspace(): WorkspaceData {
  return generateSaasWorkspace('fintech', 'FinTech & Core Banking');
}

// -------------------------------------------------------------
// 4. BIOTECH WORKSPACE
// -------------------------------------------------------------
function generateBiotechWorkspace(): WorkspaceData {
  return generateSaasWorkspace('biotech', 'BioPharma & Healthcare');
}

// -------------------------------------------------------------
// 5. LOGISTICS WORKSPACE
// -------------------------------------------------------------
function generateLogisticsWorkspace(): WorkspaceData {
  return generateSaasWorkspace('logistics', 'Supply Chain & Logistics');
}

// -------------------------------------------------------------
// 6. DEFAULT SAAS WORKSPACE ($ Currency)
// -------------------------------------------------------------
function generateSaasWorkspace(id: IndustryType = 'saas', name: string = 'Enterprise Cloud SaaS'): WorkspaceData {
  const symbol = '$';
  const companies: Company[] = [
    {
      id: 'comp-saas-1',
      name: 'Apex Global Technologies',
      domain: 'apexglobal.io',
      industry: name,
      revenue: 42500000,
      employeeCount: 1250,
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      status: 'active',
      owner: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', role: 'Enterprise VP' },
      growthRate: 34.2,
      relationshipScore: 96,
      riskScore: 'Low',
      salesPrediction: { potentialValue: 850000, upsellOpportunity: 'Multi-Region Data Governance', winProbability: 92 },
      address: '100 Montgomery St, San Francisco, CA',
      phone: '+1 (415) 892-3011',
      email: 'contact@apexglobal.io',
      createdAt: '2023-01-15',
      tags: ['Tier 1', 'Annual Contract'],
      notesCount: 24,
      dealsCount: 4,
      activeProjectsCount: 3
    }
  ];

  const deals: Deal[] = [
    {
      id: 'deal-saas-1',
      name: 'Enterprise Cloud Migration Suite',
      companyId: 'comp-saas-1',
      companyName: 'Apex Global Technologies',
      amount: 650000,
      stage: 'contract',
      probability: 90,
      owner: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      priority: 'urgent',
      tags: ['Cloud', 'Q3 Target'],
      closeDate: '2026-08-15',
      nextActivity: 'Legal Review & Compliance Sign-off',
      aiScore: 94
    }
  ];

  const projects: Project[] = [
    {
      id: 'proj-saas-1',
      name: 'Multi-Region Deployment Matrix',
      companyId: 'comp-saas-1',
      companyName: 'Apex Global Technologies',
      status: 'in_progress',
      progress: 78,
      budget: 250000,
      spent: 195000,
      startDate: '2026-05-10',
      endDate: '2026-09-15',
      owner: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      tasksCount: 34
    }
  ];

  const invoices: Invoice[] = [
    {
      id: 'inv-saas-1',
      invoiceNumber: 'INV-2026-089',
      companyId: 'comp-saas-1',
      companyName: 'Apex Global Technologies',
      amount: 162500,
      status: 'paid',
      issueDate: '2026-07-01',
      dueDate: '2026-07-31',
      items: [{ id: 'item-1', description: 'Enterprise License Platform', quantity: 1, unitPrice: 162500, amount: 162500 }]
    }
  ];

  return buildWorkspaceData(id, name, symbol, companies, deals, projects, invoices);
}

// Helper builder
function buildWorkspaceData(
  industryId: string,
  industryName: string,
  currencySymbol: string,
  companies: Company[],
  deals: Deal[],
  projects: Project[],
  invoices: Invoice[]
): WorkspaceData {
  return {
    industryId,
    industryName,
    currencySymbol,
    companies,
    deals,
    projects,
    invoices,
    contacts: [
      {
        id: 'cnt-gen-1',
        name: 'Dr. Evelyn Reed',
        email: `e.reed@${companies[0].domain}`,
        phone: '+1 (415) 555-0192',
        role: 'Chief Technology Officer',
        companyId: companies[0].id,
        companyName: companies[0].name,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        status: 'active',
        leadScore: 98,
        lastContacted: '2 hours ago',
        location: 'San Francisco, CA'
      }
    ],
    leads: [
      {
        id: 'lead-gen-1',
        name: 'Alexander Wright',
        company: 'Quantum Dynamics Inc',
        email: 'awright@quantumdyn.io',
        phone: '+1 (650) 443-8822',
        title: 'VP of Architecture',
        value: 520000,
        status: 'qualified',
        source: 'linkedin',
        score: 91,
        assignedTo: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
        stage: 'Discovery Completed',
        tags: ['High Intent'],
        dateAdded: '2026-07-20'
      }
    ],
    tasks: [
      {
        id: 'task-gen-1',
        title: `Finalize ${companies[0].name} SLA Agreement`,
        dueDate: '2026-07-28',
        priority: 'high',
        status: 'in_progress',
        assignedTo: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
        category: 'Legal Review',
        relatedTo: companies[0].name
      }
    ],
    calendarEvents: [
      {
        id: 'evt-gen-1',
        title: `Executive Sync — ${companies[0].name}`,
        start: '2026-07-24T15:00:00.000Z',
        end: '2026-07-24T16:00:00.000Z',
        type: 'review',
        attendees: [
          { name: 'Dr. Evelyn Reed', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' }
        ],
        location: 'Vertex Executive Room',
        meetingUrl: 'https://meet.google.com/vtx-crm-demo'
      }
    ],
    activityLogs: [
      {
        id: 'act-gen-1',
        timestamp: 'Just now',
        type: 'deal',
        user: { name: 'Alex Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
        action: `generated ${industryName} workspace`,
        target: companies[0].name,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      }
    ],
    aiInsights: [
      {
        id: 'ai-gen-1',
        type: 'opportunity',
        title: `${industryName} Expansion Velocity`,
        summary: `Vertex AI detected high product adoption across ${companies[0].name}. Recommend scheduling executive review.`,
        confidence: 94,
        impact: 'high',
        category: 'Expansion Revenue',
        actionText: 'Generate Executive Proposal'
      }
    ],
    notifications: [
      {
        id: 'notif-gen-1',
        title: `${industryName} Demo Ready`,
        description: `Workspace populated with ${companies.length} clients and ${deals.length} active opportunities.`,
        timestamp: '1m ago',
        read: false,
        category: 'ai'
      }
    ]
  };
}
