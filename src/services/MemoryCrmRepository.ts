import { ICrmRepository, WorkspaceData } from './ICrmRepository';
import { 
  Company, Contact, Lead, Deal, Invoice, Project, Task, 
  CalendarEvent, ActivityLog, AiInsight, NotificationItem, DealStage 
} from '../types/crm';
import { generateIndustryWorkspace, IndustryType } from './demoWorkspaceGenerator';

export class MemoryCrmRepository implements ICrmRepository {
  private data: WorkspaceData;
  private listeners: Set<() => void> = new Set();

  constructor(initialIndustry: IndustryType = 'saas') {
    this.data = generateIndustryWorkspace(initialIndustry);
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public loadWorkspaceData(data: WorkspaceData): void {
    this.data = { ...data };
    this.notify();
  }

  public getWorkspaceData(): WorkspaceData {
    return this.data;
  }

  // --- CLIENTS ---
  public getClients(): Company[] {
    return this.data.companies;
  }

  public getClientById(id: string): Company | undefined {
    return this.data.companies.find((c) => c.id === id);
  }

  public createClient(clientData: Omit<Company, 'id'>): Company {
    const newClient: Company = {
      ...clientData,
      id: `comp-${Date.now()}`
    };
    this.data.companies = [newClient, ...this.data.companies];

    // Auto-create Activity log
    this.addActivity({
      timestamp: 'Just now',
      type: 'deal',
      user: { name: 'Alex Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      action: 'created new client account',
      target: newClient.name,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    });

    this.notify();
    return newClient;
  }

  public updateClient(id: string, updates: Partial<Company>): Company | undefined {
    const idx = this.data.companies.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;

    this.data.companies[idx] = { ...this.data.companies[idx], ...updates };
    this.notify();
    return this.data.companies[idx];
  }

  public deleteClient(id: string): boolean {
    const initialLength = this.data.companies.length;
    this.data.companies = this.data.companies.filter((c) => c.id !== id);
    const deleted = this.data.companies.length < initialLength;
    if (deleted) this.notify();
    return deleted;
  }

  // --- DEALS ---
  public getDeals(): Deal[] {
    return this.data.deals;
  }

  public getDealById(id: string): Deal | undefined {
    return this.data.deals.find((d) => d.id === id);
  }

  public createDeal(dealData: Omit<Deal, 'id'>): Deal {
    const newDeal: Deal = { ...dealData, id: `deal-${Date.now()}` };
    this.data.deals = [newDeal, ...this.data.deals];
    this.notify();
    return newDeal;
  }

  public updateDeal(id: string, updates: Partial<Deal>): Deal | undefined {
    const idx = this.data.deals.findIndex((d) => d.id === id);
    if (idx === -1) return undefined;
    this.data.deals[idx] = { ...this.data.deals[idx], ...updates };
    this.notify();
    return this.data.deals[idx];
  }

  public updateDealStage(id: string, newStage: DealStage): Deal | undefined {
    const deal = this.getDealById(id);
    if (!deal) return undefined;
    
    deal.stage = newStage;
    this.addActivity({
      timestamp: 'Just now',
      type: 'deal',
      user: { name: 'Alex Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      action: `advanced deal stage to ${newStage.toUpperCase().replace('_', ' ')}`,
      target: `${deal.companyName} (${deal.name})`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    });

    this.notify();
    return deal;
  }

  public deleteDeal(id: string): boolean {
    const initialLength = this.data.deals.length;
    this.data.deals = this.data.deals.filter((d) => d.id !== id);
    const deleted = this.data.deals.length < initialLength;
    if (deleted) this.notify();
    return deleted;
  }

  // --- PROJECTS ---
  public getProjects(): Project[] {
    return this.data.projects;
  }

  public createProject(projectData: Omit<Project, 'id'>): Project {
    const newProject: Project = { ...projectData, id: `proj-${Date.now()}` };
    this.data.projects = [newProject, ...this.data.projects];
    this.notify();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.data.projects[idx] = { ...this.data.projects[idx], ...updates };
    this.notify();
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initialLength = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    const deleted = this.data.projects.length < initialLength;
    if (deleted) this.notify();
    return deleted;
  }

  // --- INVOICES ---
  public getInvoices(): Invoice[] {
    return this.data.invoices;
  }

  public createInvoice(invoiceData: Omit<Invoice, 'id'>): Invoice {
    const newInvoice: Invoice = { ...invoiceData, id: `inv-${Date.now()}` };
    this.data.invoices = [newInvoice, ...this.data.invoices];
    this.notify();
    return newInvoice;
  }

  public updateInvoice(id: string, updates: Partial<Invoice>): Invoice | undefined {
    const idx = this.data.invoices.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    this.data.invoices[idx] = { ...this.data.invoices[idx], ...updates };
    this.notify();
    return this.data.invoices[idx];
  }

  public deleteInvoice(id: string): boolean {
    const initialLength = this.data.invoices.length;
    this.data.invoices = this.data.invoices.filter((i) => i.id !== id);
    const deleted = this.data.invoices.length < initialLength;
    if (deleted) this.notify();
    return deleted;
  }

  // --- TASKS ---
  public getTasks(): Task[] {
    return this.data.tasks;
  }

  public createTask(taskData: Omit<Task, 'id'>): Task {
    const newTask: Task = { ...taskData, id: `task-${Date.now()}` };
    this.data.tasks = [newTask, ...this.data.tasks];
    this.notify();
    return newTask;
  }

  public updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const idx = this.data.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    this.data.tasks[idx] = { ...this.data.tasks[idx], ...updates };
    this.notify();
    return this.data.tasks[idx];
  }

  public deleteTask(id: string): boolean {
    const initialLength = this.data.tasks.length;
    this.data.tasks = this.data.tasks.filter((t) => t.id !== id);
    const deleted = this.data.tasks.length < initialLength;
    if (deleted) this.notify();
    return deleted;
  }

  // --- CONTACTS, LEADS, CALENDAR ---
  public getContacts(): Contact[] { return this.data.contacts; }
  public getLeads(): Lead[] { return this.data.leads; }
  public getCalendarEvents(): CalendarEvent[] { return this.data.calendarEvents; }
  
  public createCalendarEvent(eventData: Omit<CalendarEvent, 'id'>): CalendarEvent {
    const newEvt: CalendarEvent = { ...eventData, id: `evt-${Date.now()}` };
    this.data.calendarEvents = [newEvt, ...this.data.calendarEvents];
    this.notify();
    return newEvt;
  }

  // --- ACTIVITY LOGS & NOTIFICATIONS ---
  public getActivityLogs(): ActivityLog[] { return this.data.activityLogs; }
  public getNotifications(): NotificationItem[] { return this.data.notifications; }

  public markNotificationRead(id: string): void {
    this.data.notifications = this.data.notifications.map((n) => n.id === id ? { ...n, read: true } : n);
    this.notify();
  }

  public clearNotifications(): void {
    this.data.notifications = [];
    this.notify();
  }

  private addActivity(act: Omit<ActivityLog, 'id'>) {
    const newAct: ActivityLog = { ...act, id: `act-${Date.now()}` };
    this.data.activityLogs = [newAct, ...this.data.activityLogs];
  }
}

// Global Singleton Instance of ICrmRepository
export const crmRepository = new MemoryCrmRepository('saas');
