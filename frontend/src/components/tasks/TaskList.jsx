import React from 'react';
import { Check, Clock } from 'lucide-react';
import Avatar from '../common/Avatar';
import { getPriorityBadge, getStatusBadge, getDaysRemaining, formatDate } from '../../utils/formatters';

export const TaskList = ({ tasks = [], onMoveStatus }) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F5F5F5] border-b border-[#E5E5E5] text-[11px] font-semibold text-[#5A5A5A] uppercase tracking-wider">
              <th className="py-3 px-4 w-10">Done</th>
              <th className="py-3 px-4">Task</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEFEF]">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#B0B0B0]">
                  No tasks match current filter criteria.
                </td>
              </tr>
            ) : (
              tasks.map((task) => {
                const isDone = task.status === 'done';
                const priorityBadge = getPriorityBadge(task.priority);
                const statusBadge = getStatusBadge(task.status);
                const deadline = getDaysRemaining(task.dueDate);

                return (
                  <tr
                    key={task.id}
                    className={`hover:bg-[#F5F5F5] transition-colors ${
                      isDone ? 'bg-[#FAFAFA] text-[#B0B0B0]' : 'text-[#0F0F0F]'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() =>
                          onMoveStatus(task.id, isDone ? 'todo' : 'done')
                        }
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isDone
                            ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white'
                            : 'border-[#B0B0B0] hover:border-[#0F0F0F]'
                        }`}
                      >
                        {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0F0F0F] line-clamp-1">
                        <span className={isDone ? 'line-through text-[#B0B0B0]' : ''}>
                          {task.title}
                        </span>
                      </div>
                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="text-[10px] text-[#5A5A5A] mt-0.5">
                          {task.subtasks.filter((s) => s.completed).length}/
                          {task.subtasks.length} subtasks
                        </div>
                      )}
                    </td>

                    {/* Project */}
                    <td className="py-3 px-4 text-[#5A5A5A] font-medium">
                      {task.projectName}
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityBadge.bg}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-xs text-[#0F0F0F]">{statusBadge.label}</span>
                    </td>

                    {/* Due Date */}
                    <td className="py-3 px-4">
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          deadline.isOverdue
                            ? 'text-[#0F0F0F] font-bold'
                            : deadline.isUrgent
                            ? 'text-[#0F0F0F] font-bold'
                            : 'text-[#5A5A5A]'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {formatDate(task.dueDate)}
                      </span>
                    </td>

                    {/* Assignee */}
                    <td className="py-3 px-4">
                      {task.assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={task.assignee.avatar}
                            name={task.assignee.name}
                            size="xs"
                          />
                          <span className="font-medium text-[#0F0F0F]">{task.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-[#B0B0B0]">Unassigned</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
