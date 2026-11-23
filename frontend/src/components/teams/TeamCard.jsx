import React from 'react';
import { Users, FolderKanban } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';

export const TeamCard = ({ team }) => {
  return (
    <Card
      className="hover:border-[#B0B0B0] transition-all duration-200"
      bodyClassName="p-5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#0F0F0F]">
            {team.department}
          </span>
          <span className="text-xs font-semibold text-[#5A5A5A] flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {team.memberCount} members
          </span>
        </div>

        <h4 className="text-base font-semibold text-[#0F0F0F] mb-1.5">{team.name}</h4>
        <p className="text-xs text-[#5A5A5A] leading-relaxed line-clamp-2 mb-4">
          {team.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#EFEFEF] flex items-center justify-between">
        <div className="flex items-center -space-x-1.5">
          {(team.members || []).map((m, idx) => (
            <Avatar
              key={m.id || idx}
              src={m.avatar}
              name={m.name}
              size="xs"
              status={m.status}
              className="ring-2 ring-white"
            />
          ))}
        </div>

        <span className="text-[11px] font-medium text-[#5A5A5A] flex items-center gap-1">
          <FolderKanban className="w-3 h-3 text-[#B0B0B0]" />
          {team.activeProjectsCount} active projects
        </span>
      </div>
    </Card>
  );
};

export default TeamCard;
