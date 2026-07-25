'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Building, Upload, X, Check, Camera, Lock } from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';

export const UserProfileModal: React.FC = () => {
  const { currentUser, updateCurrentUser, isUserProfileModalOpen, toggleUserProfileModal } = useCrmStore();

  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [email, setEmail] = useState(currentUser.email);
  const [department, setDepartment] = useState(currentUser.department);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  // Sync state whenever currentUser changes (e.g. when switching personas to Marcus Chen or Sarah Jenkins)
  useEffect(() => {
    setName(currentUser.name);
    setRole(currentUser.role);
    setEmail(currentUser.email);
    setDepartment(currentUser.department);
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  if (!isUserProfileModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        setAvatar(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      role,
      email,
      department,
      avatar
    });
    toggleUserProfileModal(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm font-outfit">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-brand-300">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold font-display">Active User Persona Profile</h3>
                <p className="text-[11px] text-slate-400">Viewing credentials for {currentUser.name}</p>
              </div>
            </div>
            <button
              onClick={() => toggleUserProfileModal(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Persona Notice */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs font-outfit">
              <div className="flex items-center gap-2 font-semibold">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Persona: <strong className="font-extrabold">{currentUser.name}</strong></span>
              </div>
              <span className="font-extrabold uppercase bg-amber-200/60 px-2 py-0.5 rounded text-[10px] font-display">
                {currentUser.userRole}
              </span>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="relative group">
                <img src={avatar} alt={name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" />
                <label className="absolute inset-0 rounded-2xl bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white">
                  <Camera className="w-5 h-5" />
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm font-display">{name}</p>
                <p className="text-xs text-slate-500 font-semibold">{role}</p>
                <label className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-brand-600 cursor-pointer hover:underline">
                  <Upload className="w-3 h-3" /> Change Profile Picture
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 font-display">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 font-display">Job Title / Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 font-display">Department</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 font-display">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => toggleUserProfileModal(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 font-display"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all btn-spring flex items-center gap-1.5 font-display"
              >
                <Check className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
