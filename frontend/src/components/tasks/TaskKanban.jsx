import React from 'react';
import { Plus, CheckCircle, Clock, CircleDot } from 'lucide-react';
import TaskCard from './TaskCard';
import { useWorkspace } from '../../hooks/useWorkspace';

export const TaskKanban = ({ tasks = [], onMoveStatus }) => {
  const { setIsNewTaskModalOpen } = useWorkspace();

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      dotColor: 'bg-slate-400',
      icon: CircleDot,
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      dotColor: 'bg-brand-500',
      icon: Clock,
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dotColor: 'bg-emerald-500',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        const Icon = col.icon;

        return (
          <div
            key={col.id}
            className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex flex-col min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <h3 className="font-semibold text-sm text-slate-900">{col.title}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-xs">
                  {colTasks.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsNewTaskModalOpen(true)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
                title={`Add task to ${col.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Column Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {colTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400 p-4 text-center">
                  <p>No tasks in {col.title}</p>
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMoveStatus={onMoveStatus}
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
