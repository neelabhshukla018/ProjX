import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { useWorkspace } from '../../hooks/useWorkspace';
import { API_ORIGIN } from '../../services/api';
import { formatDate } from '../../utils/formatters';

export const ProjectCard = ({ project, onOpenDetail }) => {
  const navigate = useNavigate();
  const { user, applyToProject } = useWorkspace();
  const [isApplying, setIsApplying] = useState(false);

  const deadlineDate = project.deadline || project.dueDate;
  const isPMOwner =
    user?.role === 'project_manager' &&
    (project.owner?._id === user?._id || project.owner === user?._id);

  const isAcceptedMember = (project.members || []).some(
    (m) => (m._id || m) === user?._id
  );

  const handleApplyClick = async (e) => {
    e.stopPropagation();
    setIsApplying(true);
    try {
      await applyToProject(project._id || project.id);
    } catch {
      // handled
    } finally {
      setIsApplying(false);
    }
  };

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(project);
    } else {
      navigate(`/app/projects/${project._id || project.id}`);
    }
  };

  const photoUrl = project.photo
    ? project.photo.startsWith('http')
      ? project.photo
      : `${API_ORIGIN}${project.photo}`
    : null;

  return (
    <Card
      className="group hover:border-[#888888] transition-all duration-200 flex flex-col justify-between cursor-pointer"
      bodyClassName="p-5 flex flex-col h-full justify-between"
      onClick={handleCardClick}
    >
      <div>
        {/* Cover Photo if present (Uncropped, responsive container) */}
        {photoUrl && (
          <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden mb-3 border border-[#E5E5E5] bg-[#F7F7F7] relative flex items-center justify-center p-1.5 group/photo">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15 blur-lg scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${photoUrl})` }}
              aria-hidden="true"
            />
            <img
              src={photoUrl}
              alt={project.name}
              className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Status & Category */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <span className="font-bold text-[#0F0F0F] px-2 py-0.5 rounded bg-[#F5F5F5] border border-[#E5E5E5]">
            {project.status || 'Planning'}
          </span>
          <span className="font-medium text-[#5A5A5A] text-[11px] flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {project.requiredMembers ? `${(project.members || []).length}/${project.requiredMembers} slots` : 'Team'}
          </span>
        </div>

        {/* Project Name */}
        <h4 className="text-base font-bold text-[#0F0F0F] group-hover:text-[#0F0F0F] transition-colors line-clamp-1 mt-1">
          {project.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-[#5A5A5A] line-clamp-2 leading-relaxed mt-1 mb-3">
          {project.description}
        </p>

        {/* Required skills */}
        {(project.requiredSkills || []).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.requiredSkills.slice(0, 3).map((sk, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded bg-[#F0F0F0] text-[#0F0F0F] font-semibold"
              >
                {sk}
              </span>
            ))}
            {project.requiredSkills.length > 3 && (
              <span className="text-[10px] text-[#888888] font-medium self-center">
                +{project.requiredSkills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div>
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#5A5A5A] text-[11px]">Progress</span>
            <span className="font-semibold text-[#0F0F0F] text-xs">{project.progress || 0}%</span>
          </div>
          <ProgressBar value={project.progress || 0} color="black" size="sm" />
        </div>

        {/* Footer info: Members & Deadline & Action */}
        <div className="pt-3 border-t border-[#EFEFEF] flex items-center justify-between text-xs gap-2">
          {/* Member avatars */}
          <div className="flex items-center -space-x-1.5 overflow-hidden">
            {(project.members || []).slice(0, 3).map((m, idx) => (
              <div key={m._id || m.id || idx}>
                <Avatar
                  src={m.profilePhoto ? `${API_ORIGIN}${m.profilePhoto}` : m.avatar}
                  name={m.fullName || m.name || 'Member'}
                  size="xs"
                  className="ring-2 ring-white"
                />
              </div>
            ))}
            {(project.members || []).length > 3 && (
              <span className="w-5 h-5 rounded-full bg-[#F5F5F5] border border-white flex items-center justify-center text-[9px] font-semibold text-[#2C2C2C]">
                +{(project.members || []).length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#5A5A5A]">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(deadlineDate)}</span>
          </div>

          {/* Action button */}
          {user?.role === 'team_member' ? (
            isAcceptedMember ? (
              <span className="text-[10px] font-bold text-black px-2 py-0.5 rounded bg-[#EAEAEA]">
                Accepted
              </span>
            ) : project.myApplicationStatus === 'Pending' ? (
              <span className="text-[10px] font-bold text-amber-700 px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                Pending
              </span>
            ) : project.myApplicationStatus === 'Rejected' ? (
              <span className="text-[10px] font-bold text-red-600 px-2 py-0.5 rounded bg-red-50 border border-red-200">
                Rejected
              </span>
            ) : (
              <Button
                size="xs"
                variant="primary"
                leftIcon={Sparkles}
                isLoading={isApplying}
                onClick={handleApplyClick}
              >
                Interested
              </Button>
            )
          ) : isPMOwner ? (
            <span className="text-[11px] font-bold text-[#0F0F0F] group-hover:underline flex items-center gap-0.5">
              Manage <ArrowRight className="w-3 h-3" />
            </span>
          ) : (
            <span className="text-[11px] text-[#5A5A5A]">View Details</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
