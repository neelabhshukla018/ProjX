import React, { useState, useMemo } from 'react';
import { Search, FolderPlus, Compass, Layers } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';
import Button from '../components/common/Button';

export const ProjectsPage = () => {
  const { projects, allProjects, user, setIsNewProjectModalOpen } = useWorkspace();
  const [activeTab, setActiveTab] = useState('all'); // 'all' (explore) or 'my'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);

  const statuses = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Recruiting', value: 'Recruiting' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Planning', value: 'Planning' },
    { label: 'Completed', value: 'Completed' },
  ];

  // If user is PM, their primary list is `projects` (owned projects)
  // If user is TM, 'all' tab shows `allProjects` (explore) and 'my' tab shows `projects` (accepted projects)
  const currentPool = useMemo(() => {
    if (user?.role === 'project_manager') {
      return projects;
    }
    return activeTab === 'my' ? projects : allProjects;
  }, [user, activeTab, projects, allProjects]);

  const filteredProjects = useMemo(() => {
    return currentPool.filter((project) => {
      const name = project.name || '';
      const desc = project.description || '';
      const skills = (project.requiredSkills || []).join(' ');

      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skills.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [currentPool, searchQuery, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            {user?.role === 'project_manager' ? 'Project Management' : 'Projects Hub'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            {user?.role === 'project_manager'
              ? 'Create, manage, and review team applications across your project portfolio.'
              : 'Explore open projects, express interest to collaborate, and track accepted initiatives.'}
          </p>
        </div>

        {user?.role === 'project_manager' && (
          <Button
            variant="primary"
            leftIcon={FolderPlus}
            onClick={() => setIsNewProjectModalOpen(true)}
          >
            New Project
          </Button>
        )}
      </div>

      {/* Tabs for Team Members: Explore Projects vs My Projects */}
      {user?.role === 'team_member' && (
        <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-2 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-[#0F0F0F] text-white'
                : 'text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5]'
            }`}
          >
            <Compass className="w-4 h-4" /> Explore Projects ({allProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('my')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'my'
                ? 'bg-[#0F0F0F] text-white'
                : 'text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5]'
            }`}
          >
            <Layers className="w-4 h-4" /> My Projects ({projects.length})
          </button>
        </div>
      )}

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
              placeholder="Search by project title, description, or required skills..."
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
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-dashed border-[#D8D8D8] rounded-2xl p-12 text-center max-w-lg mx-auto">
          <FolderPlus className="w-10 h-10 text-[#B0B0B0] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0F0F0F]">
            {user?.role === 'team_member' && activeTab === 'my'
              ? 'No accepted projects yet'
              : 'No matching projects found'}
          </h3>
          <p className="text-xs text-[#5A5A5A] mt-1 mb-4">
            {user?.role === 'team_member' && activeTab === 'my'
              ? 'Explore open initiatives and click "Interested" to apply for project roles.'
              : user?.role === 'project_manager'
              ? 'Click below to publish your first collaborative project initiative.'
              : 'Try adjusting your search keywords or status filter.'}
          </p>
          {user?.role === 'project_manager' ? (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsNewProjectModalOpen(true)}
            >
              Create New Project
            </Button>
          ) : activeTab === 'my' ? (
            <Button size="sm" variant="primary" onClick={() => setActiveTab('all')}>
              Explore Open Projects
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || project.id}
              project={project}
              onOpenDetail={(p) => setSelectedProjectForDetail(p)}
            />
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProjectForDetail && (
        <ProjectDetailModal
          project={selectedProjectForDetail}
          isOpen={Boolean(selectedProjectForDetail)}
          onClose={() => setSelectedProjectForDetail(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
