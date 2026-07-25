'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Plus, Trash2, X, Edit3, CheckCircle2, Clock, 
  PauseCircle, PlayCircle, ChevronDown, Save, Calendar, DollarSign,
  TrendingUp, Building2
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency } from '../../lib/utils';
import { Project } from '../../types/crm';

type ProjectStatus = Project['status'];

const STATUS_CONFIG: Record<ProjectStatus, { label: string; icon: React.ElementType; bg: string; text: string; border: string }> = {
  in_progress: { label: 'In Progress', icon: PlayCircle,   bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200' },
  planning:    { label: 'Planning',     icon: Clock,        bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-200' },
  on_hold:     { label: 'On Hold',      icon: PauseCircle,  bg: 'bg-slate-100',  text: 'text-slate-600',  border: 'border-slate-300' },
  completed:   { label: 'Completed',    icon: CheckCircle2, bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-200' },
};

const PROGRESS_COLOR: Record<ProjectStatus, string> = {
  in_progress: 'from-brand-500 to-indigo-500',
  planning:    'from-amber-400 to-orange-500',
  on_hold:     'from-slate-400 to-slate-500',
  completed:   'from-emerald-400 to-teal-500',
};

export const ProjectsView: React.FC = () => {
  const { projects, companies, createProject, updateProject, deleteProject, currencySymbol, currentUser } = useCrmStore();
  const isReadOnly = currentUser?.tabPermissions?.projects === 'read';

  // Add Project Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [projName, setProjName]   = useState('');
  const [companyId, setCompanyId] = useState(companies[0]?.id || '');
  const [budget, setBudget]       = useState('350000');
  const [addEndDate, setAddEndDate] = useState('2026-12-31');

  // Edit Project Modal
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editName, setEditName]       = useState('');
  const [editStatus, setEditStatus]   = useState<ProjectStatus>('in_progress');
  const [editProgress, setEditProgress] = useState(0);
  const [editBudget, setEditBudget]   = useState('');
  const [editSpent, setEditSpent]     = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editCompanyId, setEditCompanyId] = useState('');

  // Status dropdown open state per card
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const openEditModal = (proj: Project) => {
    setEditProject(proj);
    setEditName(proj.name);
    setEditStatus(proj.status);
    setEditProgress(proj.progress);
    setEditBudget(String(proj.budget));
    setEditSpent(String(proj.spent));
    setEditEndDate(proj.endDate);
    setEditCompanyId(proj.companyId);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProject) return;
    const company = companies.find(c => c.id === editCompanyId);
    updateProject(editProject.id, {
      name: editName,
      status: editStatus,
      progress: editProgress,
      budget: Number(editBudget),
      spent: Number(editSpent),
      endDate: editEndDate,
      companyId: editCompanyId,
      companyName: company?.name || editProject.companyName,
    });
    setEditProject(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName) return;
    const company = companies.find(c => c.id === companyId);
    createProject({
      name: projName,
      companyId,
      companyName: company?.name || 'Apex Global Technologies',
      status: 'planning',
      progress: 0,
      budget: Number(budget),
      spent: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: addEndDate,
      owner: { name: currentUser?.name || 'Alex Vance', avatar: currentUser?.avatar || '' },
      tasksCount: 0
    });
    setProjName(''); setBudget('350000'); setIsAddOpen(false);
  };

  const handleQuickStatus = (projId: string, status: ProjectStatus) => {
    updateProject(projId, { status });
    setOpenStatusId(null);
  };

  const handleProgressChange = (projId: string, val: number) => {
    updateProject(projId, { progress: val });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1700px] mx-auto font-outfit">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">Projects &amp; Deployment Milestones</h1>
          <p className="text-xs text-slate-500 mt-0.5">Active enterprise implementation timelines and task delivery</p>
        </div>
        {!isReadOnly && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 btn-spring"
          >
            <Plus className="w-4 h-4" /> Create Project
          </button>
        )}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((proj) => {
          const sc = STATUS_CONFIG[proj.status];
          const StatusIcon = sc.icon;
          const pc = PROGRESS_COLOR[proj.status];
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-4 relative group"
            >
              {/* Top row: company tag + status dropdown + actions */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded mb-1 truncate max-w-full">
                    {proj.companyName}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug font-display">{proj.name}</h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Status quick-change dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => !isReadOnly && setOpenStatusId(openStatusId === proj.id ? null : proj.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold border transition-colors ${sc.bg} ${sc.text} ${sc.border}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                      {!isReadOnly && <ChevronDown className="w-2.5 h-2.5 ml-0.5" />}
                    </button>
                    <AnimatePresence>
                      {openStatusId === proj.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          className="absolute top-full mt-1 right-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[140px]"
                        >
                          {(Object.entries(STATUS_CONFIG) as [ProjectStatus, typeof STATUS_CONFIG[ProjectStatus]][]).map(([key, cfg]) => {
                            const Icon = cfg.icon;
                            return (
                              <button
                                key={key}
                                onClick={() => handleQuickStatus(proj.id, key)}
                                className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold hover:bg-slate-50 transition-colors ${proj.status === key ? `${cfg.text}` : 'text-slate-700'}`}
                              >
                                <Icon className="w-3.5 h-3.5" /> {cfg.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Edit button */}
                  {!isReadOnly && (
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 text-slate-300 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {/* Delete button */}
                  {!isReadOnly && (
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Milestone Progress</span>
                  <span className="text-slate-900">{proj.progress}% Completed</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                  <div
                    className={`bg-gradient-to-r ${pc} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
                {/* Interactive slider for quick progress update */}
                {!isReadOnly && (
                  <input
                    type="range"
                    min={0} max={100} step={1}
                    value={proj.progress}
                    onChange={(e) => handleProgressChange(proj.id, Number(e.target.value))}
                    className="w-full h-1 accent-brand-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Drag to update progress"
                  />
                )}
                {!isReadOnly && (
                  <p className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↕ Hover &amp; drag slider above to update progress
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold flex items-center gap-1"><DollarSign className="w-3 h-3" />Budget</span>
                  <p className="font-extrabold text-slate-900 mt-0.5">{formatCurrency(proj.budget, currencySymbol)}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" />Spent</span>
                  <p className={`font-extrabold mt-0.5 ${proj.spent > proj.budget ? 'text-rose-600' : 'text-slate-900'}`}>
                    {formatCurrency(proj.spent, currencySymbol)}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold flex items-center gap-1"><Calendar className="w-3 h-3" />Target End</span>
                  <p className="font-bold text-slate-700 mt-0.5">{proj.endDate}</p>
                </div>
              </div>

              {/* Budget usage bar */}
              {proj.budget > 0 && (
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${proj.spent > proj.budget ? 'bg-rose-400' : 'bg-emerald-400'}`}
                    style={{ width: `${Math.min(100, (proj.spent / proj.budget) * 100)}%` }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── CREATE PROJECT MODAL ── */}
      <AnimatePresence>
        {isAddOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600" /> Create New Project
                </h3>
                <button onClick={() => setIsAddOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Project Name</label>
                  <input
                    type="text" required
                    placeholder="e.g. Q4 Brand Expansion Campaign"
                    value={projName} onChange={e => setProjName(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Client Account</label>
                  <select
                    value={companyId} onChange={e => setCompanyId(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700">Budget ({currencySymbol})</label>
                    <input
                      type="number" required min={0}
                      value={budget} onChange={e => setBudget(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Target End Date</label>
                    <input
                      type="date"
                      value={addEndDate} onChange={e => setAddEndDate(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 flex items-center gap-1.5 btn-spring">
                    <Save className="w-3.5 h-3.5" /> Create Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EDIT PROJECT MODAL ── */}
      <AnimatePresence>
        {editProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-brand-600" /> Edit Project
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Update name, status, progress, budget and timeline</p>
                </div>
                <button onClick={() => setEditProject(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                {/* Project Name */}
                <div>
                  <label className="font-bold text-slate-700">Project Name</label>
                  <input
                    type="text" required
                    value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                {/* Client + Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 flex items-center gap-1"><Building2 className="w-3 h-3" />Client Account</label>
                    <select
                      value={editCompanyId} onChange={e => setEditCompanyId(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    >
                      {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Status</label>
                    <select
                      value={editStatus} onChange={e => setEditStatus(e.target.value as ProjectStatus)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    >
                      {(Object.entries(STATUS_CONFIG) as [ProjectStatus, typeof STATUS_CONFIG[ProjectStatus]][]).map(([key, cfg]) => (
                        <option key={key} value={key}>{cfg.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Progress Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="font-bold text-slate-700">Milestone Progress</label>
                    <span className="font-extrabold text-brand-600 text-sm">{editProgress}%</span>
                  </div>
                  <input
                    type="range" min={0} max={100} step={1}
                    value={editProgress} onChange={e => setEditProgress(Number(e.target.value))}
                    className="w-full accent-brand-600 h-2 cursor-pointer"
                  />
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${PROGRESS_COLOR[editStatus]} h-full rounded-full transition-all`}
                      style={{ width: `${editProgress}%` }}
                    />
                  </div>
                </div>

                {/* Budget + Spent */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700">Budget ({currencySymbol})</label>
                    <input
                      type="number" required min={0}
                      value={editBudget} onChange={e => setEditBudget(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Amount Spent ({currencySymbol})</label>
                    <input
                      type="number" required min={0}
                      value={editSpent} onChange={e => setEditSpent(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="font-bold text-slate-700">Target End Date</label>
                  <input
                    type="date"
                    value={editEndDate} onChange={e => setEditEndDate(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                  <button type="button" onClick={() => setEditProject(null)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 flex items-center gap-1.5 btn-spring">
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
