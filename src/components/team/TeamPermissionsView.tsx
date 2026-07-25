'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ShieldCheck, Lock, Eye, EyeOff, UserPlus, 
  CheckCircle2, AlertCircle, Key, RefreshCw, X, Sparkles, Link, Copy, Check 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { PermissionLevel, UserProfile } from '../../types/crm';

const MODULES: { id: string; label: string }[] = [
  { id: 'dashboard', label: 'Executive Dashboard' },
  { id: 'pipeline', label: 'Deals & Pipeline' },
  { id: 'clients', label: 'Client Accounts' },
  { id: 'contacts', label: 'Contacts & Leads' },
  { id: 'invoices', label: 'Invoices & Billing' },
  { id: 'projects', label: 'Projects & Tasks' },
  { id: 'calendar', label: 'Calendar Schedule' },
  { id: 'analytics', label: 'Analytics & BI' },
  { id: 'settings', label: 'Enterprise Settings' }
];

export const TeamPermissionsView: React.FC = () => {
  const { teamMembers, currentUser, switchActiveUser, updateTeamMemberPermissions, addTeamMember } = useCrmStore();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Member Form
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('Account Executive');
  const [emailInput, setEmailInput] = useState('');
  const [userRoleInput, setUserRoleInput] = useState<'admin' | 'manager' | 'member'>('member');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput || !emailInput) return;

    addTeamMember({
      name: nameInput,
      role: roleInput,
      email: emailInput,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
      department: 'Sales & Ops',
      userRole: userRoleInput,
      tabPermissions: {
        dashboard: 'full',
        pipeline: 'full',
        clients: 'full',
        contacts: 'full',
        invoices: userRoleInput === 'admin' ? 'full' : 'read',
        projects: 'full',
        calendar: 'full',
        analytics: userRoleInput === 'admin' ? 'full' : 'read',
        settings: userRoleInput === 'admin' ? 'full' : 'none',
        team: userRoleInput === 'admin' ? 'full' : 'none'
      }
    });

    setNameInput('');
    setEmailInput('');
    setIsAddUserModalOpen(false);
  };

  const copyDemoLink = (memberId: string) => {
    switchActiveUser(memberId);
    setCopiedId(memberId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-[1700px] mx-auto font-outfit">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">Team Governance & Role Permissions (RBAC)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Enterprise Governance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assign granular module-level access (Full Access, Read Only, No Access) and generate shareable demo links.
          </p>
        </div>

        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all btn-spring shadow-sm flex items-center gap-2 font-display"
        >
          <UserPlus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {/* Live Persona Switcher Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover border-2 border-brand-400 shrink-0" />
          <div>
            <p className="text-xs text-brand-300 uppercase tracking-widest font-extrabold">Active User Persona</p>
            <h3 className="text-base font-extrabold text-white font-display">
              {currentUser.name} <span className="text-xs text-slate-300 font-normal">({currentUser.role})</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 hidden lg:inline font-outfit">Switch Persona:</span>
          <div className="flex flex-wrap gap-2">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => switchActiveUser(member.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-display flex items-center gap-1.5 ${
                  currentUser.id === member.id
                    ? 'bg-brand-500 text-white shadow-md ring-2 ring-brand-300'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                {member.name} ({member.userRole})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Permission Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 font-display">Module Permission Matrix & Demo Links</h2>
          <p className="text-xs text-slate-400">Click &apos;Share Demo Link&apos; to switch personas live</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 font-display text-slate-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Team Member</th>
                  <th className="p-4">System Role</th>
                  <th className="p-4 text-center">Demo Link</th>
                  {MODULES.map((mod) => (
                    <th key={mod.id} className="p-4 text-center min-w-[120px]">{mod.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-outfit">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* User */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 font-display">{member.name}</p>
                          <p className="text-[10px] text-slate-400">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase font-display ${
                        member.userRole === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        member.userRole === 'manager' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {member.userRole}
                      </span>
                    </td>

                    {/* Share Demo Link Button */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => copyDemoLink(member.id)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 mx-auto font-display"
                        title="Switch & Test Persona"
                      >
                        {copiedId === member.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Link className="w-3 h-3 text-brand-600" />}
                        {copiedId === member.id ? 'Switched!' : 'Demo Link'}
                      </button>
                    </td>

                    {/* Module Permissions Dropdowns */}
                    {MODULES.map((mod) => {
                      const level = member.tabPermissions[mod.id] || 'none';
                      return (
                        <td key={mod.id} className="p-3 text-center">
                          <select
                            value={level}
                            onChange={(e) => updateTeamMemberPermissions(member.id, mod.id, e.target.value as PermissionLevel)}
                            className={`w-full text-[11px] font-bold rounded-lg p-1.5 border focus:outline-none cursor-pointer ${
                              level === 'full' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                              level === 'read' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                              'bg-slate-100 text-slate-400 border-slate-200'
                            }`}
                          >
                            <option value="full">Full Access</option>
                            <option value="read">Read Only</option>
                            <option value="none">No Access</option>
                          </select>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm font-outfit">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">Add Team Member</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Job Role / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior AE"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="elena@vertex.io"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">System Role Level</label>
                <select
                  value={userRoleInput}
                  onChange={(e) => setUserRoleInput(e.target.value as any)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  <option value="member">Team Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl hover:bg-brand-700 font-display"
                >
                  Add Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
