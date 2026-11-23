import React from 'react';
import { Calendar, CheckCircle2, Clock, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import Avatar from '../common/Avatar';
import { getPriorityBadge, getStatusBadge, getDaysRemaining, formatDate } from '../../utils/formatters';

export const ProjectCard = ({ project, onSelect }) => {
  const priorityInfo = getPriorityBadge(project.priority);
  const statusInfo = getStatusBadge(project.status);
  const deadline = getDaysRemaining(project.dueDate);

  return (
    <Card
      className="group hover:border-brand-300/80 transition-all duration-200 flex flex-col justify-between"
      bodyClassName="p-5 flex flex-col h-full justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge
            variant={
              project.status === 'Completed'
                ? 'success'
                : project.status === 'Review'
                ? 'purple'
                : 'primary'
            }
            dot
            size="sm"
          >
            {project.status}
          </Badge>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${priorityInfo.bg}`}
          >
            {project.priority}
          </span>
        </div>

        {/* Title & Category */}
        <div className="mb-2">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
            {project.category}
          </span>
          <h4 className="text-base font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 mt-0.5">
            {project.name}
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      <div>
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Progress</span>
            <span className="font-semibold text-slate-800">{project.progress}%</span>
          </div>
          <ProgressBar
            value={project.progress}
            color={project.progress === 100 ? 'emerald' : 'indigo'}
            size="sm"
          />
        </div>

        {/* Footer info: Members & Due Date */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {/* Member avatars */}
          <div className="flex items-center -space-x-2 overflow-hidden">
            {(project.members || []).slice(0, 4).map((member, idx) => (
              <div key={member.id || idx} title={`${member.name} (${member.role})`}>
                <Avatar
                  src={member.avatar}
                  name={member.name}
                  size="xs"
                  className="ring-2 ring-white"
                />
              </div>
            ))}
            {(project.members || []).length > 4 && (
              <span className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-slate-600">
                +{(project.members || []).length - 4}
              </span>
            )}
          </div>

          {/* Due date badge */}
          <div
            className={`flex items-center gap-1 font-medium text-[11px] ${
              deadline.isOverdue
                ? 'text-rose-600'
                : deadline.isUrgent
                ? 'text-amber-600 font-semibold'
                : 'text-slate-500'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{deadline.text}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
