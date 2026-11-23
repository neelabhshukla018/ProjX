import React from 'react';
import { Check, Clock, Calendar, CheckSquare } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { getPriorityBadge, getStatusBadge, getDaysRemaining, formatDate } from '../../utils/formatters';

export const TaskList = ({ tasks = [], onMoveStatus, onToggleComplete }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-10">Done</th>
              <th className="py-3 px-4">Task</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Assignee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
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
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isDone ? 'bg-slate-50/40 text-slate-400' : 'text-slate-800'
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
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        <span className={isDone ? 'line-through text-slate-400' : ''}>
                          {task.title}
                        </span>
                      </div>
                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {task.subtasks.filter((s) => s.completed).length}/
                          {task.subtasks.length} subtasks
                        </div>
                      )}
                    </td>

                    {/* Project */}
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {task.projectName}
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityBadge.bg}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <select
                        value={task.status}
                        onChange={(e) => onMoveStatus(task.id, e.target.value)}
                        className="bg-transparent border border-slate-200 rounded px-2 py-1 text-[11px] font-medium outline-none"
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </td>

                    {/* Due Date */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span
                          className={
                            deadline.isOverdue
                              ? 'text-rose-600 font-semibold'
                              : 'text-slate-600'
                          }
                        >
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </td>

                    {/* Assignee */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {task.assignee && (
                          <Avatar
                            src={task.assignee.avatar}
                            name={task.assignee.name}
                            size="xs"
                          />
                        )}
                        <span className="text-slate-700 font-medium truncate max-w-[100px]">
                          {task.assignee?.name || 'Unassigned'}
                        </span>
                      </div>
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
