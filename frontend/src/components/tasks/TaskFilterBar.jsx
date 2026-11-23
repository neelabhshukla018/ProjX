import React from 'react';
import { Search, Kanban, List, Filter } from 'lucide-react';
import Button from '../common/Button';

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-subtle mb-6">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter tasks by name or tag..."
          className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20"
        />
      </div>

      {/* Filters & View Switcher */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Project Filter */}
        <select
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
          className="text-xs bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none text-slate-700 font-medium"
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
          className="text-xs bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none text-slate-700 font-medium"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Kanban vs List Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => onViewModeChange('kanban')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'kanban'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
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
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
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
