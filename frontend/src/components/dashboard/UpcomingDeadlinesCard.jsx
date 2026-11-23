import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
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
          className="text-xs font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] flex items-center gap-1 transition-colors"
        >
          My tasks <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
      headerBorder
      className="h-full"
      bodyClassName="p-0 divide-y divide-[#EFEFEF]"
    >
      {upcomingDeadlines.map((item) => {
        const priorityBadge = getPriorityBadge(item.priority);

        return (
          <div
            key={item.id}
            className="p-3.5 sm:p-4 hover:bg-[#F5F5F5] transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0 pr-2">
              <h5 className="text-xs sm:text-sm font-semibold text-[#0F0F0F] truncate">
                {item.title}
              </h5>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#5A5A5A] truncate">
                <span className="font-medium text-[#2C2C2C] truncate">{item.project}</span>
                <span>•</span>
                <span className="truncate">{item.assignee}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityBadge.bg}`}
              >
                {item.priority}
              </span>
              <div
                className={`flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-1 rounded-md ${
                  item.daysLeft <= 3
                    ? 'bg-[#0F0F0F] text-[#FFFFFF] border border-[#2C2C2C]'
                    : 'bg-[#F5F5F5] text-[#2C2C2C] border border-[#D8D8D8]'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{item.daysLeft}d</span>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default UpcomingDeadlinesCard;
