import React from 'react';
import { Users, FolderKanban, Shield, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export const TeamCard = ({ team, onSelect }) => {
  return (
    <Card
      className="hover:border-brand-300 transition-all duration-200"
      bodyClassName="p-5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="primary" size="sm">
            {team.department}
          </Badge>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {team.memberCount} members
          </span>
        </div>

        <h4 className="text-base font-semibold text-slate-900 mb-1.5">{team.name}</h4>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
          {team.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center -space-x-2">
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

        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
          <FolderKanban className="w-3 h-3 text-slate-400" />
          {team.activeProjectsCount} active projects
        </span>
      </div>
    </Card>
  );
};

export default TeamCard;
