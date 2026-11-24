import React, { useState, useMemo } from 'react';
import { UserPlus, Users, FolderKanban, CheckCircle2, Mail, Shield, Award } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import Avatar from '../components/common/Avatar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { API_ORIGIN } from '../services/api';
import toast from 'react-hot-toast';

export const TeamsPage = () => {
  const { teams, projects, user } = useWorkspace();
  const [selectedRole, setSelectedRole] = useState('all');

  // Aggregate all unique real members and owners across active projects
  const allMembers = useMemo(() => {
    const map = new Map();

    // 1. Add project owners
    projects.forEach((p) => {
      if (p.owner && p.owner._id && !map.has(p.owner._id)) {
        map.set(p.owner._id, {
          id: p.owner._id,
          name: p.owner.fullName || 'Lead',
          email: p.owner.email || '',
          role: 'Project Manager',
          headline: p.owner.headline || 'Project Lead',
          skills: p.owner.skills || ['Leadership', 'Planning'],
          avatar: p.owner.profilePhoto ? (p.owner.profilePhoto.startsWith('http') ? p.owner.profilePhoto : `${API_ORIGIN}${p.owner.profilePhoto}`) : '',
          projectsCount: 1,
        });
      } else if (p.owner && p.owner._id && map.has(p.owner._id)) {
        map.get(p.owner._id).projectsCount += 1;
      }

      // 2. Add accepted members
      if (p.members && Array.isArray(p.members)) {
        p.members.forEach((m) => {
          if (m && (m._id || m.id)) {
            const mId = m._id || m.id;
            if (!map.has(mId)) {
              map.set(mId, {
                id: mId,
                name: m.fullName || m.name || 'Team Member',
                email: m.email || '',
                role: 'Team Member',
                headline: m.headline || 'Collaborator',
                skills: m.skills || ['Development'],
                avatar: m.profilePhoto ? (m.profilePhoto.startsWith('http') ? m.profilePhoto : `${API_ORIGIN}${m.profilePhoto}`) : '',
                projectsCount: 1,
              });
            } else {
              map.get(mId).projectsCount += 1;
            }
          }
        });
      }
    });

    // Also include logged in user if list is empty
    if (map.size === 0 && user) {
      map.set(user._id, {
        id: user._id,
        name: user.fullName || user.name,
        email: user.email,
        role: user.role === 'project_manager' ? 'Project Manager' : 'Team Member',
        headline: user.headline || 'Active Member',
        skills: user.skills || [],
        avatar: user.profilePhoto ? `${API_ORIGIN}${user.profilePhoto}` : '',
        projectsCount: projects.length,
      });
    }

    return Array.from(map.values());
  }, [projects, user]);

  const filteredMembers = useMemo(() => {
    if (selectedRole === 'all') return allMembers;
    return allMembers.filter((m) => m.role.toLowerCase().includes(selectedRole.toLowerCase()));
  }, [allMembers, selectedRole]);

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Teams & Collaborators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            Directory of active Project Managers, accepted Team Members, and project collaborators.
          </p>
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-1 shadow-subtle">
          {[
            { id: 'all', label: 'All Collaborators' },
            { id: 'manager', label: 'Project Managers' },
            { id: 'member', label: 'Team Members' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRole(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedRole === tab.id
                  ? 'bg-[#0F0F0F] text-[#FFFFFF]'
                  : 'text-[#5A5A5A] hover:text-[#0F0F0F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stat Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
            Total Collaborators
          </span>
          <p className="text-2xl font-bold text-[#0F0F0F] mt-1">{allMembers.length}</p>
          <span className="text-[11px] text-[#0F0F0F] font-semibold flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F]" /> Active in project rosters
          </span>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
            Active Projects
          </span>
          <p className="text-2xl font-bold text-[#0F0F0F] mt-1">{projects.length}</p>
          <span className="text-[11px] text-[#5A5A5A]">Shared collaborative initiatives</span>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
            Your Access Role
          </span>
          <p className="text-2xl font-bold text-[#0F0F0F] mt-1">
            {user?.role === 'project_manager' ? 'Project Manager' : 'Team Member'}
          </p>
          <span className="text-[11px] text-[#5A5A5A]">Verified database role</span>
        </div>
      </div>

      {/* Collaborator Grid */}
      <div>
        <h3 className="text-base font-semibold text-[#0F0F0F] mb-3">
          Member Directory ({filteredMembers.length})
        </h3>

        {filteredMembers.length === 0 ? (
          <div className="p-12 bg-white border border-dashed border-[#D8D8D8] rounded-2xl text-center text-xs text-[#888888] italic">
            No collaborators found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle hover:shadow-card hover:border-[#888888] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={member.avatar}
                        name={member.name}
                        size="md"
                        status="online"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F0F0F] leading-tight">
                          {member.name}
                        </h4>
                        <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.2 rounded bg-[#0F0F0F] text-white">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A5A5A] mb-2 leading-relaxed">
                    {member.headline}
                  </p>

                  <div className="text-[11px] text-[#777777] mb-3 truncate font-mono">
                    {member.email}
                  </div>

                  {/* Skills tags */}
                  {(member.skills || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {member.skills.slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#F0F0F0] text-[#0F0F0F] font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#EFEFEF] flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium text-[#5A5A5A] text-[11px]">
                    <FolderKanban className="w-3.5 h-3.5 text-[#0F0F0F]" />
                    {member.projectsCount} project(s)
                  </span>

                  <button
                    type="button"
                    onClick={() => handleContact(member.email)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
