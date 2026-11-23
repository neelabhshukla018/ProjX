import React, { useState, useMemo } from 'react';
import { Users, UserPlus, Shield, Sparkles } from 'lucide-react';
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Teams & Collaborators
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Team Members
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalMembersCount}</p>
          <span className="text-[11px] text-emerald-600 font-medium">● 8 currently online</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Departments
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{teams.length}</p>
          <span className="text-[11px] text-slate-500">Cross-functional units</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Pending Invitations
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">2</p>
          <span className="text-[11px] text-brand-600 font-medium">Invites expire in 7d</span>
        </div>
      </div>

      {/* Department Units Overview */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          Departments ({teams.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      {/* Members Directory */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900">
            Team Directory ({filteredMembers.length})
          </h3>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {departments.map((dept) => (
              <button
                key={dept.value}
                type="button"
                onClick={() => setSelectedDept(dept.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDept === dept.value
                    ? 'bg-brand-50 text-brand-700 border border-brand-200/80'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
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
