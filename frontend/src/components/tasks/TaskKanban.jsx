import React from 'react';
import { Plus, CheckCircle, Clock, CircleDot, Eye } from 'lucide-react';
import TaskCard from './TaskCard';
import { useWorkspace } from '../../hooks/useWorkspace';

export const TaskKanban = ({ tasks = [], onMoveStatus, onOpenDetail }) => {
  const { setIsNewTaskModalOpen, user } = useWorkspace();

  const columns = [
    {
      id: 'To Do',
      title: 'To Do',
      dotColor: 'bg-[#B0B0B0]',
      icon: CircleDot,
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      dotColor: 'bg-[#2C2C2C]',
      icon: Clock,
    },
    {
      id: 'In Review',
      title: 'In Review',
      dotColor: 'bg-amber-600',
      icon: Eye,
    },
    {
      id: 'Completed',
      title: 'Completed',
      dotColor: 'bg-[#0F0F0F]',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((col) => {
        const colTasks = tasks.filter(
          (t) =>
            t.status === col.id ||
            (col.id === 'To Do' && t.status === 'todo') ||
            (col.id === 'In Progress' && t.status === 'in_progress') ||
            (col.id === 'Completed' && (t.status === 'done' || t.status === 'completed'))
        );

        return (
          <div
            key={col.id}
            className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-3.5 flex flex-col min-h-[500px] shadow-subtle"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EFEFEF]">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <h3 className="font-semibold text-xs sm:text-sm text-[#0F0F0F]">{col.title}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F5F5F5] border border-[#D8D8D8] text-[#2C2C2C]">
                  {colTasks.length}
                </span>
              </div>
              {user?.role === 'project_manager' && (
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="p-1 rounded-md text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
                  title={`Add task to ${col.title}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Column Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {colTasks.length === 0 ? (
                <div className="h-28 flex flex-col items-center justify-center border border-dashed border-[#D8D8D8] rounded-xl text-xs text-[#B0B0B0] p-4 text-center">
                  <p>No tasks in {col.title}</p>
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task._id || task.id}
                    task={task}
                    onMoveStatus={onMoveStatus}
                    onOpenDetail={onOpenDetail}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskKanban;
