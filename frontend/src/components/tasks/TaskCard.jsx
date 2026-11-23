import React from 'react';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
} from 'lucide-react';
import Avatar from '../common/Avatar';
import { getPriorityBadge, getDaysRemaining } from '../../utils/formatters';

export const TaskCard = ({ task, onMoveStatus }) => {
  const priorityInfo = getPriorityBadge(task.priority);
  const deadline = getDaysRemaining(task.dueDate);

  const completedSubtasks = (task.subtasks || []).filter((s) => s.completed).length;
  const totalSubtasks = (task.subtasks || []).length;

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle hover:shadow-card hover:border-brand-300 transition-all duration-150 group">
      {/* Top Project Tag & Priority */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[150px]">
          {task.projectName}
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 ${priorityInfo.bg}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task Title */}
      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
        {task.title}
      </h4>

      {/* Description if available */}
      {task.description && (
        <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Subtasks Progress */}
      {totalSubtasks > 0 && (
        <div className="flex items-center gap-2 mb-3 text-[11px] text-slate-500">
          <CheckSquare className="w-3.5 h-3.5 text-brand-500" />
          <span>
            {completedSubtasks}/{totalSubtasks} subtasks
          </span>
          <div className="flex-1 bg-slate-100 rounded-full h-1 overflow-hidden">
            <div
              className="bg-brand-500 h-full rounded-full transition-all"
              style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer Info: Assignee, Due Date & Quick Column Shifters */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {task.assignee && (
            <Avatar
              src={task.assignee.avatar}
              name={task.assignee.name}
              size="xs"
              className="ring-1 ring-slate-200"
            />
          )}
          <span
            className={`flex items-center gap-1 text-[11px] font-medium ${
              deadline.isOverdue
                ? 'text-rose-600'
                : deadline.isUrgent
                ? 'text-amber-600 font-semibold'
                : 'text-slate-500'
            }`}
          >
            <Clock className="w-3 h-3" />
            {deadline.text}
          </span>
        </div>

        {/* Stage Mover Buttons */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          {task.status !== 'todo' && (
            <button
              type="button"
              onClick={() =>
                onMoveStatus(
                  task.id,
                  task.status === 'done' ? 'in_progress' : 'todo'
                )
              }
              title="Move left"
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {task.status !== 'done' && (
            <button
              type="button"
              onClick={() =>
                onMoveStatus(
                  task.id,
                  task.status === 'todo' ? 'in_progress' : 'done'
                )
              }
              title="Move right"
              className="p-1 rounded text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
