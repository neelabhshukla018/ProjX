import React from 'react';
import { CheckCircle2, FolderKanban } from 'lucide-react';
import Avatar from '../common/Avatar';
import toast from 'react-hot-toast';

export const TeamMemberList = ({ members = [] }) => {

  const handleContact = (email) => {
    toast.success(`Opening mail client for ${email}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle hover:shadow-card hover:border-[#B0B0B0] transition-all flex flex-col justify-between"
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
                <h4 className="text-sm font-semibold text-[#0F0F0F] leading-tight">
                  {member.name}
                </h4>
                <p className="text-xs text-[#5A5A5A]">{member.role}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-[#5A5A5A]">
              {member.role?.split(' ')[0]}
            </span>
          </div>

          <div className="text-[11px] text-[#5A5A5A] mb-3 truncate">
            {member.email}
          </div>

          <div className="pt-3 border-t border-[#EFEFEF] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-[#5A5A5A] text-[11px]">
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F0F0F]" />
                {member.tasksCount || 0} tasks
              </span>
              <span className="flex items-center gap-1 font-medium">
                <FolderKanban className="w-3.5 h-3.5 text-[#0F0F0F]" />
                {member.projectsCount || 0} projects
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleContact(member.email)}
              className="text-xs font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
