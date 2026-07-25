import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, symbol: string = '$'): string {
  if (amount >= 10_000_000 && symbol === '₹') {
    return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000 && symbol === '₹') {
    return `₹${(amount / 100_000).toFixed(1)} Lakh`;
  }
  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(0)}k`;
  }
  return `${symbol}${amount.toLocaleString()}`;
}

export function formatFullCurrency(amount: number, symbol: string = '$'): string {
  if (symbol === '₹') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStageBadgeStyle(stage: string): string {
  switch (stage) {
    case 'qualification':
      return 'bg-blue-50 text-blue-700 border-blue-200/80';
    case 'proposal':
      return 'bg-purple-50 text-purple-700 border-purple-200/80';
    case 'negotiation':
      return 'bg-amber-50 text-amber-700 border-amber-200/80';
    case 'contract':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    case 'closed_won':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    case 'closed_lost':
      return 'bg-rose-50 text-rose-700 border-rose-200/80';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function getStatusBadgeStyle(status: string): string {
  switch (status) {
    case 'active':
    case 'paid':
    case 'qualified':
    case 'completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    case 'pending':
    case 'in_progress':
    case 'contacted':
      return 'bg-amber-50 text-amber-700 border-amber-200/80';
    case 'overdue':
    case 'churn_risk':
    case 'unqualified':
      return 'bg-rose-50 text-rose-700 border-rose-200/80';
    case 'draft':
    case 'prospect':
    case 'new':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}
