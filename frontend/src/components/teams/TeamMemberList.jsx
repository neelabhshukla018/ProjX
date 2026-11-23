import React from 'react';
import { Mail, Shield, CheckCircle2, FolderKanban } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import toast from 'react-hot-toast';

export const TeamMemberList = ({ members = [] }) => {
  const getRoleVariant = (role) => {
    switch (role?.toLowerCase()) {
      case 'workspace admin':
      case 'admin':
        return 'danger';
      case 'lead':
      case 'design lead':
      case 'devops lead':
      case 'lead architect':
        return 'primary';
      case 'contributor':
      default:
        return 'default';
    }
  };

  const handleContact = (email) => {
    toast.success(`Opening mail client for ${email}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-subtle hover:shadow-card hover:border-brand-200 transition-all flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={member.avatar}
                name={member.name}
                size="md"
                status={member.status || 'online'}
              />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                  {member.name}
                </h4>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>
            </div>
            <Badge variant={getRoleVariant(member.role)} size="sm">
              {member.role?.split(' ')[0]}
            </Badge>
          </div>

          <div className="text-[11px] text-slate-500 mb-3 truncate">
            {member.email}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-slate-500 text-[11px]">
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {member.tasksCount || 0} tasks
              </span>
              <span className="flex items-center gap-1 font-medium">
                <FolderKanban className="w-3.5 h-3.5 text-brand-500" />
                {member.projectsCount || 0} projects
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleContact(member.email)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
              title={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
