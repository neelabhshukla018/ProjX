import React from 'react';
import { Clock, ArrowRight, ArrowLeft, CheckSquare } from 'lucide-react';
import Avatar from '../common/Avatar';
import { getPriorityBadge, getDaysRemaining } from '../../utils/formatters';

export const TaskCard = ({ task, onMoveStatus }) => {
  const priorityInfo = getPriorityBadge(task.priority);
  const deadline = getDaysRemaining(task.dueDate);

  const completedSubtasks = (task.subtasks || []).filter((s) => s.completed).length;
  const totalSubtasks = (task.subtasks || []).length;

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle hover:shadow-card hover:border-[#B0B0B0] transition-all duration-150 group">
      {/* Top Project Tag & Priority */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5A5A] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded truncate max-w-[150px]">
          {task.projectName}
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 ${priorityInfo.bg}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task Title */}
      <h4 className="text-xs sm:text-sm font-semibold text-[#0F0F0F] group-hover:text-[#0F0F0F] transition-colors line-clamp-2 mb-1.5 leading-snug">
        {task.title}
      </h4>

      {/* Description if available */}
      {task.description && (
        <p className="text-[11px] text-[#5A5A5A] line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Subtasks Progress */}
      {totalSubtasks > 0 && (
        <div className="flex items-center gap-2 mb-3 text-[11px] text-[#5A5A5A]">
          <CheckSquare className="w-3.5 h-3.5 text-[#0F0F0F]" />
          <span>
            {completedSubtasks}/{totalSubtasks} subtasks
          </span>
          <div className="flex-1 bg-[#EFEFEF] rounded-full h-1 overflow-hidden">
            <div
              className="bg-[#0F0F0F] h-full rounded-full transition-all"
              style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer Info: Assignee, Due Date & Quick Column Shifters */}
      <div className="pt-2.5 border-t border-[#EFEFEF] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {task.assignee && (
            <Avatar
              src={task.assignee.avatar}
              name={task.assignee.name}
              size="xs"
              className="ring-1 ring-[#D8D8D8]"
            />
          )}
          <span
            className={`flex items-center gap-1 text-[11px] font-medium ${
              deadline.isOverdue
                ? 'text-[#0F0F0F] font-bold'
                : deadline.isUrgent
                ? 'text-[#0F0F0F] font-bold'
                : 'text-[#5A5A5A]'
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
              className="p-1 rounded text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
              title="Move backward"
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
              className="p-1 rounded text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
              title="Advance stage"
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
