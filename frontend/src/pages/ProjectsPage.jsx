import React, { useState, useMemo } from 'react';
import { Search, Plus, FolderPlus, Filter } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import ProjectCard from '../components/projects/ProjectCard';
import Button from '../components/common/Button';

export const ProjectsPage = () => {
  const { projects, setIsNewProjectModalOpen } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Design System',
    'Infrastructure',
    'Mobile',
    'AI & ML',
    'Web App',
    'Security',
  ];

  const statuses = [
    { label: 'All Projects', value: 'all' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Review', value: 'Review' },
    { label: 'Planning', value: 'Planning' },
    { label: 'Completed', value: 'Completed' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, searchQuery, selectedStatus, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track active initiatives, milestone progress, and cross-functional teams.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={FolderPlus}
          onClick={() => setIsNewProjectModalOpen(true)}
        >
          New Project
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or description..."
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg py-2 px-3 outline-none text-slate-700 font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100">
          {statuses.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setSelectedStatus(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === tab.value
                  ? 'bg-brand-50 text-brand-700 border border-brand-200/80'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
          <FolderPlus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            No projects found
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search query or filter tags to discover other projects.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
