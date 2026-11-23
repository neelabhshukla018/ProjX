import React from 'react';
import { CheckSquare, FolderPlus, UserPlus, Sparkles, Download } from 'lucide-react';
import Button from '../common/Button';
import { useWorkspace } from '../../hooks/useWorkspace';
import toast from 'react-hot-toast';

export const QuickActionsBar = () => {
  const { setIsNewTaskModalOpen, setIsNewProjectModalOpen, setIsInviteModalOpen } = useWorkspace();

  const handleExport = () => {
    toast.success('Workspace status report generated and downloaded!');
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200/80 rounded-xl shadow-subtle mb-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-200/60 flex items-center justify-center text-brand-600">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-900">Workspace Quick Actions</h4>
          <p className="text-[11px] text-slate-400">Kick off tasks, projects, or invite collaborators</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          leftIcon={CheckSquare}
          onClick={() => setIsNewTaskModalOpen(true)}
        >
          New Task
        </Button>
        <Button
          size="sm"
          variant="outline"
          leftIcon={FolderPlus}
          onClick={() => setIsNewProjectModalOpen(true)}
        >
          New Project
        </Button>
        <Button
          size="sm"
          variant="outline"
          leftIcon={UserPlus}
          onClick={() => setIsInviteModalOpen(true)}
        >
          Invite Teammate
        </Button>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={Download}
          onClick={handleExport}
          className="text-slate-500 hover:text-slate-800"
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsBar;
