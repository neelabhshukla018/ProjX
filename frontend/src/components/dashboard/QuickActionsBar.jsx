import React from 'react';
import { CheckSquare, FolderPlus, Compass, User, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useWorkspace } from '../../hooks/useWorkspace';
import toast from 'react-hot-toast';

export const QuickActionsBar = () => {
  const { user, setIsNewTaskModalOpen, setIsNewProjectModalOpen } = useWorkspace();

  const handleExport = () => {
    toast.success('Workspace status summary generated');
  };

  const isPM = user?.role === 'project_manager';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-subtle mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shrink-0">
          <span className="font-bold text-xs">P𝕏</span>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-[#0F0F0F]">
            {isPM ? 'Project Manager Command Bar' : 'Team Member Quick Hub'}
          </h4>
          <p className="text-[11px] text-[#5A5A5A]">
            {isPM
              ? 'Kick off projects, allocate tasks, and review collaborator submissions'
              : 'Explore open projects, inspect daily deliverables, and update your portfolio'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {isPM ? (
          <>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={FolderPlus}
              onClick={() => setIsNewProjectModalOpen(true)}
              className="flex-1 sm:flex-initial"
            >
              New Project
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={CheckSquare}
              onClick={() => setIsNewTaskModalOpen(true)}
              className="flex-1 sm:flex-initial"
            >
              New Task
            </Button>
          </>
        ) : (
          <>
            <Link to="/app/projects" className="flex-1 sm:flex-initial">
              <Button size="sm" variant="secondary" leftIcon={Compass} className="w-full">
                Explore Projects
              </Button>
            </Link>
            <Link to="/app/tasks" className="flex-1 sm:flex-initial">
              <Button size="sm" variant="secondary" leftIcon={CheckSquare} className="w-full">
                My Tasks
              </Button>
            </Link>
            <Link to="/app/profile" className="flex-1 sm:flex-initial">
              <Button size="sm" variant="secondary" leftIcon={User} className="w-full">
                My Profile
              </Button>
            </Link>
          </>
        )}

        <Button
          size="sm"
          variant="ghost"
          leftIcon={Download}
          onClick={handleExport}
          className="text-[#5A5A5A] hover:text-[#0F0F0F] hidden sm:inline-flex"
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsBar;
