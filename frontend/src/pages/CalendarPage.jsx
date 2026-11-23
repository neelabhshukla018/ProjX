import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { useWorkspace } from '../hooks/useWorkspace';
import { formatDate } from '../utils/formatters';

export const CalendarPage = () => {
  const { tasks, projects } = useWorkspace();
  const [currentMonth, setCurrentMonth] = useState('November 2026');
  const [selectedDay, setSelectedDay] = useState(26);

  // November 2026 days representation
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Deadlines map
  const taskDeadlines = {
    19: ['Publish automated release notes generator'],
    20: ['Integrate biometrics FaceID / TouchID'],
    26: ['Audit WCAG AA compliance across dark & light themes'],
    28: ['Implement optimistic UI state for Kanban drag-and-drop'],
    29: ['Fine-tune streaming token responses in LLM chat UI'],
  };

  const selectedDayTasks = taskDeadlines[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Sprint & Deadline Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visual milestone timeline and scheduled task commitments.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-subtle">
          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold px-2 text-slate-800">{currentMonth}</span>
          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-card">
          <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-slate-400 mb-3 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Pad starting day (Nov 1, 2026 starts on Sun) */}
            {daysInMonth.map((day) => {
              const hasEvents = taskDeadlines[day];
              const isSelected = day === selectedDay;
              const isToday = day === 23;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`
                    min-h-[68px] sm:min-h-[80px] p-2 rounded-xl border text-left flex flex-col justify-between transition-all
                    ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/40 ring-2 ring-brand-500/20'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 bg-white'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px]'
                          : isSelected
                          ? 'text-brand-700'
                          : 'text-slate-700'
                      }`}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                    )}
                  </div>

                  {hasEvents && (
                    <div className="mt-1">
                      <span className="block text-[9px] font-semibold text-brand-700 bg-brand-100/70 px-1.5 py-0.5 rounded truncate">
                        {hasEvents[0]}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda */}
        <div className="space-y-4">
          <Card
            title={`Agenda for Nov ${selectedDay}, 2026`}
            subtitle="Scheduled deliverables and sprint meetings"
            headerBorder
          >
            {selectedDayTasks.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                No tasks scheduled on this date.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayTasks.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-brand-50/50 border border-brand-200/60 rounded-xl"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-brand-700 mb-1">
                      <span>SPRINT DEADLINE</span>
                      <span>HIGH PRIORITY</span>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-900">{t}</h5>
                    <p className="text-[11px] text-slate-500 mt-1">Apollo Design System 2.0</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Upcoming Milestones">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Mobile App V3 Review</p>
                  <p className="text-[10px] text-slate-400">Dec 05, 2026</p>
                </div>
                <Badge variant="purple" size="sm">Review</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Apollo Design System 2.0</p>
                  <p className="text-[10px] text-slate-400">Dec 15, 2026</p>
                </div>
                <Badge variant="primary" size="sm">Sprint</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
