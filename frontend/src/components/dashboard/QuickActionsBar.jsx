import React from 'react';
import { CheckSquare, FolderPlus, UserPlus, Sparkles, Download } from 'lucide-react';
import Button from '../common/Button';
import { useWorkspace } from '../../hooks/useWorkspace';
import toast from 'react-hot-toast';

export const QuickActionsBar = () => {
  const { setIsNewTaskModalOpen, setIsNewProjectModalOpen, setIsInviteModalOpen } = useWorkspace();

  const handleExport = () => {
    toast.success('Workspace status report downloaded');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-subtle mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-[#0F0F0F]">Workspace Quick Actions</h4>
          <p className="text-[11px] text-[#5A5A5A]">Kick off tasks, projects, or invite collaborators</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button
          size="sm"
          variant="secondary"
          leftIcon={CheckSquare}
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex-1 sm:flex-initial"
        >
          New Task
        </Button>
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
          leftIcon={UserPlus}
          onClick={() => setIsInviteModalOpen(true)}
          className="flex-1 sm:flex-initial"
        >
          Invite
        </Button>
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
