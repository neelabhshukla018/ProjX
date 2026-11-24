import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import TaskKanban from '../components/tasks/TaskKanban';
import TaskList from '../components/tasks/TaskList';
import TaskFilterBar from '../components/tasks/TaskFilterBar';
import TaskDetailModal from '../components/tasks/TaskDetailModal';
import Button from '../components/common/Button';

export const TasksPage = () => {
  const { tasks, updateTaskStatus, projects, setIsNewTaskModalOpen, user } = useWorkspace();
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('projx_task_view_mode') || 'list';
    } catch {
      return 'list';
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState(null);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('projx_task_view_mode', mode);
    } catch {}
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = task.title || '';
      const desc = task.description || '';

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        selectedPriority === 'all' ||
        task.priority?.toLowerCase() === selectedPriority.toLowerCase();

      const taskProjId = task.project?._id || task.project?.id || task.project || task.projectId;
      const matchesProject =
        selectedProject === 'all' || taskProjId === selectedProject;

      return matchesSearch && matchesPriority && matchesProject;
    });
  }, [tasks, searchQuery, selectedPriority, selectedProject]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            {user?.role === 'project_manager' ? 'Task & Sprint Management' : 'My Daily Tasks'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            {user?.role === 'project_manager'
              ? 'Assign, track, and review sprint work across your accepted team members.'
              : 'Complete your assigned deliverables, submit progress updates, and view manager feedback.'}
          </p>
        </div>

        {user?.role === 'project_manager' && (
          <Button
            variant="primary"
            leftIcon={Plus}
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            New Task
          </Button>
        )}
      </div>

      {/* Filter and View Mode Switcher */}
      <TaskFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        projects={projects}
      />

      {/* Main View: Kanban vs List */}
      {viewMode === 'kanban' ? (
        <TaskKanban
          tasks={filteredTasks}
          onMoveStatus={updateTaskStatus}
          onOpenDetail={(t) => setSelectedTaskForDetail(t)}
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onMoveStatus={updateTaskStatus}
          onOpenDetail={(t) => setSelectedTaskForDetail(t)}
        />
      )}

      {/* Task Detail Modal */}
      {selectedTaskForDetail && (
        <TaskDetailModal
          task={selectedTaskForDetail}
          isOpen={Boolean(selectedTaskForDetail)}
          onClose={() => setSelectedTaskForDetail(null)}
        />
      )}
    </div>
  );
};

export default TasksPage;
