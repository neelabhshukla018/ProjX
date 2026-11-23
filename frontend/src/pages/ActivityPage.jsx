import React, { useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import Card from '../components/common/Card';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import { formatRelativeTime } from '../utils/formatters';
import { Activity, GitPullRequest, CheckCircle2, GitBranch, Rocket, Filter } from 'lucide-react';

export const ActivityPage = () => {
  const { activities } = useWorkspace();
  const [filterType, setFilterType] = useState('all');

  const filteredActivities = activities.filter((act) => {
    if (filterType === 'all') return true;
    return act.targetType?.toLowerCase() === filterType.toLowerCase();
  });

  const getActionIcon = (targetType) => {
    switch (targetType) {
      case 'PR':
        return <GitPullRequest className="w-4 h-4 text-purple-600" />;
      case 'Task':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'Git':
        return <GitBranch className="w-4 h-4 text-blue-600" />;
      case 'Deploy':
        return <Rocket className="w-4 h-4 text-brand-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Workspace Activity Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            End-to-end timeline of commits, deployments, status shifts, and project milestones.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['all', 'Task', 'PR', 'Git', 'Deploy'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-brand-50 text-brand-700 border border-brand-200/80'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {type === 'all' ? 'All Activities' : type}
            </button>
          ))}
        </div>
      </div>

      <Card className="divide-y divide-slate-100" bodyClassName="p-0">
        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No activities recorded under this category.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex items-start gap-4"
            >
              <Avatar src={act.user.avatar} name={act.user.name} size="md" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 text-sm">{act.user.name}</span>
                  <span className="text-xs text-slate-500">{act.action}</span>
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {act.target}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
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
