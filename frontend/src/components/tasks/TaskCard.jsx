import React from 'react';
import { Clock, ArrowRight, ArrowLeft, CheckSquare } from 'lucide-react';
import Avatar from '../common/Avatar';
import { getPriorityBadge, getDaysRemaining } from '../../utils/formatters';
import { API_ORIGIN } from '../../services/api';
import { useWorkspace } from '../../hooks/useWorkspace';

export const TaskCard = ({ task, onMoveStatus, onOpenDetail }) => {
  const { user } = useWorkspace();
  const priorityInfo = getPriorityBadge(task.priority);
  const deadline = getDaysRemaining(task.dueDate);

  const isAssignedToMe =
    task.assignedTo?._id?.toString() === user?._id?.toString() ||
    task.assignedTo?.toString() === user?._id?.toString();

  const canMoveStatus = user?.role === 'team_member' && isAssignedToMe;

  const assigneeName = task.assignedTo?.fullName || task.assignee?.name || 'Assignee';
  const assigneeAvatar = task.assignedTo?.profilePhoto
    ? task.assignedTo.profilePhoto.startsWith('http')
      ? task.assignedTo.profilePhoto
      : `${API_ORIGIN}${task.assignedTo.profilePhoto}`
    : task.assignee?.avatar || '';

  const projectName = task.project?.name || task.projectName || 'General';

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(task)}
      className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle hover:shadow-card hover:border-[#888888] transition-all duration-150 group cursor-pointer"
    >
      {/* Top Project Tag & Priority */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5A5A] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded truncate max-w-[150px]">
          {projectName}
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 ${priorityInfo.bg || 'bg-[#F0F0F0] text-[#0F0F0F]'}`}
        >
          {task.priority || 'Medium'}
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

      {/* Progress submission if available */}
      {task.progressUpdate && (
        <div className="mb-2 p-1.5 bg-[#F9F9F9] rounded text-[10px] text-[#0F0F0F] truncate border border-[#EFEFEF]">
          <span className="font-bold">Update: </span>{task.progressUpdate}
        </div>
      )}

      {/* Footer Info: Assignee, Due Date & Quick Column Shifters */}
      <div className="pt-2.5 border-t border-[#EFEFEF] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Avatar
            src={assigneeAvatar}
            name={assigneeName}
            size="xs"
            className="ring-1 ring-[#D8D8D8]"
          />
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

        {/* Stage Mover Buttons - Only for assigned Team Member */}
        {canMoveStatus && (
          <div
            className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {task.status !== 'To Do' && (
              <button
                type="button"
                onClick={() => {
                  const prevStatus =
                    task.status === 'Completed'
                      ? 'In Review'
                      : task.status === 'In Review'
                      ? 'In Progress'
                      : 'To Do';
                  onMoveStatus(task._id || task.id, prevStatus);
                }}
                className="p-1 rounded text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
                title="Move backward"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}

            {task.status !== 'Completed' && (
              <button
                type="button"
                onClick={() => {
                  const nextStatus =
                    task.status === 'To Do'
                      ? 'In Progress'
                      : task.status === 'In Progress'
                      ? 'In Review'
                      : 'Completed';
                  onMoveStatus(task._id || task.id, nextStatus);
                }}
                className="p-1 rounded text-[#5A5A5A] hover:text-[#0F0F0F] hover:bg-[#F5F5F5] transition-colors"
                title="Advance stage"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
