'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, ShieldAlert, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';

export const NotificationsToast: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    toggleNotificationDrawer, 
    notifications, 
    markNotificationRead, 
    clearAllNotifications 
  } = useCrmStore();

  if (!isNotificationDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Notifications</h3>
              <span className="px-2 py-0.5 text-xs font-bold text-brand-700 bg-brand-50 rounded-full">
                {notifications.filter(n => !n.read).length} Unread
              </span>
            </div>
            <button
              onClick={() => toggleNotificationDrawer(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                <p className="text-sm font-semibold text-slate-700">All caught up!</p>
                <p className="text-xs">No pending notifications right now.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.read 
                      ? 'bg-slate-50/60 border-slate-100 opacity-75' 
                      : 'bg-white border-brand-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      item.category === 'deal' ? 'bg-emerald-50 text-emerald-600' :
                      item.category === 'ai' ? 'bg-purple-50 text-purple-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {item.category === 'deal' ? <DollarSign className="w-4 h-4" /> :
                       item.category === 'ai' ? <Sparkles className="w-4 h-4" /> :
                       <ShieldAlert className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-900 truncate">{item.title}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                      {!item.read && (
                        <button
                          onClick={() => markNotificationRead(item.id)}
                          className="mt-2 text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
              <button
                onClick={clearAllNotifications}
                className="text-slate-500 hover:text-slate-700 font-semibold"
              >
                Clear all
              </button>
              <span className="text-slate-400">Vertex Live Feed</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
