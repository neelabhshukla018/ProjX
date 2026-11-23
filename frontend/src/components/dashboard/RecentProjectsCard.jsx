import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderKanban } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export const RecentProjectsCard = ({ projects = [] }) => {
  return (
    <Card
      title="Active Projects"
      subtitle="Highest priority initiative workstreams"
      action={
        <Link
          to="/app/projects"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-slate-100"
    >
      {projects.slice(0, 4).map((project) => (
        <div
          key={project.id}
          className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-1">
                {project.name}
              </span>
              <Badge
                variant={
                  project.status === 'Completed'
                    ? 'success'
                    : project.status === 'Review'
                    ? 'purple'
                    : 'primary'
                }
                size="sm"
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1">{project.description}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Progress */}
            <div className="w-24">
              <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                <span>{project.progress}%</span>
              </div>
              <ProgressBar
                value={project.progress}
                color={project.progress === 100 ? 'emerald' : 'indigo'}
                size="sm"
              />
            </div>

            {/* Avatars */}
            <div className="flex items-center -space-x-1.5 overflow-hidden">
              {(project.members || []).slice(0, 3).map((m, i) => (
                <Avatar key={m.id || i} src={m.avatar} name={m.name} size="xs" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default RecentProjectsCard;
