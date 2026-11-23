import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, GitPullRequest, CheckCircle2, GitBranch, Rocket } from 'lucide-react';
import Card from '../common/Card';
import Avatar from '../common/Avatar';
import { formatRelativeTime } from '../../utils/formatters';

export const ActivityFeedCard = ({ activities = [] }) => {
  const getActionIcon = (targetType) => {
    switch (targetType) {
      case 'PR':
        return <GitPullRequest className="w-3 h-3 text-[#0F0F0F]" />;
      case 'Task':
        return <CheckCircle2 className="w-3 h-3 text-[#0F0F0F]" />;
      case 'Git':
        return <GitBranch className="w-3 h-3 text-[#2C2C2C]" />;
      case 'Deploy':
        return <Rocket className="w-3 h-3 text-[#0F0F0F]" />;
      default:
        return <Activity className="w-3 h-3 text-[#5A5A5A]" />;
    }
  };

  return (
    <Card
      title="Recent Activity"
      subtitle="Real-time audit log of team movements"
      action={
        <Link
          to="/app/activity"
          className="text-xs font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] flex items-center gap-1 transition-colors"
        >
          Full stream <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-[#EFEFEF]"
    >
      {activities.slice(0, 5).map((act) => (
        <div
          key={act.id}
          className="p-3 sm:p-4 hover:bg-[#F5F5F5] transition-colors flex items-start gap-2.5 sm:gap-3"
        >
          <Avatar src={act.user.avatar} name={act.user.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#2C2C2C] leading-snug">
              <span className="font-semibold text-[#0F0F0F]">{act.user.name}</span>{' '}
              <span className="text-[#5A5A5A]">{act.action}</span>{' '}
              <span className="font-semibold text-[#0F0F0F] truncate inline-block max-w-[140px] sm:max-w-none align-bottom">
                {act.target}
              </span>
            </p>
            <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-[11px] text-[#B0B0B0]">
              <span className="flex items-center gap-1 bg-[#F5F5F5] border border-[#E5E5E5] px-1.5 py-0.5 rounded text-[#2C2C2C] font-medium">
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
