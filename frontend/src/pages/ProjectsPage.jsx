import React, { useState, useMemo } from 'react';
import { Search, FolderPlus } from 'lucide-react';
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
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
      <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5E5E5] shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#B0B0B0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or description..."
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-[#F5F5F5] border border-[#D8D8D8] rounded-lg text-[#0F0F0F] placeholder-[#B0B0B0] outline-none focus:border-[#0F0F0F]"
            />
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto text-xs bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] rounded-lg py-2 px-3 outline-none focus:border-[#0F0F0F] font-medium"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold'
                  : 'bg-[#F5F5F5] text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#EAEAEA]'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-dashed border-[#D8D8D8] rounded-2xl p-12 text-center max-w-lg mx-auto">
          <FolderPlus className="w-10 h-10 text-[#B0B0B0] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0F0F0F]">No matching projects found</h3>
          <p className="text-xs text-[#5A5A5A] mt-1 mb-4">
            Try adjusting your search criteria or create a new initiative.
          </p>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsNewProjectModalOpen(true)}
          >
            Create New Project
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
