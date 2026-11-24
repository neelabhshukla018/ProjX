import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Card from '../common/Card';
import { useWorkspace } from '../../hooks/useWorkspace';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F0F0F] text-[#FFFFFF] text-xs rounded-lg p-2.5 shadow-xl border border-[#2C2C2C]">
        <p className="font-semibold text-[#FFFFFF] mb-1">{label}</p>
        <p className="text-[#FFFFFF]">
          Closed: <span className="font-bold text-[#FFFFFF]">{payload[0].value} tasks</span>
        </p>
        {payload[1] && (
          <p className="text-[#B0B0B0]">
            Planned: <span className="font-bold">{payload[1].value} tasks</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const TaskCompletionChart = () => {
  const { tasks } = useWorkspace();

  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completedCount = tasks.filter((t) => t.status === 'Completed' || t.status === 'done').length;
    const totalCount = tasks.length;

    return days.map((day, idx) => {
      const factor = (idx + 1) / 7;
      return {
        day,
        completed: Math.round(completedCount * factor),
        planned: Math.round(totalCount * factor),
      };
    });
  }, [tasks]);

  return (
    <Card
      title="Weekly Task Throughput"
      subtitle="Closed vs planned issues across 7-day cadence"
      className="h-full flex flex-col justify-between"
      bodyClassName="p-3 sm:p-4 pt-2 flex-1 flex flex-col justify-center"
    >
      <div className="w-full h-56 sm:h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F0F0F" stopOpacity={0.16} />
                <stop offset="95%" stopColor="#0F0F0F" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#808080" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#808080" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
            <XAxis
              dataKey="day"
              stroke="#5A5A5A"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#5A5A5A"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#0F0F0F"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCompleted)"
              name="Completed"
            />
            <Area
              type="monotone"
              dataKey="planned"
              stroke="#808080"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorPlanned)"
              name="Planned"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#5A5A5A] pt-3 border-t border-[#EFEFEF]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-[#0F0F0F]" />
          <span>Closed Tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-[#808080] border border-dashed" />
          <span>Sprint Commitment</span>
        </div>
      </div>
    </Card>
  );
};

export default TaskCompletionChart;
