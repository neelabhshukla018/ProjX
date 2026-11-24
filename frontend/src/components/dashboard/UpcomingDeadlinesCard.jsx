import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import { useWorkspace } from '../../hooks/useWorkspace';
import { getPriorityBadge, getDaysRemaining } from '../../utils/formatters';

export const UpcomingDeadlinesCard = () => {
  const { tasks } = useWorkspace();

  // Get active tasks sorted by due date
  const upcomingTasks = tasks
    .filter((t) => t.status !== 'Completed' && t.status !== 'done')
    .slice(0, 4);

  return (
    <Card
      title="Upcoming Deadlines"
      subtitle="Sprint deliverables requiring close attention"
      action={
        <Link
          to="/app/tasks"
          className="text-xs font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] flex items-center gap-1 transition-colors"
        >
          My tasks <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-[#EFEFEF]"
    >
      {upcomingTasks.length === 0 ? (
        <div className="p-6 text-center text-xs text-[#888888] italic">
          No urgent pending deadlines.
        </div>
      ) : (
        upcomingTasks.map((item) => {
          const priorityBadge = getPriorityBadge(item.priority);
          const deadline = getDaysRemaining(item.dueDate);
          const projectName = item.project?.name || item.projectName || 'General';
          const assigneeName = item.assignedTo?.fullName || item.assignee?.name || 'Assignee';

          return (
            <div
              key={item._id || item.id}
              className="p-3.5 sm:p-4 hover:bg-[#F5F5F5] transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0 pr-2">
                <h5 className="text-xs sm:text-sm font-semibold text-[#0F0F0F] truncate">
                  {item.title}
                </h5>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#5A5A5A] truncate">
                  <span className="font-medium text-[#2C2C2C] truncate">{projectName}</span>
                  <span>•</span>
                  <span className="truncate">{assigneeName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityBadge.bg || 'bg-[#F0F0F0] text-[#0F0F0F]'}`}
                >
                  {item.priority || 'Medium'}
                </span>
                <div
                  className={`flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-1 rounded-md ${
                    deadline.isUrgent || deadline.isOverdue
                      ? 'bg-[#0F0F0F] text-[#FFFFFF] border border-[#2C2C2C]'
                      : 'bg-[#F5F5F5] text-[#2C2C2C] border border-[#D8D8D8]'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{deadline.text || 'Due soon'}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </Card>
  );
};

export default UpcomingDeadlinesCard;
