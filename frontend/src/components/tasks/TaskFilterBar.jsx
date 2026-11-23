import React from 'react';
import { Search, Kanban, List } from 'lucide-react';

export const TaskFilterBar = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  selectedPriority,
  onPriorityChange,
  selectedProject,
  onProjectChange,
  projects = [],
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFFFF] p-3.5 rounded-xl border border-[#E5E5E5] shadow-subtle mb-6">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="w-4 h-4 text-[#B0B0B0] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter tasks by name or tag..."
          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-[#F5F5F5] border border-[#D8D8D8] text-[#0F0F0F] placeholder-[#B0B0B0] rounded-lg outline-none focus:border-[#0F0F0F]"
        />
      </div>

      {/* Filters & View Switcher */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Project Filter */}
        <select
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
          className="text-xs bg-[#FFFFFF] border border-[#D8D8D8] rounded-lg py-2 px-3 outline-none text-[#0F0F0F] font-medium focus:border-[#0F0F0F]"
        >
          <option value="all">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="text-xs bg-[#FFFFFF] border border-[#D8D8D8] rounded-lg py-2 px-3 outline-none text-[#0F0F0F] font-medium focus:border-[#0F0F0F]"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Kanban vs List Switcher */}
        <div className="flex items-center bg-[#F5F5F5] p-0.5 rounded-lg border border-[#D8D8D8]">
          <button
            type="button"
            onClick={() => onViewModeChange('kanban')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'kanban'
                ? 'bg-[#0F0F0F] text-[#FFFFFF] shadow-xs'
                : 'text-[#5A5A5A] hover:text-[#0F0F0F]'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Board</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-[#0F0F0F] text-[#FFFFFF] shadow-xs'
                : 'text-[#5A5A5A] hover:text-[#0F0F0F]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilterBar;
