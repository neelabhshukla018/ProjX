import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, FolderKanban, CheckCircle2, User } from 'lucide-react';
import Card from '../components/common/Card';
import { useWorkspace } from '../hooks/useWorkspace';
import { getPriorityBadge, getStatusBadge } from '../utils/formatters';

export const CalendarPage = () => {
  const { tasks, projects } = useWorkspace();

  const [dateState, setDateState] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());

  const currentYear = dateState.getFullYear();
  const currentMonthIdx = dateState.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthName = `${monthNames[currentMonthIdx]} ${currentYear}`;

  // Calculate days in month & starting day of week
  const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
  const startDayOfWeek = new Date(currentYear, currentMonthIdx, 1).getDay(); // 0 = Sun

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingBlanks = Array.from({ length: startDayOfWeek }, (_, i) => i);

  const prevMonth = () => {
    setDateState(new Date(currentYear, currentMonthIdx - 1, 1));
    setSelectedDay(1);
  };

  const nextMonth = () => {
    setDateState(new Date(currentYear, currentMonthIdx + 1, 1));
    setSelectedDay(1);
  };

  // Group real tasks and project deadlines by day of current month
  const itemsByDay = useMemo(() => {
    const map = {};

    // 1. Group tasks
    tasks.forEach((t) => {
      if (t.dueDate) {
        const d = new Date(t.dueDate);
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonthIdx) {
          const day = d.getDate();
          if (!map[day]) map[day] = [];
          map[day].push({
            type: 'task',
            id: t._id || t.id,
            title: t.title,
            project: t.project?.name || t.projectName || 'General',
            priority: t.priority || 'Medium',
            status: t.status || 'To Do',
            assignee: t.assignedTo?.fullName || t.assignee?.name || 'Unassigned',
          });
        }
      }
    });

    // 2. Group project milestones
    projects.forEach((p) => {
      const pDeadline = p.deadline || p.dueDate;
      if (pDeadline) {
        const d = new Date(pDeadline);
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonthIdx) {
          const day = d.getDate();
          if (!map[day]) map[day] = [];
          map[day].push({
            type: 'project',
            id: p._id || p.id,
            title: `Milestone: ${p.name}`,
            project: p.name,
            priority: 'High',
            status: p.status || 'Planning',
            assignee: p.owner?.fullName || 'Project Lead',
          });
        }
      }
    });

    return map;
  }, [tasks, projects, currentYear, currentMonthIdx]);

  const selectedDayItems = itemsByDay[selectedDay] || [];
  const today = new Date();
  const isCurrentMonthToday =
    today.getFullYear() === currentYear && today.getMonth() === currentMonthIdx;
  const todayDate = today.getDate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Sprint & Deadline Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            Visual milestone timeline and scheduled task commitments from your active sprints.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-1 shadow-subtle">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold px-3 text-[#0F0F0F] min-w-[120px] text-center">
            {currentMonthName}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
            title="Next Month"
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
            {/* Blank offset days */}
            {leadingBlanks.map((b) => (
              <div key={`blank-${b}`} className="min-h-[52px] sm:min-h-[80px] p-2 rounded-xl bg-[#FAFAFA]/50 border border-transparent" />
            ))}

            {daysArray.map((day) => {
              const dayItems = itemsByDay[day] || [];
              const hasEvents = dayItems.length > 0;
              const isSelected = day === selectedDay;
              const isToday = isCurrentMonthToday && day === todayDate;

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
                      <div className="hidden sm:block text-[9px] font-semibold text-[#0F0F0F] bg-[#EAEAEA] rounded px-1 py-0.5 truncate">
                        {dayItems[0].title}
                      </div>
                      {dayItems.length > 1 && (
                        <span className="text-[8px] text-[#5A5A5A] font-bold block mt-0.5">
                          +{dayItems.length - 1} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda Side Card */}
        <div className="space-y-4">
          <Card
            title={`Deliverables: ${monthNames[currentMonthIdx]} ${selectedDay}, ${currentYear}`}
            subtitle={`${selectedDayItems.length} active commitment(s) due`}
            headerBorder
          >
            {selectedDayItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#888888] italic">
                <Clock className="w-8 h-8 text-[#CCCCCC] mx-auto mb-2" />
                No sprint deliverables or project deadlines scheduled for this day.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayItems.map((item) => {
                  const priorityBadge = getPriorityBadge(item.priority);
                  const statusBadge = getStatusBadge(item.status);

                  return (
                    <div
                      key={item.id}
                      className="p-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#0F0F0F] leading-tight">
                          {item.title}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded border shrink-0 ${priorityBadge.bg || 'bg-gray-100'}`}
                        >
                          {item.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#5A5A5A]">
                        <span className="flex items-center gap-1 font-medium">
                          <FolderKanban className="w-3 h-3 text-[#0F0F0F]" />
                          {item.project}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-semibold border ${statusBadge.bg || 'bg-gray-100'}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-[#888888]">
                        <User className="w-3 h-3" />
                        <span>{item.assignee}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Quick Month Summary */}
          <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl text-xs space-y-2 shadow-subtle">
            <h4 className="font-bold text-[#0F0F0F]">Monthly Sprint Adherence</h4>
            <div className="flex justify-between text-[#5A5A5A]">
              <span>Scheduled Items This Month:</span>
              <span className="font-bold text-[#0F0F0F]">
                {Object.values(itemsByDay).reduce((acc, items) => acc + items.length, 0)}
              </span>
            </div>
            <div className="flex justify-between text-[#5A5A5A]">
              <span>Completed Tasks:</span>
              <span className="font-bold text-[#0F0F0F]">
                {tasks.filter((t) => t.status === 'Completed').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
