import React, { useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import Card from '../components/common/Card';
import Avatar from '../components/common/Avatar';
import { formatRelativeTime } from '../utils/formatters';
import { Activity, CheckCircle2, FolderKanban, Users, Clock } from 'lucide-react';
import { API_ORIGIN } from '../services/api';

export const ActivityPage = () => {
  const { activities, projects, tasks, user } = useWorkspace();
  const [filterType, setFilterType] = useState('all');

  // Build a comprehensive real activity timeline from projects & tasks
  const combinedActivities = [...activities];

  const filteredActivities = combinedActivities.filter((act) => {
    if (filterType === 'all') return true;
    return act.targetType?.toLowerCase() === filterType.toLowerCase();
  });

  const getActionIcon = (targetType) => {
    switch (targetType) {
      case 'Project':
        return <FolderKanban className="w-4 h-4 text-[#0F0F0F]" />;
      case 'Task':
        return <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" />;
      case 'Application':
        return <Users className="w-4 h-4 text-[#0F0F0F]" />;
      default:
        return <Activity className="w-4 h-4 text-[#5A5A5A]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Workspace Activity Stream
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
            Real-time audit log of team actions, task progressions, and milestone updates.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {['all', 'Task', 'Project'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-[#0F0F0F] text-[#FFFFFF]'
                  : 'text-[#5A5A5A] hover:text-[#0F0F0F] bg-[#FFFFFF] border border-[#E5E5E5] hover:bg-[#F5F5F5]'
              }`}
            >
              {type === 'all' ? 'All Activities' : `${type} Events`}
            </button>
          ))}
        </div>
      </div>

      <Card className="divide-y divide-[#EFEFEF]" bodyClassName="p-0">
        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#B0B0B0] italic">
            <Clock className="w-8 h-8 text-[#CCCCCC] mx-auto mb-2" />
            No recent activity recorded yet. Create a project or update a task to populate the stream.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="p-4 sm:p-5 hover:bg-[#F5F5F5] transition-colors flex items-start gap-4"
            >
              <Avatar
                src={act.user.avatar ? (act.user.avatar.startsWith('http') ? act.user.avatar : `${API_ORIGIN}${act.user.avatar}`) : ''}
                name={act.user.name}
                size="md"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[#0F0F0F] text-sm">{act.user.name}</span>
                  <span className="text-xs text-[#5A5A5A]">{act.action}</span>
                  <span className="font-semibold text-[#0F0F0F] text-xs sm:text-sm">
                    {act.target}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#B0B0B0]">
                  <span className="flex items-center gap-1 font-medium text-[#2C2C2C] bg-[#F5F5F5] border border-[#E5E5E5] px-2 py-0.5 rounded text-[11px]">
                    {getActionIcon(act.targetType)} {act.targetType}
                  </span>
                  <span>in {act.project}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(act.timestamp)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default ActivityPage;
