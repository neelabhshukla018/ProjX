import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import { upcomingDeadlines } from '../../utils/mockData';
import { getPriorityBadge } from '../../utils/formatters';

export const UpcomingDeadlinesCard = () => {
  return (
    <Card
      title="Upcoming Deadlines"
      subtitle="Tasks requiring close attention this week"
      action={
        <Link
          to="/app/tasks"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
        >
          My tasks <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-slate-100"
    >
      {upcomingDeadlines.map((item) => {
        const priorityBadge = getPriorityBadge(item.priority);

        return (
          <div
            key={item.id}
            className="p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex-1 pr-2">
              <h5 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1">
                {item.title}
              </h5>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                <span className="font-medium text-slate-700 truncate">{item.project}</span>
                <span>•</span>
                <span>{item.assignee}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityBadge.bg}`}
              >
                {item.priority}
              </span>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
                  item.daysLeft <= 3
                    ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{item.daysLeft}d left</span>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default UpcomingDeadlinesCard;
