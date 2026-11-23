import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import TaskKanban from '../components/tasks/TaskKanban';
import TaskList from '../components/tasks/TaskList';
import TaskFilterBar from '../components/tasks/TaskFilterBar';
import Button from '../components/common/Button';

export const TasksPage = () => {
  const { tasks, updateTaskStatus, projects, setIsNewTaskModalOpen } = useWorkspace();
  const [viewMode, setViewMode] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.tags &&
          task.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesPriority =
        selectedPriority === 'all' || task.priority === selectedPriority;

      const matchesProject =
        selectedProject === 'all' || task.projectId === selectedProject;

      return matchesSearch && matchesPriority && matchesProject;
    });
  }, [tasks, searchQuery, selectedPriority, selectedProject]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            My Tasks
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            Prioritize and manage your actionable work items across active sprints.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={Plus}
          onClick={() => setIsNewTaskModalOpen(true)}
        >
          New Task
        </Button>
      </div>

      {/* Filter and View Mode Switcher */}
      <TaskFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
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
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onMoveStatus={updateTaskStatus}
        />
      )}
    </div>
  );
};

export default TasksPage;
