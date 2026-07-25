'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users, Plus, CheckCircle2 } from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';

export const CalendarView: React.FC = () => {
  const { calendarEvents } = useCrmStore();

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-[1700px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Calendar & Executive Meetings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized Google Calendar schedule & client demo sessions
          </p>
        </div>
        <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Schedule Client Demo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agenda Events */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Today&apos;s Schedule (July 24, 2026)</h3>
          {calendarEvents.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 font-bold text-xs">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{evt.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5" /> 3:00 PM - 4:00 PM (EDT)
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {evt.type}
                </span>
              </div>

              {evt.summary && (
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {evt.summary}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold">Attendees:</span>
                  <div className="flex -space-x-2">
                    {evt.attendees.map((att, i) => (
                      <img key={i} src={att.avatar} alt={att.name} className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                </div>
                {evt.meetingUrl && (
                  <a
                    href={evt.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    Join Video Call
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Month View Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900">July 2026</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-700">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <div
                key={d}
                className={`py-2 rounded-lg ${
                  d === 24 ? 'bg-slate-900 text-white shadow-md' : 'hover:bg-slate-100'
                }`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
