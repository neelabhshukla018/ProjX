import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export const CalendarPage = () => {
  const [currentMonth] = useState('November 2026');
  const [selectedDay, setSelectedDay] = useState(26);

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Sprint & Deadline Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            Visual milestone timeline and scheduled task commitments.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-1 shadow-subtle">
          <button
            type="button"
            className="p-1.5 rounded-lg text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold px-2 text-[#0F0F0F]">{currentMonth}</span>
          <button
            type="button"
            className="p-1.5 rounded-lg text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-5 shadow-card">
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-[#B0B0B0] mb-3 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
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
                    min-h-[52px] sm:min-h-[80px] p-1.5 sm:p-2 rounded-xl border text-left flex flex-col justify-between transition-all
                    ${
                      isSelected
                        ? 'border-[#0F0F0F] bg-[#F5F5F5] ring-2 ring-[#0F0F0F]/20'
                        : 'border-[#E5E5E5] hover:border-[#B0B0B0] hover:bg-[#FAFAFA] bg-[#FFFFFF]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-[#0F0F0F] text-white flex items-center justify-center text-[10px]'
                          : isSelected
                          ? 'text-[#0F0F0F] font-extrabold'
                          : 'text-[#2C2C2C]'
                      }`}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F]" />
                    )}
                  </div>

                  {hasEvents && (
                    <div className="mt-1">
                      <span className="block text-[9px] font-semibold text-[#0F0F0F] bg-[#F5F5F5] border border-[#D8D8D8] px-1.5 py-0.5 rounded truncate">
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
            subtitle="Scheduled deliverables and sprint commitments"
            headerBorder
          >
            {selectedDayTasks.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#B0B0B0]">
                <Clock className="w-8 h-8 text-[#D8D8D8] mx-auto mb-2" />
                No tasks scheduled on this date.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayTasks.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F5F5F5] border border-[#D8D8D8] rounded-xl"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#0F0F0F] mb-1">
                      <span className="text-[#0F0F0F]">SPRINT COMMITMENT</span>
                      <span>HIGH PRIORITY</span>
                    </div>
                    <h5 className="text-xs font-semibold text-[#0F0F0F]">{t}</h5>
                    <p className="text-[11px] text-[#5A5A5A] mt-1">Apollo Design System 2.0</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Upcoming Milestones">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F5F5] border border-[#E5E5E5]">
                <div>
                  <p className="font-semibold text-[#0F0F0F]">Mobile App V3 Review</p>
                  <p className="text-[10px] text-[#5A5A5A]">Dec 05, 2026</p>
                </div>
                <Badge variant="silver" size="sm">Review</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F5F5] border border-[#E5E5E5]">
                <div>
                  <p className="font-semibold text-[#0F0F0F]">Apollo Design System 2.0</p>
                  <p className="text-[10px] text-[#5A5A5A]">Dec 15, 2026</p>
                </div>
                <Badge variant="dark" size="sm">Sprint</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
