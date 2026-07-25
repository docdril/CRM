import { 
  Company, Contact, Lead, Deal, Invoice, Project, Task, 
  CalendarEvent, ActivityLog, AiInsight, NotificationItem, DealStage 
} from '../types/crm';

export interface WorkspaceData {
  industryId: string;
  industryName: string;
  currencySymbol: string;
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
}

export interface ICrmRepository {
  // Workspace initialization
  loadWorkspaceData(data: WorkspaceData): void;
  getWorkspaceData(): WorkspaceData;

  // Companies / Clients
  getClients(): Company[];
  getClientById(id: string): Company | undefined;
  createClient(client: Omit<Company, 'id'>): Company;
  updateClient(id: string, updates: Partial<Company>): Company | undefined;
  deleteClient(id: string): boolean;

  // Deals
  getDeals(): Deal[];
  getDealById(id: string): Deal | undefined;
  createDeal(deal: Omit<Deal, 'id'>): Deal;
  updateDeal(id: string, updates: Partial<Deal>): Deal | undefined;
  updateDealStage(id: string, newStage: DealStage): Deal | undefined;
  deleteDeal(id: string): boolean;

  // Projects
  getProjects(): Project[];
  createProject(project: Omit<Project, 'id'>): Project;
  updateProject(id: string, updates: Partial<Project>): Project | undefined;
  deleteProject(id: string): boolean;

  // Invoices
  getInvoices(): Invoice[];
  createInvoice(invoice: Omit<Invoice, 'id'>): Invoice;
  updateInvoice(id: string, updates: Partial<Invoice>): Invoice | undefined;
  deleteInvoice(id: string): boolean;

  // Tasks
  getTasks(): Task[];
  createTask(task: Omit<Task, 'id'>): Task;
  updateTask(id: string, updates: Partial<Task>): Task | undefined;
  deleteTask(id: string): boolean;

  // Contacts & Leads
  getContacts(): Contact[];
  getLeads(): Lead[];

  // Calendar
  getCalendarEvents(): CalendarEvent[];
  createCalendarEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent;

  // Activity & Notifications
  getActivityLogs(): ActivityLog[];
  getNotifications(): NotificationItem[];
  markNotificationRead(id: string): void;
  clearNotifications(): void;
}
