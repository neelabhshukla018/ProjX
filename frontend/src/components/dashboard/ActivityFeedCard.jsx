import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, GitPullRequest, CheckCircle2, GitBranch, Rocket, Shield } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { formatRelativeTime } from '../../utils/formatters';

export const ActivityFeedCard = ({ activities = [] }) => {
  const getActionIcon = (targetType) => {
    switch (targetType) {
      case 'PR':
        return <GitPullRequest className="w-3 h-3 text-purple-600" />;
      case 'Task':
        return <CheckCircle2 className="w-3 h-3 text-emerald-600" />;
      case 'Git':
        return <GitBranch className="w-3 h-3 text-blue-600" />;
      case 'Deploy':
        return <Rocket className="w-3 h-3 text-brand-600" />;
      default:
        return <Activity className="w-3 h-3 text-slate-600" />;
    }
  };

  return (
    <Card
      title="Recent Activity"
      subtitle="Real-time audit log of team movements"
      action={
        <Link
          to="/app/activity"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
        >
          Full stream <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-slate-100"
    >
      {activities.slice(0, 5).map((act) => (
        <div
          key={act.id}
          className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-start gap-3"
        >
          <Avatar src={act.user.avatar} name={act.user.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-800 leading-snug">
              <span className="font-semibold text-slate-900">{act.user.name}</span>{' '}
              <span className="text-slate-500">{act.action}</span>{' '}
              <span className="font-semibold text-slate-900">{act.target}</span>
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">
                {getActionIcon(act.targetType)} {act.targetType}
              </span>
              <span>•</span>
              <span>{formatRelativeTime(act.timestamp)}</span>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default ActivityFeedCard;
