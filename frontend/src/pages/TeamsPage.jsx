import React, { useState, useMemo } from 'react';
import { UserPlus } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import TeamCard from '../components/teams/TeamCard';
import TeamMemberList from '../components/teams/TeamMemberList';
import Button from '../components/common/Button';

export const TeamsPage = () => {
  const { teams, setIsInviteModalOpen } = useWorkspace();
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = [
    { label: 'All Departments', value: 'all' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Product & Design', value: 'Product & Design' },
    { label: 'AI & Data', value: 'AI & Data' },
    { label: 'Security', value: 'Security' },
  ];

  const allMembers = useMemo(() => {
    const list = [];
    teams.forEach((t) => {
      (t.members || []).forEach((m) => {
        if (!list.find((x) => x.id === m.id)) {
          list.push({ ...m, department: t.department });
        }
      });
    });
    return list;
  }, [teams]);

  const filteredMembers = useMemo(() => {
    if (selectedDept === 'all') return allMembers;
    return allMembers.filter((m) => m.department === selectedDept);
  }, [allMembers, selectedDept]);

  const totalMembersCount = allMembers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Teams & Collaborators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            Manage organization members, functional departments, and role permissions.
          </p>
        </div>

        <Button
          variant="primary"
          leftIcon={UserPlus}
          onClick={() => setIsInviteModalOpen(true)}
        >
          Invite Teammate
        </Button>
      </div>

      {/* Summary Stat Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
            Total Team Members
          </span>
          <p className="text-2xl font-bold text-[#0F0F0F] mt-1">{totalMembersCount}</p>
          <span className="text-[11px] text-[#0F0F0F] font-semibold flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F]" /> 8 currently online
          </span>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
            Active Departments
          </span>
          <p className="text-2xl font-bold text-[#0F0F0F] mt-1">{teams.length}</p>
          <span className="text-[11px] text-[#5A5A5A]">Cross-functional units</span>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-[#5A5A5A] uppercase tracking-wider">
            Pending Invitations
          </span>
          <p className="text-2xl font-bold text-[#0F0F0F] mt-1">2</p>
          <span className="text-[11px] text-[#5A5A5A]">Invited via secure tokens</span>
        </div>
      </div>

      {/* Functional Units */}
      <div>
        <h3 className="text-base font-semibold text-[#0F0F0F] mb-3">
          Department Units
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      {/* Member Directory */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-[#0F0F0F]">
            Member Directory ({filteredMembers.length})
          </h3>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {departments.map((dept) => (
              <button
                key={dept.value}
                type="button"
                onClick={() => setSelectedDept(dept.value)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedDept === dept.value
                    ? 'bg-[#0F0F0F] text-[#FFFFFF] font-semibold'
                    : 'bg-[#FFFFFF] text-[#5A5A5A] border border-[#E5E5E5] hover:text-[#0F0F0F] hover:bg-[#F5F5F5]'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>

        <TeamMemberList members={filteredMembers} />
      </div>
    </div>
  );
};

export default TeamsPage;
