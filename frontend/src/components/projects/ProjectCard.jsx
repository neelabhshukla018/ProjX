import React from 'react';
import { Clock } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import Avatar from '../common/Avatar';
import { getPriorityBadge, getDaysRemaining, formatDate } from '../../utils/formatters';

export const ProjectCard = ({ project }) => {
  const priorityInfo = getPriorityBadge(project.priority);
  const deadline = getDaysRemaining(project.dueDate);

  return (
    <Card
      className="group hover:border-[#B0B0B0] transition-all duration-200 flex flex-col justify-between"
      bodyClassName="p-5 flex flex-col h-full justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge
            variant={
              project.status === 'Completed'
                ? 'dark'
                : project.status === 'Review'
                ? 'silver'
                : 'default'
            }
            dot
            size="sm"
          >
            {project.status}
          </Badge>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityInfo.bg}`}
          >
            {project.priority}
          </span>
        </div>

        {/* Title & Category */}
        <div className="mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#B0B0B0]">
            {project.category}
          </span>
          <h4 className="text-base font-semibold text-[#0F0F0F] group-hover:text-[#0F0F0F] transition-colors line-clamp-1 mt-0.5">
            {project.name}
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-[#5A5A5A] line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>
      </div>

      <div>
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#5A5A5A] font-medium">Progress</span>
            <span className="font-semibold text-[#0F0F0F]">{project.progress}%</span>
          </div>
          <ProgressBar
            value={project.progress}
            color="black"
            size="sm"
          />
        </div>

        {/* Footer info: Members & Due Date */}
        <div className="pt-3 border-t border-[#EFEFEF] flex items-center justify-between text-xs">
          {/* Member avatars */}
          <div className="flex items-center -space-x-1.5 overflow-hidden">
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
              <span className="w-6 h-6 rounded-full bg-[#F5F5F5] border-2 border-white flex items-center justify-center text-[10px] font-semibold text-[#2C2C2C]">
                +{(project.members || []).length - 4}
              </span>
            )}
          </div>

          <div
            className={`flex items-center gap-1 text-[11px] font-medium ${
              deadline.isOverdue
                ? 'text-[#0F0F0F] font-bold'
                : deadline.isUrgent
                ? 'text-[#0F0F0F] font-bold'
                : 'text-[#5A5A5A]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(project.dueDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
