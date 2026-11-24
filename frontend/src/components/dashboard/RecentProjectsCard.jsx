import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import Avatar from '../common/Avatar';
import { API_ORIGIN } from '../../services/api';

export const RecentProjectsCard = ({ projects = [] }) => {
  return (
    <Card
      title="Active Projects"
      subtitle="Highest priority initiative workstreams"
      action={
        <Link
          to="/app/projects"
          className="text-xs font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-[#EFEFEF]"
    >
      {projects.length === 0 ? (
        <div className="p-6 text-center text-xs text-[#888888] italic">
          No projects created or joined yet.
        </div>
      ) : (
        projects.slice(0, 4).map((project) => (
          <div
            key={project._id || project.id}
            className="p-3.5 sm:p-4 hover:bg-[#F5F5F5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-semibold text-xs sm:text-sm text-[#0F0F0F] truncate">
                  {project.name}
                </span>
                <span className="text-xs text-[#5A5A5A] font-medium">
                  • {project.status}
                </span>
              </div>
              <p className="text-[11px] text-[#5A5A5A] truncate">{project.description}</p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0">
              {/* Progress */}
              <div className="w-20 sm:w-24">
                <div className="flex justify-between text-[10px] font-medium text-[#5A5A5A] mb-1">
                  <span>{project.progress || 0}%</span>
                </div>
                <ProgressBar
                  value={project.progress || 0}
                  color="black"
                  size="sm"
                />
              </div>

              {/* Avatars */}
              <div className="flex items-center -space-x-1.5 overflow-hidden">
                {(project.members || []).slice(0, 3).map((m, i) => (
                  <Avatar
                    key={m._id || m.id || i}
                    src={m.profilePhoto ? `${API_ORIGIN}${m.profilePhoto}` : m.avatar}
                    name={m.fullName || m.name || 'Member'}
                    size="xs"
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </Card>
  );
};

export default RecentProjectsCard;
